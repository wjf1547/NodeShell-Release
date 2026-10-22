# 第 11 章 · JS API 详解

所有全局 API 的签名、返回值与坑。**权威来源是 `runner.js`**（基座内 `assets/nodejs-project/runner.js`）。

---

## 11.1 $app —— 应用生命周期

```js
$app.id / $app.name / $app.version / $app.apiVersion    // 元信息（只读）
$app.on(event, fn)     // 'launch' | 'resume' | 'pause' | 'destroy' | 'back' | 'activated' | 'inactivated'
$app.exit()            // 退出应用，回启动器
$app.toast(msg)        // 轻提示
$app.openUrl(url)      // 系统浏览器打开
$app.share(text)       // 系统分享面板
$app.copy(text)        // 复制到剪贴板
$app.fetchJson(url, opts)  // opts 可省略; 便捷: 自动 JSON.parse, 失败抛错
```

| 生命周期 | 触发时机 |
|---|---|
| `launch` | 应用启动一次 |
| `resume` | 从后台回前台 |
| `pause` | 切到后台 |
| `back` | 基座已 pop UI 栈后（见 [10.3](10-页面栈与返回.md)） |
| `destroy` | 应用被卸载前 |
| `activated` | 用户切到本应用（0.1.25+） |
| `inactivated` | 本应用被切走（0.1.25+） |

```js
// 定时器清理的标准写法
let timer = null;
$app.on('launch', () => { timer = setInterval(poll, 2000); });
$app.on('destroy', () => { if (timer) clearInterval(timer); });
```

---

## 11.2 $ui —— 界面渲染与交互

### 渲染

```js
$ui.render(tree)      // 替换当前层，不清返回栈
$ui.push(tree)        // 压入新屏，返回栈 +1
$ui.pop()             // 返回上一屏
$ui.popToRoot()       // 一路回根
```

### 事件

```js
$ui.on(eventName, fn)     // 注册（注册一次即可）
$ui.off(eventName)        // 注销
```

### 返回键拦截

```js
$ui.setBackHandler(fn)        // fn 同步返回 true=已消费 / false=放行
$ui.clearBackHandler()        // 清除
```

### 原生对话框（都返回 Promise）

```js
await $ui.alert({ title:'提示', text:'内容' })                        // 点确定 resolve
await $ui.confirm({ title:'确认', text:'确定删除吗?' })                // → boolean
await $ui.prompt({ title:'输入', text:'名字:', placeholder:'张三' })   // → string|null
await $ui.select({ title:'选择', options:[{id:'a',title:'A'}] })        // → id|null
```

> `$ui.alert('纯文本')` 也支持字符串参数（兼容写法）。
> 取消时：`prompt`/`select` resolve `null`，`confirm` resolve `false`。

### 便捷 API

```js
$ui.toast(msg)         // 同 $app.toast
$ui.browser(url)       // 同 $app.openUrl
$ui.viewUser(id)       // 占位（toast）
$ui.viewFile(path)     // 占位（toast）
$ui.showCode(text)     // 占位（toast）
```

### 调试

```js
$ui.diag(true)      // 开启 UI 闪烁诊断，落盘 /sdcard/NodeShell/diag/ui-<appId>.log
$ui.dlog('内容')    // 应用侧诊断日志，同一个 diag 文件（未开启时静默丢弃）
```

---

## 11.3 $media —— 内嵌迷你播放器

```js
$media.open({
  url:      'http(s) 直链 或本地 /s/<token>',
  infoUrl:  '原始链接(可选)，供 ℹ 信息弹窗展示',
  type:     'video' | 'audio',
  title, poster, autoPlay: true
})
// → Promise，resolve({finished:true|false})；关闭播放器时才 resolve
```

### ⚠️ Promise 语义（重要）

- **播放期间 Promise 一直挂起**，直到关闭播放器才 resolve
- **不要 `await` 它再阻塞后续逻辑** —— 播放中切换剧集会被卡住

```js
// ❌ 错误
await $media.open({url, type:'video'});
console.log('这行要等用户关掉播放器才执行');

// ✅ 正确
$media.open({url, type:'video'}).then(r => {
  console.log('播放结束', r.finished);
}).catch(e => console.error(e.message));
```

