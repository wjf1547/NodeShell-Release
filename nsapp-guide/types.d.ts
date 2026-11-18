/**
 * NodeShell (nsapp) 全局环境与 UI 契约 TypeScript 声明文件
 *
 * ⚠️ 本文件由 scripts/gen-dts.js 结合 proto/ui-schema.json 自动生成。
 * 请勿直接手动修改 UI 控件定义；修改 UI 属性请直接改 UiSpec.kt，
 * 然后运行 node scripts/gen-ui-schema.js && node scripts/gen-dts.js。
 */

declare namespace NodeShell {
  // ── 通用类型 ───────────────────────────────────────────────────────────
  type ColorString = string;
  type Dimension = number | string;

  // ── 48 个 UI 控件 Props 契约 ──────────────────────────────────────────
  /**
   * accordion 控件属性
   * 折叠面板 (多个可展开区块); items:[{id,title,subtitle,icon,expanded,children}]; children 是节点数组 (与 tree 的数据行不同); exclusive=true 时同时只展开一个 (手风琴模式); expanded 受控, onExpand 后改值再 render
   */
  export interface AccordionProps {
    exclusive?: any;
    items?: AccordionItem[];
    onExpand?: string;
    [key: string]: any;
  }

  export interface AccordionItem {
    children?: any;
    expanded?: any;
    icon?: string;
    id?: string;
    subtitle?: string;
    title?: string;
    [key: string]: any;
  }

  /**
   * actions 控件属性
   * 声明式按钮行; item:{text, onClick, variant=tonal|filled|outlined}; fill(默认)=均分整行, align=left/center/right 靠左/居中/靠右
   */
  export interface ActionsProps {
    align?: string;
    gap?: number | string;
    items?: ActionsItem[];
    [key: string]: any;
  }

  export interface ActionsItem {
    id?: string;
    onClick?: string;
    text?: string;
    variant?: any;
    [key: string]: any;
  }

  /**
   * article 控件属性
   * 文章页 (WebView 渲染 html)。0.2.49 起**注入基础样式** (字号/行距/img max-width/viewport), 裸 <p>/<h2>/<ul> 可直接阅读; 应用自带的 <style> 与行内 style 仍然优先
   */
  export interface ArticleProps {
    html?: any;
    image?: any;
    title?: string;
    [key: string]: any;
  }

  /**
   * audio 控件属性
   * 页内音频条; url 支持 {value,headers} 形式; title 作为封面文案, height 固定高度(dp); resizeMode 同 video
   */
  export interface AudioProps {
    cover?: any;
    height?: number | string;
    playlist?: any;
    resizeMode?: any;
    title?: string;
    url?: string;
    [key: string]: any;
  }

  /**
   * avatar 控件属性
   * 头像
   */
  export interface AvatarProps {
    onClick?: string;
    shape?: any;
    size?: number | string;
    text?: string;
    url?: string;
    [key: string]: any;
  }

  /**
   * badge 控件属性
   * 角标
   */
  export interface BadgeProps {
    color?: ColorString;
    onClick?: string;
    text?: string;
    [key: string]: any;
  }

  /**
   * bottom_sheet 控件属性
   * 通用可拖拽底部面板容器 (ModalBottomSheet); props.open 受控 (关闭时 onChange 回传 value=false); children 为面板内容主体; 支持 subtitle, dragHandle, skipPartiallyExpanded, dismissable
   */
  export interface BottomSheetProps {
    dismissable?: any;
    dragHandle?: any;
    onChange?: string;
    open?: any;
    skipPartiallyExpanded?: any;
    subtitle?: any;
    title?: string;
    [key: string]: any;
  }

  /**
   * button 控件属性
   * 按钮 (variant: filled|tonal|outlined|text, 默认 tonal; fullWidth 默认 false; haptic: tick|click|heavy|error)
   */
  export interface ButtonProps {
    fullWidth?: any;
    haptic?: any;
    onClick?: string;
    text?: string;
    variant?: any;
    [key: string]: any;
  }

  /**
   * card 控件属性
   * 卡片容器; 可选 props: padding(内边距 dp), radius(圆角 dp), dense(紧凑模式 bool)
   */
  export interface CardProps {
    dense?: boolean;
    padding?: number | string;
    radius?: number | string;
    [key: string]: any;
  }

