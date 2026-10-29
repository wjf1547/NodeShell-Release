# 第 11 章 · JS API 详解

所有全局 API 的签名、返回值与坑。**权威来源是 `runner.js`**(基座内 `assets/nodejs-project/runner.js`)。

---

## 11.1 $app -- 应用生命周期

```js
$app.id / $app.name / $app.version / $app.apiVersion    // 元信息(只读)
$app.on(event, fn)     // 'launch' | 'resume' | 'pause' | 'destroy' | 'back' | 'activated' | 'inactivated'
$app.exit()            // 退出应用,回启动器
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
| `back` | 基座已 pop UI 栈后(见 [10.3](10-页面栈与返回.md)) |
| `destroy` | 应用被卸载前 |
| `activated` | 用户切到本应用(0.1.25+) |
| `inactivated` | 本应用被切走(0.1.25+) |

> ⚠️ **0.2.28 之前这七个事件里只有 `launch` 和 `back` 真的会触发**(其余四个只写在文档里)。
> 现在全部真实派发,可以放心用。

两个容易搞混的点:
- `pause`/`resume` 是**整个应用**的前后台,不是单个 Activity。
  从应用里打开网页/终端再回来**不会**触发 pause -- 用户还在应用里。
- 切走时顺序是 `inactivated` → `destroy`。

```js
// 定时器清理的标准写法
let timer = null;
const start = () => { if (!timer) timer = setInterval(poll, 2000); };
const stop  = () => { if (timer) { clearInterval(timer); timer = null; } };
$app.on('launch', start);
$app.on('resume', start);
$app.on('pause',  stop);     // 切后台(含熄屏)就别跑了
$app.on('destroy', stop);    // 退出/被切换都清干净
```

---

## 11.2 $ui -- 界面渲染与交互

### 渲染

```js
$ui.render(tree)      // 替换当前层,不清返回栈
$ui.push(tree)        // 压入新屏,返回栈 +1
$ui.pop()             // 返回上一屏
$ui.popToRoot()       // 一路回根
```

### 事件

```js
$ui.on(eventName, fn)     // 注册(注册一次即可)
$ui.off(eventName)        // 注销
```

### 返回键拦截

```js
$ui.setBackHandler(fn)        // fn 同步返回 true=已消费 / false=放行
$ui.clearBackHandler()        // 清除
```

### 原生对话框(都返回 Promise)

```js
await $ui.alert({ title:'提示', text:'内容' })                        // 点确定 resolve
await $ui.confirm({ title:'确认', text:'确定删除吗?' })                // → boolean
await $ui.prompt({ title:'输入', text:'名字:', placeholder:'张三' })   // → string|null
await $ui.select({ title:'选择', options:[{id:'a',title:'A'}] })        // → id|null
```

> `$ui.alert('纯文本')` 也支持字符串参数(兼容写法)。
> 取消时:`prompt`/`select` resolve `null`,`confirm` resolve `false`。

### 便捷 API

```js
$ui.toast(msg)         // 同 $app.toast
$ui.browser(url)       // 同 $app.openUrl
$ui.viewUser(id)       // 占位(toast)
$ui.viewFile(path)     // 占位(toast)
$ui.showCode(text)     // 占位(toast)
```

### 调试

```js
$ui.diag(true)      // 开启 UI 闪烁诊断,落盘 /sdcard/NodeShell/diag/ui-<appId>.log
$ui.dlog('内容')    // 应用侧诊断日志,同一个 diag 文件(未开启时静默丢弃)
```

---

## 11.3 $media -- 内嵌迷你播放器

```js
$media.open({
  url:      'http(s) 直链 或本地 /s/<token>',
  infoUrl:  '原始链接(可选),供 i 信息弹窗展示',
  type:     'video' | 'audio',
  title, poster, artist, autoPlay: true
})
// → Promise，resolve({finished:true|false})；关闭播放器时才 resolve
```

### 🎵 音乐播放器（0.2.36+，`type:'audio'` 专属界面）

`type:'audio'` 不再共用视频那套界面（黑底 / 旋转 / 投屏 / 弹幕 / 倍速）。基座会切到
**音乐专属 UI**：底部迷你条（旋转封面 + 歌名歌手跑马灯 + 播放/下一首）→ 上滑或点文字区
展开全屏页（封面呼吸缩放 + 大播放键 + 播放模式 / 播放列表 / 收起）。

```js
$media.open({
  url:    'https://.../song.mp3',
  type:   'audio',
  title:  '歌名',
  artist: '歌手',              // 迷你条/全屏页第二行；不传这一行不显示
  poster: 'https://.../c.jpg', // 封面；不传显示占位图标
  list:   [                    // 连播：每首可以带自己的封面与歌手
    { url: '...', title: 'A', poster: '...', artist: 'X' },
    { url: '...', title: 'B', poster: '...', artist: 'Y' },
  ],
})
```

- `type` 也接受 `'music'` / `'song'`；**完全没传 `type` 但传了 `artist`** 时同样按音乐处理
  （老应用没写 type，别让它掉进视频 UI）
- `list` 项上的 `poster` / `artist` 缺省时回退到顶层 `poster` / `artist`
- 音乐页**没有**歌词 / 收藏 / 音质标签 —— 基座没有对应数据通道；这些请应用自己在页面里画
- 定时关闭请用 `$media.open` 之外的应用侧定时器 + 关播放器，基座不自带

### ⚠️ Promise 语义(重要)

- **播放期间 Promise 一直挂起**,直到关闭播放器才 resolve
- **不要 `await` 它再阻塞后续逻辑** -- 播放中切换剧集会被卡住

```js
// ❌ 错误
await $media.open({url, type:'video'});
console.log('这行要等用户关掉播放器才执行');

