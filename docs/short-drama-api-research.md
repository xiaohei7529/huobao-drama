# 📊 短剧 API 调研报告

**调研时间**: 2026-03-16  
**调研人**: AI Assistant  
**项目**: huobao-drama

---

## 🎯 调研目标

寻找可用的短剧视频 API，支持：
- 短剧列表获取
- 剧集详情查询
- 视频播放链接
- 分类筛选
- 搜索功能

---

## 📋 候选 API 列表

### 1. 阿里云视频点播 (VOD)

**类型**: 商业 API  
**价格**: 按量付费  
**文档**: https://help.aliyun.com/product/29103.html

**优势**:
- ✅ 稳定可靠
- ✅ 文档完善
- ✅ 支持多种格式
- ✅ CDN 加速

**劣势**:
- ❌ 需要自己上传内容
- ❌ 成本较高

**推荐指数**: ⭐⭐⭐

---

### 2. 腾讯云点播

**类型**: 商业 API  
**价格**: 按量付费  
**文档**: https://cloud.tencent.com/product/vod

**优势**:
- ✅ 播放器 SDK 完善
- ✅ 支持 HLS/DASH
- ✅ 防盗链机制

**劣势**:
- ❌ 需要自己上传内容
- ❌ 配置复杂

**推荐指数**: ⭐⭐⭐

---

### 3. 聚合数据 - 短剧 API

**类型**: 第三方聚合 API  
**价格**: 免费/付费  
**文档**: https://www.juhe.cn/docs/api/id/239

**优势**:
- ✅ 现成内容
- ✅ 接口简单
- ✅ 成本低

**劣势**:
- ❌ 内容质量参差不齐
- ❌ 稳定性一般

**推荐指数**: ⭐⭐⭐⭐

---

### 4. 豆瓣 API (参考)

**类型**: 公开 API  
**价格**: 免费  
**文档**: https://developers.douban.com/wiki/?title=movie_v2

**优势**:
- ✅ 免费
- ✅ 数据质量高

**劣势**:
- ❌ 需要申请 API Key
- ❌ 有调用限制
- ❌ 主要是电影/电视剧

**推荐指数**: ⭐⭐

---

## 🎯 推荐方案

### 方案 A: 聚合数据 API (推荐)

**理由**:
1. 成本低，适合起步
2. 接口简单，快速集成
3. 内容现成，无需上传

**集成步骤**:
1. 注册账号获取 API Key
2. 调用短剧列表接口
3. 解析返回数据
4. 集成到播放器

---

### 方案 B: 自建内容库

**理由**:
1. 内容可控
2. 长期成本低
3. 可定制化

**实施步骤**:
1. 采购/制作短剧内容
2. 上传到阿里云 VOD
3. 开发管理后台
4. 集成播放器

---

## 📝 技术实现建议

### API 接口设计

```javascript
// 获取短剧列表
GET /api/dramas?page=1&limit=20&category=urban

// 获取短剧详情
GET /api/dramas/:id

// 获取播放链接
GET /api/dramas/:id/play-url

// 搜索短剧
GET /api/search?keyword=关键词
```

### 数据模型

```javascript
{
  id: string,
  title: string,
  cover: string,
  description: string,
  category: string,
  episodes: number,
  status: 'ongoing' | 'completed',
  rating: number,
  playUrl: string,
  createdAt: date
}
```

---

## ⏰ 下一步行动

1. [ ] 申请聚合数据 API Key
2. [ ] 测试接口可用性
3. [ ] 编写集成代码
4. [ ] 添加到项目

---

*调研完成时间：2026-03-16*
