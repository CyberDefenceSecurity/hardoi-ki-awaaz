/* ============================================
   Hardoi ki Awaaz - Photo Upload System
   Content Moderation — Auto block inappropriate content
   ============================================ */

// Ensure showToast is globally available (main.js may load later)
if (typeof window.showToast !== 'function') {
  window.showToast = function(message, type) {
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'success');
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:80px;right:24px;padding:12px 24px;border-radius:8px;color:#fff;font-size:0.85rem;z-index:10000;font-family:sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.2);background:' + (type === 'error' ? '#f44336' : type === 'info' ? '#ff9800' : '#4caf50') + ';animation:slideIn 0.3s ease;';
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 3000);
  };
}

class PhotoUploader {
  constructor() {
    this.storage = new IssueStorage();
    this.maxFileSize = 5 * 1024 * 1024; // 5MB
    this.allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    this.selectedPhotos = [];
    this.moderationEndpoint = 'https://hardoi-ki-awaaz-backend.onrender.com/api/moderate';
    this.apiBase = 'https://hardoi-ki-awaaz-backend.onrender.com/api';
    this.init();
  }

  init() {
    this.createUploadSection();
    this.populateLocationSelect();
    this.loadUserIssues();
  }

  populateLocationSelect() {
    if (typeof HARDOI_VILLAGES === 'undefined') return;
    
    // Get all unique values already in the select (to avoid duplicates)
    const select = document.getElementById('issue-upload-location');
    if (!select) return;
    
    // Clear all except first placeholder
    while (select.options.length > 1) {
      select.remove(1);
    }
    
    // Add all villages using value keys (consistent with hardoi-villages.js)
    const groups = [];
    HARDOI_VILLAGES.forEach(v => {
      if (!groups.includes(v.group)) groups.push(v.group);
    });
    const groupOrder = ['A','B','C & D','F & G','H','I & J','K','L','M','N','O & P','Q & R','S','T & U','V, W & Z','Others'];
    groups.sort((a, b) => {
      const ai = groupOrder.indexOf(a);
      const bi = groupOrder.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    groups.forEach(group => {
      const villages = HARDOI_VILLAGES.filter(v => v.group === group);
      if (villages.length === 0) return;
      const optgroup = document.createElement('optgroup');
      optgroup.label = group;
      villages.forEach(v => {
        const option = document.createElement('option');
        option.value = v.value;  // Use value key, not label
        option.textContent = v.label;
        optgroup.appendChild(option);
      });
      select.appendChild(optgroup);
    });
  }

  /* setupLocationButton removed — location share feature हटा दिया गया है */

  createUploadSection() {
    const container = document.getElementById('photo-upload-section');
    if (!container) return;

    container.innerHTML = `
      <div class="upload-card">
        <div class="upload-header">
          <span class="upload-icon">📸</span>
          <h3>📢 अपनी समस्या दर्ज करें</h3>
          <p class="upload-subtitle">Photo और Message भेजें — हमारा सिस्टम जाँच करेगा कि यह वास्तविक समस्या है या नहीं</p>
        </div>
        <form id="instant-upload-form" class="upload-form">
          <div class="upload-dropzone" id="dropzone">
            <div class="dropzone-content">
              <span class="dropzone-icon">📷</span>
              <p>फोटो यहाँ खींचें या क्लिक करें</p>
              <p class="dropzone-hint">JPG, PNG, WebP (Max 5MB) — अश्लील/अनुचित फोटो तुरंत ब्लॉक होंगे</p>
            </div>
            <input type="file" id="photo-input" accept="image/*" multiple hidden>
          </div>
          <div id="moderation-status" style="display:none;padding:0.8rem;border-radius:8px;margin-bottom:0.8rem;font-size:0.9rem;"></div>
          <div id="photo-preview-grid" class="photo-preview-grid"></div>
          <div class="upload-form-fields">
            <input type="text" id="issue-reporter-name" placeholder="आपका नाम (Optional)" class="form-input">
            <select id="issue-upload-category" class="form-select">
              <option value="">समस्या का प्रकार चुनें</option>
              <option value="roads">🛤️ सड़क/रास्ते</option>
              <option value="water">💧 पानी/नाली</option>
              <option value="electricity">⚡ बिजली</option>
              <option value="health">🏥 स्वास्थ्य</option>
              <option value="education">📚 शिक्षा</option>
              <option value="safety">🛡️ सुरक्षा</option>
              <option value="garbage">🗑️ कचरा/सफाई</option>
              <option value="other">📝 अन्य</option>
            </select>
            <textarea id="issue-upload-message" placeholder="अपनी समस्या विस्तार से बताएं... (कम से कम 10 शब्द)" rows="3" class="form-textarea"></textarea>
            <select id="issue-upload-location" class="form-select">
              <option value="">📍 समस्या का स्थान चुनें — गाँव/इलाका</option>
            </select>
            <div id="issue-upload-location-custom-group" style="display:none;margin-top:0.3rem;">
              <input type="text" id="issue-upload-location-custom" placeholder="अपने गाँव/इलाके का नाम लिखें" class="form-input">
            </div>
            <div style="display:flex;gap:0.5rem;margin-top:0.3rem;">
              <button type="button" onclick="openMapPicker()" style="padding:0.4rem 0.8rem;font-size:0.8rem;background:var(--primary);color:#fff;border:none;border-radius:var(--radius);cursor:pointer;flex:1;transition:0.3s;">🗺️ मैप से लोकेशन चुनें</button>
              <button type="button" onclick="document.getElementById('issue-upload-location').value='others';document.getElementById('issue-upload-location-custom-group').style.display='block';" style="padding:0.35rem 0.7rem;font-size:0.75rem;background:transparent;border:2px solid var(--accent);color:var(--accent);border-radius:var(--radius);cursor:pointer;">✏️ खुद लिखें</button>
            </div>
            <div id="moderation-check-box" style="margin:0.5rem 0;">
              <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:var(--text-light);">
                <input type="checkbox" id="agree-check"> 
                ✅ मैं पुष्टि करता हूँ कि यह एक वास्तविक समस्या है और कोई अनुचित सामग्री नहीं है
              </label>
            </div>
            <button type="submit" id="submit-issue-btn" class="cta-btn primary">
              <span class="btn-text">📤 समस्या भेजें</span>
              <span class="btn-loading" style="display:none;">⏳ जाँच की जा रही है...</span>
            </button>
          </div>
        </form>
      </div>
    `;

    this.bindUploadEvents();
  }

  bindUploadEvents() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('photo-input');
    const form = document.getElementById('instant-upload-form');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        this.handleFiles(e.dataTransfer.files);
      });
      fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
    }

    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Toggle custom location input when 'others' is selected
    const locSelect = document.getElementById('issue-upload-location');
    const locCustomGroup = document.getElementById('issue-upload-location-custom-group');
    if (locSelect && locCustomGroup) {
      locSelect.addEventListener('change', () => {
        locCustomGroup.style.display = locSelect.value === 'others' ? 'block' : 'none';
      });
    }
  }

  handleFiles(files) {
    const previewGrid = document.getElementById('photo-preview-grid');
    if (!previewGrid) return;

    Array.from(files).forEach(file => {
      if (!this.allowedTypes.includes(file.type)) {
        this.showToast('केवल JPG, PNG, WebP images allowed!', 'error');
        return;
      }
      if (file.size > this.maxFileSize) {
        this.showToast('File 5MB से बड़ी है!', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = {
          name: file.name,
          data: e.target.result,
          timestamp: Date.now()
        };
        this.selectedPhotos.push(photoData);

        const previewItem = document.createElement('div');
        previewItem.className = 'photo-preview-item';
        previewItem.innerHTML = `
          <img src="${e.target.result}" alt="Preview">
          <button type="button" class="remove-photo" data-index="${this.selectedPhotos.length - 1}">✕</button>
        `;
        previewItem.querySelector('.remove-photo').addEventListener('click', (ev) => {
          ev.stopPropagation();
          const idx = parseInt(ev.target.dataset.index);
          this.selectedPhotos.splice(idx, 1);
          this.refreshPreviews();
        });
        previewGrid.appendChild(previewItem);
      };
      reader.readAsDataURL(file);
    });
  }

  refreshPreviews() {
    const grid = document.getElementById('photo-preview-grid');
    if (!grid) return;
    grid.innerHTML = '';
    this.selectedPhotos.forEach((photo, i) => {
      const item = document.createElement('div');
      item.className = 'photo-preview-item';
      item.innerHTML = `
        <img src="${photo.data}" alt="Preview">
        <button type="button" class="remove-photo" data-index="${i}">✕</button>
      `;
      item.querySelector('.remove-photo').addEventListener('click', (ev) => {
        ev.stopPropagation();
        this.selectedPhotos.splice(i, 1);
        this.refreshPreviews();
      });
      grid.appendChild(item);
    });
  }

  /* ---------- CONTENT MODERATION ---------- */
  async moderateContent(text, photoCount) {
    const statusDiv = document.getElementById('moderation-status');
    if (statusDiv) {
      statusDiv.style.display = 'block';
      statusDiv.innerHTML = '🔍 सामग्री जाँच की जा रही है...';
      statusDiv.style.background = 'rgba(255,152,0,0.1)';
      statusDiv.style.color = '#e65100';
    }

    try {
      const resp = await fetch(this.moderationEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text || '',
          photoCount: photoCount || 0
        })
      });

      if (!resp.ok) throw new Error('Moderation API error');

      const result = await resp.json();

      if (statusDiv) {
        if (result.safe) {
          statusDiv.style.display = 'none';
        } else {
          statusDiv.style.display = 'block';
          statusDiv.style.background = 'rgba(244,67,54,0.1)';
          statusDiv.style.color = '#d32f2f';
          statusDiv.innerHTML = `🚫 <strong>ब्लॉक किया गया!</strong> ${result.reason || 'यह सामग्री अनुचित है। कृपया वास्तविक समस्या दर्ज करें।'}`;
        }
      }

      return result;
    } catch (err) {
      console.error('Moderation error:', err);
      if (statusDiv) statusDiv.style.display = 'none';
      // On error, allow submission (better to let through than block genuine issues)
      return { safe: true, reason: '', category: 'genuine_issue' };
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const agree = document.getElementById('agree-check')?.checked;
    if (!agree) {
      this.showToast('कृपया पुष्टि करें कि यह एक वास्तविक समस्या है!', 'error');
      return;
    }

    const name = document.getElementById('issue-reporter-name')?.value || 'Anonymous';
    const category = document.getElementById('issue-upload-category')?.value;
    const message = document.getElementById('issue-upload-message')?.value;
    let location = document.getElementById('issue-upload-location')?.value;
    const customLocation = document.getElementById('issue-upload-location-custom')?.value?.trim();

    // If 'others' selected, use custom location value
    if (location === 'others') {
      location = customLocation || 'Others';
    }

    if (!location) {
      this.showToast('कृपया समस्या का स्थान चुनें (गाँव/इलाका)!', 'error');
      return;
    }

    if (!category) {
      this.showToast('कृपया समस्या का प्रकार चुनें!', 'error');
      return;
    }
    if (!message || message.trim().split(/\s+/).length < 10) {
      this.showToast('कृपया समस्या विस्तार से लिखें (कम से कम 10 शब्द)!', 'error');
      return;
    }

    // === CONTENT MODERATION ===
    const btn = document.getElementById('submit-issue-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;

    // Run moderation
    const moderationResult = await this.moderateContent(message, this.selectedPhotos.length);

    if (!moderationResult.safe) {
      // Blocked by moderation
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      btn.disabled = false;
      this.showToast('🚫 ' + (moderationResult.reason || 'अनुचित सामग्री ब्लॉक की गई!'), 'error');
      return;
    }

    // Safety check passed — save to server
    btnLoading.textContent = '⏳ भेजा जा रहा है...';

    try {
      const issueData = {
        name,
        category,
        message: message.trim(),
        location: location || 'Hardoi',
        photos: this.selectedPhotos.map(p => p.data)
      };

      const resp = await fetch(this.apiBase + '/issues/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData)
      });

      const result = await resp.json();

      if (!result.success) {
        throw new Error(result.error || 'Server error');
      }

      // Also save locally as backup
      this.storage.addIssue(result.issue);
      // Track ownership so user can delete later
      this.trackOwnedIssue(result.issue.id);

      // Reset form
      document.getElementById('instant-upload-form').reset();
      document.getElementById('photo-preview-grid').innerHTML = '';
      document.getElementById('moderation-status').style.display = 'none';
      this.selectedPhotos = [];

      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      btnLoading.textContent = '⏳ जाँच की जा रही है...';
      btn.disabled = false;

      this.showToast('✅ आपकी समस्या दर्ज हो गई! अब सभी लोग देख सकते हैं 🙏', 'success');
      this.loadUserIssues();
    } catch (err) {
      console.error('Submit error:', err);
      
      // Fallback to localStorage if server fails
      const issue = {
        id: 'ISS-' + Date.now(),
        name,
        category,
        message: message.trim(),
        location: location || 'Hardoi',
        photos: this.selectedPhotos.map(p => p.data),
        date: new Date().toLocaleDateString('hi-IN'),
        supporters: 0,
        status: 'active',
        moderated: true
      };

      this.storage.addIssue(issue);
      // Track ownership so user can delete later
      this.trackOwnedIssue(issue.id);

      document.getElementById('instant-upload-form').reset();
      document.getElementById('photo-preview-grid').innerHTML = '';
      document.getElementById('moderation-status').style.display = 'none';
      this.selectedPhotos = [];

      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      btnLoading.textContent = '⏳ जाँच की जा रही है...';
      btn.disabled = false;

      this.showToast('✅ समस्या दर्ज हो गई (local backup) 🙏', 'success');
      this.loadUserIssues();
    }
  }

  getSupporterId() {
    let id = localStorage.getItem('hka_supporter_id');
    if (!id) {
      id = 'SUP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8);
      localStorage.setItem('hka_supporter_id', id);
    }
    return id;
  }

  /** Get or create a unique user ID for tracking ownership */
  getUserToken() {
    let token = localStorage.getItem('hka_user_token');
    if (!token) {
      token = 'USR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 12);
      localStorage.setItem('hka_user_token', token);
    }
    return token;
  }

  /** Track that this user posted a specific issue */
  trackOwnedIssue(issueId) {
    const token = this.getUserToken();
    let owned = JSON.parse(localStorage.getItem('hka_owned_issues') || '{}');
    owned[issueId] = token;
    localStorage.setItem('hka_owned_issues', JSON.stringify(owned));
  }

  /** Check if the current user owns this issue */
  isIssueOwner(issueId) {
    const token = this.getUserToken();
    const owned = JSON.parse(localStorage.getItem('hka_owned_issues') || '{}');
    return owned[issueId] === token;
  }

  /** Render nested replies recursively with proper threading */
  renderReplies(replies, issueId, depth = 0) {
    if (!replies || replies.length === 0) {
      return '<p style="font-size:0.8rem;color:var(--text-light);padding:0.5rem 0;">अभी तक कोई जवाब नहीं। पहले जवाब दें! 💬</p>';
    }
    
    // Sort top-level by time
    const sorted = [...replies].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    
    return sorted.map(r => {
      const marginLeft = Math.min(depth * 24, 96);
      const borderColor = depth === 0 ? 'var(--primary)' : depth % 2 === 0 ? '#e0e0e0' : '#f0f0f0';
      const fontSize = depth === 0 ? '0.85rem' : '0.82rem';
      
      return `
        <div class="comment-thread" style="margin-left:${marginLeft}px;border-left:2px solid ${borderColor};padding-left:12px;margin-top:6px;margin-bottom:4px;">
          <div class="reply-item" style="padding:0.4rem 0;background:rgba(0,0,0,0.02);border-radius:6px;padding:0.5rem 0.6rem;">
            <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
              <strong style="font-size:0.8rem;color:var(--primary);">${this.escapeHtml(r.name)}</strong>
              <span style="font-size:0.65rem;color:var(--text-light);">${r.date || ''}</span>
              <button class="nested-reply-btn" onclick="event.stopPropagation();showNestedReplyForm('${issueId}', '${r.id}')" style="font-size:0.7rem;padding:0.15rem 0.5rem;border:none;background:rgba(26,35,126,0.08);color:var(--primary);border-radius:12px;cursor:pointer;margin-left:auto;font-family:inherit;">↩️ जवाब दें</button>
            </div>
            <p style="font-size:${fontSize};margin-top:0.3rem;color:var(--text);line-height:1.4;">${this.escapeHtml(r.text)}</p>
          </div>
          <!-- Nested reply form (hidden) -->
          <div class="nested-reply-form" id="nested-reply-${issueId}-${r.id}" style="display:none;margin:4px 0 4px 8px;">
            <div style="display:flex;gap:0.3rem;align-items:center;flex-wrap:wrap;">
              <input type="text" class="nested-reply-name" placeholder="आपका नाम" style="flex:0 0 80px;padding:0.3rem 0.5rem;border:2px solid #e0e0e0;border-radius:6px;font-size:0.75rem;font-family:inherit;">
              <input type="text" class="nested-reply-text" placeholder="जवाब लिखें..." style="flex:1;min-width:120px;padding:0.3rem 0.5rem;border:2px solid #e0e0e0;border-radius:6px;font-size:0.75rem;font-family:inherit;">
              <button class="cta-btn primary" onclick="submitNestedReply('${issueId}', '${r.id}')" style="padding:0.3rem 0.6rem;font-size:0.7rem;">➡️ भेजें</button>
            </div>
          </div>
          <!-- Recursive nested replies -->
          ${r.replies && r.replies.length > 0 ? this.renderReplies(r.replies, issueId, depth + 1) : ''}
        </div>
      `;
    }).join('');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  renderIssuesList(issues, container) {
    const supportedInStorage = this.storage.getSupportedList();

    const categoryIcons = {
      roads: '🛤️', water: '💧', electricity: '⚡', health: '🏥',
      education: '📚', safety: '🛡️', garbage: '🗑️', other: '📝'
    };
    const categoryNames = {
      roads: 'सड़क/रास्ते', water: 'पानी/नाली', electricity: 'बिजली',
      health: 'स्वास्थ्य', education: 'शिक्षा', safety: 'सुरक्षा',
      garbage: 'कचरा/सफाई', other: 'अन्य'
    };
    const statusEmoji = {
      active: '🟡', 'in-progress': '🟠', resolved: '✅'
    };
    const statusText = {
      active: 'सक्रिय', 'in-progress': 'प्रगति में', resolved: 'हल हो गई'
    };

    if (issues.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:2rem;">अभी तक कोई समस्या दर्ज नहीं हुई। पहले व्यक्ति बनें! 💪</p>';
      return;
    }

    container.innerHTML = issues.map(issue => {
      const isSupported = supportedInStorage.includes(issue.id);
      const photoHTML = issue.photos && issue.photos.length > 0
        ? `<div class="issue-photos" style="cursor:pointer;" onclick="expandIssuePhoto(this)"><img src="${issue.photos[0]}" alt="Issue Photo" loading="lazy" style="max-height:250px;width:100%;object-fit:cover;border-radius:12px;">${issue.photos.length > 1 ? `<span style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.7);color:#fff;padding:2px 8px;border-radius:12px;font-size:0.75rem;">+${issue.photos.length - 1}</span>` : ''}</div>`
        : '';
      const status = issue.status || 'active';
      const replies = issue.replies || [];
      const totalComments = this.countTotalReplies(replies);
      const supporterCount = Math.max(issue.supporters || 0, this.storage.getSupportCount(issue.id));

      return `
      <div class="user-issue-card" data-id="${issue.id}">
        ${photoHTML}
        <div class="user-issue-content">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem;">
            <div class="issue-category-badge">
              ${categoryIcons[issue.category] || '📝'} ${categoryNames[issue.category] || issue.category}
            </div>
            <span style="font-size:0.75rem;padding:0.15rem 0.6rem;border-radius:12px;background:${status === 'resolved' ? 'rgba(76,175,80,0.15)' : status === 'in-progress' ? 'rgba(255,152,0,0.15)' : 'rgba(244,67,54,0.1)'};color:${status === 'resolved' ? 'var(--success)' : status === 'in-progress' ? '#e65100' : 'var(--danger)'};font-weight:500;">
              ${statusEmoji[status] || '🟡'} ${statusText[status] || 'सक्रिय'}
            </span>
          </div>
          <h4 style="font-size:1rem;line-height:1.5;">${this.escapeHtml(issue.message)}</h4>
          <div class="issue-meta">
            <span>📍 ${this.escapeHtml(issue.location)}</span>
            <span>👤 ${this.escapeHtml(issue.name)}</span>
            <span>📅 ${issue.date}</span>
            <span>❤️ ${supporterCount}</span>              <span>💬 ${totalComments}</span>
          </div>
          ${this.isIssueOwner(issue.id) ? '<div style="margin-bottom:0.5rem;"><button class="delete-issue-btn" onclick="deleteUserIssue(\'' + issue.id + '\')" style="padding:0.3rem 0.7rem;border:1px solid var(--danger);background:transparent;color:var(--danger);border-radius:8px;cursor:pointer;font-size:0.75rem;font-family:inherit;transition:0.3s;">🗑️ मेरी समस्या हटाएं</button></div>' : ''}
          <div class="issue-support-section">
            <button class="support-btn ${isSupported ? 'supported' : ''}" onclick="window.supportUserIssue('${issue.id}')" data-id="${issue.id}">
              ${isSupported ? '✅ Supported (' + supporterCount + ')' : '❤️ Support (' + supporterCount + ')'}
            </button>
            <button class="share-issue-btn" onclick="shareIssue('${issue.id}')">📤 Share</button>
            <button class="reply-toggle-btn" onclick="toggleReplySection('${issue.id}')" style="padding:0.4rem 0.8rem;border:1px solid #e0e0e0;background:transparent;border-radius:20px;cursor:pointer;font-size:0.8rem;color:var(--text);font-family:inherit;">💬 टिप्पणियाँ (${totalComments})</button>
          </div>
          <!-- Replies Section (Threaded) -->
          <div class="replies-section" id="replies-${issue.id}" style="display:none;margin-top:1rem;padding-top:0.8rem;border-top:1px solid rgba(0,0,0,0.06);">
            <div class="replies-list" id="replies-list-${issue.id}">
              ${this.renderReplies(replies, issue.id, 0)}
            </div>
            <!-- Top-level comment form -->
            <div class="reply-form" style="display:flex;gap:0.5rem;margin-top:0.8rem;padding-top:0.8rem;border-top:1px solid rgba(0,0,0,0.04);">
              <input type="text" class="reply-name-input" placeholder="आपका नाम" style="flex:0 0 90px;padding:0.4rem 0.6rem;border:2px solid #e0e0e0;border-radius:8px;font-size:0.8rem;font-family:inherit;">
              <input type="text" class="reply-text-input" placeholder="इस समस्या पर अपनी टिप्पणी लिखें..." style="flex:1;padding:0.4rem 0.6rem;border:2px solid #e0e0e0;border-radius:8px;font-size:0.8rem;font-family:inherit;">
              <button class="cta-btn primary" onclick="submitReply('${issue.id}')" style="padding:0.4rem 0.8rem;font-size:0.75rem;">➡️ भेजें</button>
            </div>
          </div>
        </div>
      </div>
    `;
    }).join('');
  }

  async loadUserIssues(callback) {
    const container = document.getElementById('user-issues-list');
    if (!container) return;

    container.innerHTML = '<div class="news-loading"><div class="news-loading-spinner"></div><p>Issues load ho rahe hain...</p></div>';

    let issues = [];
    let fromServer = false;

    // Step 1: Try fetching from server
    try {
      const resp = await fetch(this.apiBase + '/issues/user', { cache: 'no-cache' });
      const data = await resp.json();
      
      if (data.success && data.issues && data.issues.length > 0) {
        issues = data.issues;
        fromServer = true;
      }
    } catch (err) {
      console.warn('⚠️ Server fetch failed, using localStorage:', err.message);
    }
    
    // Step 2: If server failed, merge with localStorage issues so they're still visible
    const localIssues = this.storage.getAllIssues();
    if (!fromServer && localIssues.length > 0) {
      issues = localIssues;
    } else if (fromServer && localIssues.length > 0) {
      // Merge: add local issues that aren't in server response
      const serverIds = new Set(issues.map(i => i.id));
      localIssues.forEach(li => {
        if (!serverIds.has(li.id)) {
          issues.unshift(li);
          serverIds.add(li.id);
        }
      });
    }

    this.renderIssuesList(issues, container);

    // Run callback after DOM is updated
    if (typeof callback === 'function') {
      setTimeout(callback, 100);
    }
  }
  
  countTotalReplies(replies) {
    if (!replies) return 0;
    let count = replies.length;
    for (const r of replies) {
      if (r.replies) count += this.countTotalReplies(r.replies);
    }
    return count;
  }

  async supportIssue(issueId) {
    const supporterId = this.getSupporterId();
    
    // Check locally first
    if (this.storage.isIssueSupported(issueId)) {
      this.showToast('आप पहले ही support कर चुके हैं! 🙏', 'info');
      return;
    }

    // Save locally FIRST
    this.storage.supportIssue(issueId);

    // Try API in background
    try {
      const resp = await fetch(this.apiBase + '/issues/user/' + issueId + '/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supporterId })
      });
      const data = await resp.json();
    } catch (err) {
      console.warn('Support API error (local only):', err.message);
    }

    this.showThankYouModal();
    this.loadUserIssues();
  }

  showThankYouModal() {
    const existing = document.getElementById('thank-you-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'thank-you-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content thank-you-modal">
        <div class="modal-animation"><div class="heart-animation">❤️</div></div>
        <h2>🙏 धन्यवाद!</h2>
        <p class="thank-you-msg">आपके support के लिए शुक्रिया।</p>
        <p class="thank-you-sub">हम जल्द ही बेहतर होंगे! 💪</p>
        <p class="thank-you-detail">आपका सहयोग अनमोल है। Hardoi ki Awaaz आपके साथ है। साथ मिलकर हम हरदोई को बेहतर बनाएंगे।</p>
        <button class="cta-btn primary" onclick="document.getElementById('thank-you-modal').remove()">🙏 बंद करें</button>
      </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add('active'), 100);
    setTimeout(() => {
      if (document.getElementById('thank-you-modal')) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
      }
    }, 5000);
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, type === 'error' ? 5000 : 3000);
  }
}

