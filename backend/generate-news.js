/* ============================================
   Hardoi ki Awaaz - Content Generator v3
   Dual API key + Real image search (Pixabay/Picsum)
   News, Issues, Protests, Manifesto
   ============================================ */

const fetch = require('node-fetch');

const MODELS = [
  'gemini-2.5-flash-lite',   // cheapest, try first to save quota
  'gemini-2.0-flash',         // second tier
  'gemini-2.5-flash',         // third tier
  'gemini-3.1-flash-lite',   // fourth tier
  'gemini-3.5-flash'          // most expensive, last resort
];

/* ============================================
   IMAGE SEARCH — Google Custom Search (CX from search-id.txt) + content-based Picsum fallback
   ============================================ */

const GOOGLE_CX = '137070bc808794021';  // From search-id.txt

/* ---------- Hindi keyword → English transliteration map ----------
   Used to create content-relevant Picsum seeds from Hindi news titles.
   When a Hindi keyword is found in the title, the transliterated English
   version is used as part of the Picsum seed URL — giving each unique
   topic a distinct image instead of all articles in a category sharing one. */
const HINDI_KEYWORD_MAP = {
  'प्रदूषण': 'pradushan', 'प्रदूषित': 'pradushan',
  'बिजली': 'bijli', 'वोल्टेज': 'voltage',
  'पानी': 'paani', 'पेयजल': 'paani', 'जल': 'jal', 'पेय': 'paani',
  'सड़क': 'sadak', 'सड़कें': 'sadak', 'गड्ढा': 'gadda',
  'नाली': 'nali', 'नालियां': 'nali', 'सीवर': 'sewer',
  'कचरा': 'kachra', 'कूड़ा': 'kachra', 'गंदगी': 'gandagi',
  'चोरी': 'chori', 'अपराध': 'apradh', 'साइबर': 'cyber',
  'अस्पताल': 'hospital', 'स्वास्थ्य': 'health', 'डॉक्टर': 'doctor', 'दवा': 'medicine', 'दवाइयां': 'medicine',
  'स्कूल': 'school', 'शिक्षा': 'education', 'शिक्षक': 'teacher', 'भर्ती': 'recruitment',
  'प्रदर्शन': 'protest', 'धरना': 'protest', 'मार्च': 'march',
  'हादसा': 'accident', 'हादसे': 'accident', 'दुर्घटना': 'accident',
  'मरम्मत': 'repair', 'निर्माण': 'construction',
  'कटौती': 'cutoff',
  'पाइप': 'pipe', 'पाइपलाइन': 'pipeline',
  'हैंडपंप': 'handpump',
  'पुलिस': 'police',
  'सीसीटीवी': 'cctv', 'कैमरा': 'camera',
  'सफाई': 'cleaning',
  'पार्क': 'park',
  'पेड़': 'trees', 'पौधारोपण': 'plantation',
  'पर्यावरण': 'environment',
  'सरकारी': 'government', 'योजना': 'scheme',
  'विकास': 'development',
  'जाम': 'jam',
  'लाइट': 'light', 'स्ट्रीटलाइट': 'street', 'स्ट्रीट लाइट': 'street',
  'बैंक': 'bank',
  'मोबाइल': 'mobile', 'टावर': 'tower',
  'इंटरनेट': 'internet',
  'बीमारी': 'disease', 'बीमारियां': 'disease', 'बुखार': 'fever', 'दस्त': 'diarrhea',
  'संकट': 'crisis',
  'समाधान': 'solution',
  'मांग': 'demand',
  'आंदोलन': 'movement', 'आवाज़': 'voice',
  'नागरिक': 'citizen',
  'सफलता': 'success', 'रिकॉर्ड': 'record',
  'चौराहा': 'crossing', 'चौराहे': 'crossing',
  'बच्चे': 'children', 'बच्चों': 'children',
  'पढ़ाई': 'study',
  'कंप्यूटर': 'computer',
  'स्मार्ट': 'smart',
  'जांच': 'checkup',
  'गश्त': 'patrol',
  'अभियान': 'campaign',
  'रैली': 'rally',
  'बदलाव': 'change',
  'एकजुट': 'united',
  'शुद्ध': 'pure',
  'गर्मी': 'heat',
  'बारिश': 'rain',
  'बाढ़': 'flood',
  'सूखा': 'drought',
  'किसान': 'farmer',
  'मजदूर': 'labour',
  'व्यापार': 'business',
  'बेरोजगारी': 'unemployment',
  'यातायात': 'traffic',
  'ट्रैफिक': 'traffic',
  'मीटर': 'meter',
  'लाइब्रेरी': 'library',
  'टूटी': 'broken', 'खराब': 'broken',
  'बंद': 'closed',
  'गिरा': 'collapsed', 'गिर': 'collapsed',
  'आग': 'fire',
  'लूट': 'robbery', 'डकैती': 'robbery',
  'हड़ताल': 'strike',
  'बैठक': 'meeting',
  'सम्मेलन': 'conference',
  'नियुक्ति': 'appointment',
  'परीक्षा': 'exam',
  'नतीजा': 'result', 'परिणाम': 'result',
  'अवकाश': 'holiday', 'छुट्टी': 'holiday',
  'समारोह': 'ceremony',
  'उद्घाटन': 'inauguration',
  'शिलान्यास': 'foundation',
  'निरीक्षण': 'inspection',
  'बढ़ोतरी': 'increase',
  'कमी': 'shortage',
  'गुजरिश': 'request', 'अपील': 'appeal',
  'चेतावनी': 'warning',
  'खतरा': 'danger',
  // ===== NEW CRITICAL KEYWORDS for better photo matching =====
  'दवा': 'medicine', 'दवाइयां': 'medicine', 'दवाई': 'medicine', 'दवाखाना': 'medicine',
  'मरीज': 'hospital-patient', 'रोगी': 'hospital-patient', 'इलाज': 'hospital-treatment', 'ऑपरेशन': 'surgery',
  'लड़ाई': 'violence-fight', 'मारपीट': 'violence-fight', 'झगड़ा': 'violence-fight',
  'हिंसा': 'violence', 'दंगा': 'riot',
  'गोली': 'bullet', 'गोलीबारी': 'shooting',
  'हमला': 'attack',
  'नशा': 'drugs', 'शराब': 'alcohol',
  'भ्रष्टाचार': 'corruption',
  'रिश्वत': 'bribe',
  'जाति': 'caste',
  'चुनाव': 'election',
  'भूख': 'hunger',
  'गरीब': 'poor', 'गरीबी': 'poverty',
  'बाल': 'child', 'महिला': 'women',
  'उत्पीड़न': 'harassment',
  'दहेज': 'dowry',
  'तलाक': 'divorce',
  'अत्याचार': 'atrocity',
  'भेदभाव': 'discrimination',
  'अवैध': 'illegal',
  'अतिक्रमण': 'encroachment',
  'जमीन': 'land', 'भूमि': 'land',
  'मकान': 'house',
  'किरायादारी': 'rent', 'किरायेदार': 'rent',
  'राशन': 'ration',
  'पेंशन': 'pension',
  'सब्सिडी': 'subsidy',
  'लोन': 'loan', 'कर्ज': 'loan',
  'रोजगार': 'employment',
  'नौकरी': 'job',
  'मजदूरी': 'wages',
  'वेतन': 'salary',
  'विरोध': 'protest',
  'नारेबाजी': 'slogans',
  'प्रदर्शनकारी': 'protesters',
  'पुलिस बल': 'police-force',
  'लाठीचार्ज': 'lathi-charge',
  'जेल': 'jail',
  'कोर्ट': 'court',
  'शिकायत': 'complaint',
  'याचिका': 'petition',
  'हस्ताक्षर': 'signature',
  'ज्ञापन': 'memorandum',
  'धंधा': 'business-trade', 'दुकान': 'shop',
  'बाजार': 'market',
  'गल्ला': 'grain', 'अनाज': 'grain',
  'ठेला': 'cart',
  'पुल': 'bridge',
  'फ्लाईओवर': 'flyover',
  'अंडरपास': 'underpass',
  'नल': 'tap',
  'टंकी': 'tank',
  'बोरिंग': 'boring',
  'नहर': 'canal',
  'नदी': 'river',
  'तालाब': 'pond',
  'जंगल': 'forest',
  'खेत': 'field',
  'फसल': 'crop',
  'बीज': 'seed',
  'खाद': 'fertilizer',
  'पशु': 'animal', 'गाय': 'cow', 'भैंस': 'buffalo',
  'मवेशी': 'cattle',
  'चारा': 'fodder',
  'ट्रैक्टर': 'tractor',
  'डीजल': 'diesel', 'पेट्रोल': 'petrol',
  'गैस': 'gas', 'सिलेंडर': 'cylinder',
  'सोलर': 'solar',
  'बैटरी': 'battery',
  'इन्वर्टर': 'inverter',
  'जनरेटर': 'generator',
  'ट्रांसफॉर्मर': 'transformer',
  'तार': 'wire',
  'खंभा': 'pole',
  'मीटिंग': 'meeting',
  'सम्मेलन': 'conference', 'अधिवेशन': 'conference',
  'सेमिनार': 'seminar',
  'कार्यशाला': 'workshop',
  'प्रशिक्षण': 'training',
  'जागरूकता': 'awareness',
  'शिविर': 'camp',
  'नुक्कड़': 'street-corner',
  'नाटक': 'drama',
  'प्रतियोगिता': 'competition',
  'इनाम': 'prize',
  'सम्मान': 'honour',
  'पुरस्कार': 'award',
  'उपलब्धि': 'achievement',
  'योग': 'yoga',
  'खेल': 'sports',
  'स्टेडियम': 'stadium',
  'मैदान': 'ground',
  'मंदिर': 'temple', 'मस्जिद': 'mosque', 'गिरजाघर': 'church', 'गुरुद्वारा': 'gurudwara',
  'त्यौहार': 'festival', 'त्योहार': 'festival',
  'मेला': 'fair',
  'शादी': 'wedding',
  'जन्म': 'birth',
  'मृत्यु': 'death',
  'अंतिम संस्कार': 'cremation',
  'शव': 'dead-body', 'लाश': 'dead-body',
  'बीपी': 'blood-pressure', 'शुगर': 'diabetes',
  'कैंसर': 'cancer',
  'टीबी': 'tuberculosis',
  'मलेरिया': 'malaria',
  'डेंगू': 'dengue',
  'कोरोना': 'covid',
  'वैक्सीन': 'vaccine', 'टीका': 'vaccine',
  'गर्भवती': 'pregnant',
  'प्रसव': 'childbirth',
  'नवजात': 'newborn',
  'कुपोषण': 'malnutrition',
  'एनीमिया': 'anemia',
  'नेत्र': 'eye', 'आंख': 'eye',
  'दांत': 'tooth',
  'चश्मा': 'spectacles',
  'व्हीलचेयर': 'wheelchair',
  'दिव्यांग': 'disabled',
  'स्वच्छता': 'hygiene',
  'शौचालय': 'toilet',
  'शौच': 'defecation',
  'खुले में': 'open-defecation',
  'डस्टबिन': 'dustbin',
  'लैंडफिल': 'landfill',
  'रीसाइक्लिंग': 'recycling',
  'सीएनजी': 'cng',
  'ई-रिक्शा': 'e-rickshaw',
  'बस': 'bus', 'बसें': 'bus',
  'ऑटो': 'auto',
  'टैक्सी': 'taxi',
  'रेल': 'train', 'रेलवे': 'railway',
  'स्टेशन': 'station',
  'प्लेटफॉर्म': 'platform',
  'टिकट': 'ticket',
  'किराया-भाड़ा': 'fare', 'किराया': 'fare',
  'ड्राइवर': 'driver',
  'कंडक्टर': 'conductor',
  'पार्किंग': 'parking'
};

