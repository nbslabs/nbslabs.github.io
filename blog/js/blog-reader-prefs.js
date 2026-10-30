/**
 * blog-reader-prefs.js — Reader Preference Panel Logic & Persistence
 *
 * Manages the slide-in preferences panel on post.html.
 * All preferences are stored in localStorage under 'blog_reader_prefs'.
 * CSS variables are applied to :root BEFORE post body injection.
 */

const BlogReaderPrefs = (() => {
  'use strict';

  const STORAGE_KEY = 'blog_reader_prefs';

  // Theme definitions
  const THEMES = {
    light: {
      '--blog-bg': '#ffffff',
      '--blog-text': '#1a1a1a',
      '--blog-muted': '#6b7280',
      '--blog-border': '#e5e7eb',
      '--blog-accent': '#2563eb'
    },
    dark: {
      '--blog-bg': '#0f1117',
      '--blog-text': '#e8eaf0',
      '--blog-muted': '#9ca3af',
      '--blog-border': '#2d2f3a',
      '--blog-accent': '#60a5fa'
    },
    sepia: {
      '--blog-bg': '#f5f0e8',
      '--blog-text': '#3b2f1e',
      '--blog-muted': '#8a7560',
      '--blog-border': '#d6c9b4',
      '--blog-accent': '#b05a2f'
    }
  };

  const DEFAULTS = {
    theme: 'light',
    customBg: '#ffffff',
    customText: '#1a1a1a',
    fontSize: 18,
    contentWidth: 68,
    textAlign: 'left',
    fontFamily: "'Literata', Georgia, serif",
    lineHeight: 1.75,
    letterSpacing: 0,
    paragraphSpacing: 1.25,
    showToc: true
  };

  const FONT_OPTIONS = {
    "'Literata', Georgia, serif": 'Literata (Serif)',
    "Georgia, serif": 'Georgia (Serif)',
    "'Source Sans 3', sans-serif": 'Source Sans (Sans)',
    "'IBM Plex Mono', monospace": 'IBM Plex Mono',
    "system-ui, sans-serif": 'System Default'
  };

  let _prefs = null;

  /**
   * Load prefs from localStorage (or defaults).
   */
  function load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        _prefs = { ...DEFAULTS, ...JSON.parse(stored) };
      } else {
        _prefs = { ...DEFAULTS };
      }
    } catch {
      _prefs = { ...DEFAULTS };
    }
    return _prefs;
  }

  /**
   * Save current prefs to localStorage.
   */
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_prefs));
    } catch (e) {
      console.warn('Blog: Could not save reader prefs:', e);
    }
  }

  /**
   * Get current prefs (load if needed).
   */
  function get() {
    if (!_prefs) load();
    return _prefs;
  }

  /**
   * Apply all current preferences to CSS variables on :root.
   */
  function applyToDOM() {
    const p = get();
    const root = document.documentElement;

    // Theme colors
    if (p.theme === 'custom') {
      root.style.setProperty('--blog-bg', p.customBg);
      root.style.setProperty('--blog-text', p.customText);
      // Auto-derive muted (text at 60% opacity)
      root.style.setProperty('--blog-muted', mixColor(p.customText, 0.6, p.customBg));
      // Auto-derive border (mix bg and text)
      root.style.setProperty('--blog-border', mixColor(p.customBg, 0.8, p.customText));
      root.style.setProperty('--blog-accent', '#2563eb');
    } else if (THEMES[p.theme]) {
      const t = THEMES[p.theme];
      Object.keys(t).forEach(k => root.style.setProperty(k, t[k]));
    }

    // Typography
    root.style.setProperty('--blog-font-size', p.fontSize + 'px');
    root.style.setProperty('--blog-content-width', p.contentWidth + 'vw');
    root.style.setProperty('--blog-font-family', p.fontFamily);
    root.style.setProperty('--blog-line-height', p.lineHeight);
    root.style.setProperty('--blog-letter-spacing', p.letterSpacing + 'em');
    root.style.setProperty('--blog-paragraph-spacing', p.paragraphSpacing + 'em');

    // Text alignment on post body
    const bodyEl = document.querySelector('.blog-post-body');
    if (bodyEl) {
      bodyEl.style.textAlign = p.textAlign;
    }

    // TOC visibility
    const tocEl = document.querySelector('.blog-toc');
    if (tocEl) {
      tocEl.style.display = p.showToc ? '' : 'none';
    }
  }

  /**
   * Mix two hex colors. Returns a hex string.
   * ratio = how much of colorA to use (0..1).
   */
  function mixColor(colorA, ratio, colorB) {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);
    if (!a || !b) return colorA;

    const r = Math.round(a.r * ratio + b.r * (1 - ratio));
    const g = Math.round(a.g * ratio + b.g * (1 - ratio));
    const bl = Math.round(a.b * ratio + b.b * (1 - ratio));
    return `rgb(${r}, ${g}, ${bl})`;
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Set a specific preference and apply it.
   */
  function set(key, value) {
    const p = get();
    p[key] = value;
    save();
    applyToDOM();
  }

  /**
   * Reset all preferences to defaults.
   */
  function resetToDefaults() {
    _prefs = { ...DEFAULTS };
    save();
    applyToDOM();
  }

  /**
   * Initialize the preferences panel UI.
   * Should be called after DOM is ready.
   */
  function initPanel() {
    const prefs = get();

    const backdrop = document.getElementById('blogPrefsBackdrop');
    const panel = document.getElementById('blogPrefsPanel');
    const trigger = document.getElementById('blogPrefsTrigger');
    const closeBtn = document.getElementById('blogPrefsClose');

    if (!backdrop || !panel || !trigger) return;

    function openPanel() {
      backdrop.classList.add('visible');
      panel.classList.add('visible');
      panel.focus();
    }

    function closePanel() {
      backdrop.classList.remove('visible');
      panel.classList.remove('visible');
    }

    trigger.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);

    // Escape key closes panel
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closePanel();
    });

    // ── Theme buttons
    document.querySelectorAll('.blog-prefs-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.querySelectorAll('.blog-prefs-theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        set('theme', theme);

        const customColors = document.getElementById('blogPrefsCustomColors');
        if (customColors) {
          customColors.classList.toggle('visible', theme === 'custom');
        }
      });

      // Mark initial active
      if (btn.dataset.theme === prefs.theme) {
        btn.classList.add('active');
      }
    });

    // Show custom color pickers if custom theme active
    const customColors = document.getElementById('blogPrefsCustomColors');
    if (customColors && prefs.theme === 'custom') {
      customColors.classList.add('visible');
    }

    // ── Custom color pickers
    const bgPicker = document.getElementById('blogPrefsCustomBg');
    const textPicker = document.getElementById('blogPrefsCustomText');
    if (bgPicker) {
      bgPicker.value = prefs.customBg;
      bgPicker.addEventListener('input', () => {
        set('customBg', bgPicker.value);
      });
    }
    if (textPicker) {
      textPicker.value = prefs.customText;
      textPicker.addEventListener('input', () => {
        set('customText', textPicker.value);
      });
    }

    // ── Font size slider
    initSlider('blogPrefsFontSize', 'blogPrefsFontSizeVal', 'fontSize', v => v + 'px');

    // ── Content width slider
    initSlider('blogPrefsContentWidth', 'blogPrefsContentWidthVal', 'contentWidth', v => v + '%');

    // ── Line height slider
    initSlider('blogPrefsLineHeight', 'blogPrefsLineHeightVal', 'lineHeight', v => v, true);

    // ── Letter spacing slider
    initSlider('blogPrefsLetterSpacing', 'blogPrefsLetterSpacingVal', 'letterSpacing', v => v + 'em', true);

    // ── Paragraph spacing slider
    initSlider('blogPrefsParagraphSpacing', 'blogPrefsParagraphSpacingVal', 'paragraphSpacing', v => v + 'em', true);

    // ── Text alignment buttons
    document.querySelectorAll('.blog-prefs-align-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.blog-prefs-align-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        set('textAlign', btn.dataset.align);
      });
      if (btn.dataset.align === prefs.textAlign) {
        btn.classList.add('active');
      }
    });

    // ── Font family select
    const fontSelect = document.getElementById('blogPrefsFontFamily');
    if (fontSelect) {
      fontSelect.value = prefs.fontFamily;
      fontSelect.addEventListener('change', () => {
        set('fontFamily', fontSelect.value);
      });
    }

    // ── Show TOC toggle
    const tocToggle = document.getElementById('blogPrefsTocToggle');
    if (tocToggle) {
      if (prefs.showToc) tocToggle.classList.add('active');
      tocToggle.addEventListener('click', () => {
        const newVal = !get().showToc;
        tocToggle.classList.toggle('active', newVal);
        set('showToc', newVal);
      });
    }

    // ── Reset button
    const resetBtn = document.getElementById('blogPrefsReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetToDefaults();
        // Re-sync all UI controls
        syncPanelUI();
      });
    }
  }

  /**
   * Initialize a slider control with live readout.
   */
  function initSlider(sliderId, readoutId, prefKey, formatter, isFloat = false) {
    const slider = document.getElementById(sliderId);
    const readout = document.getElementById(readoutId);
    if (!slider || !readout) return;

    const prefs = get();
    slider.value = prefs[prefKey];
    readout.textContent = formatter(prefs[prefKey]);

    slider.addEventListener('input', () => {
      const val = isFloat ? parseFloat(slider.value) : parseInt(slider.value, 10);
      readout.textContent = formatter(val);
      set(prefKey, val);
    });
  }

  /**
   * Synchronize all panel UI controls to current prefs (after reset).
   */
  function syncPanelUI() {
    const p = get();

    // Theme buttons
    document.querySelectorAll('.blog-prefs-theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === p.theme);
    });

    const customColors = document.getElementById('blogPrefsCustomColors');
    if (customColors) {
      customColors.classList.toggle('visible', p.theme === 'custom');
    }

    // Color pickers
    const bgPicker = document.getElementById('blogPrefsCustomBg');
    const textPicker = document.getElementById('blogPrefsCustomText');
    if (bgPicker) bgPicker.value = p.customBg;
    if (textPicker) textPicker.value = p.customText;

    // Sliders
    syncSlider('blogPrefsFontSize', 'blogPrefsFontSizeVal', p.fontSize, v => v + 'px');
    syncSlider('blogPrefsContentWidth', 'blogPrefsContentWidthVal', p.contentWidth, v => v + '%');
    syncSlider('blogPrefsLineHeight', 'blogPrefsLineHeightVal', p.lineHeight, v => v);
    syncSlider('blogPrefsLetterSpacing', 'blogPrefsLetterSpacingVal', p.letterSpacing, v => v + 'em');
    syncSlider('blogPrefsParagraphSpacing', 'blogPrefsParagraphSpacingVal', p.paragraphSpacing, v => v + 'em');

    // Alignment
    document.querySelectorAll('.blog-prefs-align-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.align === p.textAlign);
    });

    // Font family
    const fontSelect = document.getElementById('blogPrefsFontFamily');
    if (fontSelect) fontSelect.value = p.fontFamily;

    // TOC toggle
    const tocToggle = document.getElementById('blogPrefsTocToggle');
    if (tocToggle) tocToggle.classList.toggle('active', p.showToc);
  }

  function syncSlider(sliderId, readoutId, value, formatter) {
    const slider = document.getElementById(sliderId);
    const readout = document.getElementById(readoutId);
    if (slider) slider.value = value;
    if (readout) readout.textContent = formatter(value);
  }

  return {
    THEMES,
    DEFAULTS,
    FONT_OPTIONS,
    load,
    save,
    get,
    set,
    applyToDOM,
    resetToDefaults,
    initPanel,
    syncPanelUI
  };
})();