// ======== GLOBAL SUPPORT FUNCTION — Enhanced with proper localStorage handling ========

window.supportUserIssue = async function(issueId) {
  const storage = new IssueStorage();
  
  if (storage.isIssueSupported(issueId)) {
    showToast('आप पहले ही support कर चुके हैं! 🙏', 'info');
    return;
  }

  // Get or create supporter ID
  let supporterId = localStorage.getItem('hka_supporter_id');
  if (!supporterId) {
    supporterId = 'SUP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8);
    localStorage.setItem('hka_supporter_id', supporterId);
  }

  const btn = document.querySelector(`.support-btn[data-id="${issueId}"]`);

  // Save support locally FIRST — works even if backend is down
  storage.supportIssue(issueId);
  const localCount = storage.getSupportCount(issueId);

  // Update button immediately with local count
  if (btn) {
    btn.classList.add('supported');
    btn.innerHTML = '✅ Supported (' + localCount + ')';
  }

  // Try API in background — don't block UX
  try {
    const resp = await fetch('https://hardoi-ki-awaaz-backend.onrender.com/api/issues/user/' + issueId + '/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supporterId })
    });
    const data = await resp.json();

    // Update with server count if higher
    if (data.supporters && data.supporters > localCount && btn) {
      btn.innerHTML = '✅ Supported (' + data.supporters + ')';
    }
  } catch (err) {
    console.warn('Support API error (local only):', err.message);
    // Already saved locally above — no need to show error
  }

  // Always show thank you
  showThankYouStandard();
};

