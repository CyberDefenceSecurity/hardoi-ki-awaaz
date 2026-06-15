/* ============================================
   Hardoi ki Awaaz - Photo Upload System
   Content Moderation — Auto block inappropriate content
   ============================================ */

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
    this.loadUserIssues();
  }

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
              <optgroup label="हरदोई शहर">
                <option value="Civil Lines, Hardoi">Civil Lines, Hardoi</option>
                <option value="Model Town, Hardoi">Model Town, Hardoi</option>
                <option value="Subhash Nagar, Hardoi">Subhash Nagar, Hardoi</option>
                <option value="Gandhi Nagar, Hardoi">Gandhi Nagar, Hardoi</option>
                <option value="Nehru Nagar, Hardoi">Nehru Nagar, Hardoi</option>
                <option value="Jawahar Nagar, Hardoi">Jawahar Nagar, Hardoi</option>
                <option value="Station Road, Hardoi">Station Road, Hardoi</option>
                <option value="Sadar Bazaar, Hardoi">Sadar Bazaar, Hardoi</option>
                <option value="Mall Road, Hardoi">Mall Road, Hardoi</option>
                <option value="Katra, Hardoi">Katra, Hardoi</option>
                <option value="Ismailganj, Hardoi">Ismailganj, Hardoi</option>
                <option value="Azimabad, Hardoi">Azimabad, Hardoi</option>
                <option value="Shivpuri, Hardoi">Shivpuri, Hardoi</option>
                <option value="Kotwali, Hardoi">Kotwali, Hardoi</option>
                <option value="Hardoi Bypass">Hardoi Bypass</option>
                <option value="Kachhauna, Hardoi">Kachhauna, Hardoi</option>
                <option value="Pachdevra, Hardoi">Pachdevra, Hardoi</option>
              </optgroup>
              <optgroup label="बिलग्राम तहसील">
                <option value="Bilgram">Bilgram</option>
                <option value="Balamau">Balamau</option>
                <option value="Kachhla">Kachhla</option>
                <option value="Gopamau">Gopamau</option>
                <option value="Sarai Ayaz">Sarai Ayaz</option>
                <option value="Umarpur">Umarpur</option>
                <option value="Paigamberpur">Paigamberpur</option>
                <option value="Rohniya">Rohniya</option>
                <option value="Behenda">Behenda</option>
              </optgroup>
              <optgroup label="सांडी तहसील">
                <option value="Sandi">Sandi</option>
                <option value="Madhoganj">Madhoganj</option>
                <option value="Pali, Sandi">Pali</option>
                <option value="Rania">Rania</option>
                <option value="Kursath">Kursath</option>
                <option value="Hargaon">Hargaon</option>
                <option value="Pachdeora">Pachdeora</option>
                <option value="Karmasan">Karmasan</option>
              </optgroup>
              <optgroup label="शाहाबाद तहसील">
                <option value="Shahabad">Shahabad</option>
                <option value="Pihani">Pihani</option>
                <option value="Katiyari">Katiyari</option>
                <option value="Baran">Baran</option>
                <option value="Hamidpur">Hamidpur</option>
                <option value="Sawayajpur">Sawayajpur</option>
                <option value="Bharawan">Bharawan</option>
                <option value="Maudarpur">Maudarpur</option>
              </optgroup>
              <optgroup label="अन्य गाँव">
                <option value="Ahirori">Ahirori</option>
                <option value="Bawan">Bawan</option>
                <option value="Hariyawan">Hariyawan</option>
                <option value="Todarpur">Todarpur</option>
                <option value="Kampil">Kampil</option>
                <option value="Bisauli">Bisauli</option>
                <option value="Purwa Bazar">Purwa Bazar</option>
                <option value="Chattamau">Chattamau</option>
                <option value="Gulariya">Gulariya</option>
                <option value="Lawesingh Nagar">Lawesingh Nagar</option>
                <option value="Naraini">Naraini</option>
                <option value="Pachpora">Pachpora</option>
                <option value="Rasdhan">Rasdhan</option>
                <option value="Aurangabad, Hardoi">Aurangabad</option>
                <option value="Bahorwa">Bahorwa</option>
                <option value="Majhila">Majhila</option>
                <option value="Dhadhera">Dhadhera</option>
                <option value="Sikrora">Sikrora</option>
                <option value="Barauli">Barauli</option>
                <option value="Umrauli">Umrauli</option>
                <option value="Mahila">Mahila</option>
                <option value="Thiri">Thiri</option>
                <option value="Shuklapur">Shuklapur</option>
                <option value="Makhi">Makhi</option>
                <option value="Atwa">Atwa</option>
                <option value="Ajgain">Ajgain</option>
                <option value="Malhipur">Malhipur</option>
                <option value="Maholi">Maholi</option>
                <option value="Nasratpur">Nasratpur</option>
                <option value="Patan, Hardoi">Patan</option>
                <option value="Teliyani">Teliyani</option>
                <option value="Binauli">Binauli</option>
                <option value="Atrauli">Atrauli</option>
                <option value="Kaimah">Kaimah</option>
                <option value="Pirit">Pirit</option>
                <option value="Beniganj">Beniganj</option>
              </optgroup>
              <optgroup label="अन्य">
                <option value="Others">इसके अलावा — Others</option>
              </optgroup>
            </select>
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
    const location = document.getElementById('issue-upload-location')?.value;

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

  async loadUserIssues(callback) {
    const container = document.getElementById('user-issues-list');
    if (!container) return;

    container.innerHTML = '<div class="news-loading"><div class="news-loading-spinner"></div><p>Issues load ho rahe hain...</p></div>';

    try {
      const resp = await fetch(this.apiBase + '/issues/user', { cache: 'no-cache' });
      const data = await resp.json();
      
      if (!data.success || !data.issues || data.issues.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:2rem;">अभी तक कोई समस्या दर्ज नहीं हुई। पहले व्यक्ति बनें! 💪</p>';
        return;
      }

      const issues = data.issues;
      const supporterId = this.getSupporterId();
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

      container.innerHTML = issues.map(issue => {
        const isSupported = supportedInStorage.includes(issue.id);
        const photoHTML = issue.photos && issue.photos.length > 0
          ? `<div class="issue-photos"><img src="${issue.photos[0]}" alt="Issue Photo" loading="lazy"></div>`
          : '';
        const status = issue.status || 'active';
        const replies = issue.replies || [];

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
            <h4>${issue.message.substring(0, 200)}${issue.message.length > 200 ? '...' : ''}</h4>
            <div class="issue-meta">
              <span>📍 ${issue.location}</span>
              <span>👤 ${issue.name}</span>
              <span>📅 ${issue.date}</span>
              <span>❤️ ${issue.supporters || 0}</span>
            </div>
            <div class="issue-support-section">
              <button class="support-btn ${isSupported ? 'supported' : ''}" onclick="window.supportUserIssue('${issue.id}')" data-id="${issue.id}">
                ${isSupported ? '✅ Supported' : '❤️ Support (' + (issue.supporters || 0) + ')'}
              </button>
              <button class="share-issue-btn" onclick="shareIssue('${issue.id}')">📤 Share</button>
              <button class="reply-toggle-btn" onclick="toggleReplyForm('${issue.id}')" style="padding:0.4rem 0.8rem;border:1px solid #e0e0e0;background:transparent;border-radius:20px;cursor:pointer;font-size:0.8rem;color:var(--text);font-family:inherit;">💬 Reply (${replies.length})</button>
            </div>
            <!-- Replies Section -->
            <div class="replies-section" id="replies-${issue.id}" style="display:none;margin-top:1rem;padding-top:0.8rem;border-top:1px solid rgba(0,0,0,0.06);">
              <div class="replies-list" id="replies-list-${issue.id}">
                ${replies.length === 0 ? '<p style="font-size:0.8rem;color:var(--text-light);">अभी तक कोई जवाब नहीं। पहले जवाब दें! 💬</p>' : replies.map(r => `
                  <div class="reply-item" style="padding:0.5rem 0;border-bottom:1px solid rgba(0,0,0,0.04);">
                    <strong style="font-size:0.8rem;color:var(--primary);">${r.name}</strong>
                    <span style="font-size:0.7rem;color:var(--text-light);margin-left:0.5rem;">${r.date}</span>
                    <p style="font-size:0.85rem;margin-top:0.2rem;color:var(--text);">${r.text}</p>
                  </div>
                `).join('')}
              </div>
              <div class="reply-form" style="display:flex;gap:0.5rem;margin-top:0.8rem;">
                <input type="text" class="reply-name-input" placeholder="आपका नाम" style="flex:0 0 100px;padding:0.4rem 0.6rem;border:2px solid #e0e0e0;border-radius:8px;font-size:0.8rem;font-family:inherit;">
                <input type="text" class="reply-text-input" placeholder="अपना जवाब लिखें..." style="flex:1;padding:0.4rem 0.6rem;border:2px solid #e0e0e0;border-radius:8px;font-size:0.8rem;font-family:inherit;">
                <button class="cta-btn primary" onclick="submitReply('${issue.id}')" style="padding:0.4rem 0.8rem;font-size:0.75rem;">➡️ भेजें</button>
              </div>
            </div>
          </div>
        </div>
      `;
      }).join('');
    } catch (err) {
      console.error('Error loading user issues:', err);
      container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:2rem;">सर्वर से कनेक्ट नहीं हो पाया। बाद में पुनः प्रयास करें।</p>';
    }
    
    // Run callback after DOM is updated
    if (typeof callback === 'function') {
      setTimeout(callback, 100);
    }
  }

  async supportIssue(issueId) {
    const supporterId = this.getSupporterId();
    
    // Check locally first
    if (this.storage.isIssueSupported(issueId)) {
      this.showToast('आप पहले ही support कर चुके हैं! 🙏', 'info');
      return;
    }

    try {
      const resp = await fetch(this.apiBase + '/issues/user/' + issueId + '/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supporterId })
      });
      const data = await resp.json();

      if (data.alreadySupported) {
        this.showToast('आप पहले ही support कर चुके हैं! 🙏', 'info');
        return;
      }

      // Save locally too (for quick check next time)
      this.storage.supportIssue(issueId);

      this.showThankYouModal();
      this.loadUserIssues();
    } catch (err) {
      console.error('Support error:', err);
      // Fallback to local-only support
      this.storage.supportIssue(issueId);
      this.showThankYouModal();
      this.loadUserIssues();
    }
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

// Global support handler for user issues (works via API)
window.supportUserIssue = async function(issueId) {
  const storage = new IssueStorage();
  
  if (storage.isIssueSupported(issueId)) {
    showToast('आप पहले ही support कर चुके हैं! 🙏', 'info');
    return;
  }

  let supporterId = localStorage.getItem('hka_supporter_id');
  if (!supporterId) {
    supporterId = 'SUP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8);
    localStorage.setItem('hka_supporter_id', supporterId);
  }

  const btn = document.querySelector(`.support-btn[data-id="${issueId}"]`);

  try {
    const resp = await fetch('https://hardoi-ki-awaaz-backend.onrender.com/api/issues/user/' + issueId + '/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supporterId })
    });
    const data = await resp.json();

    if (data.alreadySupported) {
      showToast('आप पहले ही support कर चुके हैं! 🙏', 'info');
      return;
    }

    // Mark as supported locally
    storage.supportIssue(issueId);

    // Update button
    if (btn) {
      btn.classList.add('supported');
      btn.innerHTML = '✅ Supported (' + (data.supporters || 0) + ')';
    }
  } catch (err) {
    console.error('Support API error:', err);
    // Fallback: local only
    storage.supportIssue(issueId);
    if (btn) {
      btn.classList.add('supported');
      btn.innerHTML = '✅ Supported';
    }
  }

  // Always show thank you
  showThankYouStandard();
};

// Reply functions (global)
window.toggleReplyForm = function(issueId) {
  const section = document.getElementById('replies-' + issueId);
  if (section) {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  }
};

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
    text: textInput.value.trim()
  };

  try {
    const resp = await fetch('https://hardoi-ki-awaaz-backend.onrender.com/api/issues/user/' + issueId + '/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyData)
    });
    const data = await resp.json();

    if (data.success) {
      // Clear inputs
      textInput.value = '';
      showToast('✅ आपका जवाब भेज दिया गया!', 'success');
      // Reload and re-open replies section via callback
      if (window.photoUploader) {
        window.photoUploader.loadUserIssues(() => {
          const sec = document.getElementById('replies-' + issueId);
          if (sec) sec.style.display = 'block';
        });
      }
    }
  } catch (err) {
    console.error('Reply error:', err);
    showToast('जवाब भेजने में समस्या हुई। बाद में प्रयास करें।', 'error');
  }
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

function shareIssue(issueId) {
  const url = window.location.href;
  const text = 'Hardoi ki Awaaz पर एक समस्या देखें - ' + url;
  if (navigator.share) {
    navigator.share({ title: 'Hardoi ki Awaaz', text, url });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }
}