/* Extract content-based seed for Picsum from Hindi/English title keywords
   Instead of using just the broad category name (e.g. "Water" for all water
   articles), this extracts actual topic keywords from the title to create a
   unique Picsum seed per article — so pollution news gets a different Picsum
   image than electricity news, even both are in the same category. */
function extractContentSeed(title, summary, category, index) {
  const text = (title || '') + ' ' + (summary || '');
  
  // Step 1: Find matching Hindi keywords in the title/summary
  const foundKeywords = [];
  for (const [hindiWord, translit] of Object.entries(HINDI_KEYWORD_MAP)) {
    if (text.includes(hindiWord)) {
      foundKeywords.push(translit);
    }
  }
  
  // Step 2: If Hindi keywords found, use them (max 3 unique, deduped)
  if (foundKeywords.length > 0) {
    const unique = [...new Set(foundKeywords)];
    const keywords = unique.slice(0, 3).join('-');
    return `${keywords}-${index || 0}`;
  }
  
  // Step 3: Fallback — extract ASCII/English words from title
  const asciiWords = (title || '')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w.toLowerCase());
  
  if (asciiWords.length > 0) {
    return `${asciiWords.join('-')}-${index || 0}`;
  }
  
  // Step 4: Last resort — use category name
  const catSeed = (category || 'news').toLowerCase().replace(/[^a-z]/g, '') || 'news';
  return `${catSeed}-${index || 0}`;
}