// ======== GLOBAL REPLY FUNCTIONS ========

// Toggle the entire comments section for an issue
window.toggleReplySection = function(issueId) {
  const section = document.getElementById('replies-' + issueId);
  if (section) {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  }
};

// Keep backward compatibility
window.toggleReplyForm = window.toggleReplySection;

// Submit a top-level comment on an issue
window.submitReply = async function(issueId) {
  const section = document.getElementById('replies-' + issueId);
  if (!section) return;

  const nameInput = section.querySelector('.reply-name-input');
  const textInput = section.querySelector('.reply-text-input');
  
  if (!textInput.value.trim()) {
    showToast('कृपया जवाब लिखें!', 'error');
    return;
  }

  const replyData = {
    name: nameInput.value.trim() || 'Anonymous',
    text: textInput.value.trim(),
    parentReplyId: null
  };

  try {
    const resp = await fetch('https://hardoi-ki-awaaz-backend.onrender.com/api/issues/user/' + issueId + '/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyData)
    });
    const data = await resp.json();

    if (data.success) {
      textInput.value = '';
      showToast('✅ आपकी टिप्पणी भेज दी गई!', 'success');
      if (window.photoUploader) {
        window.photoUploader.loadUserIssues(() => {
          const sec = document.getElementById('replies-' + issueId);
          if (sec) sec.style.display = 'block';
        });
      }
    }
  } catch (err) {
    console.error('Reply error:', err);
    showToast('टिप्पणी भेजने में समस्या हुई। बाद में प्रयास करें।', 'error');
  }
};

