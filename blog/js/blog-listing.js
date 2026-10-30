/**
 * blog-listing.js — Logic for blog/index.html (listing page)
 *
 * Fetches blog-index.json, renders post cards, handles filtering
 * by search text, category, and tags.
 */

/* ── Configuration ──────────────────────────────────────────── */
const BLOG_CONFIG = {
  blogName: "nbslabs Blog",              // Shown in listing hero
  blogTagline: "Research notes, technical reports, and open-source updates from the lab.", // Shown in listing hero
  indexPath: "blog-index.json",           // Path to JSON, relative to blog/
  postsPerPage: 0,                        // 0 = no pagination, show all
  dateLocale: "en-US",                    // For date formatting
  dateFormat: { year: "numeric", month: "long", day: "numeric" }
};

(() => {
  'use strict';

  // DOM references
  const heroTitle = document.getElementById('blogHeroTitle');
  const heroTagline = document.getElementById('blogHeroTagline');
  const searchInput = document.getElementById('blogSearch');
  const categorySelect = document.getElementById('blogCategory');
  const tagContainer = document.getElementById('blogTagChips');
  const clearFiltersBtn = document.getElementById('blogClearFilters');
  const cardGrid = document.getElementById('blogCardGrid');

  // State
  let allPosts = [];
  let activeCategory = '';
  let activeTags = new Set();
  let searchTerm = '';

  // Set hero text from config
  if (heroTitle) heroTitle.textContent = BLOG_CONFIG.blogName;
  if (heroTagline) heroTagline.textContent = BLOG_CONFIG.blogTagline;

  // ── Initialize ─────────────────────────────────────────────
  init();

  async function init() {
    showSkeleton();

    try {
      const data = await BlogCore.fetchIndex(BLOG_CONFIG.indexPath);
      allPosts = BlogCore.getPublishedPosts(data);
      populateFilters();
      renderCards();
    } catch (err) {
      console.error('Blog listing: Failed to load index', err);
      showError();
    }
  }

  // ── Filter population ──────────────────────────────────────
  function populateFilters() {
    // Categories
    const categories = [...new Set(allPosts.map(p => p.category))].sort();
    if (categorySelect) {
      categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
      });
    }

    // Tags
    const allTags = [...new Set(allPosts.flatMap(p => p.tags || []))].sort();
    if (tagContainer) {
      allTags.forEach(tag => {
        const chip = document.createElement('button');
        chip.className = 'blog-tag-chip';
        chip.textContent = tag;
        chip.addEventListener('click', () => toggleTag(tag, chip));
        tagContainer.appendChild(chip);
      });
    }

    // Event listeners
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        renderCards();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', () => {
        activeCategory = categorySelect.value;
        renderCards();
      });
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', clearFilters);
    }
  }

  function toggleTag(tag, chip) {
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
      chip.classList.remove('active');
    } else {
      activeTags.add(tag);
      chip.classList.add('active');
    }
    renderCards();
  }

  function clearFilters() {
    searchTerm = '';
    activeCategory = '';
    activeTags.clear();

    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = '';
    document.querySelectorAll('.blog-tag-chip').forEach(c => c.classList.remove('active'));

    renderCards();
  }

  // ── Filtering ──────────────────────────────────────────────
  function getFilteredPosts() {
    return allPosts.filter(post => {
      // Search filter (title, description, tags)
      if (searchTerm) {
        const haystack = (
          post.title + ' ' +
          post.description + ' ' +
          (post.tags || []).join(' ')
        ).toLowerCase();
        if (!haystack.includes(searchTerm)) return false;
      }

      // Category filter
      if (activeCategory && post.category !== activeCategory) return false;

      // Tag filter (all selected tags must be present)
      if (activeTags.size > 0) {
        const postTags = new Set(post.tags || []);
        for (const tag of activeTags) {
          if (!postTags.has(tag)) return false;
        }
      }

      return true;
    });
  }

  // ── Card rendering ─────────────────────────────────────────
  function renderCards() {
    const posts = getFilteredPosts();

    if (posts.length === 0) {
      cardGrid.innerHTML = `
        <div class="blog-empty-state" style="grid-column: 1 / -1;">
          <div class="blog-empty-state-icon">📭</div>
          <h3>No posts found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>`;
      return;
    }

    cardGrid.innerHTML = posts.map(post => {
      const readTime = post.readingTimeMinutes || '~5';
      const dateStr = BlogCore.formatDate(post.publishedAt, BLOG_CONFIG.dateLocale, BLOG_CONFIG.dateFormat);
      const tags = (post.tags || []).map(t =>
        `<span class="blog-card-tag">${t}</span>`
      ).join('');

      return `
        <article class="blog-card" onclick="window.location.href='post.html?post=${post.id}'" tabindex="0" role="link" aria-label="Read ${post.title}">
          <img class="blog-card-cover" src="${post.coverImage.src}" alt="${post.coverImage.alt}" loading="lazy" />
          <div class="blog-card-body">
            <span class="blog-card-category">${post.category}</span>
            <h2 class="blog-card-title">${post.title}</h2>
            <p class="blog-card-desc">${post.description}</p>
            <div class="blog-card-meta">
              <span>${post.author}</span>
              <span class="blog-card-meta-sep"></span>
              <time datetime="${post.publishedAt}">${dateStr}</time>
              <span class="blog-card-meta-sep"></span>
              <span>${readTime} min read</span>
            </div>
            <div class="blog-card-tags">${tags}</div>
          </div>
        </article>`;
    }).join('');

    // Allow keyboard nav on cards (Enter to click)
    cardGrid.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter') card.click();
      });
    });
  }

  // ── Skeleton loader ────────────────────────────────────────
  function showSkeleton() {
    if (!cardGrid) return;

    const skeletonCount = 6;
    let html = '';
    for (let i = 0; i < skeletonCount; i++) {
      html += `
        <div class="blog-skeleton-card">
          <div class="blog-skeleton blog-skeleton-cover"></div>
          <div class="blog-skeleton-card-body">
            <div class="blog-skeleton blog-skeleton-badge"></div>
            <div class="blog-skeleton blog-skeleton-title"></div>
            <div class="blog-skeleton blog-skeleton-desc"></div>
            <div class="blog-skeleton blog-skeleton-desc-short"></div>
            <div class="blog-skeleton blog-skeleton-meta"></div>
          </div>
        </div>`;
    }
    cardGrid.innerHTML = html;
  }

  // ── Error state ────────────────────────────────────────────
  function showError() {
    if (!cardGrid) return;
    cardGrid.innerHTML = `
      <div class="blog-error-state" style="grid-column: 1 / -1;">
        <div class="blog-error-state-icon">⚠️</div>
        <h2>Couldn't load posts</h2>
        <p>There was an error loading the blog index. Please try again.</p>
        <button class="blog-error-retry" onclick="window.location.reload()">Retry</button>
      </div>`;
  }

  // ── Nav scroll shadow ──────────────────────────────────────
  const nav = document.querySelector('.blog-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
})();
