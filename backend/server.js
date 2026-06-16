/* ============================================
   Hardoi ki Awaaz - Backend Server
   Security hardened + Issues/Protests/Manifesto API
   ============================================ */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const net = require('net');
const { execSync } = require('child_process');

// Load .env
const result = require('dotenv').config({ path: path.join(__dirname, '.env') });
if (result.error) {
  console.warn('⚠️  No .env file found. Copy .env.example to .env and add your API key.');
} else {
  console.log('✅ .env file loaded');
}

const {
  generateNews, generateIssues, generateProtests, generateManifesto, moderateContent,
  getFallbackNews, getFallbackIssues, getFallbackProtests, getFallbackManifesto
} = require('./generate-news');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_KEY_2 = process.env.GEMINI_API_KEY_2;


const app = express();
const PORT = process.env.PORT || 3001;
const REFRESH_INTERVAL = (parseInt(process.env.REFRESH_INTERVAL_MINUTES) || 60) * 60 * 1000;

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// === API KEY PROTECTION: Never expose key in any response ===
const API_KEY_REDACTED = '***REDACTED***';

// Redact API key from error messages before sending to client
function sanitizeError(msg) {
  if (!msg) return msg;
  const key = process.env.GEMINI_API_KEY;
  if (key && key.length > 5) {
    return msg.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), API_KEY_REDACTED);
  }
  return msg;
}

// Trust proxy — needed for Render's IP forwarding
app.set('trust proxy', 1);