// Show the nested reply form for a specific comment
window.showNestedReplyForm = function(issueId, replyId) {
  // Hide all other nested reply forms first
  document.querySelectorAll('.nested-reply-form').forEach(el => {
    el.style.display = 'none';
  });
  const form = document.getElementById('nested-reply-' + issueId + '-' + replyId);
  if (form) {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    // Focus the text input
    const input = form.querySelector('.nested-reply-text');
    if (input && form.style.display === 'block') setTimeout(() => input.focus(), 200);
  }
};

// Submit a nested reply (reply to a specific comment)
window.submitNestedReply = async function(issueId, parentReplyId) {
  const form = document.getElementById('nested-reply-' + issueId + '-' + parentReplyId);
  if (!form) return;

  const nameInput = form.querySelector('.nested-reply-name');
  const textInput = form.querySelector('.nested-reply-text');
  
  if (!textInput.value.trim()) {
    showToast('कृपया जवाब लिखें!', 'error');
    return;
  }

  const replyData = {
    name: nameInput.value.trim() || 'Anonymous',
    text: textInput.value.trim(),
    parentReplyId: parentReplyId
  };

  try {
    const resp = await fetch('https://hardoi-ki-awaaz-backend.onrender.com/api/issues/user/' + issueId + '/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyData)
    });
    const data = await resp.json();

    if (data.success) {
      textInput.value = '';
      nameInput.value = '';
      form.style.display = 'none';
      showToast('✅ आपका जवाब भेज दिया गया!', 'success');
      if (window.photoUploader) {
        window.photoUploader.loadUserIssues(() => {
          const sec = document.getElementById('replies-' + issueId);
          if (sec) sec.style.display = 'block';
        });
      }
    }
  } catch (err) {
    console.error('Nested reply error:', err);
    showToast('जवाब भेजने में समस्या हुई। बाद में प्रयास करें।', 'error');
  }
};