async function searchGoogleImage(apiKey, query) {
  if (!apiKey) return null;
  const q = encodeURIComponent(query.replace(/[<>"']/g, ' ').substring(0, 100));
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${GOOGLE_CX}&q=${q}&searchType=image&num=1&imgSize=MEDIUM`;
  const resp = await fetch(url);
  if (!resp.ok) {
    // 401/403/429 = quota or auth error, don't log — silently use Picsum fallback
    if (resp.status === 401 || resp.status === 403 || resp.status === 429) return null;
    throw new Error(`Google: HTTP ${resp.status}`);
  }
  const data = await resp.json();
  return data?.items?.[0]?.link || null;
}

/* Main image search — Google → content-based Picsum fallback
   Uses title keywords to create different Picsum images per article
   so pollution news shows a different image than electricity news. */
async function findImageForContent(category, title, location, extraKeywords, index) {
  const searchQuery = [title, location, extraKeywords, 'Hardoi Uttar Pradesh India']
    .filter(Boolean).join(' ').replace(/[<>"']/g, ' ').trim().substring(0, 200);
  
  // Try Google Custom Search first (needs GOOGLE_API_KEY in .env)
  const googleKey = process.env.GOOGLE_API_KEY;
  if (googleKey && GOOGLE_CX) {
    try {
      const url = await searchGoogleImage(googleKey, searchQuery);
      if (url) return url;
    } catch (err) {
      console.warn(`⚠️  Google Image search failed: ${err.message.substring(0, 100)}`);
    }
  }
  
  // Picsum fallback with CONTENT-BASED seed — each unique topic gets its own image
  // Instead of all "Water" articles sharing one image, each article's Hindi
  // keywords (e.g. "paani", "nali", "bijli") create a unique Picsum seed.
  const contentSeed = extractContentSeed(title, extraKeywords, category, index);
  return `https://picsum.photos/seed/${contentSeed}/800/600`;

}

/* ============================================
   DUAL API KEY SUPPORT
   ============================================ */

function getActiveApiKeys() {
  const keys = [];
  if (process.env.GEMINI_API_KEY) keys.push(process.env.GEMINI_API_KEY);
  if (process.env.GEMINI_API_KEY_2) keys.push(process.env.GEMINI_API_KEY_2);
  return keys;
}

/* ============================================
   API Call
   ============================================ */

async function callGemini(apiKey, modelName, prompt, temperature = 0.9) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature, topK: 40, topP: 0.95, maxOutputTokens: 4096 }
    })
  });
  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new Error(`Model ${modelName}: HTTP ${resp.status} - ${errText.substring(0, 200)}`);
  }
  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`Model ${modelName} returned empty response`);
  return text;
}

/* ============================================
   Try all models × all keys
   ============================================ */

async function tryAllModels(apiKey, prompt, parseFn, label) {
  const keys = getActiveApiKeys();
  if (keys.length === 0) return null;
  
  let first429 = false;  // Only log full 429 message once per content type
  
  for (const key of keys) {
    const keyLabel = key === keys[0] ? '' : ' (backup key)';
    for (const modelName of MODELS) {
      try {
        console.log(`🔄 [${label}] Trying: ${modelName}${keyLabel}...`);
        const text = await callGemini(key, modelName, prompt);
        
        // Try direct parse first, then repair
        let parsed;
        try {
          parsed = await parseFn(text);
        } catch (parseErr) {
          console.warn(`⚠️  [${label}] Parse failed for ${modelName}, attempting repair...`);
          const repaired = repairJSON(text);
          try {
            parsed = await parseFn(repaired);
          } catch (e2) {
            throw new Error(`JSON parse failed after repair: ${e2.message}`);
          }
        }
        
        return parsed;
      } catch (err) {
        if (err.message.includes('HTTP 429') || err.message.includes('quota')) {
          if (!first429) {
            console.warn(`⚠️  [${label}] HTTP 429 quota exceeded — trying other models...`);
            first429 = true;
          }
          // Don't log full error for 429 - just continue to next model
          continue;
        }
        // Log other errors normally
        console.warn(`⚠️  [${label}] ${err.message.substring(0, 100)}`);
      }
    }
  }
  
  return null;
}

/* ============================================
   ENHANCED JSON REPAIR v2
   Handles: markdown blocks, backticks, trailing commas,
   unquoted HTML, unterminated strings, missing commas
   ============================================ */

function repairJSON(str) {
  let s = str.trim();
  
  // 1) Strip ALL markdown code block markers and backticks
  s = s.replace(/```(?:json)?\s*/gi, '');
  s = s.replace(/\s*```/g, '');
  s = s.replace(/`/g, '');
  
  // 2) Extract outermost JSON array [ ... ] or object { ... }
  let startIdx = -1, endIdx = -1;
  let depth = 0, inStr = false, esc = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\' && inStr) { esc = true; continue; }
    if (ch === '"' && !esc) { inStr = !inStr; continue; }
    if (!inStr) {
      if (ch === '[' || ch === '{') {
        if (depth === 0) { startIdx = i; }
        depth++;
      } else if (ch === ']' || ch === '}') {
        depth--;
        if (depth === 0) { endIdx = i + 1; break; }
      }
    }
  }
  if (startIdx !== -1 && endIdx !== -1) {
    s = s.substring(startIdx, endIdx);
  }
  
  // Quick test
  try { JSON.parse(s); return s; } catch (_) {}
  
  // 3) Remove trailing commas before ] or }
  s = s.replace(/,([\s]*[\]}])/g, '$1');
  
  // 4) Fix missing commas between adjacent objects/arrays/string-values
  s = s.replace(/}([\s]*){/g, ',$1{');
  s = s.replace(/\]([\s]*)\[/g, ',$1[');
  s = s.replace(/"([\s]*)\[/g, '",$1[');
  s = s.replace(/"([\s]*)\{/g, '",$1{');
  
  // 5) Critical: Escape unescaped double quotes inside string values
  //    Walk through char by char, track string boundaries, and escape any
  //    bare quotes that appear inside a string value
  let result = '';
  let inString = false;
  let escaped = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (escaped) { result += ch; escaped = false; continue; }
    if (ch === '\\' && inString) { result += ch; escaped = true; continue; }
    if (ch === '"') {
      // Check if this quote starts or ends a string
      // If already in a string, check if next non-space char is a valid delimiter
      if (inString) {
        // Look ahead for what follows this quote
        let nextNonSpace = '';
        for (let j = i + 1; j < s.length; j++) {
          if (!/\s/.test(s[j])) { nextNonSpace = s[j]; break; }
        }
        // If followed by : and inside object → this is a key's closing quote
        // If followed by , ] } → end of string value
        // If followed by : , ] } → these are valid JSON delimiters
        // If followed by letter/digit/Hindi → this is an unescaped quote inside a string!
        if (/[\w\u0900-\u097F]/.test(nextNonSpace) && nextNonSpace !== ',' && nextNonSpace !== ']' && nextNonSpace !== '}' && nextNonSpace !== ':') {
          // Unescaped quote inside a string → escape it
          result += '\\"';
          continue;
        }
      }
      inString = !inString;
    }
    result += ch;
  }
  s = result;
  
  try { JSON.parse(s); return s; } catch (_) {}
  
  // 6) Remove trailing non-JSON after last ] or }
  const lastClose = Math.max(s.lastIndexOf('}'), s.lastIndexOf(']'));
  if (lastClose > 0 && lastClose < s.length - 1) {
    s = s.substring(0, lastClose + 1);
  }
  
  try { JSON.parse(s); return s; } catch (_) {}
  
  // 7) Handle unescaped newlines inside string values
  let result2 = '';
  inString = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"') inString = !inString;
    if (inString && ch === '\n') { result2 += ' '; continue; }
    if (inString && ch === '\r') { result2 += ' '; continue; }
    result2 += ch;
  }
  s = result2;
  
  try { JSON.parse(s); return s; } catch (_) {}
  
  // 8) Try to handle unquoted HTML content in JSON values
  s = s.replace(/"(\w+)"\s*:\s*(<[^>]*>[\s\S]*?)(?=[,\n\r\]\}])/g, (match, key, htmlContent) => {
    const trimmed = htmlContent.trim();
    if (trimmed.startsWith('<')) {
      return `"${key}": "${trimmed.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
    }
    return match;
  });
  
  try { JSON.parse(s); return s; } catch (_) {}
  
  // 9) Last resort: remove any non-JSON characters
  s = s.replace(/[^\[\]{} "\-,.:\w\u0900-\u097F\n\r\t]/g, '');
  
  try { JSON.parse(s); return s; } catch (_) {}
  
  return s;
}

/* ============================================
   NEWS GENERATOR
   ============================================ */

function buildNewsPrompt() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const seed = Math.floor(Math.random() * 100000);
  const newsIdeas = [
    'नई सड़क निर्माण, पानी की समस्या, स्कूल शिक्षा',
    'बिजली संकट, अस्पताल सेवा, कचरा निस्तारण',
    'सीवर जाम, पार्क रखरखाव, स्ट्रीट लाइट',
    'नाली सफाई, पेयजल संकट, साइबर अपराध',
    'बेरोजगारी, व्यापारिक समस्याएं, यातायात जाम',
    'मोबाइल टॉवर, बैंक सेवाएं, पोस्ट ऑफिस',
    'प्रदूषण, जल जमाव, सरकारी योजनाएं'
  ];
  const idea = newsIdeas[seed % newsIdeas.length];
  return `You are "Hardoi ki Awaaz" (हरदोई की आवाज़) — a citizen news platform for Hardoi, Uttar Pradesh.

Today: ${today}
Seed: ${seed} (use this to vary content — DO NOT reuse the same articles as last time)

Suggested topics for today: ${idea}

Generate EXACTLY 7 realistic news articles about Hardoi city and nearby areas (Lucknow, Shahjahanpur, Sitapur, Unnao, Kanpur) in Uttar Pradesh.

Return ONLY a valid JSON array (no markdown, no code blocks, no extra text):

[
  {
    "title": "Hindi headline (8-15 words)",
    "summary": "Hindi summary (2-3 sentences)",
    "content": "FULL Hindi article with <p> tags. 4-6 paragraphs, 200-400 words.",
    "category": "Protest|Water|Electricity|Infrastructure|Education|Health|Safety|Environment|Development|Announcement|Meeting|Success|Alert",
    "location": "Specific area in Hardoi or UP city",
    "source": "हरदोई की आवाज़"
  }
]

CRITICAL — JSON RULES:
- All text in Hindi (Devanagari)
- content field must have <p> tags INSIDE a valid JSON string — use newlines
- ESCAPE all double quotes inside strings with backslash
- NO trailing commas
- Each article must be a different category
- Use real area names: Subhash Nagar, Nai Bazaar, Civil Lines, Shahganj Road, Mallawan, Shahabad, Sandi, Bilgram, Pihani, Gopamau
- One article MUST be about a success of Hardoi ki Awaaz
- One article MUST be about a protest or public demonstration
- IMPORTANT: Generate DIFFERENT articles each time — do NOT repeat previous content`;
}