  /**
   * chart 控件属性
   * 数据图表 (chartType 共 10 种: line/area/bar/pie/radar/scatter/gauge/funnel/heatmap/treemap); datasets 每行可带 name(系列名)/color/data; bar 可 stacked 堆叠, line/area 可 smooth 平滑, gauge/radar 可 max 定量程; unit=单位后缀, showLegend/showGrid 默认 true; ⚠️ chartType 写错会静默降级成折线图; 0.2.59 起可交互: 点击数据点/柱/扇区显示 tooltip (tooltip 默认 true) 并回传 onClick, payload={index, label, values:[{name,value}]}; 再点同一处取消选中; radar/gauge 不定位具体数据点 (index=-1), 只回传整体点击
   */
  export interface ChartProps {
    chartType?: any;
    datasets?: any;
    height?: number | string;
    labels?: any;
    max?: any;
    onClick?: string;
    showGrid?: any;
    showLegend?: any;
    smooth?: any;
    stacked?: any;
    title?: string;
    tooltip?: any;
    unit?: any;
    [key: string]: any;
  }

  export interface ChartItem {
    color?: any;
    data?: any;
    name?: any;
    [key: string]: any;
  }

  /**
   * checkbox 控件属性
   * 复选
   */
  export interface CheckboxProps {
    checked?: boolean;
    label?: string;
    onChange?: string;
    [key: string]: any;
  }

  /**
   * chip 控件属性
   * 筛选标签
   */
  export interface ChipProps {
    onClick?: string;
    selected?: any;
    text?: string;
    [key: string]: any;
  }

  /**
   * collapsing_scaffold 控件属性
   * 视差折叠头部容器; props: title, subtitle, image(背景大图), maxHeight(最大展开高度), minHeight(最小折叠高度), sticky(吸顶节点数组); children 为滚动主体内容; ⚠️Lazy 容器, 内部支持 list/grid
   */
  export interface CollapsingScaffoldProps {
    image?: any;
    maxHeight?: any;
    minHeight?: any;
    sticky?: any;
    subtitle?: any;
    title?: string;
    [key: string]: any;
  }

  /**
   * column 控件属性
   * 纵向布局; gap 为子节点间距(dp), 默认不插间距
   */
  export interface ColumnProps {
    gap?: number | string;
    [key: string]: any;
  }

  /**
   * datepicker 控件属性
   * 日期选择器; value='YYYY-MM-DD' (空=未选); min/max 限制可选范围 (同格式); 点击弹出 Material3 DatePickerDialog, 取消/清空回传空串
   */
  export interface DatepickerProps {
    label?: string;
    max?: any;
    min?: any;
    onChange?: string;
    placeholder?: string;
    value?: string;
    [key: string]: any;
  }

  /**
   * dialog 控件属性
   * 声明式对话框; props.open 受控 (关闭时 onChange 回传 value=false); title/text 为标题与说明, children 为任意主体内容 (表单/列表都放这里), actions:[{id,text,onClick}] 底部按钮行; dismissable 默认 true, false = 点外部/返回键不关 (危险操作确认用)
   */
  export interface DialogProps {
    actions?: any;
    dismissable?: any;
    onChange?: string;
    open?: any;
    text?: string;
    title?: string;
    [key: string]: any;
  }

  export interface DialogItem {
    id?: string;
    onClick?: string;
    text?: string;
    [key: string]: any;
  }

  /**
   * divider 控件属性
   * 分割线 (无 props)
   */
  export interface DividerProps {
    [key: string]: any;
  }

  /**
   * drawer 控件属性
   * 抽屉导航
   */
  export interface DrawerProps {
    header?: any;
    items?: DrawerItem[];
    [key: string]: any;
  }

  export interface DrawerItem {
    icon?: string;
    id?: string;
    onClick?: string;
    title?: string;
    [key: string]: any;
  }

  /**
   * dropdown 控件属性
   * 下拉选择
   */
  export interface DropdownProps {
    items?: DropdownItem[];
    onChange?: string;
    placeholder?: string;
    selected?: any;
    [key: string]: any;
  }

