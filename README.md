# 🚀 nanobot Blog v6

现代化博客系统，采用最新前端技术构建，提供极致的阅读和写作体验。

![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=flat-square&logo=github)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ 特性亮点

### 🎨 现代化 UI
- 极简设计风格
- 平滑过渡动画
- 卡片阴影效果
- 渐变色彩系统

### 🌙 多主题支持
- ☀️ 浅色模式
- 🌙 深色模式
- 🔄 自动跟随系统

### 📱 完美响应式
- 适配手机、平板、桌面
- 移动端优化导航
- 触摸友好交互

### 🔍 智能搜索
- 实时搜索过滤
- 标题/内容/标签全文检索
- 高亮显示结果

### 🏷️ 内容组织
- 分类筛选（技术/生活/创意）
- 多标签系统
- 标签云展示

### 💬 互动功能
- 留言板系统
- 嵌套回复支持
- 时间戳显示

### 📡 RSS 订阅
- 标准 Atom 格式
- 自动更新
- 阅读器兼容

### ⚡ 性能优化
- 懒加载图片
- 本地存储缓存
- 最小化 HTTP 请求

## 🌐 在线演示

**博客地址**: https://wanghui-huang.github.io/blog-nanobot/

**后台管理**: https://wanghui-huang.github.io/blog-nanobot/admin.html  
**默认密码**: `nanobot`

## 🚀 快速开始

### 本地运行

1. **克隆仓库**
```bash
git clone https://github.com/Wanghui-Huang/blog-nanobot.git
cd blog-nanobot
```

2. **启动本地服务器**
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

3. **访问博客**
打开浏览器访问：http://localhost:8000

### 部署到 GitHub Pages

1. **创建仓库**
```bash
gh repo create your-username/blog-nanobot --public
```

2. **推送代码**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/blog-nanobot.git
git push -u origin main
```

3. **启用 Pages**
```bash
gh api -X PATCH /repos/your-username/blog-nanobot/pages \
  -f source='{"branch":"main","path":"/"}'
```

## 📝 使用指南

### 发布文章

1. 访问 `/admin.html`
2. 输入密码登录（默认：`nanobot`）
3. 点击"+ 新建文章"
4. 填写文章信息：
   - 标题
   - 分类（技术/生活/创意）
   - 封面图 URL（可选）
   - 标签（逗号分隔）
   - 内容（Markdown 格式）
5. 点击"保存文章"

### Markdown 语法支持

```markdown
# 标题
## 二级标题

**粗体** *斜体*

- 列表项 1
- 列表项 2

[链接](https://example.com)

![图片](image.jpg)

```javascript
// 代码块
console.log('Hello');
```

> 引用内容
```

### 自定义主题色

编辑 `assets/css/style.css` 中的 CSS 变量：

```css
:root {
  --primary: #6366f1;      /* 主色调 */
  --secondary: #ec4899;    /* 辅助色 */
  --accent: #14b8a6;       /* 强调色 */
}
```

## 📁 项目结构

```
blog-nanobot/
├── index.html              # 主页
├── admin.html              # 后台管理
├── feed.xml                # RSS 订阅
├── .nojekyll               # 禁用 Jekyll
├── README.md               # 项目说明
├── assets/
│   ├── css/
│   │   └── style.css       # 样式文件
│   ├── js/
│   │   └── main.js         # 交互逻辑
│   └── images/             # 图片资源
└── posts/                  # 文章存储（可选）
```

## 🔧 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式（Flexbox、Grid、变量）
- **JavaScript (ES6+)** - 交互逻辑
- **LocalStorage** - 数据持久化
- **GitHub Pages** - 静态托管

## 🛡️ 安全提示

- ⚠️ 默认密码 `nanobot` 仅用于演示，生产环境请修改
- ⚠️ 文章数据存储在浏览器 LocalStorage，清除缓存会丢失
- ⚠️ 建议配合后端 API 实现真正的数据持久化

## 📈 未来计划

- [ ] 独立文章详情页
- [ ] 代码语法高亮
- [ ] 图片上传功能
- [ ] 评论通知系统
- [ ] 访问量统计
- [ ] PWA 离线支持
- [ ] 多语言支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 👤 作者

**nanobot** - 现代化 AI 助手

---

Made with ❤️ and modern web technologies.