async function parseNews(text) {
  const articles = JSON.parse(repairJSON(text));
  if (!Array.isArray(articles)) throw new Error('Not an array');
  const now = Date.now();
  const base = articles.map((a, i) => ({
    id: `hka-news-${now}-${i}`,
    title: String(a.title || 'Hardoi ki Awaaz News'),
    summary: String(a.summary || ''),
    content: String(a.content || `<p>${a.summary || ''}</p>`),
    image_url: null, // filled async below
    category: String(a.category || 'Announcement'),
    date: new Date().toISOString(),
    location: String(a.location || 'Hardoi, UP'),
    source: String(a.source || 'हरदोई की आवाज़')
  }));
  
  // Fetch real images in parallel
  const results = await Promise.allSettled(base.map(async (a, i) => {
    a.image_url = await findImageForContent(a.category, a.title, a.location, a.summary, i);
  }));
  
  return base;
}

async function generateNews(apiKey) {
  return tryAllModels(apiKey, buildNewsPrompt(), parseNews, 'News');
}

/* ============================================
   ISSUES GENERATOR
   ============================================ */

function buildIssuesPrompt() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const seed = Math.floor(Math.random() * 100000);
  return `You are "Hardoi ki Awaaz" — citizen reporting platform tracking civic issues in Hardoi, UP.

Today: ${today}
Seed: ${seed} (use this to vary content — generate DIFFERENT issues each time)

Generate EXACTLY 8 realistic civic issues in Hardoi and nearby areas. DO NOT repeat the same issues from before.

Return ONLY a valid JSON array (no markdown/code blocks):

[
  {
    "title": "Hindi title (6-12 words)",
    "description": "Hindi description (3-4 sentences)",
    "category": "roads|water|electricity|health|education|safety|garbage|environment",
    "location": "Specific area in Hardoi",
    "status": "active",
    "supporters": 245,
    "update": "Hindi latest update (1-2 sentences)"
  }
]

RULES: Hindi text, real area names (Subhash Nagar, Nai Bazaar, Civil Lines, Gandhi Nagar, etc.), varied categories. IMPORTANT: Create FRESH content every time.`;
}

async function parseIssues(text) {
  const issues = JSON.parse(repairJSON(text));
  if (!Array.isArray(issues)) throw new Error('Not an array');
  const now = Date.now();
  const base = issues.map((a, i) => ({
    id: `hka-issue-${now}-${i}`,
    title: String(a.title || 'Hardoi ki samasya'),
    description: String(a.description || ''),
    image_url: null,
    category: String(a.category || 'roads'),
    location: String(a.location || 'Hardoi, UP'),
    status: String(a.status || 'active'),
    supporters: parseInt(a.supporters) || Math.floor(Math.random() * 300) + 50,
    update: String(a.update || ''),
    date: new Date().toISOString()
  }));
  
  await Promise.allSettled(base.map(async (a, i) => {
    a.image_url = await findImageForContent(a.category, a.title, a.location, a.description, i);
  }));
  
  return base;
}

async function generateIssues(apiKey) {
  return tryAllModels(apiKey, buildIssuesPrompt(), parseIssues, 'Issues');
}

/* ============================================
   PROTESTS GENERATOR
   ============================================ */

function buildProtestsPrompt() {
  const today = new Date();
  const future1 = new Date(today); future1.setDate(today.getDate() + 6);
  const future2 = new Date(today); future2.setDate(today.getDate() + 14);
  const future3 = new Date(today); future3.setDate(today.getDate() + 21);
  const past1 = new Date(today); past1.setDate(today.getDate() - 15);
  const past2 = new Date(today); past2.setDate(today.getDate() - 35);
  const fmt = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const seed = Math.floor(Math.random() * 100000);
  
  return `You are "Hardoi ki Awaaz" — organizing protests in Hardoi, UP.

Date: ${fmt(today)}
Seed: ${seed} (generate DIFFERENT protests each time)

Generate 3 upcoming protests and 2 past (successful) protests. DO NOT repeat previous content.

Return ONLY valid JSON (no markdown):
{
  "upcoming": [
    {"title": "Hindi title", "description": "Hindi description", "location": "Hardoi landmark", "date": "${fmt(future1)}", "time": "10:00 AM", "category": "electricity|water|roads|safety|education|health|garbage"}
  ],
  "past": [
    {"title": "Hindi success title", "description": "What was achieved", "location": "Where", "date": "${fmt(past1)}", "category": "...", "outcome": "success"}
  ]
}

RULES: Hindi text, real Hardoi locations, realistic dates. IMPORTANT: Create FRESH content every time.`;
}