  export interface DropdownItem {
    id?: string;
    label?: any;
    [key: string]: any;
  }

  /**
   * empty 控件属性
   * 空状态占位 (图标+文案); 列表/网格无数据时的统一空态
   */
  export interface EmptyProps {
    icon?: any;
    text?: string;
    [key: string]: any;
  }

  /**
   * fab 控件属性
   * 悬浮按钮
   */
  export interface FabProps {
    icon?: any;
    onClick?: string;
    text?: string;
    [key: string]: any;
  }

  /**
   * grid 控件属性
   * 图片网格; item.url 支持 {value,headers} 形式; subtitle 副标题 (0.1.70+); 0.1.67+ 支持 header/footer 冻结栏与 refreshing/onRefresh 下拉刷新; 0.2.104+ empty/emptyIcon/error/onRetry 内建三态 (与 list 同义, 占满整行); staggered:true 切换成瀑布流 (LazyVerticalStaggeredGrid) —— 每列独立堆叠、图片按原始比例出高, 此时 aspect 默认不锁高度
   */
  export interface GridProps {
    aspect?: any;
    columns?: any;
    empty?: any;
    emptyIcon?: any;
    error?: any;
    footer?: any;
    header?: any;
    items?: GridItem[];
    onEndReached?: string;
    onRefresh?: string;
    onRetry?: string;
    prefetchDistance?: any;
    refreshing?: boolean;
    skeleton?: any;
    skeletonCount?: any;
    staggered?: any;
    [key: string]: any;
  }

  export interface GridItem {
    id?: string;
    onClick?: string;
    onLongClick?: string;
    subtitle?: string;
    title?: string;
    url?: any;
    [key: string]: any;
  }

  /**
   * icon 控件属性
   * 图标 (emoji/文字)
   */
  export interface IconProps {
    color?: ColorString;
    name?: any;
    onClick?: string;
    size?: number | string;
    [key: string]: any;
  }

  /**
   * image 控件属性
   * 图片; url 支持 {value,headers} 形式 (headers 在 url 对象内, 非顶层 props); height 固定高度(dp), contentScale='crop'|'fit'; maxHeightPct 无 height 时的高度上限(占屏高百分比, 默认 40); gallery 看图列表, galleryIndex 起始张, galleryOpen=true 进入即打开; 0.2.59+ qr 传一段文本即渲染成二维码 (走基座已有 zxing, 不需要应用自己编码 PNG; 与 url 互斥, qr 优先; height 默认 180); 0.2.104+ radius 圆角(dp, 默认 0=直角; 圆形可传一个大于半宽的值); 加载中有占位色块、失败有错误色块, 不再是透明空白
   */
  export interface ImageProps {
    contentScale?: any;
    gallery?: any;
    galleryIndex?: any;
    galleryOpen?: any;
    height?: number | string;
    maxHeightPct?: any;
    onClick?: string;
    qr?: any;
    radius?: number | string;
    url?: string;
    [key: string]: any;
  }

  /**
   * input 控件属性
   * 单行输入; type=text/password/number/email/tel/url; singleLine 默认 true, 可关; 0.1.91+ number 支持 min/max/step 软约束 (超限 clamp + 标红, 不拦输入)
   */
  export interface InputProps {
    disabled?: boolean;
    max?: any;
    min?: any;
    onChange?: string;
    onSubmit?: string;
    placeholder?: string;
    singleLine?: any;
    step?: any;
    type?: any;
    value?: string;
    [key: string]: any;
  }

  /**
   * link 控件属性
   * 链接
   */
  export interface LinkProps {
    onClick?: string;
    size?: number | string;
    text?: string;
    [key: string]: any;
  }

