# NodeShell

Android 上的 Node.js 空壳基座 —— 应用以 `.nsapp` 包形式动态安装/卸载，无需重新打包 APK。

## 下载

到 [Releases](https://github.com/wjf1547/NodeShell-Release/releases) 页面下载最新版。

### 基座 APK

| 包名 | 产物 | 说明 |
|---|---|---|
| `com.nodeshell` | `NodeShell-<版本>-arm64.apk` | 手机/平板，arm64-v8a |
| `com.nodeshell.tv` | `NodeShell-TV-<版本>-v7a.apk` | 电视盒子，armeabi-v7a |

两个包**互相独立**，签名相同但 applicationId 不同，可以同时安装。

### 应用包 (.nsapp)

应用包在本仓库的 [`apps/`](apps/) 目录下（**不走 Releases** —— 应用版本独立于基座版本）：

- [`apps/nsapps/`](apps/nsapps/) —— **一键全装包**，9 个应用一次装完（推荐）
- [`apps/nsapp/`](apps/nsapp/) —— **单个应用包**，只装某一个

| 应用 | 说明 |
|---|---|
| `filemgr` | 文件管理器 |
| `demo` | 控件/能力演示 |
| `agedm` | AGE动漫 |
| `onedrive` | OneDrive |
| `pikpakshare` | PikPak 分享 |
| `ssh` | SSH 终端 |
| `termux` | 本地 shell 终端 |
| `tvbox` | TVBox |
| `webdav` | WebDAV |

单包文件名形如 `<应用>-<版本>.nsapp`（例如 `tvbox-1.4.2.nsapp`）。

装法：把 `.nsapp` / `.nsapps` 文件传到手机，点开 → 选 NodeShell 即可（基座已注册对应文件关联）。

安装后首次使用需在应用内「设置 → 应用商店」填入商店地址，才能拉取应用列表。

## 更新

基座内置更新检查：设置页会显示当前版本，可手动检查；发现新版本时提示下载并安装（走系统安装器）。

更新数据源为本仓库的 GitHub Releases，客户端默认经加速域名下载（原始地址 `github.com` 在国内不稳定）。

## nsapp 开发文档

完整的 nsapp 制作指导（15 章：基础 / 控件篇 / 进阶）见 [`nsapp-guide/`](nsapp-guide/README.md)。

## 版本号

`versionName` 形如 `0.2.13`，`versionCode` 单调递增。同一个 `versionName` 的 phone 与 TV 包版本号一致。

应用包版本独立于基座版本，按各自 `package.json` 的 `version` 命名。
