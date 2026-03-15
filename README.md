# 🔥 火爆短剧 (Huobao Drama)

> 聚合全网热门短剧，提供便捷的观看和管理体验

[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Version](https://img.shields.io/badge/version-0.2.0-orange)]()

---

## 📖 项目简介

**火爆短剧** 是一个跨平台的短剧聚合应用，支持 Windows、macOS 和 Linux 系统。

### 核心功能

- 🎬 **短剧聚合** - 聚合多个平台的热门短剧资源
- 🔍 **智能搜索** - 快速查找喜欢的短剧
- 📱 **播放管理** - 收藏、历史记录、播放列表
- 🔔 **更新通知** - 追更短剧自动通知
- 💻 **跨平台** - 支持 Windows/Mac/Linux

---

## 🚀 快速开始

### 安装

#### Windows

```bash
# 下载安装包
huobao-drama-setup-0.2.0.exe

# 或使用 winget
winget install huobao-drama
```

#### macOS

```bash
# 使用 Homebrew
brew install --cask huobao-drama

# 或下载 DMG 文件
huobao-drama-0.2.0.dmg
```

#### Linux

```bash
# 下载并安装
wget https://github.com/xiaohei7529/huobao-drama/releases/download/v0.2.0/huobao-drama-0.2.0.AppImage
chmod +x huobao-drama-0.2.0.AppImage
./huobao-drama-0.2.0.AppImage
```

---

## 📊 开发状态

**当前版本**: v0.2.0  
**开发状态**: 🟢 开发中  
**最后更新**: 2026-03-15

### 本周进展 (2026-03-09 至 2026-03-15)

**核心成就**:
- ✅ 短剧列表页面开发完成
- ✅ 网格/列表双视图实现
- ✅ 短剧详情页开发完成
- ✅ API 调研报告完成
- ✅ 视频播放器选型完成

**Git 统计**:
- 本周提交：20 次
- 代码行数：1200+ 行
- 文档数量：10 份

**已完成功能**:
- ✅ 项目基础架构
- ✅ Electron + Vue3 框架
- ✅ 基础 UI 界面
- ✅ 短剧列表页面 (筛选/排序/分页)
- ✅ 短剧详情页面
- ✅ 每日报告机制

**进行中**:
- 🔄 播放器组件集成 (Video.js)
- 🔄 API 数据对接

**下周计划**:
- [ ] Video.js 播放器集成
- [ ] 短剧 API 对接
- [ ] 收藏功能实现
- [ ] 历史记录功能

---

## 📁 项目结构

```
huobao-drama/
├── src/
│   ├── main/           # Electron 主进程
│   ├── preload/        # 预加载脚本
│   └── renderer/       # Vue 渲染进程
│       ├── views/      # 页面组件
│       │   ├── Home.vue
│       │   ├── DramaList.vue    # 短剧列表
│       │   ├── DramaDetail.vue  # 短剧详情
│       │   ├── Search.vue
│       │   ├── Favorites.vue
│       │   ├── History.vue
│       │   └── Settings.vue
│       └── router/     # 路由配置
├── docs/               # 文档
├── reports/            # 报告
└── package.json        # 项目配置
```

---

## 🛠️ 技术栈

### 桌面应用
- **框架**: Electron 28.0
- **前端**: Vue 3.4 + Element Plus 2.5
- **构建**: Vite 5.0
- **打包**: electron-builder

### 播放器
- **推荐**: Video.js (选型完成)
- **备选**: DPlayer, XGPlayer

### 状态管理
- **Pinia** 2.1

---

## 📖 文档导航

| 文档 | 说明 |
|------|------|
| [开发指南](DEVELOPMENT.md) | 开发环境配置 |
| [短剧列表功能](docs/drama-list-feature.md) | 列表页面功能说明 |
| [API 调研](docs/api-research.md) | 短剧 API 调研报告 |
| [播放器选型](docs/player-selection.md) | 播放器选型报告 |
| [路线图](ROADMAP.md) | 项目发展规划 |

---

## 🎬 页面功能

### 首页
- 轮播图推荐
- 热门推荐
- 最新更新

### 短剧列表
- 网格/列表视图切换
- 分类筛选 (都市/言情/逆袭等)
- 状态筛选 (连载中/已完结)
- 排序 (热门/最新/评分)
- 关键词搜索
- 分页功能

### 短剧详情
- 短剧信息展示
- 剧集列表
- 视频播放
- 收藏功能

### 搜索
- 关键词搜索
- 高级筛选

### 收藏
- 收藏列表
- 批量管理

### 历史
- 观看历史
- 继续观看

---

## 🤝 贡献指南

欢迎贡献代码、文档或建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交变更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 开源协议

本项目采用 MIT 协议开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

感谢以下开源项目：
- [Electron](https://www.electronjs.org/)
- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Video.js](https://videojs.com/)

---

## 📞 联系方式

- **GitHub**: https://github.com/xiaohei7529/huobao-drama
- **Issues**: https://github.com/xiaohei7529/huobao-drama/issues
- **Email**: xiaohei7529@gmail.com

---

*Huobao Drama v0.2.0 - 聚合全网热门短剧！* 🎬

**最后更新**: 2026-03-15