// Expand issue photos (click to view fullscreen)
window.expandIssuePhoto = function(el) {
  const img = el.querySelector('img');
  if (!img) return;
  const existing = document.getElementById('photo-expand-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'photo-expand-overlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-content" style="max-width:90vw;max-height:90vh;text-align:center;background:transparent;box-shadow:none;">
      <img src="${img.src}" alt="Issue Photo" style="max-width:100%;max-height:85vh;border-radius:12px;">
      <button class="cta-btn primary" onclick="document.getElementById('photo-expand-overlay').remove()" style="margin-top:1rem;">✕ बंद करें</button>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('active'), 100);
};

// Standard thank you function (used by both predefined and user issues)
function showThankYouStandard() {
  const existing = document.getElementById('thank-you-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'thank-you-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content thank-you-modal">
      <div class="modal-animation"><div class="heart-animation">❤️</div></div>
      <h2>🙏 धन्यवाद!</h2>
      <p class="thank-you-msg">आपके support के लिए शुक्रिया।</p>
      <p class="thank-you-sub">हम जल्द ही बेहतर होंगे! 💪</p>
      <p class="thank-you-detail">आपका सहयोग अनमोल है। Hardoi ki Awaaz आपके साथ है। साथ मिलकर हम हरदोई को बेहतर बनाएंगे।</p>
      <button class="cta-btn primary" onclick="this.closest('.modal-overlay').remove()" style="margin-top:1rem;">🙏 बंद करें</button>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 100);
  setTimeout(() => { if (document.getElementById('thank-you-modal')) { modal.classList.remove('active'); setTimeout(() => modal.remove(), 300); } }, 5000);
}