  /**
   * list 控件属性
   * 卡片列表。⚠️ 操作栏必须写 props.actions, 不能写 node.children —— ListNode() 不读 children, 写在那里会静默丢弃 (tutupwd v1.1.2 的真实 bug)。0.1.67+ 支持 refreshing/onRefresh 下拉刷新; 0.2.59+ items[] 可带 children 自定义整行布局 (有 children 时 6 个固定槽位不参与渲染, ⚠️ children 里不要放 list/grid/tree); stickyHeader:true 时按 items[].group 分组并吸顶 (group 为空不分组); 0.2.59+ selectable:true 开启多选 (长按进入/点击切换/顶栏全选), selected 与 selectMode 受控 (不写则基座自管), onSelectChange 回调 {selected,count,mode}; 0.2.104+ empty 空态文案 / error 错误文案 (写了优先于空态) / emptyIcon 空态图标 (默认 📭) / onRetry 错误态重试事件; 三者仅在 items 为空且非 skeleton 时渲染, 优先级 skeleton > error > empty
   */
  export interface ListProps {
    actions?: any;
    dense?: boolean;
    empty?: any;
    emptyIcon?: any;
    error?: any;
    footer?: any;
    header?: any;
    items?: ListItem[];
    onEndReached?: string;
    onRefresh?: string;
    onRetry?: string;
    onSelectChange?: string;
    prefetchDistance?: any;
    refreshing?: boolean;
    secondaryActions?: any;
    selectMode?: any;
    selectable?: boolean;
    selected?: any;
    skeleton?: any;
    skeletonCount?: any;
    stickyHeader?: boolean;
    [key: string]: any;
  }

  export interface ListItem {
    avatar?: any;
    badge?: string;
    badgeColor?: any;
    children?: any;
    group?: string;
    icon?: string;
    id?: string;
    more?: string;
    onClick?: string;
    onLongClick?: string;
    right?: any;
    subtitle?: string;
    swipeActions?: any;
    title?: string;
    [key: string]: any;
  }

  /**
   * loading 控件属性
   * 加载中
   */
  export interface LoadingProps {
    text?: string;
    [key: string]: any;
  }

  /**
   * pager 控件属性
   * 原生滑屏容器 (HorizontalPager); items:[{title, children}] 每个页面带独立 children 与 Lazy 状态保留, tabPosition: top(默认)/none(无Tab栏纯滑屏), mode: scrollable(默认)/fixed, swipeEnabled: 是否允许手势滑屏(默认true); 0.2.104+ indicator=dots|fraction|none(默认) 指示器, indicatorOverlay 叠在页底(banner 用法), autoPlay+autoPlayInterval(默认 3500ms) 自动轮播且用户一拖即重置计时, loop 无限循环(仅 tabPosition=none), peek 左右露出相邻页(dp), spacing 页间距(dp)
   */
  export interface PagerProps {
    activeTab?: any;
    autoPlay?: any;
    autoPlayInterval?: any;
    indicator?: any;
    indicatorOverlay?: any;
    items?: PagerItem[];
    loop?: any;
    mode?: any;
    onPageChange?: string;
    peek?: any;
    spacing?: any;
    swipeEnabled?: any;
    tabPosition?: any;
    [key: string]: any;
  }

  export interface PagerItem {
    children?: any;
    title?: string;
    [key: string]: any;
  }

  /**
   * progress 控件属性
   * 进度条 (value<0 → 不定态)
   */
  export interface ProgressProps {
    text?: string;
    value?: string;
    [key: string]: any;
  }

  /**
   * radio 控件属性
   * 单选组
   */
  export interface RadioProps {
    items?: RadioItem[];
    onChange?: string;
    selected?: any;
    [key: string]: any;
  }

  export interface RadioItem {
    id?: string;
    label?: any;
    [key: string]: any;
  }

  /**
   * root 控件属性
   * 屏幕容器(标题栏); scroll:true 使页面可滚动, 但不能混用 Lazy 子组件; 0.2.59+ bottomBar 为吸底节点数组 (渲染在滚动区之外, 永不随内容滚动)
   */
  export interface RootProps {
    bottomBar?: any;
    density?: any;
    scroll?: boolean;
    subtitle?: any;
    title?: string;
    [key: string]: any;
  }

