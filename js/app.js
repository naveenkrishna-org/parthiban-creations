/* ==========================================================================
   PARTHIBAN CREATIONS - MAIN PLATFORM APPLICATION LOGIC
   Routing, Modal System, Search Engine, Filter Tabs, & Dynamic UI Rendering
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  let currentCategory = 'all';
  let currentActiveItem = null;

  // DOM Elements
  const navbar = document.getElementById('main-navbar');
  const categoriesContainer = document.getElementById('categories-container');
  const itemsContainer = document.getElementById('featured-items-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Mobile Drawer Elements
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');

  // Search Elements
  const searchTriggerBtns = document.querySelectorAll('.search-trigger-btn');
  const searchBackdrop = document.getElementById('search-modal-backdrop');
  const searchInput = document.getElementById('search-modal-input');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchResultsContainer = document.getElementById('search-results');

  // Detail Modal Elements
  const itemModalBackdrop = document.getElementById('item-modal-backdrop');
  const itemModalCloseBtn = document.getElementById('item-modal-close-btn');
  const itemModalBannerImg = document.getElementById('modal-banner-img');
  const itemModalIconImg = document.getElementById('modal-icon-img');
  const itemModalTitle = document.getElementById('modal-title');
  const itemModalBadge = document.getElementById('modal-cat-badge');
  const itemModalRating = document.getElementById('modal-rating');
  const itemModalAuthor = document.getElementById('modal-author');
  const itemModalVersion = document.getElementById('modal-version');
  const itemModalSize = document.getElementById('modal-size');
  const itemModalUpdated = document.getElementById('modal-updated');
  const itemModalDesc = document.getElementById('modal-desc');

  // Detail Modal Tabs & Panels
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const modalTabPanels = document.querySelectorAll('.modal-tab-panel');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalSpecsTable = document.getElementById('modal-specs-table');
  const modalInstallSteps = document.getElementById('modal-install-steps');
  const modalDownloadTriggerBtn = document.getElementById('modal-download-trigger');

  // Download Process Modal Elements
  const downloadBox = document.getElementById('download-box');
  const downloadProgressBar = document.getElementById('download-progress-bar');
  const downloadStatusText = document.getElementById('download-status-text');

  /* ==========================================================================
     1. NAVBAR STICKY & SCROLL EFFECT
     ========================================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  /* ==========================================================================
     3. CATEGORIES SECTION RENDERING
     ========================================================================== */
  function renderCategories() {
    if (!categoriesContainer || !PARTHIBAN_DATA.categories) return;

    categoriesContainer.innerHTML = PARTHIBAN_DATA.categories.map(cat => {
      const count = PARTHIBAN_DATA.items ? PARTHIBAN_DATA.items.filter(item => item.category === cat.id).length : 0;
      return `
        <div class="category-card" data-cat="${cat.id}">
          <div class="category-card-top">
            <div class="category-icon-wrapper">
              ${cat.icon}
            </div>
            <span class="category-badge-count">${count} Items</span>
          </div>
          <div class="category-info">
            <h3 class="category-title">${cat.title}</h3>
            <p class="category-description">${cat.description}</p>
          </div>
          <div class="category-explore-btn">
            <span>Explore ${cat.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      `;
    }).join('');

    // Category Card Click -> Filter Featured Items & Scroll
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat');
        filterCategory(catId);
        const featuredSec = document.getElementById('featured');
        if (featuredSec) featuredSec.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ==========================================================================
     4. FEATURED ITEMS RENDERING & FILTERING
     ========================================================================== */
  function renderFeaturedItems(filter = 'all') {
    if (!itemsContainer) return;

    let items = PARTHIBAN_DATA.items || [];
    if (filter !== 'all') {
      items = items.filter(item => item.category === filter);
    }

    if (items.length === 0) {
      itemsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 4rem 1.5rem; background: var(--bg-card); border: 1px dashed var(--border-glow); border-radius: var(--radius-lg); backdrop-filter: blur(16px);">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(0,242,254,0.1); border: 1px solid var(--border-glow); display:flex; align-items:center; justify-content:center; margin: 0 auto 1.25rem auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No Creations Added Yet</h3>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto; font-size: 0.95rem; line-height: 1.6;">
            All mock data has been removed. You can now add your real Mods, PC Games, Android Games, Software, and Tools into <code style="color: var(--accent-cyan); font-family: var(--font-code);">js/data.js</code>.
          </p>
        </div>
      `;
      return;
    }

    itemsContainer.innerHTML = items.map(item => `
      <div class="item-card" data-item-id="${item.id}">
        <div class="item-thumbnail-wrap">
          <img src="${item.thumbImg}" alt="${item.title}" class="item-thumbnail" loading="lazy">
          <span class="item-cat-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            ${item.categoryName}
          </span>
          <span class="item-rating-badge">★ ${item.rating}</span>
        </div>
        <div class="item-card-body">
          <h4 class="item-title">${item.title}</h4>
          <p class="item-short-desc">${item.shortDesc}</p>
          <div class="item-meta-row">
            <div class="item-meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>${item.downloads}</span>
            </div>
            <div class="item-meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${item.version}</span>
            </div>
            <button class="item-action-btn">
              <span>View</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click handlers to open Item Detail Modal
    document.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-item-id');
        openItemDetailModal(id);
      });
    });
  }

  function filterCategory(catId) {
    currentCategory = catId;
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === catId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    renderFeaturedItems(catId);
  }

  // Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterCategory(filter);
    });
  });

  /* ==========================================================================
     5. GLOBAL SEARCH MODAL (Cmd/Ctrl + K & Search Input)
     ========================================================================== */
  function openSearchModal() {
    searchBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
    renderSearchResults('');
  }

  function closeSearchModal() {
    searchBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  searchTriggerBtns.forEach(btn => btn.addEventListener('click', openSearchModal));
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearchModal);
  if (searchBackdrop) {
    searchBackdrop.addEventListener('click', (e) => {
      if (e.target === searchBackdrop) closeSearchModal();
    });
  }

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      closeSearchModal();
      closeItemModal();
    }
  });

  function renderSearchResults(query) {
    if (!searchResultsContainer) return;

    const items = PARTHIBAN_DATA.items || [];
    const q = query.trim().toLowerCase();
    let matches = items;

    if (q !== '') {
      matches = matches.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.shortDesc.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q)
      );
    }

    if (matches.length === 0) {
      searchResultsContainer.innerHTML = `
        <div style="text-align:center; padding: 2rem; color: var(--text-muted);">
          ${q === '' ? 'No items in database yet.' : `No results match "${query}"`}
        </div>
      `;
      return;
    }

    searchResultsContainer.innerHTML = matches.map(item => `
      <div class="search-result-item" data-item-id="${item.id}">
        <div class="search-result-info">
          <img src="${item.thumbImg}" alt="${item.title}" class="search-result-thumb">
          <div>
            <div class="search-result-title">${item.title}</div>
            <div class="search-result-cat">${item.categoryName} • ${item.version}</div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `).join('');

    searchResultsContainer.querySelectorAll('.search-result-item').forEach(resItem => {
      resItem.addEventListener('click', () => {
        const id = resItem.getAttribute('data-item-id');
        closeSearchModal();
        openItemDetailModal(id);
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
  }

  /* ==========================================================================
     6. ITEM DETAIL MODAL & DOWNLOAD SIMULATION
     ========================================================================== */
  function openItemDetailModal(itemId) {
    const items = PARTHIBAN_DATA.items || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    currentActiveItem = item;

    // Populate Header & Info
    itemModalBannerImg.src = item.bannerImg;
    itemModalIconImg.src = item.thumbImg;
    itemModalTitle.textContent = item.title;
    itemModalBadge.textContent = item.categoryName;
    itemModalRating.textContent = `★ ${item.rating}`;
    itemModalAuthor.textContent = item.author;
    itemModalVersion.textContent = item.version;
    itemModalSize.textContent = item.fileSize;
    itemModalUpdated.textContent = item.updatedDate;
    itemModalDesc.textContent = item.fullDesc;

    // Features List
    if (modalFeaturesList) {
      modalFeaturesList.innerHTML = (item.features || []).map(f => `
        <li style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.6rem; font-size:0.95rem; color:var(--text-secondary);">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ${f}
        </li>
      `).join('');
    }

    // Specs Table
    if (modalSpecsTable && item.requirements) {
      modalSpecsTable.innerHTML = `
        <tr><td>Operating System</td><td>${item.requirements.os || 'N/A'}</td></tr>
        <tr><td>Processor (CPU)</td><td>${item.requirements.cpu || 'N/A'}</td></tr>
        <tr><td>Graphics (GPU)</td><td>${item.requirements.gpu || 'N/A'}</td></tr>
        <tr><td>Memory (RAM)</td><td>${item.requirements.ram || 'N/A'}</td></tr>
        <tr><td>Storage Space</td><td>${item.requirements.storage || 'N/A'}</td></tr>
        <tr><td>File Signature</td><td>${item.checksum || 'N/A'}</td></tr>
      `;
    }

    // Installation Steps
    if (modalInstallSteps) {
      modalInstallSteps.innerHTML = (item.installation || []).map((step, idx) => `
        <div class="install-step-item">
          <div class="step-num">${idx + 1}</div>
          <div style="font-size:0.95rem; color:var(--text-primary); margin-top:3px;">${step}</div>
        </div>
      `).join('');
    }

    // Reset Download Box
    if (downloadBox) downloadBox.style.display = 'none';

    // Show Modal
    itemModalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeItemModal() {
    if (itemModalBackdrop) itemModalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (itemModalCloseBtn) itemModalCloseBtn.addEventListener('click', closeItemModal);
  if (itemModalBackdrop) {
    itemModalBackdrop.addEventListener('click', (e) => {
      if (e.target === itemModalBackdrop) closeItemModal();
    });
  }

  // Modal Tab Switching
  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');

      modalTabBtns.forEach(b => b.classList.remove('active'));
      modalTabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-panel-${tab}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Download Trigger Handler
  if (modalDownloadTriggerBtn) {
    modalDownloadTriggerBtn.addEventListener('click', () => {
      if (!currentActiveItem) return;

      const targetUrl = currentActiveItem.downloadUrl || 'https://t.me/gtavcheatsengine';

      downloadBox.style.display = 'block';
      downloadBox.scrollIntoView({ behavior: 'smooth' });

      let progress = 0;
      downloadStatusText.textContent = "Connecting to Parthiban CDN Server...";
      downloadProgressBar.style.width = '0%';

      const interval = setInterval(() => {
        progress += 20;
        downloadProgressBar.style.width = `${progress}%`;

        if (progress === 40) {
          downloadStatusText.textContent = "Verifying Virus Scan & Security Certificate...";
        } else if (progress === 80) {
          downloadStatusText.textContent = "Decrypting Telegram Download Channel...";
        } else if (progress >= 100) {
          clearInterval(interval);
          downloadStatusText.innerHTML = `
            <span style="color: var(--accent-emerald); font-weight:700;">
              🚀 Verification Complete! Redirecting to Telegram...
            </span>
          `;
          showToast(`Redirecting to ${targetUrl}...`);

          // Redirect to Telegram channel
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 600);
        }
      }, 250);
    });
  }

  /* ==========================================================================
     7. TOAST NOTIFICATIONS
     ========================================================================== */
  function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: var(--bg-surface);
      border: 1px solid var(--border-glow);
      color: var(--accent-cyan);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(0,242,254,0.3);
      z-index: 3000;
      font-weight: 600;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      animation: fadeInUp 0.4s ease-out;
    `;
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      ${message}
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Initial Renders
  renderCategories();
  renderFeaturedItems('all');
});