// Initialize
window.photoUploader = null;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('photo-upload-section')) {
    window.photoUploader = new PhotoUploader();
  }
});

// ======== MAP LOCATION PICKER — WhatsApp-style ========

window.openMapPicker = function() {
  // Remove existing map modal if any
  const existing = document.getElementById('map-picker-modal');
  if (existing) existing.remove();

  // Hardoi, UP center coordinates
  const defaultLat = 27.3939;
  const defaultLng = 80.1323;

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'map-picker-modal';
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10001;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);opacity:0;transition:opacity 0.3s ease;';
  
  modal.innerHTML = `
    <div class="map-picker-container" style="background:var(--bg);border-radius:20px;overflow:hidden;width:90%;max-width:600px;max-height:90vh;box-shadow:0 25px 80px rgba(0,0,0,0.4);transform:scale(0.9);transition:transform 0.3s ease;">
      <!-- Header -->
      <div style="padding:1rem 1.2rem;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-weight:600;font-size:1rem;">🗺️ अपनी लोकेशन चुनें</span>
        <button onclick="closeMapPicker()" style="background:rgba(255,255,255,0.2);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>
      <!-- Map container -->
      <div id="map-picker-map" style="height:400px;width:100%;"></div>
      <!-- Info + Actions -->
      <div style="padding:1rem 1.2rem;">
        <div id="map-picker-info" style="font-size:0.85rem;color:var(--text-light);margin-bottom:0.8rem;text-align:center;">
          🖱️ मैप पर क्लिक करके अपनी लोकेशन चुनें
        </div>
        <div style="display:flex;gap:0.5rem;">
          <button id="map-picker-locate-btn" onclick="locateOnMap()" style="flex:1;padding:0.6rem;border:2px solid var(--primary);background:transparent;color:var(--primary);border-radius:12px;cursor:pointer;font-size:0.85rem;font-family:inherit;font-weight:600;transition:0.3s;">📍 मेरी लोकेशन</button>
          <button id="map-picker-confirm-btn" onclick="confirmMapLocation()" style="flex:1;padding:0.6rem;background:var(--primary);color:#fff;border:none;border-radius:12px;cursor:pointer;font-size:0.85rem;font-family:inherit;font-weight:600;transition:0.3s;" disabled>✅ चुनें</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => {
    modal.style.opacity = '1';
    const container = modal.querySelector('.map-picker-container');
    if (container) container.style.transform = 'scale(1)';
  }, 50);

  // Store selected coordinates
  window._mapPickerState = {
    lat: null,
    lng: null,
    locationName: '',
    marker: null
  };

  // Initialize Leaflet map after a short delay to ensure container is rendered
  setTimeout(() => {
    const mapEl = document.getElementById('map-picker-map');
    if (!mapEl || typeof L === 'undefined') {
      document.getElementById('map-picker-info').textContent = '⚠️ मैप लोड नहीं हो पाया। कृपया पुनः प्रयास करें।';
      return;
    }

    const map = L.map('map-picker-map', {
      center: [defaultLat, defaultLng],
      zoom: 13,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    // Store map reference
    window._mapPickerState.map = map;

    // Add click handler to place marker
    map.on('click', function(e) {
      const { lat, lng } = e.latlng;
      placeMapMarker(lat, lng);
    });

    // Force map to invalidate size after animation
    setTimeout(() => map.invalidateSize(), 300);
  }, 200);
};

// Place/set marker on the map and reverse geocode
window.placeMapMarker = function(lat, lng) {
  const state = window._mapPickerState;
  if (!state) return;

  state.lat = lat;
  state.lng = lng;

  // Remove old marker
  if (state.marker) {
    state.map.removeLayer(state.marker);
  }

  // Add new marker
  state.marker = L.marker([lat, lng], {
    draggable: true
  }).addTo(state.map);

  // Update on drag
  state.marker.on('dragend', function(e) {
    const pos = e.target.getLatLng();
    placeMapMarker(pos.lat, pos.lng);
  });

  // Show loading
  const info = document.getElementById('map-picker-info');
  const confirmBtn = document.getElementById('map-picker-confirm-btn');
  if (info) info.textContent = '⏳ लोकेशन की जानकारी लाई जा रही है...';
  if (confirmBtn) confirmBtn.disabled = true;

  // Reverse geocode via Nominatim
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=hi`, {
    headers: { 'User-Agent': 'HardoiKiAwaaz/1.0' }
  })
    .then(resp => resp.json())
    .then(data => {
      let locationName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      if (data && data.display_name) {
        const parts = data.display_name.split(',');
        // Take the most specific parts (area, village, city)
        locationName = parts.slice(0, 3).join(',').trim();
      }
      state.locationName = locationName;
      
      if (info) info.textContent = '📍 ' + locationName;
      if (confirmBtn) confirmBtn.disabled = false;
    })
    .catch(() => {
      const fallbackName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      state.locationName = fallbackName;
      if (info) info.textContent = '📍 ' + fallbackName;
      if (confirmBtn) confirmBtn.disabled = false;
    });
};