  /**
   * row 控件属性
   * 横向布局。0.1.82 起 scroll 默认 true → 横向滚动行: 子节点按内容宽度排布(不 weight), 总宽超出屏幕可左右滑动 —— 适合 chip 标签过多/过长场景。需要老「均分整行」行为写 scroll=false:全部子节点均分整行 (0.1.22 行为); 写 props.weights 数组则切换为显式权重:与 children 下标平行, 数字=weight 份额(填满), "auto"/null=按内容排, 数组短于 children 缺位按 auto。align=垂直对齐(top/center/bottom, 默认 center), justify=水平分布(start/center/end/between, 默认 start), gap 间距默认 8dp。0.2.59 起 wrap:true = 流式换行 (FlowRow): 子节点按内容宽度排布, 超出屏宽自动折行, 行间距=gap; 与 scroll 互斥 (wrap 优先)。标签/chip 墙首选。
   */
  export interface RowProps {
    align?: string;
    gap?: number | string;
    justify?: any;
    scroll?: boolean;
    weights?: any;
    wrap?: any;
    [key: string]: any;
  }

  /**
   * search 控件属性
   * 搜索框; 0.1.90+ filters 横排筛选 chip (onChange 回传选中 id) + history 历史关键词行 (点击触发 onSubmit); 0.2.105+ suggestions 输入建议下拉 (子串匹配, 最多 8 条, 点击触发 onSubmit); fullscreen:true 收成一条假搜索条, 点一下全屏展开 (自动弹键盘 + 建议/历史列表), autoFocus:true 则渲染即展开
   */
  export interface SearchProps {
    autoFocus?: any;
    filters?: any;
    fullscreen?: any;
    history?: any;
    onChange?: string;
    onSubmit?: string;
    placeholder?: string;
    suggestions?: any;
    value?: string;
    [key: string]: any;
  }

  /**
   * segmented 控件属性
   * 分段选择器 (横排互斥, 2~4 项); items:[{id,label,icon?}]; selected=选中项 id; onChange payload.value=新选中 id
   */
  export interface SegmentedProps {
    items?: SegmentedItem[];
    onChange?: string;
    selected?: any;
    [key: string]: any;
  }

  export interface SegmentedItem {
    icon?: string;
    id?: string;
    label?: any;
    [key: string]: any;
  }

  /**
   * sheet 控件属性
   * 底部动作面板 (ModalBottomSheet); props.open 受控 (关闭时 onChange 回传 value=false); items:[{id,title,icon?,destructive?,onClick}]; destructive 用错误色
   */
  export interface SheetProps {
    items?: SheetItem[];
    onChange?: string;
    open?: any;
    title?: string;
    [key: string]: any;
  }

  export interface SheetItem {
    destructive?: any;
    icon?: string;
    id?: string;
    onClick?: string;
    title?: string;
    [key: string]: any;
  }

  /**
   * slider 控件属性
   * 滑块
   */
  export interface SliderProps {
    label?: string;
    max?: any;
    min?: any;
    onChange?: string;
    step?: any;
    value?: string;
    [key: string]: any;
  }

  /**
   * space 控件属性
   * 占位
   */
  export interface SpaceProps {
    height?: number | string;
    width?: number | string;
    [key: string]: any;
  }

  /**
   * switch 控件属性
   * 开关
   */
  export interface SwitchProps {
    checked?: boolean;
    label?: string;
    onChange?: string;
    [key: string]: any;
  }

  /**
   * table 控件属性
   * 表格 (bordered=true 时画 1dp 描边, 默认无边框); rows 单元格可为字符串或 {text,color,align,bold} 对象 (0.1.90+); onRowClick 行点击事件 (0.1.90+); stickyHeader 表头吸顶 (0.1.90+)
   */
  export interface TableProps {
    bordered?: any;
    columns?: any;
    onRowClick?: string;
    rows?: any;
    stickyHeader?: boolean;
    [key: string]: any;
  }

  /**
   * tabs 控件属性
   * 底部标签页; 每个 page 可带 children 作为该页内容, badge 支持红点(bool)或角标文案
   */
  export interface TabsProps {
    activeTab?: any;
    onTabSelected?: string;
    pages?: any;
    [key: string]: any;
  }

  export interface TabsItem {
    badge?: string;
    children?: any;
    icon?: string;
    title?: string;
    [key: string]: any;
  }

