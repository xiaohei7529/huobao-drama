#!/bin/bash
# 每日开发报告生成脚本
# 执行时间：每日 21:00

WORKSPACE="/home/feng/huobao-drama"
REPORTS_DIR="$WORKSPACE/reports"
DATE=$(date +%Y-%m-%d)
REPORT_FILE="$REPORTS_DIR/daily-$DATE.md"

mkdir -p "$REPORTS_DIR"

# 获取今日 Git 提交
COMMITS=$(cd "$WORKSPACE" && git log --since="00:00" --until="23:59" --oneline 2>/dev/null | wc -l)
COMMIT_LIST=$(cd "$WORKSPACE" && git log --since="00:00" --until="23:59" --oneline 2>/dev/null)

# 生成报告
cat > "$REPORT_FILE" << REPORT
# 📅 火爆短剧 - 每日开发报告

**日期**: $DATE  
**项目**: huobao-drama (桌面应用 - 短剧聚合观看)  
**版本**: v0.2.0 开发中

---

## 📊 今日概览

- **Git 提交**: $COMMITS 次
- **开发时长**: - 小时
- **完成功能**: - 个

---

## ✅ 完成内容

$COMMIT_LIST

---

## 🎯 v0.2.0 进度

| 功能 | 状态 | 完成度 |
|------|------|--------|
| 短剧数据源 | ⏳ | 0% |
| 视频播放器 | ⏳ | 0% |
| 搜索功能 | ⏳ | 0% |
| 播放历史 | ⏳ | 0% |
| 收藏功能 | ⏳ | 0% |

**总体进度**: 0%

---

## 📝 明日计划

- [ ] -
- [ ] -
- [ ] -

---

*报告生成时间：$(date "+%Y-%m-%d %H:%M")*
REPORT

echo "✅ 日报生成完成：$REPORT_FILE"