// Get user's current location and zoom to it
window.locateOnMap = function() {
  const state = window._mapPickerState;
  if (!state || !state.map) return;

  if (!navigator.geolocation) {
    showToast('आपके ब्राउज़र में GPS की सुविधा नहीं है।', 'error');
    return;
  }

  const btn = document.getElementById('map-picker-locate-btn');
  if (btn) { btn.textContent = '⏳ खोज रहा है...'; btn.disabled = true; }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      state.map.setView([latitude, longitude], 16);
      placeMapMarker(latitude, longitude);
      if (btn) { btn.textContent = '📍 मेरी लोकेशन'; btn.disabled = false; }
    },
    (error) => {
      let msg = 'लोकेशन नहीं मिल पाई। GPS चालू करें या मैप पर क्लिक करें।';
      if (error.code === error.PERMISSION_DENIED) {
        msg = '📍 लोकेशन की अनुमति नहीं दी गई। कृपया मैप पर क्लिक करके लोकेशन चुनें।';
      }
      showToast(msg, 'error');
      if (btn) { btn.textContent = '📍 मेरी लोकेशन'; btn.disabled = false; }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
};

// Confirm selected location and fill it in the form
window.confirmMapLocation = function() {
  const state = window._mapPickerState;
  if (!state || !state.lat) {
    showToast('कृपया मैप पर अपनी लोकेशन चुनें!', 'error');
    return;
  }

  const locationName = state.locationName || `${state.lat.toFixed(4)}, ${state.lng.toFixed(4)}`;

  // Fill the location in the form
  const locSelect = document.getElementById('issue-upload-location');
  const customGroup = document.getElementById('issue-upload-location-custom-group');
  const customInput = document.getElementById('issue-upload-location-custom');

  if (locSelect) locSelect.value = 'others';
  if (customGroup) customGroup.style.display = 'block';
  if (customInput) customInput.value = locationName;

  showToast('✅ लोकेशन चुन ली गई: ' + locationName, 'success');
  
  // Close the map
  closeMapPicker();
};

