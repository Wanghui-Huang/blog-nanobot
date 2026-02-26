// ====== nanobot Blog v6 - Main JavaScript ======

// ====== State ======
let articles = [];
let comments = [];
let currentFilter = 'all';
let currentSearch = '';

// ====== Initialize ======
document.addEventListener('DOMContentLoaded', function() {
  loadArticles();
  loadComments();
  renderArticles();
  renderComments();
  setupEventListeners();
  loadTheme();
  updateScrollProgress();
});

// ====== Theme Management ======
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  updateThemeButtons(savedTheme);
}

function applyTheme(theme) {
  if (theme === 'auto') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', systemDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

function updateThemeButtons(activeTheme) {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === activeTheme);
  });
}

function setupEventListeners() {
  // Theme toggle
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.dataset.theme;
      localStorage.setItem('theme', theme);
      applyTheme(theme);
      updateThemeButtons(theme);
    });
  });
  
  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      currentSearch = e.target.value.toLowerCase().trim();
      renderArticles();
    });
  }
  
  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      renderArticles();
    });
  });
  
  // Comment form
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentSubmit);
  }
  
  // Scroll progress
  window.addEventListener('scroll', updateScrollProgress);
}

function updateScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;
  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  
  progressBar.style.width = progress + '%';
}

// ====== Articles ======
function loadArticles() {
  // Try to load from localStorage first
  const stored = localStorage.getItem('articles');
  if (stored) {
    articles = JSON.parse(stored);
    return;
  }
  
  // Default sample articles
  articles = [
    {
      id: 1,
      title: '欢迎使用 nanobot 现代化博客',
      category: 'tech',
      tags: ['博客', '技术', '教程'],
      cover: '',
      content: `# 欢迎使用 nanobot 现代化博客 🎉

这是一个完全现代化的博客系统，采用最新的前端技术构建。

## ✨ 主要特性

- 🎨 **现代化 UI**：极简设计、平滑动画、响应式布局
- 🌙 **多主题支持**：浅色/深色/自动跟随系统
- 📱 **完美响应式**：适配手机、平板、桌面
- 🔍 **实时搜索**：快速找到你想要的文章
- 🏷️ **标签系统**：多维度内容组织
- 💬 **留言板**：与读者互动交流
- 📡 **RSS 订阅**：不错过任何更新

## 🚀 快速开始

1. 点击右下角"管理"进入后台
2. 输入密码 \`nanobot\` 登录
3. 点击"新建文章"开始创作
4. 使用 Markdown 编写内容
5. 保存后即可在首页查看

## 📝 Markdown 支持

支持标准 Markdown 语法：

\`\`\`javascript
// 代码高亮
function hello() {
  console.log('Hello, World!');
}
\`\`\`

- 列表项 1
- 列表项 2
- 列表项 3

> 引用块：这是引用内容

开始你的博客之旅吧！`,
      date: new Date().toISOString(),
      readTime: 3
    },
    {
      id: 2,
      title: '现代 Web 开发最佳实践',
      category: 'tech',
      tags: ['Web', 'JavaScript', '最佳实践'],
      cover: '',
      content: `# 现代 Web 开发最佳实践

在 2026 年，Web 开发已经发生了翻天覆地的变化。

## 1. 组件化开发

将 UI 拆分为独立、可复用的组件。

## 2. 响应式设计

确保在所有设备上都有良好体验。

## 3. 性能优化

- 懒加载图片
- 代码分割
- 缓存策略

## 4. 可访问性

让所有人都能使用你的网站。

## 5. SEO 优化

提高搜索引擎排名。

---

持续学习，保持进步！`,
      date: new Date(Date.now() - 86400000).toISOString(),
      readTime: 5
    },
    {
      id: 3,
      title: '我的 2026 年目标',
      category: 'life',
      tags: ['生活', '目标', '成长'],
      cover: '',
      content: `# 我的 2026 年目标 🎯

新的一年，新的开始！

## 学习目标

- [ ] 掌握 Rust 编程语言
- [ ] 深入学习机器学习
- [ ] 完成 3 个开源项目

## 健康目标

- [ ] 每周运动 3 次
- [ ] 每天阅读 30 分钟
- [ ] 保持规律作息

## 旅行计划

- [ ] 日本樱花季
- [ ] 冰岛极光
- [ ] 新西兰徒步

---

**记住：目标不是用来实现的，是用来指引方向的。**`,
      date: new Date(Date.now() - 172800000).toISOString(),
      readTime: 4
    }
  ];
  
  // Save to localStorage
  localStorage.setItem('articles', JSON.stringify(articles));
}