// ✅ 正确
$media.open({url, type:'video'}).then(r => {
  console.log('播放结束', r.finished);
}).catch(e => console.error(e.message));
```

### 播放失败(0.1.43+)

`onPlayerError` → Promise **reject**(错误码+消息)。

```js
$media.open({url, type:'video'})
  .then(r => console.log('closed', r))
  .catch(e => console.error('播放失败:', e.message));   // 打进调试器 Console
```

> 基座也会在表面内显示「⚠ 播放失败」浮层(错误码+消息+链接+重试/复制链接)。
> **不要写 `.catch(() => 兜底WebView)`** -- 死代码,且容易兜到不存在的页面 → 白屏。

### 支持的容器

Media3 自带 **HLS(m3u8) / mp4 / FLV(FlvExtractor)** -- `.flv` 直播直接传。

### 拉取式下一集(0.1.73+)

```js
$media.onNext(() => {
  const next = playlist[playIndex + 1];
  return next ? { url: next.url, title: next.title, infoUrl: next.raw } : null;
});
```

基座在「快播完预取 / 播完 / 用户点⏭但列表已到末尾」时调用它。

---

## 11.4 $http -- HTTP 请求(永远直连)

```js
$http.get(url, {headers?, timeout?, connectTimeout?, maxBytes?})   // → {status, headers, body, json?}
$http.post(url, body, {headers?})           // body: object→JSON,也可传字符串
$http.request(method, url, opts)            // 0.2.0+: 任意方法
$http.put(url, body, opts)
$http.del(url, opts)
$http.head(url, opts)
```

| 选项 | 默认 | 含义 |
|---|---|---|
| `timeout` | 60000 | **总超时**(毫秒),从发出请求到响应体读完。到点必断。 |
| `connectTimeout` | 15000 | 连接阶段超时,地址不可达时快速失败 |
| `maxBytes` | 32MB | 响应体上限,超出截断并置 `truncated: true` |

> ⚠️ **0.2.28 修正**:`timeout` 以前实际是 **socket 空闲超时** -- 服务端每 100ms 吐 1 字节
> 就能把 5s 的 timeout 无限延长。现在真的是墙上时钟总时长(连续下载也算)。
> 同时 gzip/br 解压输出上限跟随 `maxBytes`,压缩炸弹会被拒而不是吃掉几百 MB 内存。

### ⚠️ `$http` 永远直连真实目标

**不受全局代理开关影响**(0.1.18 起)。API/页面请求一律用 `$http`。

播放走 `require('@shell/stream').url()`（**直连源站**，见 [11.12](#1112-shellstream----流代理助手)），
不要默认套 `$mhttp` —— 出口代理是可选能力，只有用户明确要求时才用。

> 反面案例:某个云盘应用开全局代理后 `$http.post(某 API 域名)` 被劫持进节点
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

## 11.5 $mhttp -- 出口代理版

| 使能状态 | `$mhttp.*` 行为 |
|---|---|
| **开**(ip/freeHost 非空) | 出口换成节点 `ip:port`,请求头 `Host: freeHost` + `X-Online-Host: 真实主机` |
| **关** / 配置不全 | **与 `$http` 完全等价** |

```js
$mhttp.get(url, opts) / $mhttp.post(url, body, opts)
$mhttp.ready()                       // → boolean,当前是否真正走节点
$mhttp.url(videoUrl, opts)           // → Promise<本地可播 URL> 出口视频流端点
```

> ⚠️ **默认不要用 `$mhttp`。** 播放一律走 `require('@shell/stream').url()`（直连源站）；
> `$mhttp` 只在**用户明确要求走出口代理**时，才在那一次调用里使用。
> 不要因为它跟 `$http` 签名一样就顺手替换，也不要在应用里塞代理开关。

### 使用边界

```js
// ✅ 默认:直连源站, 变换/解密照旧
const stream = require('@shell/stream');
const playable = await stream.url(rawUrl, { transform: decrypt, contentType:'video/mp4' });
$media.open({ url: playable, type:'video' });