  /**
   * text 控件属性
   * 文本; 居中用 align:'center'。0.1.68+ 行内富文本自动解析 BBCode 标记: [b]粗[/b] [i]斜[/i] [u]下划线[/u] [c=#f60]颜色[/c]; rich:false 可关闭。未知标记 (如 [1080P]) 原样透传不误伤; selectable:true 可长按选中复制 (0.2.59+); copy:true 点击整段即复制 (0.2.59+, 与 expandable 互斥且优先); 0.2.105+ 排版令牌: weight=normal|medium|semibold|bold (优先于旧字段 bold) / lineHeight 倍数 (1.6 = 1.6 倍字号, 不写不干预) / letterSpacing 字距 sp (可负)
   */
  export interface TextProps {
    align?: string;
    bold?: any;
    color?: ColorString;
    copy?: any;
    expandable?: any;
    letterSpacing?: any;
    lineHeight?: any;
    maxLines?: any;
    onClick?: string;
    rich?: any;
    selectable?: boolean;
    size?: number | string;
    text?: string;
    weight?: number | string;
    [key: string]: any;
  }

  /**
   * textarea 控件属性
   * 多行输入
   */
  export interface TextareaProps {
    onChange?: string;
    placeholder?: string;
    rows?: any;
    value?: string;
    [key: string]: any;
  }

  /**
   * timepicker 控件属性
   * 时间选择器; value='HH:mm' 24 小时制 (空=未选); min/max 限制可选范围 (同格式); 点击弹出 Material3 TimePickerDialog, 取消/清空回传空串
   */
  export interface TimepickerProps {
    label?: string;
    max?: any;
    min?: any;
    onChange?: string;
    placeholder?: string;
    value?: string;
    [key: string]: any;
  }

  /**
   * topTab 控件属性
   * 顶部标签页; 每个 item 可带 children 作为该页内容
   */
  export interface TopTabProps {
    activeTab?: any;
    items?: TopTabItem[];
    mode?: any;
    onTabSelected?: string;
    [key: string]: any;
  }

  export interface TopTabItem {
    children?: any;
    title?: string;
    [key: string]: any;
  }

  /**
   * tree 控件属性
   * 树视图 (可展开收起的层级列表); items[] 递归, 每项 {id,title,subtitle,icon,badge,badgeColor,right,expanded,onClick,onLongClick,children}; 深度上限 10 层; expanded 受控 (onExpand 后改值再 render); ⚠️Lazy 组件, 不能放进 root scroll:true
   */
  export interface TreeProps {
    items?: TreeItem[];
    onExpand?: string;
    onLongClick?: string;
    onRefresh?: string;
    onRowClick?: string;
    refreshing?: boolean;
    [key: string]: any;
  }

  export interface TreeItem {
    badge?: string;
    badgeColor?: any;
    children?: any;
    expanded?: any;
    icon?: string;
    id?: string;
    onClick?: string;
    onLongClick?: string;
    right?: any;
    subtitle?: string;
    title?: string;
    [key: string]: any;
  }

  /**
   * video 控件属性
   * 页内播放器; url 支持 {value,headers}, playlist 支持分集列表; height 固定高度(dp), title 为上方标题; resizeMode='fit'(默认, 保持原比例) / 'fill'(铺满容器)。0.1.83 起播放器带 ⛶ 放大(全屏)按钮: 点击弹出全屏播放(同一实例不中断), 可旋转/还原/关闭。0.2.17 起支持 danmaku=[[timeMs, mode, colorInt, text], ...] (mode 1滚动/4底部/5顶部) 与 danmakuList=[每集一份, 与 playlist 等长], 渲染在视频画面之上, 顶栏出现弹幕开关。0.2.18 重写弹幕渲染: mode ≥ 6 (逆向/高级/代码/BAS) 一律不画; 滚动轨道按真实速度差判空 (不再长弹幕追尾短弹幕); 固定弹幕没有空轨就丢弃 (不再叠在一起); 暂停时不再满帧重绘; seek 后重置轨道状态。
   */
  export interface VideoProps {
    danmaku?: any;
    danmakuList?: any;
    height?: number | string;
    playlist?: any;
    poster?: any;
    resizeMode?: any;
    title?: string;
    url?: string;
    [key: string]: any;
  }

