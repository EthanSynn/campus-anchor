# 校园锚点 · AI 大学成长助手

校园锚点是一套围绕大学阶段运行的 AI 成长系统。它根据用户的年级、目标与经历，帮助用户理解当前阶段、发现适合自己的机会、采取下一步行动，并在用户确认后沉淀成长记录。

## 提交入口

- GitHub / Gitee 仓库：[EthanSynn/campus-anchor](https://github.com/EthanSynn/campus-anchor)
- 在线 Demo：[https://ethansynn.github.io/campus-anchor/](https://ethansynn.github.io/campus-anchor/)
- 项目提交文档：[PROJECT_SUBMISSION_PRD.md](PROJECT_SUBMISSION_PRD.md)

## Demo 核心闭环

个人大学起点 → 当前阶段 → 个性化机会 → 大智能体解释与行动建议 → 场景模拟 → 用户选择 → AI 复盘 → 用户确认成长记录 → 日记时间线。

## 当前 Demo 已实现

- 当前专属任务首页：大一新生阶段、任务、成长路线、机会摘要
- 起点画像：记录用户期待并保存 Profile
- 机会雷达：展示匹配理由、截止时间、准备周期和行动入口
- 大智能体：阶段化欢迎语、快捷意图、聊天输入和本地演示响应
- 专属 AI Persona：Male / Female 二选一，选择结果持久化
- AI 空间：选定人物作为大智能体工作区的背景视觉主体
- 场景模拟：校园 AI 社团场景、多分支选择与 AI 复盘
- 成长确认：用户同意后才写入成长记录
- 日记：成长时间线与已确认记录
- 浅色 / 深色模式
- Asset Registry：统一登记品牌与 AI 人物视觉资产

## 技术栈

- 原生 HTML / CSS / JavaScript
- localStorage：保存本地 Demo Profile、Persona、聊天与成长记录
- 静态资源目录：assets/
- 无后端依赖，无生产 API Key

## 本地运行

```bash
python3 -m http.server 4173
```

然后访问：http://localhost:4173/

## AI 与人工协作说明

Codex 用于产品工程、页面实现、调试、Asset Registry 和文档整理。外部视觉工具用于生成或处理已经确认的 Anchor、Male AI、Female AI 等视觉资产。产品结构、用户流程、功能取舍、视觉筛选、素材接入和最终验收由团队完成。

本 Demo 当前使用本地可控演示响应，不宣称已接入生产级大模型 API。后续将通过 Provider / Router 抽象接入真实模型，并保留用户自带 API 或服务端托管模型的扩展能力。

## 安全与开源检查

- 不要提交 .env、API Key、密码、Token 或私人数据。
- 不要把学校内部文件、未授权通知或个人聊天记录放入公开仓库。
- 公开前检查所有链接、图片来源、字体和第三方代码许可。
- 视觉资产的模型、版本、来源与授权信息需要在提交文档中补齐。