// Close map picker modal
window.closeMapPicker = function() {
  const modal = document.getElementById('map-picker-modal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
      window._mapPickerState = null;
    }, 300);
  }
};

// Close map on Escape key — check inside DOMContentLoaded to ensure DOM exists
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('photo-upload-section')) {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMapPicker();
      }
    });
  }
});

function shareIssue(issueId) {
  const url = window.location.href;
  const text = 'Hardoi ki Awaaz पर एक समस्या देखें - ' + url;
  if (navigator.share) {
    navigator.share({ title: 'Hardoi ki Awaaz', text, url });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }
}

// ======== DELETE USER ISSUE ========
window.deleteUserIssue = async function(issueId) {
  if (!confirm('क्या आप वाकई अपनी समस्या हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।')) {
    return;
  }

  const storage = new IssueStorage();
  const token = localStorage.getItem('hka_user_token');
  const owned = JSON.parse(localStorage.getItem('hka_owned_issues') || '{}');
  
  // Verify ownership
  if (owned[issueId] !== token) {
    showToast('आप केवल अपनी समस्या हटा सकते हैं!', 'error');
    return;
  }

  // Try to delete from server
  try {
    await fetch('https://hardoi-ki-awaaz-backend.onrender.com/api/issues/user/' + issueId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
  } catch (err) {
    console.warn('Server delete failed (local only):', err.message);
  }

  // Remove from localStorage
  const allIssues = storage.getAllIssues();
  const filtered = allIssues.filter(i => i.id !== issueId);
  localStorage.setItem(storage.issuesKey, JSON.stringify(filtered));

  // Remove ownership tracking
  delete owned[issueId];
  localStorage.setItem('hka_owned_issues', JSON.stringify(owned));

  showToast('✅ आपकी समस्या हटा दी गई!', 'success');
  
  // Reload the issues list
  if (window.photoUploader) {
    window.photoUploader.loadUserIssues();
  }
};
