#!/usr/bin/env node

/**
 * Windows 打包构建脚本
 * 支持 Windows 10/11 x64
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 开始构建 Windows 版本...\n')

// 检查 Node 版本
const nodeVersion = process.version
console.log(`📦 Node 版本：${nodeVersion}`)

// 安装依赖
console.log('\n📥 安装依赖...')
try {
  execSync('npm install', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ 依赖安装失败')
  process.exit(1)
}

// 构建应用
console.log('\n🔨 构建应用...')
try {
  execSync('npm run build:app', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ 应用构建失败')
  process.exit(1)
}

// 打包 Windows 版本
console.log('\n📦 打包 Windows 版本...')
try {
  execSync('npm run build:win', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ Windows 打包失败')
  process.exit(1)
}

// 检查输出文件
const releaseDir = path.join(__dirname, '../release')
if (fs.existsSync(releaseDir)) {
  const files = fs.readdirSync(releaseDir)
  console.log('\n✅ 构建完成！输出文件:')
  files.forEach(file => {
    if (file.endsWith('.exe') || file.endsWith('.msi')) {
      console.log(`   📄 ${file}`)
    }
  })
} else {
  console.error('❌ 输出目录不存在')
  process.exit(1)
}

console.log('\n🎉 Windows 版本构建成功！')
