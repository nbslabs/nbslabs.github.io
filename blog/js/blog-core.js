/**
 * blog-core.js — Shared utilities for the nbslabs blog system.
 *
 * Responsibilities:
 * - Fetch and cache blog-index.json
 * - Bootstrap Markdown parser (marked.js) with custom config
 * - Image placeholder replacement
 * - Utility helpers (slugify, date formatting, reading time)
 */

const BlogCore = (() => {
  'use strict';

  let _cachedIndex = null;

  /**
   * Fetch and cache blog-index.json. Returns { posts: [...] }.
   * Only fetches once; subsequent calls return the cached result.
   */
  async function fetchIndex(indexPath = 'blog-index.json') {
    if (_cachedIndex) return _cachedIndex;

    const res = await fetch(indexPath);
    if (!res.ok) throw new Error(`Failed to fetch blog index: ${res.status}`);
    _cachedIndex = await res.json();
    return _cachedIndex;
  }

  /**
   * Get only published posts, sorted newest-first.
   */
  function getPublishedPosts(data) {
    return data.posts
      .filter(p => p.status === 'published')
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }

  /**
   * Configure marked.js with GFM, custom heading IDs, and highlight.js.
   * Call this after marked.js and highlight.js are loaded.
   */
  function configureMarked() {
    if (typeof marked === 'undefined') {
      console.error('marked.js not loaded');
      return;
    }

    const renderer = new marked.Renderer();

    // Custom heading renderer: add id attributes (slug of heading text)
    renderer.heading = function(text, level) {
      // marked v12+ passes an object; older versions pass (text, level, raw)
      let headingText, headingLevel;
      if (typeof text === 'object' && text.tokens !== undefined) {
        headingText = text.text;
        headingLevel = text.depth;
      } else {
        headingText = text;
        headingLevel = level;
      }
      const slug = slugify(headingText);
      return `<h${headingLevel} id="${slug}">${headingText}</h${headingLevel}>`;
    };

    // Custom code block renderer: ensure hljs class is always present
    renderer.code = function(code, language) {
      // marked v12+ passes an object; older versions pass (code, language)
      let codeText, lang;
      if (typeof code === 'object' && code.text !== undefined) {
        codeText = code.text;
        lang = code.lang || '';
      } else {
        codeText = code;
        lang = language || '';
      }

      // Attempt highlight.js highlighting if available
      let highlighted = codeText;
      if (typeof hljs !== 'undefined') {
        try {
          if (lang && hljs.getLanguage(lang)) {
            highlighted = hljs.highlight(codeText, { language: lang }).value;
          } else {
            highlighted = hljs.highlightAuto(codeText).value;
          }
        } catch (_) {
          // Fallback to raw code
        }
      }

      const langClass = lang ? `language-${lang} ` : '';
      return `<pre><code class="${langClass}hljs">${highlighted}</code></pre>`;
    };

    marked.setOptions({
      renderer,
      gfm: true,
      breaks: false,
      mangle: false,
      headerIds: false
    });
  }

  /**
   * Replace [[IMG_N]] placeholders in raw markdown text with <figure> HTML.
   *
   * @param {string} mdText - Raw markdown content
   * @param {Array} inlineImages - Array from blog-index.json entry
   * @returns {string} Markdown with placeholders replaced by HTML figures
   */
  function replaceImagePlaceholders(mdText, inlineImages) {
    if (!inlineImages || inlineImages.length === 0) return mdText;

    const placeholderMap = {};
    inlineImages.forEach(img => {
      placeholderMap[img.placeholder] = img;
    });

    return mdText.replace(/\[\[IMG_\d+\]\]/g, match => {
      const img = placeholderMap[match];
      if (!img) {
        console.warn(`Blog: No matching inline image for placeholder "${match}"`);
        return match; // Leave as literal text
      }

      let html = `<figure class="blog-inline-figure">
  <img src="${img.src}" alt="${img.alt}" loading="lazy" />`;

      if (img.caption) {
        html += `
  <figcaption>${img.caption}</figcaption>`;
      }

      html += `
</figure>`;

      return html;
    });
  }

  /**
   * Convert a heading string to a URL-safe slug.
   */
  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/<[^>]*>/g, '')         // Strip HTML tags
      .replace(/[^\w\s-]/g, '')        // Remove non-word chars
      .replace(/\s+/g, '-')           // Spaces to hyphens
      .replace(/-+/g, '-')            // Collapse multiple hyphens
      .replace(/^-|-$/g, '');          // Trim leading/trailing hyphens
  }

  /**
   * Format a date string according to locale and format options.
   */
  function formatDate(dateStr, locale = 'en-US', options = { year: 'numeric', month: 'long', day: 'numeric' }) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(locale, options);
  }

  /**
   * Calculate reading time from text (approx. 200 wpm).
   */
  function calcReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }

  /**
   * Render Markdown text to HTML, with image placeholders replaced.
   */
  function renderMarkdown(mdText, inlineImages) {
    const processed = replaceImagePlaceholders(mdText, inlineImages);
    // marked.js output is from our own repo — controlled content
    return marked.parse(processed);
  }

  return {
    fetchIndex,
    getPublishedPosts,
    configureMarked,
    replaceImagePlaceholders,
    renderMarkdown,
    slugify,
    formatDate,
    calcReadingTime
  };
})();

// ── Nav scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}