### 播放失败（0.1.43+）

`onPlayerError` → Promise **reject**（错误码+消息）。

```js
$media.open({url, type:'video'})
  .then(r => console.log('closed', r))
  .catch(e => console.error('播放失败:', e.message));   // 打进调试器 Console
```

> 基座也会在表面内显示「⚠ 播放失败」浮层（错误码+消息+链接+重试/复制链接）。
> **不要写 `.catch(() => 兜底WebView)`** —— 死代码，且容易兜到不存在的页面 → 白屏。

### 支持的容器

Media3 自带 **HLS(m3u8) / mp4 / FLV(FlvExtractor)** —— `.flv` 直播直接传。

### 拉取式下一集（0.1.73+）

```js
$media.onNext(() => {
  const next = playlist[playIndex + 1];
  return next ? { url: next.url, title: next.title, infoUrl: next.raw } : null;
});
```

基座在「快播完预取 / 播完 / 用户点⏭但列表已到末尾」时调用它。

---

## 11.4 $http —— HTTP 请求（永远直连）

```js
$http.get(url, {headers?, timeout?})        // → {status, headers, body, json?}
$http.post(url, body, {headers?})           // body: object→JSON，也可传字符串
$http.request(method, url, opts)            // 0.2.0+: 任意方法
$http.put(url, body, opts)
$http.del(url, opts)
$http.head(url, opts)
```

### ⚠️ `$http` 永远直连真实目标

**不受全局代理开关影响**（0.1.18 起）。API/页面请求一律用 `$http`。
只有播放视频链接才用 `$mhttp.url()`。

> 反面案例：某个云盘应用开全局代理后 `$http.post(某 API 域名)` 被劫持进节点
> → 打开即 403。出口节点按 `X-Online-Host` 只放行**视频域名白名单**。

### 标准请求模板

```js
function withTimeout(p, ms) {
  return Promise.race([p, new Promise((_, rj) =>
    setTimeout(() => rj(new Error('请求超时(' + (ms/1000) + 's)')), ms))]);
}

async function api(path, body) {
  const r = await withTimeout(
    $http.post('https://api.example.com' + path, body, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000,
    }), 15000);
  if (r.status !== 200) throw new Error('HTTP ' + r.status);
  return r.json != null ? r.json : JSON.parse(r.body || '{}');
}
```

---

## 11.5 $mhttp —— 出口代理版

| 使能状态 | `$mhttp.*` 行为 |
|---|---|
| **开**（ip/freeHost 非空） | 出口换成节点 `ip:port`，请求头 `Host: freeHost` + `X-Online-Host: 真实主机` |
| **关** / 配置不全 | **与 `$http` 完全等价** |

```js
$mhttp.get(url, opts) / $mhttp.post(url, body, opts)
$mhttp.ready()                       // → boolean，当前是否真正走节点
$mhttp.url(videoUrl, opts)           // → Promise<本地可播 URL> 出口视频流端点
```

### 使用边界（铁律）

```js
// ✅ 播放逻辑无条件调用，走不走节点由基座全局开关决定，应用零分支
const playable = await $mhttp.url(rawUrl, { transform: decrypt, contentType:'video/mp4' });
$media.open({ url: playable, type:'video' });

// ❌ 应用自连节点 / 自带开关 / 硬编码节点 IP
```

### 全局只读配置

```js
CFG.ip / CFG.port / CFG.freeHost / CFG.enabled
$shell.mhttp        // 快照 {enabled, ip, port, freeHost}
```

---

## 11.6 $storage / $prefs —— 键值存储

```js
$storage.get(key) / $storage.set(key, val) / $storage.remove(key)
$prefs.get(key, def?) / $prefs.set(key, val)
```

- JSON 序列化，落盘 `<appData>/<id>/storage.json`
- `$prefs` 与 `$storage` **同实现**，只是语义区分
- **`$prefs` 键带 `prefs.` 前缀时存独立的 `prefs.json`**（0.1.14 起持久化）
- 无前缀键与 `$storage` 共享 `storage.json`

### 铁律：用户配置必须 `prefs.` 前缀

