<div align="center">

# 🐚 NodeShell

### Install a 52 MB base once, and every app is just a paper-thin zip (<100 KB).
**装一次 52 MB 的壳，之后所有应用都是几十 KB 的小纸片。**

[![Platform](https://img.shields.io/badge/Platform-Android%208.0%2B-3DDC84?style=flat-square&logo=android&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js%20v18%20LTS-339933?style=flat-square&logo=node.js&logoColor=white)](#)
[![Jetpack Compose](https://img.shields.io/badge/UI-Jetpack%20Compose-4285F4?style=flat-square&logo=jetpackcompose&logoColor=white)](#)
[![Architecture](https://img.shields.io/badge/Arch-arm64--v8a%20%7C%20armeabi--v7a-orange?style=flat-square)](#)
[![MCP Protocol](https://img.shields.io/badge/MCP-Streamable%20HTTP-8A2BE2?style=flat-square)](#)
[![9 Apps Size](https://img.shields.io/badge/9%20Apps%20Total-197%20KB-brightgreen?style=flat-square)](#)

**[ 🇺🇸 English ](README_EN.md)** &nbsp;&nbsp;|&nbsp;&nbsp; **[ 🇨🇳 简体中文 ](README.md)**

</div>

---

> 💡 **NodeShell is an ultra-lightweight Node.js native application container running on Android.**  
> Install the 52 MB base APK once, and never touch it again. All applications are packaged as `.nsapp` files (standard zip archives) that can be installed, updated, or uninstalled in seconds.  
> 9 bundled apps take only **197 KB** in total — averaging less than **20 KB** per app!

---

## 📑 Table of Contents

- [✨ Key Highlights](#-key-highlights)
- [⚡ Architecture at a Glance](#-architecture-at-a-glance)
- [📊 Incredible Size Comparison](#-incredible-size-comparison)
- [🤖 Build Apps with AI Assistance](#-build-apps-with-ai-assistance)
- [🔌 Built-in MCP Server for Full AI Automation](#-built-in-mcp-server-for-full-ai-automation)
- [🔒 Privacy First & Pure Local Experience](#-privacy-first--pure-local-experience)
- [🧮 Fully Functional Calculator Disguise](#-fully-functional-calculator-disguise)
- [🧰 Dual-PIN Secret Vault](#-dual-pin-secret-vault)
- [📥 Download & Installation](#-download--installation)
- [🛠️ Developer Ecosystem & Guides](#️-developer-ecosystem--guides)
- [☕ Sponsorship & Support](#-sponsorship--support)
- [⚠️ Transparent Boundaries](#️-transparent-boundaries)

---

## ✨ Key Highlights

<table>
  <tr>
    <td width="50%">
      <b>🪶 Ultra-Lightweight Apps</b><br/>
      Each app is typically only a few to tens of kilobytes. Installing all 9 pre-built apps takes only <b>197 KB</b>. Instant downloads and zero storage bloat.
    </td>
    <td width="50%">
      <b>🎨 100% Native Compose UI</b><br/>
      Lists, grids, inputs, media players, and charts render directly via native Android Jetpack Compose widgets. No sluggish webview wrappers.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <b>🤖 AI-Native Development Ready</b><br/>
      Includes a comprehensive 15-chapter guide and a live 78-screen interactive demo app where every single UI component's real code can be inspected and copied.
    </td>
    <td width="50%">
      <b>🔌 Built-in Real-Device MCP Server</b><br/>
      Claude Desktop, Cursor, and Claude Code can connect directly to your phone: write code → auto-reload → read logs → simulate taps → capture screenshots in a closed loop.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <b>🔒 Zero Analytics & Local First</b><br/>
      No user account system, no tracking SDKs, no cloud telemetry. All business logic executes locally with private data kept strictly on your device.
    </td>
    <td width="50%">
      <b>🧮 iOS-Style Real Calculator Disguise</b><br/>
      A fully capable calculator supporting continuous math operations. Type your secret PIN and press <code>=</code> to unlock. Instantly relocks upon exiting.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <b>🧰 Dual-PIN Secret Vault</b><br/>
      Enter fake PIN <code>5678</code> to display a completely empty group when handing your phone to others. Only real PIN <code>1177</code> reveals your hidden apps.
    </td>
    <td width="50%">
      <b>📺 Phone & Android TV Dual Flavors</b><br/>
      Carefully tailored for mobile touch gestures as well as TV remote D-Pad directional navigation and focus highlights.
    </td>
  </tr>
</table>

---

## ⚡ Architecture at a Glance

```
                         Business Logic Written by You or AI
                               │  Contains main.js + package.json
                               ▼
               Packaged into app.nsapp (Standard zip archive, ~20 KB)
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
     Tap file to Install directly       One-click update via App Store
                               │
                               ▼
     ┌──────────────────────────────────────────────────────────────┐
     │                      NodeShell Android Host                  │
     │                                                              │
     │  ┌─────────────────────────┐     JSON-RPC     ┌───────────┐  │
     │  │ Embedded Node.js v18    │ ──────────────> │ Native UI │  │
     │  │ - Isolated vm sandboxes │  (Bi-directional │ Renderer  │  │
     │  │ - http/crypto/stream    │ <────────────── │ (Compose) │  │
     │  │ - Full App Business     │   User UI Events│           │  │
     │  └─────────────────────────┘                 └─────┬─────┘  │
     └────────────────────────────────────────────────────┼─────────┘
                                                          ▼
                                            Native Android Widget Rendering
                                  (Lists, Grids, Inputs, ExoPlayer, Charts)
```

- Standard Node.js modules like `http`, `https`, `crypto`, `stream`, and `fs` are natively available. Pure JS npm packages can be required directly.
- Video stream resolving, cloud drive API communication, and cryptographic decryption run **100% inside your app's JavaScript layer**.
- The Android base only renders declarative widgets and handles media stream decoding — keeping the host completely decoupled from business logic.

---

## 📊 Incredible Size Comparison

| Metric | Traditional Android App | NodeShell App (`.nsapp`) | Factor |
|---|---|---|---|
| **Package Size** | 30 MB ~ 200 MB | **5.7 KB ~ 39 KB** | **1,000x ~ 5,000x smaller** |
| **Storage for 10 Apps** | 1 GB ~ 3 GB | **~150 KB** | **Virtually zero disk footprint** |
| **Installation Time** | 10s ~ 1 min (system verification) | **Sub-second instant unpack** | **Zero waiting time** |
| **Update Process** | Re-download entire APK | **Overwrite a small ~20 KB file** | **Instant hot-reload** |
| **Android Permissions** | Each app requests invasive permissions | **Apps do not declare any OS permissions** | **Rock-solid sandboxed security** |

### Verified Sizes of Pre-built Apps in `apps/nsapp/`:

| App Name | File Name | Size | Description |
|---|---|---:|---|
| **SSH Terminal** | `ssh-1.1.1.nsapp` | **5.7 KB** | Lightweight SSH client (xterm.js + key/password authentication) |
| **Termux Shell** | `termux-1.2.0.nsapp` | **6.8 KB** | Local shell terminal interface (direct bridge to `/system/bin/sh`) |
| **PikPak Share** | `pikpakshare-1.0.2.nsapp` | **13.0 KB** | Fast PikPak link parsing, file browsing, and direct streaming |
| **AgeDM Anime** | `agedm-1.0.4.nsapp` | **19.6 KB** | Native anime client (categories, search, episode list, and HLS player) |
| **OneDrive Client** | `onedrive-1.0.4.nsapp` | **14.3 KB** | Official Microsoft Graph API, file navigation, streaming, and download |
| **TVBox Player** | `tvbox-2.0.2.nsapp` | **14.9 KB** | Multi-source aggregator player supporting TVBox JSON configurations |
| **WebDAV Explorer** | `webdav-1.0.6.nsapp` | **16.2 KB** | Private cloud storage client (directory tree, upload, and download) |
| **File Manager** | `filemgr-1.2.0.nsapp` | **18.8 KB** | Local storage explorer (directory navigation, sorting, and file operations) |
| **Live Showcase Demo** | `demo-1.8.3.nsapp` | **82.2 KB** | **Live Developer Guide**: 78 demo screens covering 44 widgets and all APIs |
| **All-in-One Bundle** | `apps/nsapps/nodeshell-apps-all.nsapps` | **197 KB** | **Batch Installer** (Installs all 9 apps in one tap) |

> 📌 **Note**: The above sizes reflect `.nsapp` application packages. The base APK itself is ~52 MB (mobile flavor), carrying a complete Node.js v18 engine and Media3 media playback core. This cost is paid only once upon initial installation.

---

## 🤖 Build Apps with AI Assistance

NodeShell's specification was purposefully designed for AI consumption from day one.

Provide these three assets to any LLM (Claude 3.7 / GPT-4o / Cursor / GitHub Copilot):

```
📁 AI Development Kit:
├── 1. nsapp-guide/           15 Chapters: UI tree contract, 44 widget specs, and real-world bug pitfall notes
├── 2. demo showcase app      Live reference: 78 interactive screens with copyable rendering code
└── 3. AI-PROMPT.md           Ready-to-use system prompts and common workflow templates
```

### Typical Workflow

```markdown
User: Please follow nsapp-guide to write a "Local Lossless Music Player":
      Scan /sdcard/Music, display audio files in a list with a persistent mini player bar,
      tap to play, long press to enqueue into current playlist.

AI:   Generates main.js and package.json.
User: Compress into music.nsapp (~15 KB).
User: Send to phone and tap to open → Installed and running within seconds!
```

No Android Studio installation, no JDK or Gradle builds, no APK packaging, and zero store review delays. **Change a single line of JS, and see the update on your real phone in seconds.**

---

## 🔌 Built-in MCP Server for Full AI Automation

Eliminate the tedious manual loop of "zip → transfer → open → read log → fix".  
NodeShell features a built-in **MCP (Model Context Protocol) Server**. AI clients supporting Streamable HTTP (Claude Desktop / Cursor / Claude Code) can directly take control of the phone:

<div align="center">
  <code>Write Code</code> ➔ <code>Auto Reload</code> ➔ <code>Read Real-time Logs</code> ➔ <code>Inspect UI Tree</code> ➔ <code>Simulate Gestures</code> ➔ <code>Take Screenshot</code>
</div>

### Enabling MCP on Phone

1. Open **Settings → MCP Debug Endpoint**.
2. Toggle the switch to "Enabled" (Status "Running" confirms it is listening).
3. Select your connection route:
   - **Route A: adb port forwarding (Recommended, local & secure)**  
     Run `adb forward tcp:17879 tcp:17879` on your PC, then connect to `http://127.0.0.1:17879/mcp`.
   - **Route B: Direct LAN connection (Wireless)**  
     Toggle "Allow LAN Connection" in settings, then connect to `http://<PHONE_IP>:17879/mcp`.

### Client Configuration

In Claude Desktop (`claude_desktop_config.json`) or Cursor (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "nodeshell": {
      "url": "http://127.0.0.1:17879/mcp",
      "headers": {
        "Authorization": "Bearer <Token shown in Settings>"
      }
    }
  }
}
```

### 24 Built-in Automation Tools

| Tool | Purpose |
|---|---|
| `ns_get_docs` | Fetch the nsapp cheatsheet (widget table + 4 core rules + JS APIs). Call before writing code |
| `ns_find_example` | Search the demo app for "how is this done?" — returns file, line and content |
| `ns_list_apps` | Enumerate installed apps (id / name / version / running state) |
| `ns_list_files` / `ns_read_file` | Browse the app source tree and read files (binaries rejected, >256KB truncated) |
| `ns_write_file` / `ns_patch_file` | Write or **patch** a file in place; auto-restarts the app so changes take effect |
| `ns_create_app` / `ns_rename_app` / `ns_delete_app` | Scaffold, rename, or delete an app (delete goes to trash and is recoverable) |
| `ns_launch_app` | Launch or restart an app; a non-empty `launchError` means the code threw |
| `ns_get_state` | Read the current UI tree summary + bridge status (2 levels by default, `full=true` for all) |
| `ns_get_layout` | Real pixel geometry per node `{x,y,w,h}` plus overflow diagnostics |
| `ns_send_event` | **Simulate input**: tap node/list row, fire events, real scrolling, long press |
| `ns_screenshot` | **Capture the real device screen** (standard MCP Image Block) |
| `ns_eval` | Evaluate a JS snippet inside the app sandbox (await supported) |
| `ns_read_log` | Read runtime logs (last 100 lines by default; filter by appId / level) |
| `ns_get_storage` / `ns_set_storage` / `ns_clear_storage` | Read/write/clear `$storage` and `$prefs` (merge semantics, `null` deletes a key) |
| `ns_scan` | Scan source for secrets (API keys, tokens, private keys, password assignments) |
| `ns_rollback` / `ns_delete_file` / `ns_purge_trash` | Per-file rollback, delete (auto-moved to `.trash/`), purge trash |

---|---|
| `ns_get_docs` | Fast developer lookup: Full 44-control table + 4 core rules + JS APIs |
| `ns_list_apps` | Enumerate installed applications (id, name, version, running status) |
| `ns_list_files` / `ns_read_file` | Read project file tree and file contents (with hash concurrency check) |
| `ns_write_file` | Write code: **pre-syntax check**, **auto app reload**, deterministic status return |
| `ns_create_app` | Scaffold a brand new app from templates (`blank`, `list`, `form`, `tabs`) |
| `ns_launch_app` | Launch or restart an application, optionally bringing it to the user screen |
| `ns_get_state` | Read back current UI tree state, bridge connection, and schema issues |
| `ns_read_log` | Read logs filtered by appId/level, with timestamp anchors and regex search |
| `ns_send_event` | **Simulate user interaction**: tap, list item click, scroll, refresh, text typing |
| `ns_screenshot` | **Capture real device screen** (standard MCP Image Block) |
| `ns_get_layout` | Get exact bounding coordinates `{x, y, w, h}` to detect layout overflow |
| `ns_eval` | Execute arbitrary JS expression inside the app sandbox (supports await) |
| `ns_get_storage` / `ns_set_storage` | Read, write, or merge persistent `$storage` and `$prefs` key-values |
| `ns_rollback` | Restore source code instantly using automated `.bak` snapshots |

---

## 🔒 Privacy First & Pure Local Experience

- 🚫 **No Account System**: Never register, log in, or provide phone numbers. Contacts are never accessed.
- 🚫 **Zero Third-party Analytics**: Absolutely no Firebase, Umeng, or telemetry trackers in source code.
- 🌐 **Minimal Network Footprint**: The only automated outbound network call is update checking (at most once daily fetching static `version.json`).
- 📦 **Strict Local Isolation**: Every app runs in its own directory `<Storage>/NodeShell/apps/<appId>/`, wiped completely upon uninstallation.
- 🛡️ **Cloud Backup Immune**: Configured with Android `backup_rules.xml` to prevent system cloud services from silently copying your app files to external servers.

---

## 🧮 Fully Functional Calculator Disguise

Not merely a static lockscreen themed like a calculator, but **a 100% genuine, operational iOS-style calculator**:

- Displays a clean dark calculator upon cold start or returning from background.
- Enter your custom PIN (e.g., `123456`) and tap `=` to unlock and access your launcher.
- Entered the wrong number? It simply calculates normal arithmetic without errors or warnings.
- **Relock on exit**: Whenever you switch apps, lock your screen, or visit a browser, NodeShell immediately returns to the calculator lock upon return.

---

## 🧰 Dual-PIN Secret Vault

A dedicated privacy launcher group named **Vault** is integrated:

1. **Fake PIN (`5678`)**: Entering this PIN presents a **completely empty group**. To an onlooker, it appears nothing is stored inside.
2. **Real PIN (`1177`)**: Unlocks the group and reveals your actual private applications.
3. **Ghost Visibility**: Apps assigned to the Vault are completely hidden from the "All" tab and other category tabs until unlocked.

> 💡 *Default factory PINs are shown above; easily change them in Settings to your private codes.*

---

## 📥 Download & Installation

Visit the [Official Releases Page](https://github.com/wjf1547/NodeShell-Release/releases) to download the latest APK:

| Package | Asset Name | Target Devices |
|---|---|---|
| `com.nodeshell` | `NodeShell-<version>-arm64.apk` | Modern 64-bit phones and tablets (`arm64-v8a`) |
| `com.nodeshell.tv` | `NodeShell-TV-<version>-v7a.apk` | Smart TVs, TV boxes, and projectors (`armeabi-v7a`) |

*Note: Mobile and TV flavors use distinct Application IDs and can be installed side-by-side.*

### 3 Ways to Install Applications (`.nsapp`):

1. **Tap to Install**: Transfer `.nsapp` to your phone and open it with NodeShell.
2. **In-App Store**: Open Settings → App Store, enter a repository manifest URL, and tap "Install".
3. **Deep Link / QR Code**: Scan a `nodeshell://install?url=...` link to trigger quick installation.

- ⚡ **Recommended**: Download [`apps/nsapps/nodeshell-apps-all.nsapps`](apps/nsapps/nodeshell-apps-all.nsapps) to install all 9 curated apps in one tap!

---

## 🛠️ Developer Ecosystem & Guides

Ready to build your first lightweight application? Explore the comprehensive documentation:

- 🚀 [01. Quick Start in 5 Minutes](nsapp-guide/01-快速开始.md)
- 📐 [03. UI Tree Basics](nsapp-guide/03-UI树基础.md)
- 📋 [04. 44 Native Widgets Cheatsheet](nsapp-guide/04-控件速查表.md)
- 🌐 [11. JavaScript Runtime APIs ($http, $storage, $media, etc.)](nsapp-guide/11-JS-API-详解.md)
- 📦 [12. Packaging & Store Distribution](nsapp-guide/12-打包与发布.md)
- 🚨 [15. Essential Pitfall Checklist (Learned from real bugs)](nsapp-guide/15-避坑清单.md)

NodeShell also includes a built-in mobile IDE: In the launcher, **long-press any app card → ✏️ Edit Source** to inspect and modify JS code directly on your phone!

---

## ☕ Sponsorship & Support

NodeShell is an independent project maintained during personal leisure time without commercial funding or advertisements.  
If NodeShell saves your time or brings utility to your digital life, you are warmly invited to buy the author a coffee:

<div align="center">
  <table>
    <tr>
      <td align="center" width="260">
        <img src="assets/donate_wechat.png" width="180" /><br/>
        <b>WeChat Pay</b>
      </td>
      <td align="center" width="260">
        <img src="assets/donate_alipay.jpg" width="180" /><br/>
        <b>Alipay</b>
      </td>
    </tr>
  </table>
</div>

---

## ⚠️ Transparent Boundaries

- **TV Flavor Specifics**: Because D-Pad input on TV remotes is slow, the disguise lock is disabled by default on TV flavor (directly enters launcher). Vault functionality remains fully supported on TV.
- **Shared Node.js Process**: To achieve ultra-compact ~20 KB app packages, all running mini-apps share a single embedded Node.js process. Uncaught fatal exceptions may require restarting NodeShell. Always wrap async operations in defensive `try/catch`.
- **Storage Permission**: NodeShell runs smoothly without "All Files Access" permission. Granting it provides optional access to public files on external storage.

---

<div align="center">
  <sub>NodeShell · The Ultra-Lightweight Node.js App Container for Android</sub>
</div>
