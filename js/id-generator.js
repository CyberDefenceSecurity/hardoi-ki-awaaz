/* ============================================
   Hardoi ki Awaaz - ID Card Generator
   Updated to match id-card.html DOM structure
   ============================================ */

class IDCardGenerator {
  constructor() {
    this.prefix = 'HKA';
    this.year = new Date().getFullYear();
    this.storage = new IDStorage();
    this.init();
  }

  init() {
    const form = document.getElementById('id-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generate();
    });

    // Photo upload handler — enhanced with drag-drop support
    const photoInput = document.getElementById('id-photo-input');
    const photoUpload = document.querySelector('.photo-upload');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => this.handlePhotoSelect(e));
    }
    if (photoUpload) {
      // Drag events
      photoUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        photoUpload.style.borderColor = 'var(--secondary)';
        photoUpload.style.background = 'rgba(255,111,0,0.05)';
      });
      photoUpload.addEventListener('dragleave', () => {
        photoUpload.style.borderColor = '#e0e0e0';
        photoUpload.style.background = '';
      });
      photoUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        photoUpload.style.borderColor = '#e0e0e0';
        photoUpload.style.background = '';
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          // Process the first dropped file directly
          const file = files[0];
          if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
            this.showToast('केवल JPG, PNG, WebP images allowed!', 'error');
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            this.showToast('File 5MB से बड़ी है!', 'error');
            return;
          }
          const reader = new FileReader();
          reader.onload = (ev) => {
            const preview = document.getElementById('id-photo-preview');
            const placeholder = document.getElementById('id-photo-placeholder');
            const img = preview?.querySelector('img');
            if (img && preview && placeholder) {
              img.src = ev.target.result;
              preview.style.display = 'block';
              placeholder.style.display = 'none';
            }
          };
          reader.readAsDataURL(file);
        }
      });
      // Also handle click on the preview image itself for re-selection
      photoUpload.addEventListener('click', (e) => {
        // Only trigger if click wasn't on a button inside
        if (!e.target.closest('button') && photoInput) {
          photoInput.click();
        }
      });
    }

    // Area selector - show custom area field when "Others" is selected
    const areaSelect = document.getElementById('id-area');
    const customAreaGroup = document.getElementById('custom-area-group');
    if (areaSelect && customAreaGroup) {
      areaSelect.addEventListener('change', () => {
        if (areaSelect.value === 'Others') {
          customAreaGroup.style.display = 'block';
        } else {
          customAreaGroup.style.display = 'none';
        }
      });
    }
  }

  handlePhotoSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      this.showToast('केवल JPG, PNG, WebP images allowed!', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('File 5MB से बड़ी है!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById('id-photo-preview');
      const placeholder = document.getElementById('id-photo-placeholder');
      const img = preview?.querySelector('img');
      if (img && preview && placeholder) {
        img.src = e.target.result;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);
  }

  generate() {
    const name = document.getElementById('id-name')?.value?.trim();
    const mobile = document.getElementById('id-mobile')?.value?.trim();
    const areaSelect = document.getElementById('id-area');
    const customArea = document.getElementById('id-custom-area');

    let area = areaSelect?.value;
    const tag = document.getElementById("id-tag")?.value?.trim() || "";
    if (area === 'Others') {
      area = customArea?.value?.trim() || 'Others';
    }

    if (!name || !mobile || !area) {
      this.showToast('कृपया सभी जानकारी भरें!', 'error');
      return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      this.showToast('सही मोबाइल नंबर डालें (10 digits)!', 'error');
      return;
    }

    const id = this.generateID();
    const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    // Get photo if uploaded
    const photoPreview = document.getElementById('id-photo-preview');
    const photoImg = photoPreview?.querySelector('img');
    const photoData = photoImg ? photoImg.src : null;

    const card = {
      id,
      name,
      mobile,
      area,
      photo: photoData,
      issueDate: date,
      verified: true,
      tag: tag
    };

    this.storage.save(card);
    this.renderCard(card);
    this.showToast('ID Card बन गया! 🎉', 'success');
  }

  generateID() {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${this.prefix}-${this.year}-${random}`;
  }

  renderCard(card) {
    const preview = document.getElementById('id-card-preview');
    const actions = document.getElementById('id-card-actions');
    if (!preview) return;

    const photoHTML = card.photo
      ? `<img src="${card.photo}" style="width:100%;height:100%;object-fit:cover;">`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">👤</div>`;

    preview.innerHTML = `
      <div id="generated-card" class="id-card holographic" style="margin:0 auto;">
        <div class="id-card-header">
          <div class="id-card-logo"><img src="assets/images/logo.jpg" alt="HKA" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
          <div class="id-card-title" style="flex:1;min-width:0;">हरदोई की आवाज़</div>
          <div class="id-card-badge">⭐ OFFICIAL</div>
        </div>
        <div style="font-size:0.55rem;color:rgba(255,255,255,0.6);text-align:center;margin-bottom:4px;letter-spacing:0.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">HARDOI KI AWAAZ — जनता की पहचान</div>
        <div class="id-card-body">
          <div class="id-card-photo">${card.photo ? `<img src="${card.photo}" alt="Photo">` : '<span style="font-size:1.5rem;">👤</span>'}</div>
          <div class="id-card-info">
            <div class="name">${card.name}</div>
            <div class="detail">📱 ${card.mobile}</div>
            <div class="detail">📍 ${card.area}</div>
            <div class="detail" style="margin-top:1px;">🆔 ${card.id}</div>
            <div class="detail">📅 ${card.issueDate}</div>
          </div>
        </div>
        <div class="id-card-hologram">✅ Verified</div>
        <div class="id-card-footer">Hardoi ki Awaaz • Hardoi, UP</div>
        <div class="id-card-qr"><img src="assets/images/logo.jpg" alt="HKA" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
        ${card.tag ? `<div class="id-card-tag">${card.tag}</div>` : ''}
      </div>
      <p style="text-align:center;font-size:0.7rem;color:var(--text-light);margin-top:0.5rem;">🖱️ Card par hover karein 3D effect ke liye</p>
    `;

    // Store current card for download
    window._currentCard = card;

    if (actions) actions.style.display = 'flex';

    // Refresh saved cards
    this.renderSavedCards();
  }

  renderSavedCards() {
    const grid = document.getElementById('saved-cards-grid');
    if (!grid) return;

    const cards = this.storage.getAll();
    if (cards.length === 0) {
      grid.innerHTML = '<p style="text-align:center;color:var(--text-light);grid-column:1/-1;">Koi card save nahi hai. Pehla card banayein! 🎉</p>';
      return;
    }

    grid.innerHTML = cards.map(c => `
      <div class="generated-card-item" onclick="loadCardForPreview('${c.id}')" style="cursor:pointer;">
        <div class="member-photo">
          ${c.photo ? `<img src="${c.photo}" alt="${c.name}">` : '<span style="font-size:1.5rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%;">👤</span>'}
        </div>
        <div class="member-info">
          <div class="member-name">${c.name}</div>
          <div class="member-id">${c.id}</div>
          <div style="font-size:0.7rem;color:var(--text-light);">📍 ${c.area}</div>
        </div>
      </div>
    `).join('');
  }

  showToast(msg, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type || 'info'}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Global download & share function
function downloadIDCard(action) {
  const cardEl = document.getElementById('generated-card');
  if (!cardEl) {
    showToast('Pehle ID Card banayein!', 'error');
    return;
  }
  const card = window._currentCard;
  if (!card) return;

  if (action === 'share') {
    // Share functionality
    const text = `🎙️ Hardoi ki Awaaz Official Member\n\nName: ${card.name}\nID: ${card.id}\nArea: ${card.area}\n\n#HardoiKiAwaaz #Hardoi`;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({ title: 'Hardoi ki Awaaz ID Card', text: text + '\n' + url });
    } else {
      // Fallback: show share options
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
      window.open(shareUrl, '_blank');
    }
    return;
  }

  // Download PNG — CLONE at exact card dimensions (400x252) for consistent output
  // No font scaling, no extra padding, no blue background bleed
  if (typeof html2canvas !== 'undefined') {
    const clone = cardEl.cloneNode(true);
    clone.id = 'generated-card-clone';
    // Force exact card dimensions with NO extra padding — card already has padding from CSS
    clone.setAttribute('style', '');
    clone.style.width = '400px';
    clone.style.height = '252px';
    clone.style.maxWidth = '400px';
    clone.style.minHeight = '252px';
    clone.style.position = 'fixed';
    clone.style.top = '-9999px';
    clone.style.left = '0';
    clone.style.zIndex = '-1';
    clone.style.margin = '0 auto';
    clone.style.borderRadius = '16px';
    clone.style.padding = '0'; // Card has its own padding — don't double it!
    clone.style.overflow = 'hidden';

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html2canvas(clone, {
          scale: 3,
          useCORS: true,
          backgroundColor: '#1a237e',  // match card gradient start color
          logging: false,
          width: 400,
          height: 252
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = `HKA-${card.id || Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          if (document.body.contains(clone)) document.body.removeChild(clone);
          showToast('✅ ID Card Download ho gaya!', 'success');
        }).catch(err => {
          console.error('html2canvas error:', err);
          if (document.body.contains(clone)) document.body.removeChild(clone);
          showToast('Download mein problem hui, dobara try karein', 'error');
        });
      });
    });
  } else {
    showToast('Download feature load ho raha hai, thodi der baad try karein', 'info');
  }
}

// Global ID Card Verification function
function verifyIDCard() {
  const input = document.getElementById('verify-input');
  const result = document.getElementById('verify-result');
  if (!input || !result) return;

  const id = input.value.trim().toUpperCase();
  if (!id || id.length < 5) {
    result.style.display = 'block';
    result.innerHTML = '<div style="padding:1rem;background:rgba(244,67,54,0.1);border-radius:var(--radius);color:var(--danger);text-align:center;">❌ कृपया सही ID Number डालें (e.g., HKA-2026-1234)</div>';
    return;
  }

  // Check in local storage
  const storage = new IDStorage();
  const card = storage.get(id);

  if (card) {
    result.style.display = 'block';
    result.innerHTML = `
      <div style="padding:1.2rem;background:rgba(76,175,80,0.1);border-radius:var(--radius);border:2px solid var(--success);">
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
          <div style="width:50px;height:50px;border-radius:50%;background:var(--success);display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">✅</div>
          <div style="flex:1;">
            <h3 style="color:var(--success);margin:0 0 0.2rem;">✅ Verified — Original ID Card</h3>
            <p style="margin:0;font-size:0.9rem;"><strong>${card.name}</strong> | 📱 ${card.mobile} | 📍 ${card.area}</p>
            <p style="margin:0.2rem 0 0;font-size:0.8rem;color:var(--text-light);">ID: ${card.id} | Issue Date: ${card.issueDate}</p>
          </div>
        </div>
      </div>
    `;
  } else {
    // Check if ID format is valid but not found
    if (/^HKA-\d{4}-\d{4}$/.test(id)) {
      result.style.display = 'block';
      result.innerHTML = '<div style="padding:1rem;background:rgba(255,152,0,0.1);border-radius:var(--radius);color:var(--secondary);text-align:center;">⚠️ यह ID Card हमारे सिस्टम में नहीं मिला। यह Fake हो सकता है या किसी अन्य डिवाइस पर बना हो।</div>';
    } else {
      result.style.display = 'block';
      result.innerHTML = '<div style="padding:1rem;background:rgba(244,67,54,0.1);border-radius:var(--radius);color:var(--danger);text-align:center;">❌ Invalid ID Format. सही फॉर्मेट: HKA-2026-XXXX</div>';
    }
    input.value = '';
  }
}

// Global function to load a saved card for preview
function loadCardForPreview(cardId) {
  const storage = new IDStorage();
  const card = storage.get(cardId);
  if (card && idGenerator) {
    idGenerator.renderCard(card);
    // Scroll to preview
    document.getElementById('id-card-preview')?.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize
let idGenerator = null;
document.addEventListener('DOMContentLoaded', () => {
  idGenerator = new IDCardGenerator();
  // Render saved cards on load
  if (idGenerator) {
    setTimeout(() => idGenerator.renderSavedCards(), 500);
  }
});