// Helmet — HTTP security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "https://picsum.photos", "https://*.googleusercontent.com", "https://*.gstatic.com", "https://*.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting — prevent abuse
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // max 30 requests per minute per IP
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const refreshLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5, // max 5 refreshes per minute
  message: { error: 'Too many refresh requests. Please wait.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);
app.use('/api/refresh', refreshLimiter);

// CORS — restrict in production
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// === Error handler — NEVER leak API key in errors (catches any thrown errors) ===
app.use((err, req, res, next) => {
  const safeMsg = sanitizeError(err.message || 'Unknown error');
  console.error('❌ Server error:', safeMsg);
  res.status(500).json({ error: 'Internal server error' });
});

app.use(express.json({ limit: '10mb' })); // limit body size (increased for photo uploads)

// ============================================
// STATE
// ============================================

let cachedNews = null;
let cachedIssues = null;
let cachedProtests = null;
let cachedManifesto = null;
let lastFetchTime = { news: null, issues: null, protests: null, manifesto: null };
let isFetching = { news: false, issues: false, protests: false, manifesto: false };

// ============================================
// USER-SUBMITTED ISSUES STORAGE (File-based)
// ============================================
const USER_ISSUES_FILE = path.join(__dirname, 'user-issues-data.json');

function loadUserIssues() {
  try {
    if (fs.existsSync(USER_ISSUES_FILE)) {
      const raw = fs.readFileSync(USER_ISSUES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('⚠️ Could not load user issues file:', err.message);
  }
  return [];
}

function saveUserIssues(issues) {
  try {
    fs.writeFileSync(USER_ISSUES_FILE, JSON.stringify(issues, null, 2), 'utf-8');
  } catch (err) {
    console.error('⚠️ Could not save user issues file:', err.message);
  }
}

let userIssues = loadUserIssues();

// ============================================
// USER ISSUES API
// ============================================

// GET /api/issues/user — Get all user-submitted issues (public)
app.get('/api/issues/user', (req, res) => {
  res.json({ success: true, issues: userIssues });
});

// POST /api/issues/user — Submit a new issue
app.post('/api/issues/user', (req, res) => {
  try {
    const { name, category, message, location, photos } = req.body;
    
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Message too short (min 10 chars)' });
    }

    const issue = {
      id: 'ISS-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      name: name || 'Anonymous',
      category: category || 'other',
      message: message.trim(),
      location: location || 'Hardoi',
      photos: photos || [],
      date: new Date().toLocaleDateString('hi-IN'),
      timestamp: Date.now(),
      supporters: 0,
      supporterIds: [],
      status: 'active',
      replies: [],
      commentCount: 0
    };

    userIssues.unshift(issue);
    saveUserIssues(userIssues);

    console.log(`📝 New issue submitted: ${issue.id} — ${issue.message.substring(0, 50)}...`);
    res.json({ success: true, issue });
  } catch (err) {
    console.error('❌ Error submitting issue:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/issues/user/:id/support — Support an issue
app.post('/api/issues/user/:id/support', (req, res) => {
  try {
    const { id } = req.params;
    const { supporterId } = req.body;
    const issue = userIssues.find(i => i.id === id);
    
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    if (supporterId && issue.supporterIds.includes(supporterId)) {
      return res.json({ success: true, supporters: issue.supporters, alreadySupported: true });
    }

    issue.supporters = (issue.supporters || 0) + 1;
    if (supporterId) {
      issue.supporterIds.push(supporterId);
    }
    saveUserIssues(userIssues);

    res.json({ success: true, supporters: issue.supporters });
  } catch (err) {
    console.error('❌ Error supporting issue:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/issues/user/:id/reply — Reply to an issue or to a comment (nested)
app.post('/api/issues/user/:id/reply', (req, res) => {
  try {
    const { id } = req.params;
    const { name, text, parentReplyId } = req.body;
    
    if (!text || text.trim().length < 1) {
      return res.status(400).json({ success: false, error: 'Reply text required' });
    }

    const issue = userIssues.find(i => i.id === id);
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    const reply = {
      id: 'REP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      name: name || 'Anonymous',
      text: text.trim(),
      date: new Date().toLocaleDateString('hi-IN'),
      timestamp: Date.now(),
      parentReplyId: parentReplyId || null,
      replies: []
    };

    if (parentReplyId) {
      // Nested reply — find the parent reply and push into its replies array
      const addNestedReply = (replies) => {
        for (let r of replies) {
          if (r.id === parentReplyId) {
            r.replies = r.replies || [];
            r.replies.push(reply);
            return true;
          }
          if (r.replies && r.replies.length > 0) {
            if (addNestedReply(r.replies)) return true;
          }
        }
        return false;
      };
      
      if (!addNestedReply(issue.replies)) {
        // Parent not found in nested — fall back to top-level
        reply.parentReplyId = null;
        issue.replies.push(reply);
      }
    } else {
      // Top-level reply
      issue.replies.push(reply);
    }

    saveUserIssues(userIssues);

    console.log(`💬 Reply added to ${issue.id}: ${reply.text.substring(0, 50)}...`);
    res.json({ success: true, reply });
  } catch (err) {
    console.error('❌ Error replying to issue:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/issues/user/:id — Get a single issue with all replies
app.get('/api/issues/user/:id', (req, res) => {
  const issue = userIssues.find(i => i.id === req.params.id);
  if (!issue) {
    return res.status(404).json({ success: false, error: 'Issue not found' });
  }
  res.json({ success: true, issue });
});

// ============================================
// STATIC FILES
// ============================================
app.use(express.static(path.join(__dirname, '..'), {
  maxAge: '1h', // cache static assets
  etag: true,
  lastModified: true
}));

// ============================================
// HELPERS
// ============================================

function isFresh(type) {
  const t = lastFetchTime[type];
  return t && (Date.now() - t) < REFRESH_INTERVAL;
}

function getCached(type) {
  const map = { news: cachedNews, issues: cachedIssues, protests: cachedProtests, manifesto: cachedManifesto };
  return map[type];
}

function setCached(type, data) {
  if (type === 'news') cachedNews = data;
  else if (type === 'issues') cachedIssues = data;
  else if (type === 'protests') cachedProtests = data;
  else if (type === 'manifesto') cachedManifesto = data;
  lastFetchTime[type] = Date.now();
  isFetching[type] = false;
}

// ============================================
// GENERIC FETCH HANDLER
// ============================================

async function fetchOrFallback(type, fetchFn, fallbackFn, req, res) {
  try {
    if (isFresh(type) && getCached(type)) {
      return res.json(getCached(type));
    }
    if (isFetching[type]) {
      return res.json(getCached(type) || fallbackFn());
    }
    isFetching[type] = true;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      const fallback = fallbackFn();
      setCached(type, fallback);
      return res.json(fallback);
    }

    const result = await fetchFn(apiKey);
    if (result) {
      setCached(type, result);
    } else {
      if (!getCached(type)) setCached(type, fallbackFn());
    }
    isFetching[type] = false;
    res.json(getCached(type));
  } catch (err) {
    console.error(`❌ Error in /api/${type}:`, err.message);
    isFetching[type] = false;
    if (!getCached(type)) setCached(type, fallbackFn());
    res.json(getCached(type));
  }
}

// ============================================
// API ENDPOINTS
// ============================================

// GET /api/news
app.get('/api/news', (req, res) => {
  fetchOrFallback('news', generateNews, getFallbackNews, req, res);
});

// GET /api/issues
app.get('/api/issues', (req, res) => {
  fetchOrFallback('issues', generateIssues, getFallbackIssues, req, res);
});

// GET /api/protests
app.get('/api/protests', (req, res) => {
  fetchOrFallback('protests', generateProtests, getFallbackProtests, req, res);
});

// GET /api/manifesto
app.get('/api/manifesto', (req, res) => {
  // For manifesto, pass previous manifesto + recent news titles for context
  const prev = cachedManifesto || getFallbackManifesto();
  const newsTitles = cachedNews ? cachedNews.map(n => n.title) : [];

  if (isFresh('manifesto') && cachedManifesto) {
    return res.json(cachedManifesto);
  }
  if (isFetching.manifesto) {
    return res.json(prev);
  }
  isFetching.manifesto = true;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    setCached('manifesto', prev);
    return res.json(prev);
  }

  generateManifesto(apiKey, prev, newsTitles)
    .then(result => {
      if (result) setCached('manifesto', result);
      else if (!cachedManifesto) setCached('manifesto', prev);
      isFetching.manifesto = false;
      res.json(cachedManifesto || prev);
    })
    .catch(err => {
      console.error('❌ Error in /api/manifesto:', err.message);
      isFetching.manifesto = false;
      if (!cachedManifesto) cachedManifesto = prev;
      res.json(cachedManifesto);
    });
});

// GET /api/status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    security: 'helmet + rate-limit active',
    apiKey: GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here' ? '✅' : '❌',
    apiKeyBackup: GEMINI_API_KEY_2 && GEMINI_API_KEY_2 !== 'your_gemini_api_key_here' ? '✅' : '❌',
    googleKey: process.env.GOOGLE_API_KEY ? '✅' : '❌',
    news: { cached: cachedNews ? cachedNews.length : 0, lastFetch: lastFetchTime.news },
    issues: { cached: cachedIssues ? cachedIssues.length : 0, lastFetch: lastFetchTime.issues },
    protests: { upcoming: cachedProtests?.upcoming?.length || 0, past: cachedProtests?.past?.length || 0, lastFetch: lastFetchTime.protests },
    manifesto: { demands: cachedManifesto ? cachedManifesto.length : 0, lastFetch: lastFetchTime.manifesto },
    refreshIntervalMinutes: REFRESH_INTERVAL / 60000
  });
});

// GET /api/refresh — force refresh all content
app.get('/api/refresh', async (req, res) => {
  // Clear all cache
  cachedNews = null; cachedIssues = null; cachedProtests = null; cachedManifesto = null;
  Object.keys(lastFetchTime).forEach(k => { lastFetchTime[k] = 0; });
  Object.keys(isFetching).forEach(k => { isFetching[k] = false; });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    cachedNews = getFallbackNews();
    cachedIssues = getFallbackIssues();
    cachedProtests = getFallbackProtests();
    cachedManifesto = getFallbackManifesto();
    return res.json({ success: true, fresh: false, note: 'No API key — using fallback' });
  }

  try {
    const [news, issues, protests, manifesto] = await Promise.all([
      generateNews(apiKey),
      generateIssues(apiKey),
      generateProtests(apiKey),
      generateManifesto(apiKey, getFallbackManifesto(), [])
    ]);

    if (news) { cachedNews = news; lastFetchTime.news = Date.now(); }
    if (issues) { cachedIssues = issues; lastFetchTime.issues = Date.now(); }
    if (protests) { cachedProtests = protests; lastFetchTime.protests = Date.now(); }
    if (manifesto) { cachedManifesto = manifesto; lastFetchTime.manifesto = Date.now(); }

    // Ensure fallbacks for anything that failed
    if (!cachedNews) cachedNews = getFallbackNews();
    if (!cachedIssues) cachedIssues = getFallbackIssues();
    if (!cachedProtests) cachedProtests = getFallbackProtests();
    if (!cachedManifesto) cachedManifesto = getFallbackManifesto();

    res.json({
      success: true,
      fresh: true,
      news: cachedNews.length,
      issues: cachedIssues.length,
      protests: { upcoming: cachedProtests.upcoming.length, past: cachedProtests.past.length },
      manifesto: cachedManifesto.length
    });
  } catch (err) {
    console.error('❌ Refresh error:', err.message);
    cachedNews = getFallbackNews();
    cachedIssues = getFallbackIssues();
    cachedProtests = getFallbackProtests();
    cachedManifesto = getFallbackManifesto();
    res.json({ success: true, fresh: false, error: err.message });
  }
});

// ============================================
// CONTENT MODERATION ENDPOINT
// ============================================

// POST /api/moderate — Analyze user-uploaded content for NSFW/inappropriate
app.post('/api/moderate', async (req, res) => {
  try {
    const { text, photoCount } = req.body;

    if (!text && !photoCount) {
      return res.status(400).json({ error: 'Missing text or photos to analyze' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      // No API key — allow everything
      return res.json({ safe: true, reason: '', category: 'genuine_issue' });
    }

    const result = await moderateContent(apiKey, text || '', parseInt(photoCount) || 0);
    res.json(result);
  } catch (err) {
    console.error('❌ Moderation error:', sanitizeError(err.message));
    // If moderation fails, allow by default (better to let through than block legitimate issues)
    res.json({ safe: true, reason: '', category: 'genuine_issue' });
  }
});

// ============================================
// BACKGROUND AUTO-REFRESH
// ============================================

async function backgroundRefresh() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') return;

  // Set isFetching flags to prevent duplicate concurrent calls from API endpoints
  Object.keys(isFetching).forEach(k => { isFetching[k] = true; });

  console.log('🔄 Background refresh all content...');
  const [news, issues, protests, manifesto] = await Promise.allSettled([
    generateNews(apiKey),
    generateIssues(apiKey),
    generateProtests(apiKey),
    generateManifesto(apiKey, cachedManifesto || getFallbackManifesto(), cachedNews?.map(n => n.title) || [])
  ]);

  if (news.status === 'fulfilled' && news.value) { cachedNews = news.value; lastFetchTime.news = Date.now(); }
  if (issues.status === 'fulfilled' && issues.value) { cachedIssues = issues.value; lastFetchTime.issues = Date.now(); }
  if (protests.status === 'fulfilled' && protests.value) { cachedProtests = protests.value; lastFetchTime.protests = Date.now(); }
  if (manifesto.status === 'fulfilled' && manifesto.value) { cachedManifesto = manifesto.value; lastFetchTime.manifesto = Date.now(); }

  // Reset all fetching flags
  Object.keys(isFetching).forEach(k => { isFetching[k] = false; });

  console.log(`✅ Background refresh: News=${cachedNews?.length || 0}, Issues=${cachedIssues?.length || 0}, Protest=${cachedProtests?.upcoming?.length || 0} up, Manifesto=${cachedManifesto?.length || 0}`);
}

setInterval(() => {
  backgroundRefresh().catch(err => console.error('Background refresh error:', err.message));
}, REFRESH_INTERVAL);

// ============================================
// START
// ============================================

/** Helper: check if port is available */
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once('error', () => resolve(false));
    tester.once('listening', () => {
      tester.close();
      resolve(true);
    });
    tester.listen(port, '0.0.0.0');
  });
}

/** Kill any process holding the port */
function killPortProcess(port) {
  try {
    execSync(`fuser -k ${port}/tcp 2>/dev/null || lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function startServer() {
  const available = await isPortAvailable(PORT);
  if (!available) {
    console.log(`⚠️  Port ${PORT} is in use. Killing old process and retrying...`);
    killPortProcess(PORT);
    // Wait briefly for port to be released
    await new Promise(r => setTimeout(r, 1500));
  }

  function onServerReady() {
    console.log(`
╔══════════════════════════════════════════════╗
║     Hardoi ki Awaaz — Backend Server v2     ║
║══════════════════════════════════════════════║
║  🌐  http://localhost:${PORT}                  ║
║  🔒  Security: helmet + rate-limit active    ║
║  📰  /api/news                               ║
║  🔍  /api/issues                             ║
║  ✊  /api/protests                           ║
║  📜  /api/manifesto                          ║
║  📊  /api/status                             ║
║  🔄  /api/refresh                            ║
║  🔑  API: ${GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here' ? '✅' : '❌'}${GEMINI_API_KEY_2 && GEMINI_API_KEY_2 !== 'your_gemini_api_key_here' ? ' + Backup ✅' : ''}                      ║
║  📸  Images: ${process.env.GOOGLE_API_KEY ? 'Google ✅ (CSE)' : '❌ — .env mein GOOGLE_API_KEY डालें!'} ║
║  ⏰  Auto-refresh: ${REFRESH_INTERVAL / 60000} min        ║
╚══════════════════════════════════════════════╝
  `);

    // Seed cache with fallbacks on startup
    if (!cachedNews) cachedNews = getFallbackNews();
    if (!cachedIssues) cachedIssues = getFallbackIssues();
    if (!cachedProtests) cachedProtests = getFallbackProtests();
    if (!cachedManifesto) cachedManifesto = getFallbackManifesto();

    backgroundRefresh();
  }

  const server = app.listen(PORT, '0.0.0.0', onServerReady);
  
  // Safety net: if port still in use after kill, retry once
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${PORT} still in use. Retrying kill...`);
      killPortProcess(PORT);
      setTimeout(() => {
        server.close();
        app.listen(PORT, '0.0.0.0', onServerReady);
      }, 1000);
    } else {
      console.error('❌ Server error:', err.message);
    }
  });
}

startServer();
