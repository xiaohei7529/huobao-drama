# 🔥 火爆短剧 (Huobao Drama)

> 聚合全网热门短剧，提供便捷的观看和管理体验

[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Version](https://img.shields.io/badge/version-0.1.0-orange)]()

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
huobao-drama-setup-0.1.0.exe

# 或使用 winget
winget install huobao-drama
```

#### macOS

```bash
# 使用 Homebrew
brew install --cask huobao-drama

# 或下载 DMG 文件
huobao-drama-0.1.0.dmg
```

#### Linux

```bash
# Debian/Ubuntu
sudo apt install ./huobao-drama_0.1.0_amd64.deb

# Fedora/RHEL
sudo dnf install huobao-drama-0.1.0.x86_64.rpm

# AppImage
./huobao-drama-0.1.0.AppImage
```

---

## 📦 开发指南

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
# 所有平台
npm run build

# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Electron 28 + Vue 3 |
| **语言** | TypeScript + JavaScript |
| **UI** | Element Plus |
| **状态管理** | Pinia |
| **构建工具** | Vite + Electron-builder |
| **数据库** | SQLite (lowdb) |

---

## 📁 项目结构

```
huobao-drama/
├── src/                    # 源代码
│   ├── main/               # 主进程
│   ├── renderer/           # 渲染进程
│   ├── preload/            # 预加载脚本
│   └── utils/              # 工具函数
├── public/                 # 静态资源
├── build/                  # 构建配置
├── dist/                   # 构建输出
├── package.json            # 项目配置
└── electron-builder.yml    # Electron 打包配置
```

---

## 📋 开发计划

### v0.1.0 (当前版本)
- [x] 项目基础架构
- [x] Windows 打包支持
- [ ] 基础 UI 界面
- [ ] 短剧列表展示

### v0.2.0
- [ ] 短剧搜索功能
- [ ] 播放历史记录
- [ ] 收藏功能

### v0.3.0
- [ ] 智能推荐系统
- [ ] 更新通知
- [ ] 多平台同步

### v1.0.0
- [ ] 完整功能
- [ ] 性能优化
- [ ] 正式发布

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

MIT License

---

## 📞 联系方式

- **Issues**: [GitHub Issues](https://github.com/xiaohei7529/huobao-drama/issues)
- **Email**: xiaohei7529@gmail.com

---

**Made with ❤️ by Huobao Team**