function renderArticles() {
  const grid = document.getElementById('articleGrid');
  if (!grid) return;
  
  let filtered = articles;
  
  // Apply category filter
  if (currentFilter !== 'all') {
    filtered = filtered.filter(a => a.category === currentFilter);
  }
  
  // Apply search
  if (currentSearch) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(currentSearch) ||
      a.content.toLowerCase().includes(currentSearch) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(currentSearch)))
    );
  }
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-secondary);">
        <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
        <h3>没有找到文章</h3>
        <p>尝试调整搜索词或筛选条件</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filtered.map(article => {
    const tags = article.tags || [];
    const date = new Date(article.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Generate excerpt from content
    const excerpt = article.content
      .replace(/[#*`\[\]]/g, '')
      .replace(/\n+/g, ' ')
      .substring(0, 150) + '...';
    
    return `
      <article class="article-card" onclick="viewArticle(${article.id})">
        <div class="article-cover" style="${article.cover ? `background-image: url(${article.cover}); background-size: cover;` : ''}"></div>
        <div class="article-content">
          <div class="article-meta">
            <span class="tag">${getCategoryName(article.category)}</span>
            ${tags.slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <h3 class="article-title">${article.title}</h3>
          <p class="article-excerpt">${excerpt}</p>
        </div>
        <div class="article-footer">
          <span class="read-time">⏱️ ${article.readTime || 3} 分钟阅读</span>
          <span>${date}</span>
        </div>
      </article>
    `;
  }).join('');
}

function getCategoryName(category) {
  const names = {
    tech: '技术',
    life: '生活',
    creative: '创意'
  };
  return names[category] || category;
}

function viewArticle(id) {
  // For now, just show an alert - in v7 we'll add a dedicated article page
  const article = articles.find(a => a.id === id);
  if (article) {
    // Create a temporary modal to show article content
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal" style="max-width: 800px;">
        <div class="modal-header">
          <h2 class="modal-title">${article.title}</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        </div>
        <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
          <div style="margin-bottom: 20px;">
            <span class="tag">${getCategoryName(article.category)}</span>
            ${(article.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div style="line-height: 1.8; white-space: pre-wrap;">${article.content}</div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

// ====== Comments ======
function loadComments() {
  comments = JSON.parse(localStorage.getItem('blog-comments') || '[]');
}

function renderComments() {
  const list = document.getElementById('commentsList');
  if (!list) return;
  
  if (comments.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
        <div style="font-size: 2rem; margin-bottom: 12px;">💬</div>
        <p>还没有留言，快来抢沙发吧！</p>
      </div>
    `;
    return;
  }
  
  list.innerHTML = comments.map((comment, index) => `
    <div class="comment-item">
      <div class="comment-header">
        <span class="comment-author">${escapeHtml(comment.name)}</span>
        <span class="comment-date">${new Date(comment.date).toLocaleString('zh-CN')}</span>
      </div>
      <p class="comment-text">${escapeHtml(comment.text)}</p>
    </div>
  `).reverse().join('');
}

function handleCommentSubmit(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('commentName');
  const textInput = document.getElementById('commentText');
  
  const comment = {
    id: Date.now(),
    name: nameInput.value.trim(),
    text: textInput.value.trim(),
    date: new Date().toISOString()
  };
  
  comments.push(comment);
  localStorage.setItem('blog-comments', JSON.stringify(comments));
  
  nameInput.value = '';
  textInput.value = '';
  
  renderComments();
  
  // Show success message
  alert('留言发布成功！');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ====== Utility ======
window.viewArticle = viewArticle;
