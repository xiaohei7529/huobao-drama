# 🛠️ 开发指南

**火爆短剧开发文档**

---

## 📋 目录

1. [环境准备](#环境准备)
2. [快速开始](#快速开始)
3. [项目结构](#项目结构)
4. [开发规范](#开发规范)
5. [打包发布](#打包发布)
6. [常见问题](#常见问题)

---

## 环境准备

### 必需软件

| 软件 | 版本 | 下载链接 |
|------|------|----------|
| Node.js | >= 18.0.0 | https://nodejs.org |
| Git | >= 2.40.0 | https://git-scm.com |
| VS Code | 最新 | https://code.visualstudio.com |

### 推荐插件

- Vue Language Features (Volar)
- ESLint
- Prettier
- Electron

---

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/xiaohei7529/huobao-drama.git
cd huobao-drama
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

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

## 项目结构

```
huobao-drama/
├── src/                    # 源代码
│   ├── main/               # 主进程
│   │   └── main.js         # 主进程入口
│   ├── renderer/           # 渲染进程
│   │   ├── components/     # 组件
│   │   ├── views/          # 页面
│   │   ├── router/         # 路由
│   │   ├── store/          # 状态管理
│   │   ├── assets/         # 静态资源
│   │   ├── App.vue         # 根组件
│   │   └── main.js         # 渲染进程入口
│   ├── preload/            # 预加载脚本
│   │   └── preload.js
│   └── utils/              # 工具函数
├── public/                 # 公共静态资源
├── build/                  # 构建相关配置
│   └── icon.ico            # Windows 图标
├── scripts/                # 构建脚本
│   └── build-win.js        # Windows 打包脚本
├── dist/                   # 构建输出（开发）
├── release/                # 打包输出（生产）
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
├── electron-builder.yml    # Electron 打包配置
└── README.md               # 项目说明
```

---

## 开发规范

### 代码风格

遵循 ESLint 配置：

```bash
npm run lint
```

### 提交规范

使用 Conventional Commits:

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

示例：
```bash
git commit -m "feat: 添加短剧搜索功能"
```

### 分支管理

- `main` - 主分支（稳定版本）
- `develop` - 开发分支
- `feature/*` - 功能分支
- `bugfix/*` - 修复分支
- `release/*` - 发布分支

---

## 打包发布

### Windows 打包

```bash
# 方法 1: 使用 npm 脚本
npm run build:win

# 方法 2: 使用构建脚本
node scripts/build-win.js
```

**输出文件**:
- `release/火爆短剧 Setup 0.1.0.exe` - 安装程序
- `release/win-unpacked/` - 免安装版本

### macOS 打包

```bash
npm run build:mac
```

**输出文件**:
- `release/火爆短剧-0.1.0.dmg` - DMG 安装包

### Linux 打包

```bash
npm run build:linux
```

**输出文件**:
- `release/火爆短剧_0.1.0_amd64.deb` - Debian 包
- `release/火爆短剧-0.1.0.AppImage` - AppImage

---

## 常见问题

### Q: 依赖安装失败？

```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### Q: 打包时图标不显示？

确保图标文件存在：
- Windows: `build/icon.ico`
- macOS: `build/icon.icns`
- Linux: `build/icon.png`

### Q: 开发服务器启动失败？

检查端口占用：
```bash
# Windows
netstat -ano | findstr :5173

# macOS/Linux
lsof -i :5173
```

### Q: 打包后应用无法启动？

检查：
1. Node 版本是否 >= 18
2. 依赖是否完整安装
3. 查看应用日志

---

## 调试技巧

### 主进程调试

在 `main.js` 中添加：
```javascript
console.log('主进程日志')
```

查看日志：
- Windows: `%APPDATA%\huobao-drama\logs\main.log`
- macOS: `~/Library/Logs/huobao-drama/main.log`
- Linux: `~/.config/huobao-drama/logs/main.log`

### 渲染进程调试

开发模式下自动打开 DevTools：
```javascript
mainWindow.webContents.openDevTools()
```

---

## 性能优化

### 打包体积优化

1. 启用代码分割
2. 移除未使用依赖
3. 压缩静态资源

### 启动速度优化

1. 懒加载路由
2. 预加载关键资源
3. 减少主进程阻塞

---

## 测试

### 单元测试

```bash
npm run test
```

### E2E 测试

```bash
npm run test:e2e
```

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

---

**最后更新**: 2026-03-06  
**维护者**: xiaohei7529
