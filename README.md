<div align="center">

# 🐚 NodeShell

### 装一次 52 MB 的壳，之后所有应用都是几十 KB 的小纸片
**Install a 52 MB base once, and every app is just a paper-thin zip (<100 KB).**

[![Platform](https://img.shields.io/badge/Platform-Android%208.0%2B-3DDC84?style=flat-square&logo=android&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js%20v18%20LTS-339933?style=flat-square&logo=node.js&logoColor=white)](#)
[![Jetpack Compose](https://img.shields.io/badge/UI-Jetpack%20Compose-4285F4?style=flat-square&logo=jetpackcompose&logoColor=white)](#)
[![Architecture](https://img.shields.io/badge/Arch-arm64--v8a%20%7C%20armeabi--v7a-orange?style=flat-square)](#)
[![MCP Protocol](https://img.shields.io/badge/MCP-Streamable%20HTTP-8A2BE2?style=flat-square)](#)
[![9 Apps Size](https://img.shields.io/badge/9%20Apps%20Total-197%20KB-brightgreen?style=flat-square)](#)

**[ 🇨🇳 简体中文 ](README.md)** &nbsp;&nbsp;|&nbsp;&nbsp; **[ 🇺🇸 English ](README_EN.md)**

</div>

---

> 💡 **NodeShell 是一个跑在 Android 上的轻量级 Node.js 原生应用容器。**  
> 基座 APK 一次安装终身免动，所有应用均以 `.nsapp` 单包（zip 压缩包）随时安装、秒级热更、即用即卸。  
> 9 个常用应用总和仅 **197 KB**，平均单个应用不到 **20 KB** —— 仅相当于一张手机照片的十分之一！

---

## 📑 目录

- [✨ 核心亮点](#-核心亮点)
- [⚡ 30 秒看懂架构](#-30-秒看懂架构)
- [📊 震撼的体积账](#-震撼的体积账)
- [🤖 让 AI 帮你写应用](#-让-ai-帮你写应用)
- [🔌 内置 MCP 真机自动化调试](#-内置-mcp-真机自动化调试)
- [🔒 纯净无痕与隐私保障](#-纯净无痕与隐私保障)
- [🧮 真计算器伪装锁屏](#-真计算器伪装锁屏)
- [🧰 双重防翻「百宝箱」](#-双重防翻百宝箱)
- [📥 下载与安装](#-下载与安装)
- [🛠️ 开发者生态与指南](#️-开发者生态与指南)
- [☕ 赞助与支持](#-赞助与支持)
- [⚠️ 边界坦白](#️-边界坦白)

---

## ✨ 核心亮点

<table>
  <tr>
    <td width="50%">
      <b>🪶 极致轻量应用 (Ultra Lightweight)</b><br/>
      应用只有几 KB 到几十 KB，9 个应用全装完才 <b>197 KB</b>，秒速下载解压，告别臃肿膨胀。
    </td>
    <td width="50%">
      <b>🎨 100% 真原生控件渲染 (Native Compose UI)</b><br/>
      列表、网格、输入框、播放器、图表均为 Android 原生组件，杜绝网页套壳的掉帧与模糊。
    </td>
  </tr>
  <tr>
    <td width="50%">
      <b>🤖 AI 原生开发体系 (AI-Native Coding)</b><br/>
      提供 15 章规范指南与 78 屏代码可复制的 Demo 活文档，Claude / Cursor 读完即可直接写出完整应用。
    </td>
    <td width="50%">
      <b>🔌 内置真机 MCP 服务端 (Built-in MCP Server)</b><br/>
      Cursor / Claude Desktop 直连真机：写代码 → 自动重启 → 读日志 → 模拟点击 → 截图闭环。
    </td>
  </tr>
  <tr>
    <td width="50%">
      <b>🔒 本地优先与零追踪 (Privacy First)</b><br/>
      无账号体系、无埋点 SDK、无云端同步，业务逻辑 100% 本地运算，数据只在手机独立沙箱。
    </td>
    <td width="50%">
      <b>🧮 全真 iOS 风格计算器伪装 (Disguise Lock)</b><br/>
      真能连续算加减乘除的计算器；按出特定密码按 <code>=</code> 方可解锁；离开应用或熄屏立即重锁。
    </td>
  </tr>
  <tr>
    <td width="50%">
      <b>🧰 假密码防翻百宝箱 (Dual-PIN Secret Vault)</b><br/>
      输假密码 <code>5678</code> 呈现空分组打发借手机的人；输真密码 <code>1177</code> 才会展示私密应用。
    </td>
    <td width="50%">
      <b>📺 手机与 Android TV 双端适配 (Phone & TV)</b><br/>
      分别针对手机触控手势与电视遥控器 D-Pad 焦点进行针对性优化，支持大屏画质与全屏播放。
    </td>
  </tr>
</table>

---

## ⚡ 30 秒看懂架构

```
                     你（或 AI 助手）编写的业务逻辑
                               │  包含 main.js + package.json
                               ▼
               打包成 app.nsapp（标准的 zip 压缩包，通常 ~20 KB）
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
       文件关联点击安装                 自建 / 官方应用商店一键更新
                               │
                               ▼
     ┌──────────────────────────────────────────────────────────────┐
     │                     NodeShell Android 基座                    │
     │                                                              │
     │  ┌─────────────────────────┐     JSON-RPC     ┌───────────┐  │
     │  │  内嵌 Node.js v18 运行时 │ ──────────────> │ 原生 UI   │  │
     │  │  - 独立 vm 沙箱隔离      │  (双向通信管道)  │ 渲染引擎  │  │
     │  │  - http/crypto/stream   │ <────────────── │ (Compose) │  │
     │  │  - 全量业务与解密逻辑   │    用户事件回传   │           │  │
     │  └─────────────────────────┘                 └─────┬─────┘  │
     └────────────────────────────────────────────────────┼─────────┘
                                                          ▼
                                            真原生 Android 控件上屏渲染
                                     (列表、网格、输入框、ExoPlayer播放器、图表)
```

- 应用里 `http / https / crypto / stream / fs` 等 Node.js 原生模块全能直接用，也可以直接引入纯 JS 的 npm 包。
- 视频直链解析、网盘 API 对接、数据加解密 **100% 运行在应用独立的 JS 逻辑中**。
- 基座只负责「把控件原生画出来」和「解码播放音视频流」—— 基座不绑架任何业务逻辑。

---

## 📊 震撼的体积账

| 对比维度 | 传统 Android App | NodeShell 应用 (`.nsapp`) | 优势提升 |
|---|---|---|---|
| **单应用安装包** | 30 MB ~ 200 MB | **5.7 KB ~ 39 KB** | **小约 1000 ~ 5000 倍** |
| **装 10 个常用应用** | 占用 1 GB ~ 3 GB 空间 | **约 150 KB** | **几乎不占存储** |
| **安装耗时** | 10 秒 ~ 1 分钟（系统打包校验） | **秒级即刻完成**（解压单 zip） | **无感知瞬间完成** |
| **更新方式** | 重新下载几十 MB 完整 APK | **覆盖几十 KB 小文件** | **省流量、零等待** |
| **权限申请** | 每个应用各自索要一堆危险权限 | **应用包本身不申请任何系统权限** | **极高系统安全性** |

### 仓库内置 `apps/nsapp/` 9 款精品应用实测体积：

| 应用名称 | 文件名 | 包体大小 | 功能定位说明 |
|---|---|---:|---|
| **SSH 终端** | `ssh-1.1.1.nsapp` | **5.7 KB** | 轻量 SSH 客户端（xterm.js + 密钥/密码认证） |
| **Termux Shell** | `termux-1.2.0.nsapp` | **6.8 KB** | 本地 Shell 交互终端（直连 `/system/bin/sh`） |
| **PikPak 直链** | `pikpakshare-1.0.2.nsapp` | **13.0 KB** | PikPak 分享链接快速解析浏览与直链流畅播放 |
| **AgeDM 动漫** | `agedm-1.0.4.nsapp` | **19.6 KB** | 原生动漫站客户端（分区导航、多线路搜索、选集与 HLS 播放） |
| **OneDrive 网盘** | `onedrive-1.0.4.nsapp` | **14.3 KB** | 微软官方 Graph API 接入，网盘文件浏览、媒体直链播放与下载 |
| **TVBox 多源聚合** | `tvbox-2.0.2.nsapp` | **14.9 KB** | TVBox 订阅多源配置聚合流媒体播放器 |
| **WebDAV 客户端** | `webdav-1.0.6.nsapp` | **16.2 KB** | 私有云存储客户端（完整文件树浏览、下载与备份） |
| **文件管理器** | `filemgr-1.2.0.nsapp` | **18.8 KB** | 本地全盘文件管理工具（多层浏览、属性查看、重命名与管理） |
| **控件与 API 活演示** | `demo-1.8.3.nsapp` | **82.2 KB** | **开发参考手册**：78 屏全功能示例，覆盖 44 种原生控件与全部 API |
| **全量打包** | `apps/nsapps/nodeshell-apps-all.nsapps` | **197 KB** | **一键全装包**（一秒安装上述全量应用） |

> 📌 **注**：上述体积为应用包体积。基座 APK 本身仅约 52 MB（内置了完整的 Node.js v18 引擎与 Media3 播放器内核）。基座仅需安装一次，之后无论装多少个应用，基座体积终身保持不变。

---

## 🤖 让 AI 帮你写应用

这是 NodeShell 与其他容器最本质的区别：**它的整套契约规范从第一天起就是为了让 AI 理解而设计的。**

将以下三件套喂给大模型（Claude 3.7 / GPT-4o / Cursor / GitHub Copilot）：

```
📁 喂给 AI 的三件套：
├── 1. nsapp-guide/           完整 15 章指南：UI 树规范、44 种控件定义、全部 JS API 与避坑清单
├── 2. demo 示例应用          活的参考实现：78 屏演示，每一屏均可展开复制真实代码
└── 3. AI-PROMPT.md           开箱即用的 Prompt 提示词模板与常见场景模板
```

### 极速开发示例

```markdown
你：请参考 nsapp-guide，帮我写一个「本地无损音乐播放器」：
   扫描 /sdcard/Music 目录，列表展示音频文件，底部附带迷你播放条，
   点击播放，长按可加入播放队列。

AI：输出 main.js 与 package.json 源码。
你：使用 zip 压缩打包为 music.nsapp（仅 ~15 KB）。
你：发送到手机点开 → 立即安装完成并流畅运行！
```

无需安装庞大的 Android Studio，无需配置 JDK 与 Gradle，无需重新打包 APK，无需提交任何发版审核。**改动一行 JS 代码，几秒钟后真机即刻呈现！**

---

## 🔌 内置 MCP 真机自动化调试

手动「打包 → 传手机 → 启动 → 看日志 → 发现问题」的人工闭环太繁琐？  
NodeShell 基座内置了 **MCP (Model Context Protocol) 服务端**。支持 Streamable HTTP 的 AI 客户端（Claude Desktop / Cursor / Claude Code）可直接连上真机：

<div align="center">
  <code>写代码 / 修改源码</code> ➔ <code>自动热更重启</code> ➔ <code>读实时日志</code> ➔ <code>获取 UI 渲染树</code> ➔ <code>模拟点击与滚动验证</code> ➔ <code>截取真机屏幕</code>
</div>

### 手机端开启方法

1. 打开基座 **设置 → MCP 调试端点**。
2. 打开「已开启」开关（状态显示「运行中」代表已成功绑定）。
3. 选择连接模式：
   - **方式 A：adb 端口转发（推荐，本地极速且安全）**  
     在电脑端终端执行一次：`adb forward tcp:17879 tcp:17879`，配置地址使用 `http://127.0.0.1:17879/mcp`。
   - **方式 B：局域网直连（无需数据线）**  
     在设置页打开「允许局域网直连」，地址填写 `http://<手机IP>:17879/mcp`。

### 客户端配置示例

在 Claude Desktop（`claude_desktop_config.json`）或 Cursor（`~/.cursor/mcp.json`）中添加：

```json
{
  "mcpServers": {
    "nodeshell": {
      "url": "http://127.0.0.1:17879/mcp",
      "headers": {
        "Authorization": "Bearer <设置页显示的 Token>"
      }
    }
  }
}
```

### 24 款强大调试工具

| 工具方法 | 核心功能说明 |
|---|---|
| `ns_get_docs` | 获取开发速查（控件全表 + 四条铁律 + JS API）。写代码前必调 |
| `ns_find_example` | 在 demo 示例应用里按关键词搜「这段代码怎么写的」，返回文件+行号+内容 |
| `ns_list_apps` | 列出手机已安装应用（id / 名称 / 版本 / 是否运行中） |
| `ns_list_files` / `ns_read_file` | 浏览应用源码树、读取文件内容（二进制拒绝，超 256KB 截断） |
| `ns_write_file` / `ns_patch_file` | 写入或**局部替换**文件内容，默认写完自动重启应用让改动立即生效 |
| `ns_create_app` / `ns_rename_app` / `ns_delete_app` | 新建骨架、改显示名、删除应用（删除默认进回收站，可还原） |
| `ns_launch_app` | 启动或重启指定应用，`launchError` 非空即应用代码抛错 |
| `ns_get_state` | 读回当前 UI 树摘要与桥接状态（默认两层，`full=true` 返回全量） |
| `ns_get_layout` | 拿到每个节点的真实像素位置 `{x,y,w,h}` 与溢出诊断 |
| `ns_send_event` | **模拟真机交互**：点击节点/列表行、触发事件、真实滚动、长按 |
| `ns_screenshot` | **截取真机当前画面**（标准 MCP Image Block） |
| `ns_eval` | 在应用沙箱里执行一段 JS 并返回结果（支持 await） |
| `ns_read_log` | 读运行日志（默认最后 100 行，可按 appId / level 过滤，结构化返回） |
| `ns_get_storage` / `ns_set_storage` / `ns_clear_storage` | 读写/清空应用的 `$storage` 与 `$prefs`（合并语义，`null` 即删键） |
| `ns_scan` | 扫描源码里的敏感信息（API Key / token / 私钥 / 密码赋值） |
| `ns_rollback` / `ns_delete_file` / `ns_purge_trash` | 单文件回滚、删除（自动进 `.trash/`）、清空回收站 |


---

## 🔒 纯净无痕与隐私保障

- 🚫 **无用户账号体系**：无需注册、无需登录、不索取手机号、不读取通讯录。
- 🚫 **零统计分析 SDK**：源码中不存在 Firebase、友盟、TalkingData 等任何第三方打点追踪代码。
- 🌐 **极简透明的网络行为**：唯一自动外发请求为更新检测（每天最多 1 次请求静态公开的 `version.json`）。除此之外绝不自发任何请求。
- 📦 **完全本地隔离**：每个应用拥有专属沙箱目录 `<内部存储>/NodeShell/apps/<应用id>/`，卸载应用即刻彻底抹除。
- 🛡️ **云备份免疫**：明确配置 Android `backup_rules.xml`，防止系统云服务在换机或备份时静默将应用数据同步至云端。

---

## 🧮 真计算器伪装锁屏

不仅是一个「长得像计算器的壁纸」，而是**一台完完整整、能够实际计算的 iOS 风格计算器**：

- 冷启动或离开恢复时，呈现全黑极简计算器界面，支持连续四则混合运算、退格、除零保护。
- 在计算器上输入你设定的专属密码（如 `123456`），按下 `=` 键瞬间切入启动器。
- 输错密码？只会得到一次极其正常的运算结果 —— **不报错、不弹窗、不清屏**，旁人拿起手机只当它是一台好用的计算器。
- **离屏即重锁**：切换到后台、按电源键熄屏、从应用跳转至系统浏览器，只要再次回到基座，第一眼永远锁死在计算器界面。

---

## 🧰 双重防翻「百宝箱」

启动器内置专属隐私分组**「百宝箱」**：

1. **假密码 (`5678`)**：输入后看到的直接是**一个空分组** —— 毫无破绽，他人试探多次只会确信「这里面什么都没存」。
2. **真密码 (`1177`)**：只有输入真密码，才会解开隐藏的分组并展现里面珍藏的私密应用。
3. **完全隐身**：放入百宝箱的应用，在「全部」和其他分组标签页中**完全不显示**，不解锁真密码根本无法感知其存在。

> 💡 *出厂默认密码为上述数值，进入「设置」后可随意修改为您自己的专属私密密码。*

---

## 📥 下载与安装

前往 [Releases 官方发布页](https://github.com/wjf1547/NodeShell-Release/releases) 下载最新基座 APK：

| 架构包名称 | 产物文件名 | 推荐适用设备 |
|---|---|---|
| **手机 / 平板通用版** | `NodeShell-<版本>-arm64.apk` | 现代主流 64 位手机、平板设备 (`arm64-v8a`) |
| **电视盒子专用版 (TV)** | `NodeShell-TV-<版本>-v7a.apk` | 电视机、智能投影仪、电视盒子 (`armeabi-v7a`) |

*注：手机版与 TV 版 Package Name 互相独立，支持在同一设备共存。*

### 安装应用包 (`.nsapp`) 的 3 种方式：

1. **文件点击直接安装**：将 `.nsapp` 文件传输至手机，在文件管理器中点击即可调起 NodeShell 一键装好。
2. **商店一键安装**：进入基座「应用商店」，填入商店源地址刷新后点击「安装」。
3. **深链接扫码安装**：通过手机相机扫描 `nodeshell://install?url=...` 链接快速触发安装。

- ⚡ **推荐体验**：下载 [`apps/nsapps/nodeshell-apps-all.nsapps`](apps/nsapps/nodeshell-apps-all.nsapps) 一键全装包，一次性装入全量 9 款精选应用！

---

## 🛠️ 开发者生态与指南

想要自己动手开发一个实用小工具？查阅配套开发文档：

- 🚀 [01. 5 分钟上手第一个应用](nsapp-guide/01-快速开始.md)
- 📐 [03. UI 树基础](nsapp-guide/03-UI树基础.md)
- 📋 [04. 44 种原生控件全集速查](nsapp-guide/04-控件速查表.md)
- 🌐 [11. JS 原生 API 详解 ($http / $storage / $media 等)](nsapp-guide/11-JS-API-详解.md)
- 📦 [12. 应用打包与商店分发规范](nsapp-guide/12-打包与发布.md)
- 🚨 [15. 必读高频避坑清单（血泪踩坑总结）](nsapp-guide/15-避坑清单.md)

基座还内置了轻量 IDE：在手机启动器中**长按任意应用图标 → ✏️ 编辑源码**，即可随时随地在真机上快速修改 JS 代码并实时生效！

---

## ☕ 赞助与支持

NodeShell 是纯个人利用业余时间打造并长期维护的独立项目，无任何商业计划与广告推广。  
如果 NodeShell 为您的数字生活带来了乐趣与便利，欢迎请作者喝杯咖啡支持后续功能维护：

<div align="center">
  <table>
    <tr>
      <td align="center" width="260">
        <img src="assets/donate_wechat.png" width="180" /><br/>
        <b>微信支付</b>
      </td>
      <td align="center" width="260">
        <img src="assets/donate_alipay.jpg" width="180" /><br/>
        <b>支付宝</b>
      </td>
    </tr>
  </table>
</div>

---

## ⚠️ 边界坦白

- **TV 版特性差异**：电视遥控器输入效率较低，TV 版本已关闭伪装锁屏功能，开机直达启动器（百宝箱功能在 TV 端仍可正常使用）。
- **共享 Node.js 进程模式**：为了做到几十 KB 极速运行，所有微应用共享同一个内嵌 Node.js 进程。如果某个应用发生未捕获的严重致命异常，可能需要重启基座。建议在开发应用时做好 `try/catch` 异常防护。
- **存储权限说明**：基座完全支持在未开启「所有文件访问权限」下稳定运行，开启后可额外授权访问外部 SD 卡公共文件。

---

<div align="center">
  <sub>NodeShell · The Ultra-Lightweight Node.js App Container for Android</sub>
</div>