  /**
   * webview 控件属性
   * 页内网页; height 默认 480dp (要交互图表/第三方 JS 库走这里, chart 控件只做静态图)
   */
  export interface WebviewProps {
    height?: number | string;
    url?: string;
    [key: string]: any;
  }

  // ── UI 节点联合 ───────────────────────────────────────────────────────
  export type UiNodeType =
    | 'accordion'
    | 'actions'
    | 'article'
    | 'audio'
    | 'avatar'
    | 'badge'
    | 'bottom_sheet'
    | 'button'
    | 'card'
    | 'chart'
    | 'checkbox'
    | 'chip'
    | 'collapsing_scaffold'
    | 'column'
    | 'datepicker'
    | 'dialog'
    | 'divider'
    | 'drawer'
    | 'dropdown'
    | 'empty'
    | 'fab'
    | 'grid'
    | 'icon'
    | 'image'
    | 'input'
    | 'link'
    | 'list'
    | 'loading'
    | 'pager'
    | 'progress'
    | 'radio'
    | 'root'
    | 'row'
    | 'search'
    | 'segmented'
    | 'sheet'
    | 'slider'
    | 'space'
    | 'switch'
    | 'table'
    | 'tabs'
    | 'text'
    | 'textarea'
    | 'timepicker'
    | 'topTab'
    | 'tree'
    | 'video'
    | 'webview'
  ;

  export interface UiNodeMap {
    accordion: AccordionProps;
    actions: ActionsProps;
    article: ArticleProps;
    audio: AudioProps;
    avatar: AvatarProps;
    badge: BadgeProps;
    bottom_sheet: BottomSheetProps;
    button: ButtonProps;
    card: CardProps;
    chart: ChartProps;
    checkbox: CheckboxProps;
    chip: ChipProps;
    collapsing_scaffold: CollapsingScaffoldProps;
    column: ColumnProps;
    datepicker: DatepickerProps;
    dialog: DialogProps;
    divider: DividerProps;
    drawer: DrawerProps;
    dropdown: DropdownProps;
    empty: EmptyProps;
    fab: FabProps;
    grid: GridProps;
    icon: IconProps;
    image: ImageProps;
    input: InputProps;
    link: LinkProps;
    list: ListProps;
    loading: LoadingProps;
    pager: PagerProps;
    progress: ProgressProps;
    radio: RadioProps;
    root: RootProps;
    row: RowProps;
    search: SearchProps;
    segmented: SegmentedProps;
    sheet: SheetProps;
    slider: SliderProps;
    space: SpaceProps;
    switch: SwitchProps;
    table: TableProps;
    tabs: TabsProps;
    text: TextProps;
    textarea: TextareaProps;
    timepicker: TimepickerProps;
    topTab: TopTabProps;
    tree: TreeProps;
    video: VideoProps;
    webview: WebviewProps;
  }

  export type UiNode = {
    [K in UiNodeType]: {
      type: K;
      id?: string;
      props?: UiNodeMap[K];
      children?: UiNode | UiNode[];
      [key: string]: any;
    }
  }[UiNodeType];

  // ── 沙箱全局注入 API ──────────────────────────────────────────────────

  export interface AppApi {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly apiVersion: number;
    on(event: 'launch' | 'resume' | 'pause' | 'destroy' | 'back' | 'activated' | 'inactivated' | string, fn: (...args: any[]) => void): void;
    exit(): void;
    toast(msg: string): void;
    openUrl(url: string): void;
    share(text: string): void;
    copy(text: string): void;
    haptic(type?: 'tick' | 'click' | 'heavy' | 'error' | string): void;
    fetchJson<T = any>(url: string, opts?: any): Promise<T>;
    keepAlive(opts?: any): void;
    releaseKeepAlive(): void;
  }

  export interface UiApi {
    render(tree: UiNode): void;
    push(tree: UiNode): void;
    pop(): void;
    popToRoot(): void;
    on(event: string, fn: (data?: any) => void): void;
    off(event: string): void;
    setBackHandler(fn: (() => boolean) | null): void;
    clearBackHandler(): void;
    diag(on: boolean): boolean;
    setSchemaCheck(on: boolean): boolean;
    dlog(msg: any): boolean;
    toast(msg: string): void;
    browser(url: string): void;
    alert(opts: string | { title?: string; message?: string }): Promise<void>;
    confirm(opts: { title?: string; message?: string; okText?: string; cancelText?: string }): Promise<boolean>;
    prompt(opts: { title?: string; message?: string; defaultValue?: string; placeholder?: string }): Promise<string | null>;
    select(opts: { title?: string; items: Array<{ title: string; value?: string; id?: string }> }): Promise<string | null>;
  }

