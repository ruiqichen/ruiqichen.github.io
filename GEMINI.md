# GEMINI.md - 工程模式密码生成器

## 项目概述
一个基于 GitHub Pages 的静态密码生成工具，主要功能包括基于日期的“工程模式”密码计算和基于 4 位随机数的“加密项”密码生成。

## 核心技术栈
- **HTML/CSS/JS**: 纯静态单页面应用。
- **Styling**: 引入 `water.min.css` (async) 作为基础样式库。
- **Runtime**: 运行于浏览器环境。

## 开发与设计准则

### 1. 布局与居中
- **全屏居中**: 必须保持 `body` 的 `display: flex`, `justify-content: center` 和 `align-items: center` 布局。
- **覆盖样式**: 为了确保在全宽屏幕下水平居中，`body` 的 `max-width` 必须显式设置为 `none`，以覆盖 `water.min.css` 默认的 `800px` 限制。
- **容器宽度**: 主要内容应包裹在 `.container` 中，其 `max-width` 设定为 `400px` 以保证在 PC 端的可读性。

### 2. 密码生成逻辑
- **工程模式**:
  - 输入：日期。
  - 核心逻辑：`convertDateToInt(dateStr)` 将日期转为整数，`calculateKey(cellValue)` 根据预设的 `constants` 常量组进行偏移计算并取末 6 位。
- **加密项**:
  - 输入：4 位随机数。
  - 生成规则（XMpq##）：
    - 第 1 位：后跟 `X`。
    - 第 2 位：后跟 `M`。
    - 第 3 位：偶数跟 `P`，奇数跟 `p`。
    - 第 4 位：偶数跟 `Q`，奇数跟 `q`。
    - 末尾：固定追加 `##`。

### 3. 代码约定
- 优先保持 `index.html` 的单文件结构，逻辑直接写在 `<script>` 标签内。
- 样式修改应尽可能在 `<style>` 标签内进行，避免修改外部引用的 `water.min.css`。

## 目录忽略规则
在进行 codebase 分析或大规模重构时，请忽略以下与主应用逻辑无关的文件夹：
- `dist/`: 构建产物。
- `EmbeddedAppSample/`: 嵌入式应用示例（独立项目）。
- `static/`: 静态资源文件。
- `.git/`: 版本控制信息。