```js
// ✅ 重启保留
$prefs.set('prefs.server', 'http://<服务器地址>');

// ❌ 只写内存变量 → 重启即丢（某个云盘应用 v1.2.0 旧 bug）
SETTINGS.server = 'http://...';
```

### 读取必须给默认值兜底

```js
function pref(key, def) {
  const v = $prefs.get(key);
  return (v === undefined || v === null || v === '') ? def : v;
}
```

### 删除数组项必须按索引

```js
// ❌ 永远删不掉（0.1.63r18 修复的 9 个应用真实 bug）
saveServers(loadServers().filter(x => x !== s));
// 原因: loadServers() 内部 JSON.parse 每次返回全新对象 → 引用恒不相等

// ✅ 按索引删 + 名称兜底
function delServer(i, s) {
  const l = loadServers();
  if (l[i] !== undefined && (l[i].name||'') === (s.name||'')) l.splice(i, 1);
  else {
    const k = l.findIndex(x => (x.name||'') === (s.name||''));
    if (k >= 0) l.splice(k, 1);
  }
  saveServers(l);
}
```

> **凡见 `.filter((x) => x !== someObj)` 一律是 bug。** 同理适用于任何
> 「JSON 反序列化出来的数组 + 想删其中一项」的场景。

---

## 11.7 $webview —— 全屏网页

```js
$webview.open({ url:'https://example.com', title:'网页' })   // → Promise，返回栈可 pop
```

---

## 11.8 $ssh —— 原生 SSH 终端（0.1.58+）

```js
$ssh.open({
  host, port, user,
  authType: 'password' | 'key',
  password, privateKey, passphrase,
  title,
})   // → Promise，终端关闭/断线时 resolve

$ssh.close(reqIdOfOpen)     // 应用主动断开（不常用）
```

---

## 11.9 $termux —— 本地 shell 终端（0.1.62+，真 PTY）

```js
$termux.open({ cwd?, shell?, commands? })   // → Promise，退出时 resolve
```

| 字段 | 说明 |
|---|---|
| `cwd` | 工作目录，**必须绝对路径**。缺省 = `<应用数据目录>/termux-home` |
| `shell` | shell 绝对路径。缺省按 `$SHELL` → `/system/bin/sh` → `/bin/sh` 探测 |
| `commands` | 快捷命令条（芯片行），**完全替换**基座默认集 |

### commands —— 快捷命令条

```js
$termux.open({
  commands: [
    { label:'pwd',  cmd:'pwd',  send:true },              // 点一下直接执行
    { label:'cat',  cmd:'cat' },                          // 只回填，用户接着打
    { label:'exit', cmd:'exit', send:true, style:'warn' },
  ],
});
```

| 字段 | 说明 |
|---|---|
| `label` | 芯片文字，缺省 = `cmd` |
| `cmd` | **必填**，空则该项跳过 |
| `send` | `true`=直接执行；`false`(默认)=只回填到输入行补一个空格 |
| `style` | `'accent'`(青绿) / `'warn'`(琥珀) |

**默认「回填」的理由**：`cat 大文件` 一旦误触会刷屏，而 `send` 又来不及确认。
**带参数/有副作用的命令一律让用户补完再回车**，只有「纯查看、回车即出结果」才 `send:true`。

> 安全边界：基座只渲染芯片、只把文本写进终端 stdin，与用户手打完全一致 ——
> 基座不会替应用执行任何命令，应用也无法借 `commands` 绕过用户确认。

### PTY vs 管道

r24 起用真 `forkpty()`：有提示符 `PS1`、有输入回显、有行编辑/上下键历史、
能投递 Ctrl-C/Ctrl-Z、`top`/`vi` 等 tty 程序正常。回退路径：native PTY 不可用时降级管道
（无提示符/无回显，但命令仍可执行）。

---

## 11.10 $wifi —— 扫描附近热点（0.1.6x+）

```js
const r = await $wifi.scan();
// 成功: [{ssid, bssid, level, capabilities, frequency}, ...]
// 权限未授予: {permission:'denied'}
```

**依赖基座 0.1.6x+**（含原生 `$wifi`），且已授予定位权限。
检测：