// ⚠️ 仅当用户明确要求走出口代理时才改成 $mhttp.url(...) (签名相同, 行为受基座开关控制)

// ❌ 应用自连节点 / 自带代理开关 / 硬编码节点 IP
```

### 全局只读配置

```js
CFG.ip / CFG.port / CFG.freeHost / CFG.enabled
$shell.mhttp        // 快照 {enabled, ip, port, freeHost}
```

---

## 11.6 $storage / $prefs -- 键值存储

```js
$storage.get(key) / $storage.set(key, val) / $storage.remove(key)
$prefs.get(key, def?) / $prefs.set(key, val)
```

- JSON 序列化,落盘 `<appData>/<id>/storage.json`
- `$prefs` 与 `$storage` **同实现**,只是语义区分
- **`$prefs` 键带 `prefs.` 前缀时存独立的 `prefs.json`**(0.1.14 起持久化)
- 无前缀键与 `$storage` 共享 `storage.json`

### 铁律:用户配置必须 `prefs.` 前缀

```js
// ✅ 重启保留
$prefs.set('prefs.server', 'http://<服务器地址>');

// ❌ 只写内存变量 → 重启即丢(某个云盘应用 v1.2.0 旧 bug)
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
// ❌ 永远删不掉(0.1.63r18 修复的 9 个应用真实 bug)
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

## 11.7 $webview -- 全屏网页

```js
$webview.open({ url:'https://example.com', title:'网页' })   // → Promise,返回栈可 pop
```

---

## 11.8 $ssh -- 原生 SSH 终端(0.1.58+)

```js
$ssh.open({
  host, port, user,
  authType: 'password' | 'key',
  password, privateKey, passphrase,
  title,
})   // → Promise,终端关闭/断线时 resolve

$ssh.close(reqIdOfOpen)     // 应用主动断开(不常用)
```

---

## 11.9 $termux -- 本地 shell 终端(0.1.62+,真 PTY)

```js
$termux.open({ cwd?, shell?, commands? })   // → Promise,退出时 resolve
```

| 字段 | 说明 |
|---|---|
| `cwd` | 工作目录,**必须绝对路径**。缺省 = `<应用数据目录>/termux-home` |
| `shell` | shell 绝对路径。缺省按 `$SHELL` → `/system/bin/sh` → `/bin/sh` 探测 |
| `commands` | 快捷命令条(芯片行),**完全替换**基座默认集 |

### commands -- 快捷命令条

```js
$termux.open({
  commands: [
    { label:'pwd',  cmd:'pwd',  send:true },              // 点一下直接执行
    { label:'cat',  cmd:'cat' },                          // 只回填,用户接着打
    { label:'exit', cmd:'exit', send:true, style:'warn' },
  ],
});
```

