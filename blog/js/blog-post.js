/**
 * blog-post.js — Logic for blog/post.html (reader page)
 *
 * Reads ?post={id} from URL, finds the post in blog-index.json,
 * fetches the .md file, runs image replacement, renders via marked.js,
 * generates the TOC, handles prev/next navigation.
 */

(() => {
  'use strict';

  const postId = new URLSearchParams(window.location.search).get('post');

  // DOM references
  const coverImg = document.getElementById('blogPostCover');
  const tagsTop = document.getElementById('blogPostTagsTop');
  const titleEl = document.getElementById('blogPostTitle');
  const bylineEl = document.getElementById('blogPostByline');
  const bodyEl = document.getElementById('blogPostBody');
  const footerTags = document.getElementById('blogPostFooterTags');
  const navContainer = document.getElementById('blogPostNav');
  const tocList = document.getElementById('blogTocList');
  const skeletonEl = document.getElementById('blogPostSkeleton');
  const errorEl = document.getElementById('blogPostError');
  const contentEl = document.getElementById('blogPostContent');

  // ── Initialize ─────────────────────────────────────────────
  init();

  async function init() {
    // Apply reader prefs before anything renders
    BlogReaderPrefs.load();
    BlogReaderPrefs.applyToDOM();
    BlogReaderPrefs.initPanel();

    if (!postId) {
      showError('Post not found', 'No post ID was provided in the URL.');
      return;
    }

    try {
      // Configure marked
      BlogCore.configureMarked();

      const data = await BlogCore.fetchIndex('blog-index.json');
      const publishedPosts = BlogCore.getPublishedPosts(data);

      // Sort ascending for prev/next navigation (per spec)
      const sortedAsc = [...publishedPosts].sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );

      const postIndex = sortedAsc.findIndex(p => p.id === postId);
      if (postIndex === -1) {
        showError('Post not found', `No post with ID "${postId}" was found.`);
        return;
      }

      const post = sortedAsc[postIndex];

      // Fetch the markdown file
      const mdRes = await fetch(post.filePath);
      if (!mdRes.ok) {
        showError('Failed to load post', 'The post file could not be fetched. It may have been moved or deleted.');
        return;
      }
      const mdText = await mdRes.text();

      // Set page title
      document.title = `${post.title} - nbslabs Blog`;

      // Render post
      renderPost(post, mdText);

      // Generate TOC
      generateTOC();

      // Prev/Next navigation
      renderNav(sortedAsc, postIndex);

      // Show content, hide skeleton
      if (skeletonEl) skeletonEl.style.display = 'none';
      if (contentEl) contentEl.style.display = '';

      // Syntax highlighting
      if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }

      // Active section tracking for TOC
      setupTOCHighlighting();

    } catch (err) {
      console.error('Blog post: Error loading post', err);
      showError('Failed to load post', 'An unexpected error occurred. Please try again.');
    }
  }

  // ── Render post ────────────────────────────────────────────
  function renderPost(post, mdText) {
    // Cover image
    if (coverImg) {
      coverImg.src = post.coverImage.src;
      coverImg.alt = post.coverImage.alt;
    }

    // Tags at top (category · tag · tag)
    if (tagsTop) {
      const parts = [post.category, ...(post.tags || [])];
      tagsTop.innerHTML = parts.map((t, i) => {
        let html = `<span class="blog-post-tag-top">${t}</span>`;
        if (i < parts.length - 1) {
          html += `<span class="blog-post-tag-sep">·</span>`;
        }
        return html;
      }).join(' ');
    }

    // Title
    if (titleEl) titleEl.textContent = post.title;

    // Byline: Author · Date · N min read
    if (bylineEl) {
      const calcTime = BlogCore.calcReadingTime(mdText);
      const readTime = post.readingTimeMinutes || calcTime;
      const dateStr = BlogCore.formatDate(post.publishedAt);

      let bylineHtml = `
        <span>${post.author}</span>
        <span class="blog-post-byline-sep"></span>
        <time datetime="${post.publishedAt}">${dateStr}</time>`;

      if (post.updatedAt && post.updatedAt !== post.publishedAt) {
        const updatedStr = BlogCore.formatDate(post.updatedAt);
        bylineHtml += `
        <span class="blog-post-byline-sep"></span>
        <span>Updated ${updatedStr}</span>`;
      }

      bylineHtml += `
        <span class="blog-post-byline-sep"></span>
        <span>${readTime} min read</span>`;

      bylineEl.innerHTML = bylineHtml;
    }

    // Post body — markdown rendered to HTML
    // Note: marked.js output is from our own repo files — controlled content
    if (bodyEl) {
      bodyEl.innerHTML = BlogCore.renderMarkdown(mdText, post.inlineImages);
    }

    // Footer tags
    if (footerTags) {
      footerTags.innerHTML = `
        <span class="blog-post-footer-tags-label">Tags:</span>
        ${(post.tags || []).map(t =>
          `<a href="index.html" class="blog-post-footer-tag">${t}</a>`
        ).join('')}`;
    }
  }

  // ── Table of Contents ──────────────────────────────────────
  function generateTOC() {
    if (!tocList || !bodyEl) return;

    const headings = bodyEl.querySelectorAll('h2, h3');
    if (headings.length === 0) {
      const tocSection = document.querySelector('.blog-toc');
      if (tocSection) tocSection.style.display = 'none';
      return;
    }

    let html = '';
    headings.forEach(h => {
      const level = h.tagName.toLowerCase();
      const id = h.id || BlogCore.slugify(h.textContent);
      if (!h.id) h.id = id;

      const cls = level === 'h3' ? 'blog-toc-h3' : '';
      html += `<a href="#${id}" class="${cls}" aria-label="Jump to: ${h.textContent}">${h.textContent}</a>`;
    });

    tocList.innerHTML = html;

    // Also populate mobile TOC
    const mobileTocList = document.getElementById('blogTocMobileList');
    if (mobileTocList) {
      mobileTocList.innerHTML = html;

      // Close mobile panel on link click
      mobileTocList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          const mobilePanel = document.getElementById('blogTocMobilePanel');
          if (mobilePanel) mobilePanel.classList.remove('visible');
        });
      });
    }
  }

  // ── TOC Active Section Highlighting ────────────────────────
  function setupTOCHighlighting() {
    if (!bodyEl) return;

    const headings = bodyEl.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    const tocLinks = document.querySelectorAll('.blog-toc-list a, #blogTocMobileList a');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      rootMargin: '-120px 0px -60% 0px',
      threshold: 0
    });

    headings.forEach(h => observer.observe(h));
  }

  // ── Prev/Next Navigation ───────────────────────────────────
  function renderNav(sortedPosts, currentIndex) {
    if (!navContainer) return;

    const prev = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    const next = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

    let html = '';

    if (prev) {
      html += `
        <a href="post.html?post=${prev.id}" class="blog-post-nav-link prev">
          <span class="blog-post-nav-label">← Previous</span>
          <span class="blog-post-nav-title">${prev.title}</span>
        </a>`;
    } else {
      html += '<div></div>';
    }

    if (next) {
      html += `
        <a href="post.html?post=${next.id}" class="blog-post-nav-link next">
          <span class="blog-post-nav-label">Next →</span>
          <span class="blog-post-nav-title">${next.title}</span>
        </a>`;
    } else {
      html += '<div></div>';
    }

    navContainer.innerHTML = html;
  }

  // ── Error State ────────────────────────────────────────────
  function showError(title, message) {
    if (skeletonEl) skeletonEl.style.display = 'none';
    if (contentEl) contentEl.style.display = 'none';
    if (errorEl) {
      errorEl.style.display = '';
      errorEl.innerHTML = `
        <div class="blog-error-state-icon">📄</div>
        <h2>${title}</h2>
        <p>${message}</p>
        <a href="index.html" class="blog-error-link">← Back to Blog</a>
        <button class="blog-error-retry" onclick="window.location.reload()">Retry</button>`;
    }
  }

  // ── Nav scroll shadow ──────────────────────────────────────
  const nav = document.querySelector('.blog-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ── Mobile TOC toggle ──────────────────────────────────────
  const tocFloatBtn = document.getElementById('blogTocFloatBtn');
  const tocMobilePanel = document.getElementById('blogTocMobilePanel');
  if (tocFloatBtn && tocMobilePanel) {
    tocFloatBtn.addEventListener('click', () => {
      tocMobilePanel.classList.toggle('visible');
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!tocMobilePanel.contains(e.target) && !tocFloatBtn.contains(e.target)) {
        tocMobilePanel.classList.remove('visible');
      }
    });
  }
})();