```js
if (!$wifi || typeof $wifi.scan !== 'function') {
  $ui.alert({ title:'基座版本过旧', text:'当前基座不支持 $wifi (需 0.1.6x+)' });
  return;
}
```

---

## 11.11 $shell —— 基座信息

```js
$shell.version        // 基座版本
$shell.apiVersion     // 基座支持的协议版本
$shell.platform       // 'android'
$shell.server         // 当前服务端地址（可能为空！）
$shell.setServer(url) // 更新服务端地址
$shell.mhttp          // 出口代理配置快照 {enabled, ip, port, freeHost}
```

### 版本探测

```js
if ($shell.apiVersion < 1) {
  $app.toast('基座版本过低，请升级');
  $app.exit();
  return;
}
```

> ⚠️ `$shell.server` 可能为空（用户没配商店地址）。
> **不得依赖「服务端某个页面」存在** —— 商店只托管 `index.json` / 应用包 / 图标。

---

## 11.12 @shell/stream —— 流代理助手

加密视频的关键模块。应用在 Node 里解密，注册成本地流端点，返回可播 URL。

```js
const stream = require('@shell/stream');
```

### 按 URL 流式变换（支持 Range/seek）

```js
const playableUrl = await stream.url(remoteUrl, {
  transform(buf, fileOffset) {
    // fileOffset = 该块在源文件中的起始字节偏移（Range seek 时保证正确）
    const out = Buffer.allocUnsafe(buf.length);
    for (let i = 0; i < buf.length; i++) {
      const j = fileOffset + i;
      out[i] = (j % 2 === 0) ? (buf[i] + 1) : (buf[i] - 1);   // 你的解密算法
    }
    return out;
  },
  headers: {...},         // 转发给源站的请求头
  ext: '.mp4',            // 播放器嗅探用
  contentType: 'video/mp4',
});
$media.open({ url: playableUrl, type:'video' });
```

实现：请求带 `Range` → 源站同样 Range 拉取 → `transform(buf, start)` → 206 返回。
transform 返回原始缓冲区时自动透传（零拷贝）。

### HLS 分片代理

```js
const playableUrl = await stream.m3u8(m3u8Url, {
  segmentTransform(buf) { /* 每个 .ts/.m4s 分片独立变换 */ },
  headers: {...},
});
```

拉取 m3u8 → 重写分片/变体 URL 为本地端点 → 分片按需拉取+变换；变体(master)递归代理。

> **HLS + 代理**：`$mhttp.url()` 识别到 `.m3u8` 时会**自动**改用 m3u8 端点（重写分片 +
> 全程走节点），应用无需判断。`stream.m3u8` 仍按规则 7b 直连、不走节点
> —— 要走节点请用 `$mhttp.url()`。
>
> 0.2.12 前这是个真 bug：`$mhttp.url()` 把 playlist 原样回给播放器，相对分片会按本地端点
> 基址解析成 `/s/seg1.ts` → 404，也就是「一开代理 HLS 就黑屏」。

### 出口代理端点

```js
const url = await stream.mhttp(videoUrl, opts);    // 等价 $mhttp.url()
```

### 完全自定义

```js
const url = stream.custom((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello</h1>');
});
```

### 生命周期

- 按 token 注册，**应用退出时自动全部注销**，无需手动清理
- 多个播放器实例并发安全（每请求独立）

---

## 11.13 $toast

```js
$toast(msg)     // 与 $app.toast 等价
```

---

## 11.14 Node.js 原生能力

应用跑在完整 Node v18 环境，以下**直接可用**：

```js
const http = require('http');      // 完整 http/https
const fs = require('fs');          // 文件读写
const crypto = require('crypto');  // 加密/哈希
const path = require('path');
const { URL } = require('url');
Buffer / setTimeout / setInterval / setImmediate / queueMicrotask / process
require('任意 npm 包')            // 需自带 node_modules
```

`require` 从**应用目录**解析 → 自带 `node_modules` 生效。

> 应用自己的数据请放在 `<appData>/<id>/`（`$storage` / `$prefs` 已代为管理）。
> 访问 `/sdcard` 等受限路径需要系统授权。
