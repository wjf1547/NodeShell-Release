# nsapp 制作指导 · 索引

> NodeShell nsapp 开发完整教程。**建议按顺序读**：先第 1~3 章跑通第一个应用，再按需查控件篇与进阶篇。
>
> 本文是 nsapp 开发的教学版指导；契约以基座实现为准。
> 当前基座版本：见仓库根 `VERSION_NAME`。

## 目录

### 第一部分 · 基础

| 章 | 文件 | 内容 |
|---|---|---|
| 1 | [01-快速开始.md](01-快速开始.md) | nsapp 是什么 / 环境要求 / 5 分钟跑通第一个应用 / 目录结构 |
| 2 | [02-创建步骤.md](02-创建步骤.md) | 从零创建一个应用的完整步骤（含 IDE 内新建、命令式清单） |
| 3 | [03-UI树基础.md](03-UI树基础.md) | UI 树 schema、props 与 children 的分层、受控渲染模式、事件机制 |

### 第二部分 · 控件篇（每个控件怎么用）

| 章 | 文件 | 覆盖控件 |
|---|---|---|
| 4 | [04-控件速查表.md](04-控件速查表.md) | 全量控件一页速查（字段 + 一句话说明） |
| 5 | [05-容器与布局控件.md](05-容器与布局控件.md) | root / card / row / column / space / divider / **accordion** |
| 6 | [06-列表与集合控件.md](06-列表与集合控件.md) | list（含 skeleton）/ grid / **tree** / actions / table / chart / empty |
| 7 | [07-输入与选择控件.md](07-输入与选择控件.md) | input（含 min/max/step）/ textarea / search / switch / checkbox / radio / dropdown / slider / **datepicker** / **timepicker** / **segmented** |
| 8 | [08-展示与媒体控件.md](08-展示与媒体控件.md) | text / image / video / audio / webview / article / button / progress / chip / icon / avatar / badge / link / loading |
| 9 | [09-导航与页面控件.md](09-导航与页面控件.md) | tabs / topTab / drawer / fab / **sheet** |

### 第三部分 · 进阶

| 章 | 文件 | 内容 |
|---|---|---|
| 10 | [10-页面栈与返回.md](10-页面栈与返回.md) | push/render/pop 语义、返回键拦截、滚动位置、翻页（12 条铁律） |
| 11 | [11-JS-API-详解.md](11-JS-API-详解.md) | $app / $ui / $media / $http / $mhttp / $storage / $prefs / $webview / $ssh / $termux / $wifi / $shell / CFG / @shell/stream |
| 12 | [12-打包与发布.md](12-打包与发布.md) | pack.js 打包、图标规范、.nsapp/.nsapps、商店推送、安装入口 |
| 13 | [13-调试与自检.md](13-调试与自检.md) | 调试器 Console、UI 契约校验、schema warn 解读、常见症状对照表、**让 AI 直接改应用（MCP）** |
| 14 | [14-实战演练.md](14-实战演练.md) | 三个完整示例：待办清单 / 视频浏览器 / 密码管理器 |
| 15 | [15-避坑清单.md](15-避坑清单.md) | 从线上 bug 提炼的 12 条硬性约定 + 高频翻车点 |

## 可复用的公共模块

`shared/` 下是与具体站点无关、已在线上应用验证过的公共模块。用法：拷到应用 `lib/`，
`require('./lib/xxx.js')`（清单和分发脚本见 [shared/README.md](../../shared/README.md)）。

| 模块 | 用途 |
|---|---|
| `pager.js` | 列表页底部页码条（上一页/下一页/跳页 + 当前页高亮），含防抖/竞态/重试处理 |

## 怎么用这份文档

- **第一次写应用**：读 1 → 2 → 3，然后抄 [14-实战演练.md](14-实战演练.md) 的第一个例子改。
- **某个控件不会用**：先查 [04-控件速查表.md](04-控件速查表.md) 定位，再进对应章节看完整示例。
- **界面出问题了**：直接去 [15-避坑清单.md](15-避坑清单.md)，那里每一条都是真实 bug 的根因。
- **想看完整可运行代码**：仓库内「控件实验室」示例应用的 `main.js`（全控件演示）、「示例扩展」应用的 `main.js`（分类导航式 API 演示）。