| 字段 | 说明 |
|---|---|
| `label` | 芯片文字,缺省 = `cmd` |
| `cmd` | **必填**,空则该项跳过 |
| `send` | `true`=直接执行;`false`(默认)=只回填到输入行补一个空格 |
| `style` | `'accent'`(青绿) / `'warn'`(琥珀) |

**默认「回填」的理由**:`cat 大文件` 一旦误触会刷屏,而 `send` 又来不及确认。
**带参数/有副作用的命令一律让用户补完再回车**,只有「纯查看、回车即出结果」才 `send:true`。

> 安全边界:基座只渲染芯片、只把文本写进终端 stdin,与用户手打完全一致 --
> 基座不会替应用执行任何命令,应用也无法借 `commands` 绕过用户确认。

### PTY vs 管道

r24 起用真 `forkpty()`:有提示符 `PS1`、有输入回显、有行编辑/上下键历史、
能投递 Ctrl-C/Ctrl-Z、`top`/`vi` 等 tty 程序正常。回退路径:native PTY 不可用时降级管道
(无提示符/无回显,但命令仍可执行)。

---

## 11.10 $wifi -- 扫描附近热点(0.1.6x+)

```js
const r = await $wifi.scan();
// 成功: [{ssid, bssid, level, capabilities, frequency}, ...]
// 权限未授予: {permission:'denied'}
```

**依赖基座 0.1.6x+**(含原生 `$wifi`),且已授予定位权限。
检测:

```js
if (!$wifi || typeof $wifi.scan !== 'function') {
  $ui.alert({ title:'基座版本过旧', text:'当前基座不支持 $wifi (需 0.1.6x+)' });
  return;
}
```

---

## 11.11 $shell -- 基座信息

```js
$shell.version        // 基座版本
$shell.apiVersion     // 基座支持的协议版本
$shell.platform       // 'android'
$shell.server         // 当前服务端地址(可能为空!)
$shell.setServer(url) // 更新服务端地址
$shell.mhttp          // 出口代理配置快照 {enabled, ip, port, freeHost}
$shell.clientId       // 客户端唯一 ID (0.2.31+), 32 位小写 hex -- 安装级
$shell.deviceId       // 设备唯一 ID (0.2.31+), 'nsd_' + 32 hex -- 设备级
$shell.deviceIdSource // 'android_id' | 'install_fallback'
```

### 两个 ID 的区别(别选错)

| | `$shell.clientId` | `$shell.deviceId` |
|---|---|---|
| 语义 | 这个**安装实例** | 这台**机器** |
| 卸载重装 | **会变** | **卸载重装不变** |
| 应用升级 | 不变 | 不变 |
| 换手机 / 恢复出厂 | 变 | 变 |
| 换签名重新打包 | 不变 | **变** |
| 双开 / 分身 / 工作资料 | 各有各的 | 各有各的(不同包名/用户) |
| 依据 | 基座生成的随机 UUID | `Settings.Secure.ANDROID_ID` 加盐哈希 |

**选型建议**:要「同一个人换了新手机前也能认出来」→ 用 `deviceId`;
要「这次安装的独立身份」(比如本地数据游标)→ 用 `clientId`。

### `$shell.deviceId` -- 设备级唯一 ID(0.2.31+)

```js
const dev = $shell.deviceId;
const src = $shell.deviceIdSource;

if (src !== 'android_id') {
  // ⚠️ 这台设备读不到系统设备标识 → dev 已**退化成 clientId**(安装级)
  //    要「必须设备级」的逻辑必须在这里分支处理,不能只判空
  console.warn('设备级 ID 不可用,降级为安装级:', dev);
}
```

关键点:

- **格式**:正常是 `nsd_` + 32 位 hex;降级时是纯 32 位 hex(等同 `clientId`)。
- **不是原始 ANDROID_ID**:基座做了固定盐 SHA-256 再取前 32 位。
  同一设备稳定可复现,但拿到的服务端**无法反推**硬件 ID,也不能跟别的应用互通。
- **一定检查 `deviceIdSource`**:`'android_id'` 才是真设备级;
  `'install_fallback'` 表示退化(极少数 ROM、部分模拟器),此时值等于 `clientId`。
