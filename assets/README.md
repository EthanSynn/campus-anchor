# Visual Assets

这是《校园锚点》的统一视觉资产目录。

## 接入规则

1. 外部工具生成图片，Codex 不重新生成已经确认的 Logo、App Icon、Male AI Master、Female AI Master 或场景资产。
2. 先把文件放入对应目录，再在 `asset-registry.json` 登记。
3. 每个资产必须有 `asset_id`、用途、路径、版本、状态、来源和角色。
4. `approved` 才能视为正式视觉资产；`planned`、`external-pending`、`placeholder` 不能当作最终设计。
5. AI 人物必须先登记并确认 Master，再登记由 Master 派生的场景/状态变体。
6. 页面通过 `AssetRegistry.get()` 或统一的 Avatar/Visual Asset 组件调用，禁止硬编码人物图片路径。

## 推荐目录

```text
assets/
├── asset-registry.json
├── asset-registry.js
├── brand/
├── characters/
│   ├── male/master/
│   ├── male/interaction/
│   ├── female/master/
│   └── female/interaction/
└── scenes/
```

## 当前状态

已收到并确认一张 Anchor 品牌系统参考板：`assets/brand/reference/anchor-system-board-v0.3.0.png`。它包含正底黑标、反白标、App Icon 和小尺寸探索，Registry 状态为 `approved-reference`。

目前仍没有可直接用于页面的独立正式 Logo/App Icon 文件。Demo 继续使用代码占位符；待外部工具导出独立透明背景 SVG/PNG 后，再将对应条目标记为 `approved`。

Male AI Master 与 Female AI Master 已经作为 Demo 正式资产接入，路径分别为：

```text
assets/characters/male/master/male-ai-master-v1.0.0.png
assets/characters/female/master/female-ai-master-v1.0.0.png
```