  export interface HttpApi {
    get(url: string, opts?: any): Promise<{ status: number; headers: Record<string, string>; body: string; json?: any }>;
    post(url: string, body: any, opts?: any): Promise<{ status: number; headers: Record<string, string>; body: string; json?: any }>;
    put(url: string, body: any, opts?: any): Promise<{ status: number; headers: Record<string, string>; body: string; json?: any }>;
    del(url: string, opts?: any): Promise<{ status: number; headers: Record<string, string>; body: string; json?: any }>;
    head(url: string, opts?: any): Promise<{ status: number; headers: Record<string, string> }>;
    request(method: string, url: string, opts?: any): Promise<{ status: number; headers: Record<string, string>; body: string; json?: any }>;
  }

  export interface BleScanDevice {
    address: string;
    name: string | null;
    rssi: number;
    txPower?: number;
    connectable?: boolean;
    serviceUuids: string[];
    serviceData: Record<string, string>;
    manufacturerDataHex?: string;
    rawHex?: string;
  }

  export interface BleApi {
    scan(opts: { serviceUuid?: string } | ((dev: BleScanDevice) => void), callback?: (dev: BleScanDevice) => void): void;
    stopScan(): void;
    advertise(opts: any): void;
    stopAdvertise(): void;
    server: {
      start(opts: any, onEvent?: (ev: any) => void): {
        sendResponse(deviceAddress: string, requestId: number, status: number, offset: number, value: any): void;
        notify(deviceAddress: string, serviceUuid: string, characteristicUuid: string, value: any, confirm?: boolean): void;
        stop(): void;
      };
      stop(): void;
    };
    client: {
      connect(deviceAddress: string, opts?: { autoConnect?: boolean } | ((ev: any) => void), onEvent?: (ev: any) => void): {
        discoverServices(): void;
        read(serviceUuid: string, characteristicUuid: string): void;
        write(serviceUuid: string, characteristicUuid: string, value: any, writeType?: number): void;
        setNotification(serviceUuid: string, characteristicUuid: string, enable?: boolean): void;
        disconnect(): void;
      };
      disconnect(deviceAddress: string): void;
    };
  }

  export interface NetApi {
    udp: {
      bind(port: number, onMessage?: (msg: Buffer, rinfo: { address: string; port: number; size: number }) => void): any;
      send(ip: string, port: number, data: string | Buffer | Uint8Array): Promise<number>;
    };
    tcp: {
      listen(port: number, onConnect?: (socket: any) => void): any;
    };
  }

  export interface DbApi {
    query<T = any>(sql: string, params?: any[]): Promise<T[]>;
    exec(sql: string, params?: any[]): Promise<{ rowsAffected: number; insertId?: number }>;
    transaction(fn: (tx: DbApi) => Promise<any>): Promise<any>;
  }

  export interface KvApi {
    get<T = any>(key: string, defaultValue?: T): Promise<T>;
    set(key: string, value: any): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    keys(prefix?: string): Promise<string[]>;
  }
}

declare const $app: NodeShell.AppApi;
declare const $ui: NodeShell.UiApi;
declare const $http: NodeShell.HttpApi;
declare const $mhttp: NodeShell.HttpApi & { url(url: string, opts?: any): string; ready(): boolean };
declare const $ble: NodeShell.BleApi;
declare const $net: NodeShell.NetApi;
declare const $db: NodeShell.DbApi;
declare const $kv: NodeShell.KvApi;
declare const $storage: any;
declare const $prefs: any;
declare const $media: any;
declare const $shell: any;
declare const $fmt: any;
declare const $fskit: any;
declare const $poster: any;
declare const $filter: any;
declare const $search: any;
declare const $modal: any;
declare const $pager: any;

export = NodeShell;