- **换签名 / 换包名都会让它变**:Android 8+ 的 ANDROID_ID 把应用签名算进派生,包名与用户也参与。
  如果你重新打包换了签名,全体用户的 `deviceId` 都会换新 -- 服务端要按「新设备」处理。
- **可能为空**:桥刚连上的极短窗口内是 `''`(和 `clientId` 一样的推送时机),要兜底。

> ⚠️ 别把它当唯一主键做「一人一号」:换机、换签名、双开都会得到新值。
> 适合做「同一台机器上的连续性」(同步游标、去重、风控辅助),不适合做账号身份。

### `$shell.clientId` -- 客户端唯一 ID(0.2.31+)

本**安装**的唯一标识,设置页里也能看到(可点击复制)。适合做服务端侧的
「同一客户端」识别:同步游标、设备绑定、去重等。

```js
const cid = $shell.clientId;
if (!cid) {
  // 桥刚连上时的极短窗口内可能为空 -- 兜底后重试,不要直接崩
  await new Promise(r => setTimeout(r, 300));
}
console.log('client id:', $shell.clientId);
```

语义与限制:

- **不是硬件设备 ID**。它是基座自己生成的随机 UUID(去连字符),存本应用 prefs。
- **卸载重装会变**。正好是「客户端」而非「设备」的语义。
- **不需要任何权限**,也不包含任何硬件信息(不读 ANDROID_ID / IMEI)。
- **可能为空**:桥连上时由基座主动推送;刚启动的那一下若还没推完就是 `''`。
  取值时务必兜底(见上面例子)。应用无需主动请求。
- 双开/分身的两个实例**各有各的 ID**(各自的 prefs),这通常正是想要的效果。

### 版本探测

```js
if ($shell.apiVersion < 1) {
  $app.toast('基座版本过低,请升级');
  $app.exit();
  return;
}
```

> ⚠️ `$shell.server` 可能为空(用户没配商店地址)。
> **不得依赖「服务端某个页面」存在** -- 商店只托管 `index.json` / 应用包 / 图标。

---

## 11.12 @shell/stream -- 流代理助手

加密视频的关键模块。应用在 Node 里解密,注册成本地流端点,返回可播 URL。

```js
const stream = require('@shell/stream');
```

### 按 URL 流式变换(支持 Range/seek)

```js
const playableUrl = await stream.url(remoteUrl, {
  transform(buf, fileOffset) {
    // fileOffset = 该块在源文件中的起始字节偏移(Range seek 时保证正确)
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

实现:请求带 `Range` → 源站同样 Range 拉取 → `transform(buf, start)` → 206 返回。
transform 返回原始缓冲区时自动透传(零拷贝)。

### HLS 分片代理

```js
const playableUrl = await stream.m3u8(m3u8Url, {
  segmentTransform(buf) { /* 每个 .ts/.m4s 分片独立变换 */ },
  headers: {...},
});
```

拉取 m3u8 → 重写分片/变体 URL 为本地端点 → 分片按需拉取+变换;变体(master)递归代理。

> **HLS**:`stream.m3u8()` 会重写分片/变体地址为本地端点（直连源站），分片按需拉取 + 变换。
>
> 只有在**用户明确要求走出口代理**时才用 `$mhttp.url()` —— 它识别到 `.m3u8` 时会自动改用
> m3u8 端点(重写分片 + 全程走节点)。0.2.12 前这是个真 bug:`$mhttp.url()` 把 playlist
> 原样回给播放器,相对分片会按本地端点基址解析成 `/s/seg1.ts` → 404（「一开代理 HLS 就黑屏」）,已修。

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

- 按 token 注册,**应用退出时自动全部注销**,无需手动清理
- 多个播放器实例并发安全(每请求独立)

---

## 11.13 $toast

```js
$toast(msg)     // 与 $app.toast 等价
```

---

## 11.14 Node.js 原生能力

应用跑在完整 Node v18 环境,以下**直接可用**:

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

> 应用自己的数据请放在 `<appData>/<id>/`(`$storage` / `$prefs` 已代为管理)。
> 访问 `/sdcard` 等受限路径需要系统授权。