async function parseProtests(text) {
  const data = JSON.parse(repairJSON(text));
  if (!data.upcoming || !data.past) throw new Error('Missing upcoming/past arrays');
  const now = Date.now();
  
  const upcoming = await Promise.all(data.upcoming.map(async (a, i) => ({
    id: `hka-protest-up-${now}-${i}`,
    title: String(a.title || ''),
    description: String(a.description || ''),
    image_url: await findImageForContent('Protest', a.title, a.location, 'protest rally demonstration', i),
    location: String(a.location || 'Hardoi'),
    date: String(a.date || ''),
    time: String(a.time || '10:00 AM'),
    category: String(a.category || 'roads'),
    type: 'upcoming'
  })));
  
  const past = await Promise.all(data.past.map(async (a, i) => ({
    id: `hka-protest-past-${now}-${i}`,
    title: String(a.title || ''),
    description: String(a.description || ''),
    image_url: await findImageForContent('Success', a.title, a.location, 'protest success achievement', i + 10),
    location: String(a.location || 'Hardoi'),
    date: String(a.date || ''),
    category: String(a.category || 'roads'),
    outcome: 'success',
    type: 'past'
  })));
  
  return { upcoming, past };
}

async function generateProtests(apiKey) {
  return tryAllModels(apiKey, buildProtestsPrompt(), parseProtests, 'Protests');
}

/* ============================================
   MANIFESTO GENERATOR
   ============================================ */

function buildManifestoPrompt(previousManifesto, recentNewsTitles) {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const prevText = previousManifesto && previousManifesto.length > 0
    ? previousManifesto.map((d, i) => `${i+1}. [${d.category}] ${d.title} — Progress: ${d.progress}%`).join('\n')
    : '1. [roads] बेहतर सड़कें — 25%\n2. [water] शुद्ध पेयजल — 15%\n3. [electricity] 24/7 बिजली — 30%\n4. [health] स्वास्थ्य सेवा — 20%\n5. [education] शिक्षा सुधार — 35%';
  
  const newsCtx = recentNewsTitles?.length > 0
    ? `\nRecent news: ${recentNewsTitles.join(', ')}`
    : '';
  
  const seed = Math.floor(Math.random() * 100000);
  
  return `You are "Hardoi ki Awaaz" — citizen movement in Hardoi, UP.

Today: ${today}
Seed: ${seed}

Current demands:
${prevText}${newsCtx}

TASK: Return updated manifesto JSON array. Keep ALL existing demands (increase progress by 5-15), add 1-2 NEW demands. Total 6-8 demands.

Return ONLY valid JSON array (no markdown):
[
  {
    "title": "Hindi demand (5-10 words)",
    "description": "Hindi description (3-4 sentences)",
    "category": "roads|water|electricity|health|education|safety|environment|garbage|transport|development",
    "progress": 25,
    "icon": "🛤️💧⚡🏥📚🛡️🌿🗑️🚌🏗️"
  }
]

IMPORTANT: Vary the demands slightly compared to last time.`;
}

function parseManifesto(text) {
  const demands = JSON.parse(repairJSON(text));
  if (!Array.isArray(demands)) throw new Error('Not an array');
  const now = Date.now();
  return demands.map((a, i) => ({
    id: `hka-demand-${now}-${i}`,
    title: String(a.title || ''),
    description: String(a.description || ''),
    category: String(a.category || 'roads'),
    progress: Math.min(100, Math.max(0, parseInt(a.progress) || 25)),
    icon: String(a.icon || '📋'),
    order: i + 1
  }));
}

async function generateManifesto(apiKey, previousManifesto, recentNewsTitles) {
  const prompt = buildManifestoPrompt(previousManifesto, recentNewsTitles);
  return tryAllModels(apiKey, prompt, parseManifesto, 'Manifesto');
}

/* ============================================
   CONTENT MODERATION
   ============================================ */

