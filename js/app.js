/**
 * Ahmad Rubber Traders — Main Application Script
 * Bilingual (English LTR Default / Urdu RTL), Vanilla JS, In-memory State
 */

(function () {
  'use strict';

  // Global State (Default English LTR as requested)
  const state = {
    lang: 'en', // Default English LTR
    siteData: null,
    i18n: {
      ur: null,
      en: null
    },
    calculator: {
      mode: 'area', // 'area' | 'stalls'
      unit: 'ft', // 'ft' | 'm'
      productId: 'cow-mat',
      sizeIndex: 0,
      length: 24,
      width: 12,
      wastagePercent: 5,
      cows: 10,
      stallSizeIndex: 0,
      includeAlley: false,
      includeFeeding: false
    },
    inquiryList: []
  };

  // DOM Elements cache
  let dom = {};

  async function init() {
    try {
      const [siteDataRes, urRes, enRes] = await Promise.all([
        fetch('./data/site-data.json').then((r) => r.json()),
        fetch('./data/ur.json').then((r) => r.json()),
        fetch('./data/en.json').then((r) => r.json())
      ]);

      state.siteData = siteDataRes;
      state.i18n.ur = urRes;
      state.i18n.en = enRes;

      state.calculator.wastagePercent = siteDataRes.defaults.defaultWastagePercent || 5;

      cacheDom();
      bindEvents();
      renderLanguage(state.lang);
      renderCatalog();
      renderWhereMatsGo();
      renderOrderSteps();
      renderDeliveryTerms();
      renderReviews();
      renderFaqs();
      populateCalculatorControls();
      runCalculator();
      updateInquiryUI();
    } catch (err) {
      console.error('Initialization failed:', err);
    }
  }

  function cacheDom() {
    dom = {
      html: document.documentElement,
      langBtn: document.getElementById('langToggleBtn'),
      mobileMenuBtn: document.getElementById('mobileMenuToggleBtn'),
      mobileDrawer: document.getElementById('mobileDrawer'),
      drawerBackdrop: document.getElementById('drawerBackdrop'),
      closeDrawerBtn: document.getElementById('closeDrawerBtn'),
      catalogContainer: document.getElementById('catalogProductsGrid'),
      whereMatsGoGrid: document.getElementById('whereMatsGoGrid'),
      orderStepsGrid: document.getElementById('orderStepsGrid'),
      deliveryTermsGrid: document.getElementById('deliveryTermsGrid'),
      faqContainer: document.getElementById('faqListContainer'),
      // Calculator elements
      btnModeArea: document.getElementById('btnModeArea'),
      btnModeStalls: document.getElementById('btnModeStalls'),
      btnUnitFeet: document.getElementById('btnUnitFeet'),
      btnUnitMetres: document.getElementById('btnUnitMetres'),
      unitSelectorWrap: document.getElementById('unitSelectorWrap'),
      areaInputsWrap: document.getElementById('areaInputsWrap'),
      stallsInputsWrap: document.getElementById('stallsInputsWrap'),
      calcLengthInput: document.getElementById('calcLengthInput'),
      calcWidthInput: document.getElementById('calcWidthInput'),
      calcProductSelect: document.getElementById('calcProductSelect'),
      calcSizeSelect: document.getElementById('calcSizeSelect'),
      calcWastageInput: document.getElementById('calcWastageInput'),
      calcCowsInput: document.getElementById('calcCowsInput'),
      calcStallSizeSelect: document.getElementById('calcStallSizeSelect'),
      calcCheckAlley: document.getElementById('calcCheckAlley'),
      calcCheckFeeding: document.getElementById('calcCheckFeeding'),
      calcResultPieces: document.getElementById('calcResultPieces'),
      calcResultArea: document.getElementById('calcResultArea'),
      btnAddCalcToInquiry: document.getElementById('btnAddCalcToInquiry'),
      // Inquiry elements
      inquiryTableBody: document.getElementById('inquiryTableBody'),
      inquiryEmptyMsg: document.getElementById('inquiryEmptyMsg'),
      inquiryTableWrap: document.getElementById('inquiryTableWrap'),
      inquiryClearBtn: document.getElementById('inquiryClearBtn'),
      inquiryForm: document.getElementById('inquiryForm'),
      inquiryCustName: document.getElementById('inquiryCustName'),
      inquiryCustPhone: document.getElementById('inquiryCustPhone'),
      inquiryCustCity: document.getElementById('inquiryCustCity'),
      inquiryDeliveryType: document.getElementsByName('deliveryType'),
      inquiryCustNotes: document.getElementById('inquiryCustNotes'),
      bottomBarInquiryCount: document.getElementById('bottomBarInquiryCount'),
      headerInquiryCount: document.getElementById('headerInquiryCount')
    };
  }

  function bindEvents() {
    if (dom.langBtn) {
      dom.langBtn.addEventListener('click', toggleLanguage);
    }

    if (dom.mobileMenuBtn && dom.mobileDrawer) {
      dom.mobileMenuBtn.addEventListener('click', openDrawer);
      dom.closeDrawerBtn.addEventListener('click', closeDrawer);
      dom.drawerBackdrop.addEventListener('click', closeDrawer);
    }

    // Calculator Segment buttons
    dom.btnModeArea.addEventListener('click', () => setCalcMode('area'));
    dom.btnModeStalls.addEventListener('click', () => setCalcMode('stalls'));
    dom.btnUnitFeet.addEventListener('click', () => setCalcUnit('ft'));
    dom.btnUnitMetres.addEventListener('click', () => setCalcUnit('m'));

    // Calculator Inputs
    [dom.calcLengthInput, dom.calcWidthInput, dom.calcWastageInput, dom.calcCowsInput].forEach((el) => {
      if (el) el.addEventListener('input', runCalculator);
    });

    if (dom.calcProductSelect) {
      dom.calcProductSelect.addEventListener('change', (e) => {
        state.calculator.productId = e.target.value;
        updateCalcSizeOptions();
        runCalculator();
      });
    }

    if (dom.calcSizeSelect) {
      dom.calcSizeSelect.addEventListener('change', (e) => {
        state.calculator.sizeIndex = parseInt(e.target.value, 10) || 0;
        runCalculator();
      });
    }

    if (dom.calcStallSizeSelect) {
      dom.calcStallSizeSelect.addEventListener('change', (e) => {
        state.calculator.stallSizeIndex = parseInt(e.target.value, 10) || 0;
        runCalculator();
      });
    }

    if (dom.calcCheckAlley) {
      dom.calcCheckAlley.addEventListener('change', (e) => {
        state.calculator.includeAlley = e.target.checked;
        runCalculator();
      });
    }

    if (dom.calcCheckFeeding) {
      dom.calcCheckFeeding.addEventListener('change', (e) => {
        state.calculator.includeFeeding = e.target.checked;
        runCalculator();
      });
    }

    if (dom.btnAddCalcToInquiry) {
      dom.btnAddCalcToInquiry.addEventListener('click', addCalculatorResultToInquiry);
    }

    if (dom.inquiryClearBtn) {
      dom.inquiryClearBtn.addEventListener('click', clearInquiryList);
    }

    if (dom.inquiryForm) {
      dom.inquiryForm.addEventListener('submit', handleSendWhatsApp);
    }

    // Close drawer when clicking nav links
    document.querySelectorAll('.mobile-drawer a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  function openDrawer() {
    dom.mobileDrawer.classList.add('open');
    dom.drawerBackdrop.classList.add('open');
  }

  function closeDrawer() {
    dom.mobileDrawer.classList.remove('open');
    dom.drawerBackdrop.classList.remove('open');
  }

  function toggleLanguage() {
    state.lang = state.lang === 'en' ? 'ur' : 'en';
    renderLanguage(state.lang);
    renderCatalog();
    renderWhereMatsGo();
    renderOrderSteps();
    renderDeliveryTerms();
    renderFaqs();
    populateCalculatorControls();
    runCalculator();
    updateInquiryUI();
  }

  function renderLanguage(lang) {
    const t = state.i18n[lang];
    if (!t) return;

    dom.html.setAttribute('lang', lang);
    dom.html.setAttribute('dir', t.dir);
    document.title = t.metaTitle;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const keyPath = el.getAttribute('data-i18n');
      const val = getNestedValue(t, keyPath);
      if (val !== undefined) {
        el.textContent = val;
      }
    });

    // Update language toggle button label
    if (dom.langBtn) {
      dom.langBtn.textContent = t.nav.langToggle;
    }
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  /* ==========================================================================
     Catalog Rendering with Animated Visual Mat Displays
     ========================================================================== */
  function renderCatalog() {
    if (!dom.catalogContainer || !state.siteData) return;
    const isUr = state.lang === 'ur';
    const t = state.i18n[state.lang].products;

    dom.catalogContainer.innerHTML = state.siteData.products.map((p) => {
      const title = isUr ? p.titleUrdu : p.title;
      const surface = isUr ? p.surfaceTypeUrdu : p.surfaceType;
      const usage = isUr ? p.usageAreaUrdu : p.usageArea;
      const price = isUr ? p.priceNoteUrdu : p.priceNote;

      const sizeChips = p.sizes.map((s) => {
        const sName = isUr ? s.nameUrdu : s.name;
        return `<span class="chip">${sName}</span>`;
      }).join('');

      const thkChips = p.thicknessOptions.map((thk) => {
        return `<span class="chip">${thk}</span>`;
      }).join('');

      // Determine visual style & badge
      let patternClass = 'mat-pattern-diamond';
      let badgeText = isUr ? '24 ملی میٹر ولکنائزڈ ربڑ' : '24mm Vulcanized Rubber';
      if (p.id === 'eva-sheet') {
        patternClass = 'mat-pattern-eva';
        badgeText = isUr ? 'ہائی ڈینسٹی ای وی اے کشن' : 'High-Density EVA Cushion';
      } else if (p.id === 'parlor-mat') {
        patternClass = 'mat-pattern-parlor';
        badgeText = isUr ? 'اینٹی سلپ واٹر پروف گرپ' : 'Anti-Slip Wet Drainage Grip';
      }

      return `
        <article class="catalog-card" data-product-id="${p.id}">
          <div class="card-top">
            <div class="card-image-slot" data-slot="${p.id}">
              <img src="${p.imagePlaceholder}" alt="${title}" class="mat-real-photo" loading="lazy" />
              <div class="sheen-light-bar"></div>
              <div class="mat-tag-badge">${badgeText}</div>
            </div>
            <h3 class="card-title">${title}</h3>
            <div class="card-meta-list">
              <div class="meta-row">
                <span class="meta-label">${t.sizesLabel}</span>
                <div class="thickness-chips">${sizeChips}</div>
              </div>
              <div class="meta-row">
                <span class="meta-label">${t.thicknessLabel}</span>
                <div class="thickness-chips">${thkChips}</div>
              </div>
              <div class="meta-row">
                <span class="meta-label">${t.surfaceLabel}</span>
                <span class="meta-val">${surface}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">${t.usageLabel}</span>
                <span class="meta-val">${usage}</span>
              </div>
            </div>
          </div>
          <div class="card-bottom">
            <div class="price-text">${price}</div>
            <button type="button" class="btn btn-sm btn-primary add-catalog-item" data-id="${p.id}">
              ${t.addToInquiry}
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Bind add button clicks
    dom.catalogContainer.querySelectorAll('.add-catalog-item').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-id');
        addProductToInquiry(pid);
      });
    });
  }

  /* ==========================================================================
     Where Mats Go Section
     ========================================================================== */
  function renderWhereMatsGo() {
    if (!dom.whereMatsGoGrid || !state.siteData) return;
    const isUr = state.lang === 'ur';

    dom.whereMatsGoGrid.innerHTML = state.siteData.whereMatsGo.map((item) => {
      const zone = isUr ? item.zoneUrdu : item.zone;
      const productTitle = isUr ? item.suitableProductTitleUrdu : item.suitableProductTitle;
      const notes = isUr ? item.notesUrdu : item.notes;

      return `
        <div class="guide-card">
          <h3 class="term-title">${zone}</h3>
          <div style="font-size: var(--text-xs); color: var(--color-accent); font-weight: 600; margin-bottom: var(--space-xs);">
            ${productTitle}
          </div>
          <p class="term-desc">${notes}</p>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     How Order Works
     ========================================================================== */
  function renderOrderSteps() {
    if (!dom.orderStepsGrid || !state.siteData) return;
    const isUr = state.lang === 'ur';

    dom.orderStepsGrid.innerHTML = state.siteData.orderSteps.map((s) => {
      const title = isUr ? s.titleUrdu : s.title;
      const detail = isUr ? s.detailUrdu : s.detail;

      return `
        <div class="guide-card">
          <div class="guide-step-num">0${s.step}</div>
          <h3 class="term-title">${title}</h3>
          <p class="term-desc">${detail}</p>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     Delivery & Terms
     ========================================================================== */
  function renderDeliveryTerms() {
    if (!dom.deliveryTermsGrid || !state.siteData) return;
    const isUr = state.lang === 'ur';
    const d = state.siteData.deliveryAndTerms;
    const t = state.i18n[state.lang].delivery;

    dom.deliveryTermsGrid.innerHTML = `
      <div class="term-item">
        <h4 class="term-title">${t.coverage}</h4>
        <p class="term-desc">${isUr ? d.coverageUrdu : d.coverage}</p>
      </div>
      <div class="term-item">
        <h4 class="term-title">${t.timing}</h4>
        <p class="term-desc">${isUr ? d.deliveryTimingUrdu : d.deliveryTiming}</p>
      </div>
      <div class="term-item">
        <h4 class="term-title">${t.minOrder}</h4>
        <p class="term-desc">${isUr ? d.minOrderUrdu : d.minOrder}</p>
      </div>
      <div class="term-item">
        <h4 class="term-title">${t.payment}</h4>
        <p class="term-desc">${isUr ? d.paymentMethodsUrdu : d.paymentMethods}</p>
      </div>
    `;
  }

  /* ==========================================================================
     Reviews
     ========================================================================== */
  function renderReviews() {
    const rev = state.siteData.reviews;
    const elScore = document.getElementById('reviewRatingScore');
    const elCount = document.getElementById('reviewRatingCount');
    const elNotice = document.getElementById('reviewNoticeText');
    const isUr = state.lang === 'ur';

    if (elScore) elScore.textContent = rev.overallRating.toFixed(1);
    if (elCount) elCount.textContent = isUr ? `${rev.reviewCount} گوگل ریویوز` : `${rev.reviewCount} Google Reviews`;
    if (elNotice) elNotice.textContent = isUr ? rev.noticeUrdu : rev.notice;
  }

  /* ==========================================================================
     FAQs
     ========================================================================== */
  function renderFaqs() {
    if (!dom.faqContainer || !state.siteData) return;
    const isUr = state.lang === 'ur';

    dom.faqContainer.innerHTML = state.siteData.faqs.map((f, i) => {
      const q = isUr ? f.qUrdu : f.q;
      const a = isUr ? f.aUrdu : f.a;

      return `
        <div class="faq-item">
          <button type="button" class="faq-question" data-faq-index="${i}">
            <span>${q}</span>
            <span class="faq-icon" style="font-family: var(--font-outlier); font-size: 1.25rem;">+</span>
          </button>
          <div class="faq-answer" style="display: none;">
            ${a}
          </div>
        </div>
      `;
    }).join('');

    dom.faqContainer.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const item = e.currentTarget.closest('.faq-item');
        const ans = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        const isHidden = ans.style.display === 'none';
        ans.style.display = isHidden ? 'block' : 'none';
        icon.textContent = isHidden ? '−' : '+';
      });
    });
  }

  /* ==========================================================================
     Calculator Logic & State
     ========================================================================== */
  function setCalcMode(mode) {
    state.calculator.mode = mode;
    if (mode === 'area') {
      dom.btnModeArea.classList.add('active');
      dom.btnModeStalls.classList.remove('active');
      dom.unitSelectorWrap.style.display = 'flex';
      dom.areaInputsWrap.style.display = 'block';
      dom.stallsInputsWrap.style.display = 'none';
    } else {
      dom.btnModeStalls.classList.add('active');
      dom.btnModeArea.classList.remove('active');
      dom.unitSelectorWrap.style.display = 'none';
      dom.areaInputsWrap.style.display = 'none';
      dom.stallsInputsWrap.style.display = 'block';
    }
    runCalculator();
  }

  function setCalcUnit(unit) {
    state.calculator.unit = unit;
    if (unit === 'ft') {
      dom.btnUnitFeet.classList.add('active');
      dom.btnUnitMetres.classList.remove('active');
    } else {
      dom.btnUnitMetres.classList.add('active');
      dom.btnUnitFeet.classList.remove('active');
    }
    runCalculator();
  }

  function populateCalculatorControls() {
    if (!state.siteData) return;
    const isUr = state.lang === 'ur';

    // Products dropdown
    dom.calcProductSelect.innerHTML = state.siteData.products.map((p) => {
      const title = isUr ? p.titleUrdu : p.title;
      return `<option value="${p.id}">${title}</option>`;
    }).join('');
    dom.calcProductSelect.value = state.calculator.productId;

    updateCalcSizeOptions();

    // Stalls size options
    dom.calcStallSizeSelect.innerHTML = state.siteData.calculatorSettings.typicalStallSizes.map((s, idx) => {
      const name = isUr ? s.nameUrdu : s.name;
      return `<option value="${idx}">${name}</option>`;
    }).join('');
    dom.calcStallSizeSelect.value = state.calculator.stallSizeIndex;

    // Checkbox text
    const addons = state.siteData.calculatorSettings.addons;
    const alleyLabel = document.getElementById('calcAlleyLabelText');
    const feedingLabel = document.getElementById('calcFeedingLabelText');
    if (alleyLabel && addons[0]) alleyLabel.textContent = isUr ? addons[0].nameUrdu : addons[0].name;
    if (feedingLabel && addons[1]) feedingLabel.textContent = isUr ? addons[1].nameUrdu : addons[1].name;
  }

  function updateCalcSizeOptions() {
    const isUr = state.lang === 'ur';
    const product = state.siteData.products.find((p) => p.id === state.calculator.productId) || state.siteData.products[0];
    dom.calcSizeSelect.innerHTML = product.sizes.map((s, idx) => {
      const name = isUr ? s.nameUrdu : s.name;
      return `<option value="${idx}">${name}</option>`;
    }).join('');
    dom.calcSizeSelect.value = state.calculator.sizeIndex || 0;
  }

  function runCalculator() {
    if (!state.siteData) return;

    const isUr = state.lang === 'ur';
    const t = state.i18n[state.lang].calculator;
    const product = state.siteData.products.find((p) => p.id === state.calculator.productId) || state.siteData.products[0];
    const size = product.sizes[state.calculator.sizeIndex] || product.sizes[0];

    let piecesNeeded = 0;
    let totalAreaFormatted = '';

    if (state.calculator.mode === 'area') {
      const len = parseFloat(dom.calcLengthInput.value) || 0;
      const wid = parseFloat(dom.calcWidthInput.value) || 0;
      const wastage = parseFloat(dom.calcWastageInput.value) || 0;

      const rawArea = len * wid;
      const areaWithWastage = rawArea * (1 + (wastage / 100));

      let matArea = size.areaSqFt;
      if (state.calculator.unit === 'm') {
        matArea = size.areaSqM;
      }

      if (matArea > 0 && areaWithWastage > 0) {
        piecesNeeded = Math.ceil(areaWithWastage / matArea);
      }

      const unitText = state.calculator.unit === 'm' ? t.sqMUnit : t.sqFtUnit;
      totalAreaFormatted = `${rawArea.toFixed(1)} ${unitText} (+${wastage}% ${t.wastageLabel.split('(')[0].trim()}: ${areaWithWastage.toFixed(1)} ${unitText})`;

    } else {
      // By Stalls Mode
      const cows = parseInt(dom.calcCowsInput.value, 10) || 0;
      const stallSetting = state.siteData.calculatorSettings.typicalStallSizes[state.calculator.stallSizeIndex] || state.siteData.calculatorSettings.typicalStallSizes[0];

      let basePieces = Math.ceil(cows * stallSetting.matsPerStall);

      let multiplier = 1.0;
      const addons = state.siteData.calculatorSettings.addons;
      if (dom.calcCheckAlley && dom.calcCheckAlley.checked) {
        multiplier += (addons[0]?.multiplier || 0.20);
      }
      if (dom.calcCheckFeeding && dom.calcCheckFeeding.checked) {
        multiplier += (addons[1]?.multiplier || 0.15);
      }

      piecesNeeded = Math.ceil(basePieces * multiplier);

      const totalSqFt = piecesNeeded * size.areaSqFt;
      totalAreaFormatted = `${cows} ${t.cowsLabel} (${totalSqFt.toFixed(0)} ${t.sqFtUnit})`;
    }

    // Update DOM results
    dom.calcResultPieces.textContent = piecesNeeded;
    dom.calcResultArea.textContent = totalAreaFormatted;

    // Cache current calculated result on element
    dom.btnAddCalcToInquiry.dataset.pieces = piecesNeeded;
    dom.btnAddCalcToInquiry.dataset.productTitle = isUr ? product.titleUrdu : product.title;
    dom.btnAddCalcToInquiry.dataset.sizeName = isUr ? size.nameUrdu : size.name;
  }

  function addCalculatorResultToInquiry() {
    const pieces = parseInt(dom.btnAddCalcToInquiry.dataset.pieces, 10) || 0;
    if (pieces <= 0) return;

    const title = dom.btnAddCalcToInquiry.dataset.productTitle;
    const sizeName = dom.btnAddCalcToInquiry.dataset.sizeName;

    const item = {
      id: 'calc-' + Date.now(),
      title: `${title} (${sizeName})`,
      qty: pieces,
      note: state.calculator.mode === 'area' ? 'Calculated by Shed Area' : 'Calculated by Stall Count'
    };

    state.inquiryList.push(item);
    updateInquiryUI();

    // Scroll smoothly to inquiry
    const inquirySec = document.getElementById('inquiry');
    if (inquirySec) inquirySec.scrollIntoView({ behavior: 'smooth' });
  }

  function addProductToInquiry(productId) {
    const isUr = state.lang === 'ur';
    const product = state.siteData.products.find((p) => p.id === productId);
    if (!product) return;

    const title = isUr ? product.titleUrdu : product.title;
    const defaultSize = isUr ? product.sizes[0].nameUrdu : product.sizes[0].name;

    const existingIndex = state.inquiryList.findIndex((i) => i.title.startsWith(title));
    if (existingIndex > -1) {
      state.inquiryList[existingIndex].qty += 1;
    } else {
      state.inquiryList.push({
        id: 'prod-' + Date.now(),
        title: `${title} [${defaultSize}]`,
        qty: 1,
        note: 'Catalogue Standard'
      });
    }

    updateInquiryUI();

    // Visual feedback on button
    const btn = document.querySelector(`.add-catalog-item[data-id="${productId}"]`);
    if (btn) {
      const origText = btn.textContent;
      btn.textContent = state.i18n[state.lang].products.addedSuccess;
      setTimeout(() => { btn.textContent = origText; }, 1500);
    }
  }

  function updateInquiryUI() {
    const t = state.i18n[state.lang].inquiry;
    const count = state.inquiryList.reduce((acc, it) => acc + it.qty, 0);

    if (dom.bottomBarInquiryCount) dom.bottomBarInquiryCount.textContent = count;
    if (dom.headerInquiryCount) dom.headerInquiryCount.textContent = count;

    if (state.inquiryList.length === 0) {
      dom.inquiryEmptyMsg.style.display = 'block';
      dom.inquiryTableWrap.style.display = 'none';
      dom.inquiryTableBody.innerHTML = '';
      return;
    }

    dom.inquiryEmptyMsg.style.display = 'none';
    dom.inquiryTableWrap.style.display = 'table';

    dom.inquiryTableBody.innerHTML = state.inquiryList.map((item, idx) => {
      return `
        <tr>
          <td>
            <strong>${item.title}</strong>
            <div style="font-size: var(--text-xs); color: var(--color-muted);">${item.note}</div>
          </td>
          <td>
            <input 
              type="number" 
              min="1" 
              max="5000" 
              value="${item.qty}" 
              data-idx="${idx}" 
              class="inquiry-qty-input form-input" 
              style="width: 80px; min-height: 40px; padding: 4px 8px; font-weight: bold;"
            />
          </td>
          <td>
            <button type="button" class="btn-remove" data-idx="${idx}">${t.clearAll.split(' ')[0]}</button>
          </td>
        </tr>
      `;
    }).join('');

    // Quantity inputs
    dom.inquiryTableBody.querySelectorAll('.inquiry-qty-input').forEach((input) => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const val = parseInt(e.target.value, 10) || 1;
        state.inquiryList[idx].qty = val > 0 ? val : 1;
        updateInquiryUI();
      });
    });

    // Remove buttons
    dom.inquiryTableBody.querySelectorAll('.btn-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        state.inquiryList.splice(idx, 1);
        updateInquiryUI();
      });
    });
  }

  function clearInquiryList() {
    state.inquiryList = [];
    updateInquiryUI();
  }

  /* ==========================================================================
     WhatsApp Transmission
     ========================================================================== */
  function handleSendWhatsApp(e) {
    e.preventDefault();

    if (state.inquiryList.length === 0) {
      alert(state.lang === 'ur' ? 'برائے مہربانی پہلے فہرست میں سامان شامل کریں۔' : 'Please add items to your inquiry list first.');
      return;
    }

    const name = dom.inquiryCustName.value.trim();
    const phone = dom.inquiryCustPhone.value.trim();
    const city = dom.inquiryCustCity.value.trim();
    const notes = dom.inquiryCustNotes.value.trim();

    let deliveryPref = 'Cargo';
    dom.inquiryDeliveryType.forEach((radio) => {
      if (radio.checked) deliveryPref = radio.value;
    });

    const isUr = state.lang === 'ur';

    // Clean itemized message formatting
    let msg = '';
    if (isUr) {
      msg += `*احمد ربڑ ٹریڈرز - کوٹیشن اور ریٹ کی درخواست*\n`;
      msg += `----------------------------------------\n`;
      msg += `*خریدار کا نام:* ${name}\n`;
      msg += `*موبائل / فون:* ${phone}\n`;
      msg += `*شہر / ضلع:* ${city}\n`;
      msg += `*فراہمی کا طریقہ:* ${deliveryPref === 'cargo' ? 'بلٹی کارگو ڈلیوری' : 'لاہور دکان سے خود لینا'}\n\n`;
      msg += `*مطلوبہ میٹس کی تفصیل:*\n`;
      state.inquiryList.forEach((it, i) => {
        msg += `${i + 1}. ${it.title} — تعداد: ${it.qty} پیس\n`;
      });
      if (notes) {
        msg += `\n*اضافی نوٹ:* ${notes}\n`;
      }
      msg += `----------------------------------------\n`;
      msg += `برائے مہربانی موجودہ ہول سیل ریٹ اور ڈلیوری کا وقت مطلع فرمائیں۔`;
    } else {
      msg += `*AHMAD RUBBER TRADERS - BULK QUOTE INQUIRY*\n`;
      msg += `----------------------------------------\n`;
      msg += `*Buyer Name:* ${name}\n`;
      msg += `*Phone:* ${phone}\n`;
      msg += `*Destination City:* ${city}\n`;
      msg += `*Handover:* ${deliveryPref === 'cargo' ? 'Goods Cargo Freight Booking' : 'Lahore Counter Pickup'}\n\n`;
      msg += `*REQUESTED ITEMS:*\n`;
      state.inquiryList.forEach((it, i) => {
        msg += `${i + 1}. ${it.title} — Quantity: ${it.qty} pieces\n`;
      });
      if (notes) {
        msg += `\n*Notes:* ${notes}\n`;
      }
      msg += `----------------------------------------\n`;
      msg += `Please confirm current wholesale rate and dispatch availability.`;
    }

    const whatsappNumber = state.siteData.client.whatsappNumber || '923116103661';
    const targetUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(targetUrl, '_blank');
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