function buildModerationPrompt(text, photoCount) {
  const sanitized = (text || '').replace(/<[^>]*>/g, '').replace(/["\\]/g, '').substring(0, 500);
  return `Content moderation for "Hardoi ki Awaaz" — citizen reporting platform in India.

SAFE: road issues, water, electricity, garbage, health, education, safety complaints — even if angry/poorly written
UNSAFE: nudity, sex, violence, hate speech, spam, ads, political propaganda, fake news, trolling

---USER MESSAGE---
${sanitized || '(none)'}
---END---
${photoCount > 0 ? `\nPhotos: ${photoCount}` : '\nNo photos'}

Return ONLY valid JSON: {"safe": true/false, "reason": "", "category": "genuine_issue|spam|nudity|violence|hate_speech|off_topic"}`;
}

async function moderateContent(apiKey, text, photoCount) {
  const prompt = buildModerationPrompt(text, photoCount);
  try {
    const result = await tryAllModels(apiKey, prompt, (t) => {
      let json = t;
      const m = t.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (m) json = m[1];
      const brace = json.match(/\{[\s\S]*\}/);
      if (brace) json = brace[0];
      const p = JSON.parse(json);
      return { safe: Boolean(p.safe ?? p.is_safe ?? true), reason: String(p.reason || ''), category: String(p.category || 'genuine_issue') };
    }, 'Moderation');
    return result || { safe: true, reason: '', category: 'genuine_issue' };
  } catch (err) {
    console.warn('⚠️ Moderation failed, allowing by default:', err.message);
    return { safe: true, reason: '', category: 'genuine_issue' };
  }
}

/* ============================================
   FALLBACK DATA
   ============================================ */

/* Sync fallback image URL using content-based Hindi keyword seed */
function getFallbackImageUrl(title, category, index) {
  const seed = extractContentSeed(title, '', category, index || 0);
  return `https://picsum.photos/seed/${seed}/800/600`;
}

function getFallbackNews() {
  const now = new Date().toISOString();
  const seed = Date.now();
  
  // Rotating template selection for variety
  const templates = [
    [
      { title: 'हरदोई की आवाज़ — जनता की आवाज़, बदलाव की मिसाल', summary: 'हरदोई के नागरिकों द्वारा संचालित यह मंच शहर की समस्याओं को उजागर करने और प्रशासन से समाधान दिलाने में जुटा है।', content: '<p>हरदोई की आवाज़ एक स्वतंत्र नागरिक मंच है जो हरदोई शहर के नागरिकों की समस्याओं को उजागर करने और उनके समाधान के लिए प्रशासन पर दबाव बनाने का काम कर रहा है।</p><p>यह मंच किसी भी राजनीतिक दल से संबद्ध नहीं है और पूरी तरह से नागरिकों द्वारा संचालित है। अब तक 12,800 से अधिक नागरिकों ने अपने Official ID Card बनवाए हैं और इस आंदोलन का हिस्सा बने हैं।</p>', category: 'Featured', location: 'Hardoi, Uttar Pradesh' },
      { title: 'बिजली कटौती के खिलाफ धरना — Collector Office पर बड़ा प्रदर्शन', summary: 'बिजली कटौती से परेशान नागरिकों ने बड़े प्रदर्शन का ऐलान किया है।', content: '<p>हरदोई शहर में बढ़ती बिजली कटौती से नागरिक बेहद परेशान हैं। Subhash Nagar, Nehru Nagar, Civil Lines सहित कई इलाकों में प्रतिदिन 8-10 घंटे बिजली गुल रहती है।</p><p>Hardoi ki Awaaz ने प्रशासन को कई बार शिकायत की लेकिन कोई ठोस कार्रवाई नहीं हुई। अब बड़ा धरना दिया जाएगा।</p>', category: 'Protest', location: 'Collector Office, Hardoi' },
      { title: 'Nai Bazaar में पेयजल संकट गहराया — RO Plant लगाने की मांग तेज', summary: 'Nai Bazaar क्षेत्र में पानी की आपूर्ति बुरी तरह प्रभावित है।', content: '<p>Nai Bazaar और आसपास के इलाकों में पेयजल का संकट दिन-ब-दिन गहराता जा रहा है। Hardoi ki Awaaz ने नगर निगम को ज्ञापन सौंपा है।</p>', category: 'Water', location: 'Nai Bazaar, Hardoi' },
      { title: 'Hardoi ki Awaaz ने बनाया नया रिकॉर्ड — 12,800+ ID Cards जारी', summary: 'Hardoi ki Awaaz के Official ID Cards की संख्या 12,800 के पार पहुँच गई है।', content: '<p>Hardoi ki Awaaz के Official ID Cards की संख्या 12,800 के पार पहुँच गई है। यह हमारे आंदोलन की बढ़ती ताकत को दर्शाता है। अपना ID Card बनवाने के लिए <a href="/id-card.html">यहाँ क्लिक करें</a>।</p>', category: 'Success', location: 'Hardoi, UP' },
      { title: 'District Hospital में दवाइयों की कमी — मरीजों को परेशानी', summary: 'जिला अस्पताल में बुनियादी दवाइयों की कमी से मरीजों को भारी परेशानी।', content: '<p>हरदोई के जिला अस्पताल में बुनियादी दवाइयां तक उपलब्ध नहीं हैं। Hardoi ki Awaaz ने स्वास्थ्य विभाग से तत्काल दवाइयां उपलब्ध कराने की मांग की है।</p>', category: 'Health', location: 'District Hospital, Hardoi' },
      { title: 'सरकारी स्कूलों में शिक्षकों की भर्ती की मांग तेज', summary: 'हरदोई के सरकारी स्कूलों में शिक्षकों की कमी से बच्चों की पढ़ाई प्रभावित।', content: '<p>हरदोई जिले के कई सरकारी स्कूलों में शिक्षकों की भारी कमी है। Hardoi ki Awaaz ने शिक्षा विभाग से मांग की है कि जल्द से जल्द शिक्षकों की भर्ती की जाए।</p>', category: 'Education', location: 'Hardoi, UP' },
      { title: 'शहर में CCTV कैमरों की कमी से बढ़ रही चोरी की घटनाएं', summary: 'हरदोई के मुख्य मार्गों पर CCTV कैमरे न होने से चोरी और अपराध बढ़ रहे हैं।', content: '<p>हरदोई शहर के मुख्य मार्गों और चौराहों पर CCTV कैमरे नहीं हैं। Hardoi ki Awaaz ने नगर निगम से शहर भर में CCTV कैमरे लगाने की मांग की है।</p>', category: 'Safety', location: 'Shahganj Road, Hardoi' }
    ],
    [
      { title: 'गांधी नगर में नाली जाम — स्वास्थ्य पर संकट', summary: 'गांधी नगर क्षेत्र में नालियां जाम होने से बीमारियां फैल रही हैं।', content: '<p>गांधी नगर क्षेत्र में पिछले कई हफ्तों से नालियां जाम हैं। गंदा पानी सड़कों पर बह रहा है और बीमारियां फैल रही हैं। Hardoi ki Awaaz ने नगर निगम से तत्काल सफाई की मांग की है।</p>', category: 'Infrastructure', location: 'Gandhi Nagar, Hardoi' },
      { title: 'शाहजहाँपुर रोड पर बढ़ते हादसे — स्पीड ब्रेकर की मांग', summary: 'शाहजहाँपुर रोड पर तेज रफ्तार वाहनों से हादसे बढ़ गए हैं।', content: '<p>शाहजहाँपुर रोड पर तेज रफ्तार वाहनों के कारण कई हादसे हो चुके हैं। स्थानीय निवासियों ने Hardoi ki Awaaz से मदद मांगी है। स्पीड ब्रेकर और सीसीटीवी कैमरे लगाने की मांग तेज हो गई है।</p>', category: 'Safety', location: 'Shahjahanpur Road, Hardoi' },
      { title: 'सिविल लाइन्स में स्ट्रीट लाइट खराब — अंधेरे में सड़कें', summary: 'सिविल लाइन्स में स्ट्रीट लाइट खराब होने से रात में हादसों का डर।', content: '<p>सिविल लाइन्स क्षेत्र में कई स्ट्रीट लाइट खराब हो गई हैं। रात के समय अंधेरा रहता है जिससे चोरी और हादसों का डर बना रहता है।</p>', category: 'Development', location: 'Civil Lines, Hardoi' },
      { title: 'Hardoi ki Awaaz ID Card ने बदली लोगों की ज़िंदगी — सफलता की कहानी', summary: 'Hardoi ki Awaaz का ID Card अब पहचान का प्रतीक बन गया है।', content: '<p>Hardoi ki Awaaz का Official ID Card अब सिर्फ एक कार्ड नहीं बल्कि पहचान का प्रतीक बन गया है। 12,800 से अधिक लोगों ने अपना ID Card बनवा लिया है। <a href="/id-card.html">अपना ID Card बनवाएं</a>।</p>', category: 'Success', location: 'Hardoi, UP' },
      { title: 'सांडी क्षेत्र में पानी की किल्लत — टैंकरों पर निर्भरता', summary: 'सांडी क्षेत्र में पेयजल की भारी कमी, लोग टैंकरों पर निर्भर।', content: '<p>सांडी क्षेत्र में पिछले एक महीने से पानी की सप्लाई ठप है। लोग पीने के पानी के लिए टैंकरों पर निर्भर हैं। Hardoi ki Awaaz ने प्रशासन से तत्काल पानी की आपूर्ति बहाल करने की मांग की है।</p>', category: 'Water', location: 'Sandi, Hardoi' },
      { title: 'बिलग्राम में प्राथमिक स्वास्थ्य केंद्र पर डॉक्टर नहीं', summary: 'बिलग्राम के PHC मरीजों की संख्या अधिक लेकिन डॉक्टर न के बराबर।', content: '<p>बिलग्राम के प्राथमिक स्वास्थ्य केंद्र पर मरीजों की संख्या अधिक है लेकिन डॉक्टरों की कमी है। Hardoi ki Awaaz ने स्वास्थ्य विभाग से शिकायत की है।</p>', category: 'Health', location: 'Bilgram, Hardoi' },
      { title: 'शहर के पार्कों की दयनीय हालत — बच्चों को खेलने की जगह नहीं', summary: 'हरदोई के पार्क बदहाल, बच्चों के लिए खेलने की सुरक्षित जगह नहीं।', content: '<p>हरदोई शहर के कई पार्कों की हालत बेहद खराब है। झूले टूटे हुए हैं और साफ-सफाई नहीं है। Hardoi ki Awaaz ने नगर निगम से पार्कों के रखरखाव की मांग की है।</p>', category: 'Environment', location: 'Nehru Nagar, Hardoi' }
    ]
  ];
  
  const templateSet = templates[seed % 2];
  const shuffled = [...templateSet].sort(() => Math.random() - 0.5);
  
  return shuffled.map((item, i) => ({
    id: `fb-${seed}-${i}`,
    title: item.title,
    summary: item.summary,
    content: item.content,
    image_url: getFallbackImageUrl(item.title, item.category, i),
    category: item.category,
    date: now,
    location: item.location,
    source: 'हरदोई की आवाज़'
  }));
}

function getFallbackIssues() {
  const now = new Date().toISOString();
  const seed = Date.now();
  
  const templates = [
    [
      { title: 'Civil Lines में सड़क टूटी हुई', description: 'Main Road पर कई जगह गड्ढे हैं। बारिश में पानी भर जाता है।', category: 'roads', location: 'Civil Lines, Hardoi', supporters: 128, update: 'प्रशासन ने मरम्मत का आश्वासन दिया है।' },
      { title: 'Nai Bazaar में गंदा पानी', description: 'पाइपलाइन से गंदा पानी आ रहा है। बीमारियाँ फैल रही हैं।', category: 'water', location: 'Nai Bazaar, Hardoi', supporters: 245, update: 'नगर निगम को ज्ञापन सौंपा गया।' },
      { title: '8-10 घंटे बिजली कटौती', description: 'Subhash Nagar में रोज़ 8-10 घंटे बिजली गुल। गर्मी से लोग परेशान।', category: 'electricity', location: 'Subhash Nagar, Hardoi', supporters: 312, update: 'बिजली कटौती के खिलाफ धरना तय।' },
      { title: 'अस्पताल में दवाइयाँ नहीं', description: 'District Hospital में बुनियादी दवाइयाँ भी नहीं मिल रहीं।', category: 'health', location: 'District Hospital, Hardoi', supporters: 189, update: 'स्वास्थ्य मंत्री को पत्र लिखा गया।' },
      { title: 'सरकारी स्कूलों में शिक्षक नहीं', description: 'कई स्कूलों में 2-3 शिक्षक और 200+ बच्चे।', category: 'education', location: 'Hardoi', supporters: 156, update: 'भर्ती का वादा किया गया।' },
      { title: 'CCTV नहीं, चोरी बढ़ रही है', description: 'Shahganj Road पर CCTV नहीं, चोरियाँ बढ़ गई हैं।', category: 'safety', location: 'Shahganj Road, Hardoi', supporters: 98, update: 'पुलिस ने गश्त बढ़ाने का आश्वासन दिया।' },
      { title: 'कचरे का ढेर — नालियाँ जाम', description: 'कई इलाकों में कचरे के ढेर, नालियाँ जाम।', category: 'garbage', location: 'Kacha Chaura, Hardoi', supporters: 210, update: 'सफाई अभियान की योजना।' },
      { title: 'पार्कों की हालत खराब', description: 'शहर के पार्कों की हालत बेहद खराब है।', category: 'environment', location: 'Gandhi Nagar, Hardoi', supporters: 76, update: 'नगर निगम ने रखरखाव का आश्वासन दिया।' }
    ],
    [
      { title: 'शाहगंज रोड पर स्पीड ब्रेकर नहीं', description: 'तेज रफ्तार वाहनों से पैदल यात्री परेशान। हादसों का खतरा।', category: 'roads', location: 'Shahganj Road, Hardoi', supporters: 87, update: 'प्रशासन को शिकायत भेजी गई।' },
      { title: 'गोपमऊ में हैंडपंप खराब', description: 'गोपमऊ क्षेत्र में कई हैंडपंप खराब हो गए हैं। पीने का पानी नहीं।', category: 'water', location: 'Gopamau, Hardoi', supporters: 134, update: 'नगर पंचायत से मरम्मत की मांग।' },
      { title: 'पिहानी में वोल्टेज की समस्या', description: 'पिहानी में बिजली का वोल्टेज कम रहता है। उपकरण खराब हो रहे हैं।', category: 'electricity', location: 'Pihani, Hardoi', supporters: 176, update: 'बिजली विभाग को शिकायत दर्ज।' },
      { title: 'सांडी में आंगनबाड़ी केंद्र बंद', description: 'सांडी क्षेत्र में आंगनबाड़ी केंद्र महीनों से बंद है। बच्चों को पोषण नहीं मिल रहा।', category: 'health', location: 'Sandi, Hardoi', supporters: 203, update: 'Hardoi ki Awaaz ने जांच की मांग की।' },
      { title: 'बिलग्राम में स्कूल में बिजली नहीं', description: 'बिलग्राम के सरकारी स्कूल में बिजली कनेक्शन नहीं।', category: 'education', location: 'Bilgram, Hardoi', supporters: 92, update: 'शिक्षा विभाग को सूचित किया।' },
      { title: 'नरैनी में स्ट्रीट लाइट नहीं', description: 'नरैनी क्षेत्र में स्ट्रीट लाइट नहीं हैं। रात में अंधेरा।', category: 'safety', location: 'Naraini, Hardoi', supporters: 67, update: 'नगर निगम से शिकायत की गई।' },
      { title: 'बालामऊ में नाली सफाई नहीं', description: 'बालामऊ की मुख्य नालियों की सफाई नहीं हुई। बदबू और बीमारियां।', category: 'garbage', location: 'Balamau, Hardoi', supporters: 145, update: 'सफाई विभाग को ज्ञापन।' },
      { title: 'मल्लावां में पेड़ कटान', description: 'मल्लावां क्षेत्र में अवैध रूप से पेड़ काटे जा रहे हैं।', category: 'environment', location: 'Mallawan, Hardoi', supporters: 118, update: 'वन विभाग को सूचना दी गई।' }
    ]
  ];
  
  const selected = templates[seed % 2];
  const shuffled = [...selected].sort(() => Math.random() - 0.5);
  
  return shuffled.map((item, i) => ({
    id: `fb-issue-${seed}-${i}`,
    title: item.title,
    description: item.description,
    image_url: getFallbackImageUrl(item.title, item.category, i),
    category: item.category,
    location: item.location,
    status: 'active',
    supporters: item.supporters,
    update: item.update,
    date: now
  }));
}

function getFallbackProtests() {
  const now = new Date();
  const seed = Date.now();
  const f1 = new Date(now); f1.setDate(now.getDate() + 6);
  const f2 = new Date(now); f2.setDate(now.getDate() + 14);
  const f3 = new Date(now); f3.setDate(now.getDate() + 21);
  const p1 = new Date(now); p1.setDate(now.getDate() - 15);
  const p2 = new Date(now); p2.setDate(now.getDate() - 35);
  const fmt = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const templates = [
    {
      upcoming: [
        { title: 'धरना — बिजली कटौती के खिलाफ', description: '24/7 बिजली की मांग में धरना। सभी नागरिकों से अपील!', location: 'Collector Office, Hardoi', time: '10:00 AM', category: 'electricity' },
        { title: 'जन सभा — सड़क मरम्मत', description: 'शहर की टूटी सड़कों की मरम्मत की मांग।', location: 'Clock Tower, Hardoi', time: '4:00 PM', category: 'roads' },
        { title: 'मार्च — पानी की समस्या', description: 'शुद्ध पेयजल की मांग में मार्च।', location: 'Sahganj → Collector Office', time: '9:00 AM', category: 'water' }
      ],
      past: [
        { title: 'नाली सफाई — प्रशासन ने कार्रवाई की', description: 'प्रशासन ने Nai Bazaar की नालियों की सफाई करवाई। 500+ लोग शामिल हुए।', location: 'Nai Bazaar, Hardoi', category: 'garbage', outcome: 'success' },
        { title: 'शिक्षा सुधार — शिक्षक भर्ती का आश्वासन', description: 'सरकारी स्कूलों में शिक्षकों की भर्ती पर प्रशासन ने आश्वासन दिया।', location: 'Hardoi', category: 'education', outcome: 'success' }
      ]
    },
    {
      upcoming: [
        { title: 'प्रदर्शन — सड़क निर्माण की मांग', description: 'शहर की टूटी सड़कों के निर्माण के लिए प्रदर्शन।', location: 'Tehsil Office, Hardoi', time: '11:00 AM', category: 'roads' },
        { title: 'धरना — स्वास्थ्य सेवा में सुधार', description: 'District Hospital में डॉक्टरों और दवाइयों की मांग।', location: 'District Hospital, Hardoi', time: '2:00 PM', category: 'health' },
        { title: 'जन जागरण अभियान — सफाई', description: 'शहर की सफाई के लिए जागरूकता रैली।', location: 'Sahganj Chauraha → Collectorate', time: '8:00 AM', category: 'garbage' }
      ],
      past: [
        { title: 'पानी टैंकर की मांग — प्रशासन राजी', description: 'गर्मियों में पानी की किल्लत पर प्रशासन ने अतिरिक्त टैंकर लगाने की मंजूरी दी।', location: 'Model Town, Hardoi', category: 'water', outcome: 'success' },
        { title: 'सीसीटीवी कैमरे लगाने की सफलता', description: 'प्रशासन ने मुख्य चौराहों पर CCTV लगाने का आदेश जारी किया।', location: 'Hardoi City', category: 'safety', outcome: 'success' }
      ]
    }
  ];
  
  const selected = templates[seed % 2];
  
  return {
    upcoming: selected.upcoming.map((item, i) => ({
      id: `fb-protest-${seed}-${i}`,
      title: item.title,
      description: item.description,
      image_url: getFallbackImageUrl(item.title, item.category, i),
      location: item.location,
      date: fmt(i === 0 ? f1 : i === 1 ? f2 : f3),
      time: item.time,
      category: item.category,
      type: 'upcoming'
    })),
    past: selected.past.map((item, i) => ({
      id: `fb-protest-${seed}-${i + 3}`,
      title: item.title,
      description: item.description,
      image_url: getFallbackImageUrl(item.title + ' success', String(item.category || 'roads'), i + 10),
      location: item.location,
      date: fmt(i === 0 ? p1 : p2),
      category: item.category,
      outcome: 'success',
      type: 'past'
    }))
  };
}

function getFallbackManifesto() {
  const now = Date.now();
  
  const templates = [
    [
      { title: 'सड़कें — गड्ढा मुक्त शहर', description: 'हरदोई की हर मुख्य सड़क और गली गड्ढा मुक्त हो।', category: 'roads', progress: 28, icon: '🛤️' },
      { title: 'शुद्ध पेयजल — हर घर में स्वच्छ पानी', description: 'हर घर में शुद्ध पीने का पानी हो। RO plants लगें।', category: 'water', progress: 18, icon: '💧' },
      { title: '24/7 बिजली — अघोषित कटौती बंद', description: 'शहर में 24 घंटे बिजली। बिजली कटौती का शेड्यूल पारदर्शी हो।', category: 'electricity', progress: 32, icon: '⚡' },
      { title: 'स्वास्थ्य सेवा — हर नागरिक का अधिकार', description: 'District Hospital में सभी दवाइयाँ उपलब्ध हों।', category: 'health', progress: 22, icon: '🏥' },
      { title: 'शिक्षा — बच्चों का भविष्य', description: 'सरकारी स्कूलों में पर्याप्त शिक्षक, Labs और Libraries।', category: 'education', progress: 38, icon: '📚' },
      { title: 'सुरक्षा — CCTV और स्ट्रीट लाइट्स', description: 'हर चौराहे पर CCTV और स्ट्रीट लाइट्स।', category: 'safety', progress: 12, icon: '🛡️' },
      { title: 'कचरा मुक्त शहर — नियमित सफाई', description: 'हर मोहल्ले में नियमित कचरा संग्रहण और नाली सफाई।', category: 'garbage', progress: 15, icon: '🗑️' }
    ],
    [
      { title: 'नई सड़कें और मरम्मत — तेज़ी से हो काम', description: 'शहर की सभी सड़कों की गुणवत्ता में सुधार और नए निर्माण की गति तेज़ हो।', category: 'roads', progress: 35, icon: '🛤️' },
      { title: 'हर घर जल — पानी की गारंटी', description: 'हर घर में 24/7 साफ पानी की आपूर्ति। पानी की बर्बादी रोकना।', category: 'water', progress: 22, icon: '💧' },
      { title: 'बिजली सुधार — स्मार्ट मीटर और स्थिर आपूर्ति', description: 'पुरानी वायरिंग बदलना, स्मार्ट मीटर लगाना और बिजली चोरी रोकना।', category: 'electricity', progress: 28, icon: '⚡' },
      { title: 'स्वास्थ्य सेवा — मुफ्त जांच और दवाई', description: 'सरकारी अस्पतालों में मुफ्त स्वास्थ्य जांच और सभी ज़रूरी दवाइयाँ।', category: 'health', progress: 18, icon: '🏥' },
      { title: 'डिजिटल शिक्षा — हर स्कूल में स्मार्ट क्लास', description: 'सरकारी स्कूलों में स्मार्ट बोर्ड, कंप्यूटर लैब और इंटरनेट।', category: 'education', progress: 25, icon: '📚' },
      { title: 'सुरक्षित शहर — CCTV, गश्त, और आपातकालीन सेवाएं', description: 'हर मोहल्ले में CCTV, नियमित पुलिस गश्त और 24/7 आपातकालीन सेवाएं।', category: 'safety', progress: 15, icon: '🛡️' },
      { title: 'हरा-भरा हरदोई — पार्क और पौधारोपण', description: 'शहर में नए पार्क, पौधारोपण अभियान और प्रदूषण नियंत्रण।', category: 'environment', progress: 10, icon: '🌿' }
    ]
  ];
  
  const selected = templates[now % 2];
  const shuffled = [...selected].sort(() => Math.random() - 0.5);
  
  return shuffled.map((item, i) => ({
    id: `fb-demand-${now}-${i}`,
    title: item.title,
    description: item.description,
    category: item.category,
    progress: item.progress + (i * 3) % 15, // slight variation
    icon: item.icon,
    order: i + 1
  }));
}

module.exports = {
  generateNews,
  generateIssues,
  generateProtests,
  generateManifesto,
  moderateContent,
  getFallbackNews,
  getFallbackIssues,
  getFallbackProtests,
  getFallbackManifesto
};
