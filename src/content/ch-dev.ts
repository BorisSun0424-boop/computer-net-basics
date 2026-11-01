import type { Chapter } from '../types'

export const chDev: Chapter = {
  slug: 'dev',
  index: 7,
  title: '开发最小概念',
  subtitle: '看懂技术同事在说什么',
  color: '#3f4f8f',
  layer: 'L6 · 工程实践',
  why: '前面六章讲"它怎么工作"，这一章讲"人怎么把东西做出来"：命令行、环境变量、代码、仓库、部署。',
  dependsOn: ['path', 'network'],
  topics: [
    {
      slug: 'terminal',
      title: '什么是命令行 / 终端',
      summary: '终端是让你用打字代替点击来操作电脑的那个窗口。',
      minutes: 4,
      keywords: ['终端', '命令行', 'Terminal', 'shell', 'bash', 'zsh'],
      blocks: [
        {
          type: 'p',
          text: '图形界面（点图标、拖文件）是给"一次做一件事"设计的。命令行（CLI）是给"批量、精确、可重复"设计的。它没有被淘汰，是因为有些事用鼠标真的做不到——比如"把这个文件夹里所有超过 30 天的日志删掉"。',
        },
        {
          type: 'analogy',
          title: '类比：点菜 vs 写菜单',
          text: '图形界面像指着菜单说"我要这个"，简单直观。\n命令行像直接写一张纸条"宫保鸡丁不要花生，微辣，打包"——需要学格式，但一次能说清所有要求，而且这张纸条可以被保存、被复制、被自动重复执行。',
        },
        {
          type: 'h',
          text: '几个名词别搞混',
        },
        {
          type: 'table',
          head: ['词', '是什么', '例子'],
          rows: [
            ['终端 Terminal', '那个窗口（界面容器）', 'macOS 的「终端」App、iTerm2'],
            ['Shell', '窗口里解释你命令的程序', 'zsh（Mac 默认）、bash、PowerShell'],
            ['命令 Command', '你敲的一行东西', '`ls -la`'],
            ['脚本 Script', '把一堆命令写进文件里批量跑', '`deploy.sh`'],
          ],
        },
        {
          type: 'h',
          text: '十个够用的命令',
        },
        {
          type: 'code',
          code: 'pwd             # 我在哪\nls              # 这里有啥\ncd 文件夹       # 进去\ncd ..           # 退一层\nmkdir 新目录    # 建文件夹\ncp a b          # 复制\ntouch 新文件    # 新建空文件\ncat 文件        # 看内容\nrm 文件         # 删除（不进废纸篓！）\nclear           # 清屏',
          caption: 'macOS / Linux 通用；Windows 的 PowerShell 大部分同名，部分不同',
        },
        {
          type: 'note',
          tone: 'warn',
          title: '`rm` 没有回收站',
          text: '命令行删除是直接删，不进废纸篓，也没有"撤销"。带 `-r` 参数会递归删除整个文件夹。**永远先把 `rm -rf` 里的路径再读一遍。**',
        },
        {
          type: 'pitfall',
          items: [
            '**报错 `command not found`** 多半是没装，或者装了但不在 PATH 里（后面会讲）。',
            '**路径有空格要加引号**：`cd "我的 文件夹"`。',
            '**Tab 键能自动补全**，多用它能避免一半的拼写错误。',
          ],
        },
        {
          type: 'case',
          items: [
            {
              scene: '照着教程粘贴命令，一按回车就报错',
              detail: '先确认平台对不对：Mac 用 zsh，Windows 用 PowerShell，命令不一样。把报错原文搜一下，通常第一行就说明原因。',
            },
            {
              scene: '命令行删掉的文件，回收站里找不到',
              detail: '命令行删除不进回收站，直接就没了。不确定的路径先用 ls 看一眼，删之前把命令念一遍再回车。',
            },
            {
              scene: '教程里让你加 sudo，要不要照做',
              detail: 'sudo 是「以管理员身份执行」。只在明确知道这条命令干什么时才加，尤其不要对不明来源的脚本用。',
            },
          ],
        },
      ],
    },
    {
      slug: 'env-var',
      title: '什么是环境变量',
      summary: '环境变量是操作系统里的一组"全局便利贴"，程序启动时会读它们来获得配置。',
      minutes: 4,
      keywords: ['环境变量', 'env', 'export', '配置', '密钥'],
      blocks: [
        {
          type: 'p',
          text: '有些配置不适合写死在代码里：数据库密码、API 密钥、当前是开发还是生产环境。环境变量就是把这些值放在**程序外面**，让程序启动时自己去读。',
        },
        {
          type: 'analogy',
          title: '类比：家里的总开关',
          text: '你不需要在每个房间单独接电线，总闸一开全屋通电。环境变量也一样：设一次，这个终端里启动的所有程序都能读到。',
        },
        {
          type: 'code',
          code: '# macOS / Linux\nexport API_KEY="sk-xxxx"        # 设置（只在当前终端有效）\necho $API_KEY                    # 读取\nenv                              # 看所有环境变量\n\n# Windows PowerShell\n$env:API_KEY = "sk-xxxx"\n$env:API_KEY',
          caption: '临时设置 vs 永久设置是两件事',
        },
        {
          type: 'h',
          text: '为什么大家都用它存密钥',
        },
        {
          type: 'list',
          items: [
            '**代码可以公开，密钥不跟着泄露。** 开源项目必须这么做。',
            '**同一份代码，换个环境变量就换一套配置。** 本地连测试库，线上连正式库。',
            '**不用改代码就能调参。** 改完重启即可。',
          ],
        },
        {
          type: 'note',
          tone: 'warn',
          title: '最常见的严重事故',
          text: '把密钥写进代码，然后 push 到 GitHub 公开仓库。**机器人几秒内就会扫到并开始盗用。** 正确做法：放在 `.env` 文件里，并把 `.env` 写进 `.gitignore`。',
        },
        {
          type: 'pitfall',
          items: [
            '**`export` 只对当前终端窗口有效。** 关掉就没了，这是设计如此，不是 bug。想永久生效要写进 `~/.zshrc`。',
            '**改完 `~/.zshrc` 要 `source ~/.zshrc`** 或重开终端才生效。',
            '**IDE 里的终端可能是独立进程**，不一定继承你在别处设的变量——"明明设了却读不到"常是这个原因。',
          ],
        },
      ],
    },
    {
      slug: 'path-env-var',
      title: '什么是 Path 环境变量',
      summary: 'Path 是一份"命令搜索目录清单"，你敲的命令名会在这几个文件夹里挨个找。',
      minutes: 5,
      keywords: ['PATH', 'Path', '环境变量', 'command not found', '全局命令'],
      blocks: [
        {
          type: 'p',
          text: '为什么敲 `node` 就能运行，而不是每次都要写 `/usr/local/bin/node`？因为系统在一份清单里挨个找，这份清单就是 `PATH`。',
        },
        {
          type: 'analogy',
          title: '类比：找东西的顺序',
          text: '你说"帮我拿一下螺丝刀"。家里有三个工具箱，你按"客厅 → 阳台 → 储物间"的顺序找，找到就用。`PATH` 就是这份搜索顺序，`command not found` 就是"三个箱子都翻过了，没有"。',
        },
        {
          type: 'code',
          code: 'echo $PATH\n# /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin\n# 每个路径用冒号分隔，从左到右依次查找',
          caption: 'Windows 里是分号分隔，界面在"系统属性 → 环境变量"',
        },
        {
          type: 'h',
          text: '`command not found` 的三步修复',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**确认装了没**：`which node`，没输出就是没装或不在 PATH。',
            '**找到它在哪**：比如装到了 `/opt/homebrew/bin/node`。',
            '**把那个目录加进 PATH**：`export PATH="/opt/homebrew/bin:$PATH"`，写进 `~/.zshrc` 永久生效。',
          ],
        },
        {
          type: 'note',
          tone: 'info',
          title: '为什么是 `$PATH` 而不是直接写新路径',
          text: '`PATH="/新目录:$PATH"` 的意思是"把新目录放在最前面，后面接上原来的清单"。如果只写 `PATH="/新目录"`，原来的命令就全找不到了——这是新手最常犯的错，会让终端彻底失能。',
        },
        {
          type: 'pitfall',
          items: [
            '**顺序会影响结果。** 两个目录里有同名程序，靠前的优先。装了两个版本的 Python 却总跑旧版，就是这个原因。',
            '**GUI 程序读不到你在终端里设的 PATH。** macOS 从 Dock 启动的 App 不会加载 `.zshrc`。',
            '**Windows 改 PATH 要重开终端**，甚至要重启资源管理器。',
          ],
        },
      ],
    },
    {
      slug: 'localhost',
      title: '什么是 localhost',
      summary: 'localhost 的意思是"这台机器自己"，用来访问跑在自己电脑上的服务。',
      minutes: 3,
      keywords: ['localhost', '本地主机', '本机', '开发环境'],
      blocks: [
        {
          type: 'p',
          text: '当你在终端里 `npm run dev`，看到 `http://localhost:5173`，意思是：**这个网站就跑在你这台电脑上，别人访问不了。**',
        },
        {
          type: 'analogy',
          title: '类比：自己跟自己打电话',
          text: 'localhost 是"打给自己"的号码。你在自己电脑上开一个服务，再用浏览器连 localhost，就是这台机器左手递给右手。',
        },
        {
          type: 'table',
          head: ['地址', '指向', '谁能访问'],
          rows: [
            ['`localhost`', '本机', '只有自己'],
            ['`127.0.0.1`', '本机（IPv4）', '只有自己'],
            ['`::1`', '本机（IPv6）', '只有自己'],
            ['`192.168.x.x`', '你所在局域网内的某台设备', '同 WiFi 下的人'],
            ['公网 IP / 域名', '互联网上的某台机器', '所有人'],
          ],
        },
        {
          type: 'note',
          tone: 'key',
          title: '为什么开发都用它',
          text: '因为你可以在自己电脑上随便折腾：改坏了重启就行，不怕影响线上，也不花钱。**所有上线前的调试都发生在 localhost。**',
        },
        {
          type: 'pitfall',
          items: [
            '**`localhost` 打不开，先看服务是不是真起来了。** 终端里有没有报错、端口是不是被占用。',
            '**手机连不上你电脑的 localhost。** 因为对手机来说"自己"是手机。要让手机访问，得用电脑的局域网 IP（`192.168.x.x`），且在同一 WiFi 下。',
            '**`localhost` 和 `127.0.0.1` 通常等价，但偶尔不等。** 如果 hosts 文件被改过，或程序只监听了 IPv4/IPv6 其中一个，就会出现"一个能开一个不能"。',
          ],
        },
      ],
    },
    {
      slug: '127-0-0-1',
      title: '什么是 127.0.0.1',
      summary: '它是 IPv4 里专门保留给"本机"的地址，整个 127 网段都指向你自己。',
      minutes: 3,
      keywords: ['127.0.0.1', '回环地址', 'loopback', '本机'],
      blocks: [
        {
          type: 'p',
          text: '互联网上没有任何一台机器会用 `127.x.x.x` 这个地址，它被标准保留为**回环地址（loopback）**：数据发出去后立刻掉头回来，从不离开网卡。',
        },
        {
          type: 'analogy',
          title: '类比：对着镜子说话',
          text: '声音发出去了，接收者还是你。数据包"出门"了，但根本没离开这台机器——不经过路由器、不经过运营商、不需要联网。',
        },
        {
          type: 'p',
          text: '这带来一个很实用的性质：**断网也能用。** 你在飞机上跑本地项目，`http://127.0.0.1:3000` 照样打开，因为它压根不需要网络。',
        },
        {
          type: 'h',
          text: '它和 localhost 的关系',
        },
        {
          type: 'table',
          head: ['', '`localhost`', '`127.0.0.1`'],
          rows: [
            ['本质', '一个域名，需要被解析', '一个直接的 IP 地址'],
            ['解析过程', '查 hosts 文件 → 通常得到 127.0.0.1（或 ::1）', '无需解析'],
            ['速度', '多一步查表，可忽略', '稍快，且不受 DNS 配置影响'],
            ['可靠性', 'hosts 被改过可能失效', '永远指向本机'],
          ],
        },
        {
          type: 'note',
          tone: 'info',
          title: '为什么程序员爱用它',
          text: '"连不上 localhost"的时候换成 `127.0.0.1` 试试，很多时候就通了——因为绕开了 IPv6/IPv4 的选择问题。这是一个非常实用的排障小技巧。',
        },
        {
          type: 'pitfall',
          items: [
            '**别把 `127.0.0.1` 当成"安全的"就随便暴露。** 它确实对外不可见，但如果你做了端口转发（比如某些代理工具），它就被敞开了。',
            '**`0.0.0.0` 是另一个概念**：意思是"监听所有网卡"，局域网内别人能访问。开发时看到 `Listening on 0.0.0.0:3000` 就说明手机可以连。',
          ],
        },
      ],
    },
    {
      slug: 'what-is-api',
      title: '什么是 API',
      summary: 'API 是两个程序之间约定好的对话方式：你给我什么参数，我还你什么数据。',
      minutes: 5,
      keywords: ['API', '接口', 'REST', '请求', '响应', 'JSON'],
      blocks: [
        {
          type: 'p',
          text: 'API（Application Programming Interface）听起来玄，本质就是**一份菜单**：上面写着有哪些菜可以点、每道菜要交代什么（辣度、份量）、端上来是什么样。你不用知道后厨怎么做的。',
        },
        {
          type: 'analogy',
          title: '类比：餐厅点菜',
          text: '你（一个程序）不能直接进后厨（另一个程序的内部数据）翻冰箱。你只能看菜单（API 文档），按格式点单（发请求），后厨做好端出来（返回响应）。**菜单就是边界**——它决定了你能要什么，也要不了什么。',
        },
        {
          type: 'code',
          code: 'GET https://api.example.com/v1/weather?city=shanghai\nAuthorization: Bearer sk-xxxxxxxx\n\n→ 200 OK\n{\n  "city": "shanghai",\n  "temp": 21,\n  "condition": "cloudy"\n}',
          caption: '一次典型的 API 调用：方法 + 地址 + 凭证 → 一段 JSON',
        },
        {
          type: 'h',
          text: '四个必懂的词',
        },
        {
          type: 'table',
          head: ['词', '含义', '类比'],
          rows: [
            ['请求 Request', '你发出去的那句话', '点单'],
            ['响应 Response', '对方回给你的内容', '端上来的菜'],
            ['端点 Endpoint', '一个具体的 API 地址', '菜单上的一道菜'],
            ['鉴权 Auth', '证明你有权调用（API Key / Token）', '会员卡'],
          ],
        },
        {
          type: 'h',
          text: '四种常用方法',
        },
        {
          type: 'list',
          items: [
            '`GET` 读取——我要看看有什么',
            '`POST` 新建——我要创建一个东西',
            '`PUT / PATCH` 修改——我要改一下',
            '`DELETE` 删除——我要删掉',
          ],
        },
        {
          type: 'note',
          tone: 'warn',
          title: 'API Key 就是密码',
          text: '拿到别人的 API Key，就能用他的额度、看他的数据、花他的钱。所以：不要写进前端代码（浏览器里谁都能看到）、不要提交到 Git、泄露后立刻去后台吊销。',
        },
        {
          type: 'pitfall',
          items: [
            '**前端调用第三方 API 会暴露密钥。** 正确做法是让自己的后端中转一次。',
            '**免费额度会跑完。** 很多"突然不能用了"其实是额度耗尽或被限流（429）。',
            '**API 会改版。** 地址里的 `/v1/` 就是版本号，升级时旧版可能被下线。',
          ],
        },
        {
          type: 'case',
          items: [
            {
              scene: '老板说「跟他们的系统对接一下」，你不知道要对接什么',
              detail: '通常就是对方给一组接口地址和密钥，你按文档发请求、拿数据。要问清三件事：接口地址、鉴权方式、数据格式。',
            },
            {
              scene: 'API Key 被贴到群里，或者提交进了公开仓库',
              detail: '等于把账号密码公开了。立刻去平台后台吊销重发，并把密钥改放到环境变量或密钥管理里。',
            },
            {
              scene: '想让系统自动把消息推到飞书或企业微信群',
              detail: '用群机器人 Webhook，一个地址就能发消息，不用做完整对接。注意别把这个地址发到公开的地方。',
            },
          ],
        },
      ],
    },
    {
      slug: 'what-is-json',
      title: '什么是 JSON',
      summary: 'JSON 是一种"人和机器都能读"的数据格式，用键值对和列表描述结构化信息。',
      minutes: 4,
      keywords: ['JSON', '数据格式', '键值对', '序列化', '解析'],
      blocks: [
        {
          type: 'p',
          text: '程序之间传数据，需要一个双方都认识的格式。JSON（JavaScript Object Notation）就是今天最通用的那个——它长得像一个非常规矩的清单。',
        },
        {
          type: 'code',
          code: '{\n  "name": "孙勃帆",\n  "age": 28,\n  "skills": ["审计", "AI 产品"],\n  "address": {\n    "city": "上海",\n    "district": "浦东"\n  },\n  "isStudent": false\n}',
          caption: '六种值：字符串、数字、布尔、null、数组、对象',
        },
        {
          type: 'h',
          text: '三条铁律，错一条就解析失败',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**键必须用双引号包起来。** `{name: "x"}` 是错的，`{"name": "x"}` 才对。单引号也不行。',
            '**最后一个元素后面不能有逗号。** `{"a":1,"b":2,}` 会报错。这是手写 JSON 最常见的坑。',
            '**不能写注释。** JSON 标准不支持 `//`，想注释只能用别的格式（如 JSON5、YAML）。',
          ],
        },
        {
          type: 'analogy',
          title: '类比：标准化的表格',
          text: '把信息填进固定格式的表格，任何人都能读懂，任何程序都能解析。JSON 就是给程序用的那种表格。',
        },
        {
          type: 'table',
          head: ['格式', '长相', '用在哪'],
          rows: [
            ['JSON', '`{"a": 1}`', 'API、配置文件、前后端通信'],
            ['YAML', '`a: 1`（缩进表示层级）', 'Docker、CI 配置、K8s'],
            ['XML', '`<a>1</a>`', '老系统、部分银行/政府接口'],
            ['CSV', '`a,b\\n1,2`', '表格数据、Excel 导出'],
          ],
        },
        {
          type: 'pitfall',
          items: [
            '**中文乱码**：多半是编码不是 UTF-8，而不是 JSON 本身的错。',
            '**"Unexpected token"** 报错基本就是格式错了，用在线 JSON 校验器一贴就知道第几行。',
            '**大数字会失真**：JS 的数字精度有限，超过 2^53 的整数（如长 ID）建议当字符串传。',
          ],
        },
      ],
    },
    {
      slug: 'what-is-git',
      title: '什么是 Git',
      summary: 'Git 是给文件拍"时间快照"的工具，让你能回到任何一个历史版本、也能多人并行改同一份东西。',
      minutes: 5,
      keywords: ['Git', '版本控制', 'commit', 'branch', '提交', '回滚'],
      blocks: [
        {
          type: 'p',
          text: '没有 Git 的时候，文件管理靠"最终版 / 最终版2 / 真的最终版 / 打死不改版"。Git 把这件事变成了一条清晰的时间线：每次你主动"提交"，它就把当时的全部内容拍一张快照，并记下谁、什么时候、改了什么。',
        },
        {
          type: 'analogy',
          title: '类比：游戏存档',
          text: 'commit = 存档。你可以读档回到任何一个存档点。\nbranch = 开一条新剧情线，随便试，不满意就删掉，不影响主线。\nmerge = 把支线剧情合回主线。',
        },
        {
          type: 'h',
          text: '五个核心概念',
        },
        {
          type: 'table',
          head: ['词', '含义', '日常说法'],
          rows: [
            ['仓库 Repository', '一个被 Git 管理的文件夹', '"repo"'],
            ['提交 Commit', '一次快照 + 一句说明', '"我提交了一版"'],
            ['分支 Branch', '一条独立的开发线', '"开个分支试试"'],
            ['合并 Merge', '把一条分支的改动并到另一条', '"合并一下"'],
            ['冲突 Conflict', '两边改了同一处，Git 不敢替你决定', '"有冲突，你来选"'],
          ],
        },
        {
          type: 'code',
          code: 'git status                 # 现在什么状态\ngit add .                  # 把改动放进待提交区\ngit commit -m "修好了登录问题"   # 拍快照\ngit log --oneline          # 看历史\ngit checkout -b 新功能      # 开一条新分支\ngit push                   # 推到远端',
          caption: '80% 的日常只需要这 6 条',
        },
        {
          type: 'note',
          tone: 'key',
          title: '为什么值得学',
          text: '它是"后悔药"：改错了能回退，删错了能找回。它也是"协作协议"：三个人改同一个项目不会互相覆盖。**Git 不是程序员的专利，写文档、做设计的一样能用。**',
        },
        {
          type: 'pitfall',
          items: [
            '**Git ≠ GitHub。** Git 是装在你电脑上的工具，GitHub 是存放 Git 仓库的网站。',
            '**commit 说明要写"为什么"，不是"改了什么"。** 三个月后你只关心当时为什么这么改。',
            '**不要把密码、密钥提交上去。** 一旦进了历史，删掉文件也不够，得改密钥。',
          ],
        },
      ],
    },
    {
      slug: 'what-is-github',
      title: '什么是 GitHub',
      summary: 'GitHub 是托管 Git 仓库的网站，也是全世界最大的代码协作平台。',
      minutes: 4,
      keywords: ['GitHub', 'GitLab', 'Gitee', '远程仓库', '开源', 'Pull Request'],
      blocks: [
        {
          type: 'p',
          text: 'Git 只管本地。如果电脑坏了，代码就没了；如果想让别人参与，也没法传。GitHub 提供的就是"远端仓库"：把本地仓库推上去，就有了备份、有了协作场所、有了对外展示的门面。',
        },
        {
          type: 'analogy',
          title: '类比：Git 是相册，GitHub 是云相册',
          text: '你在本地整理照片（Git 提交），然后同步到云端（push 到 GitHub）。云端不会自动同步——**你不 push，它永远不知道你改了**。',
        },
        {
          type: 'h',
          text: '平台上最常听到的几个词',
        },
        {
          type: 'table',
          head: ['词', '含义'],
          rows: [
            ['Repository（仓库）', '一个项目，含全部代码和历史'],
            ['Fork', '把别人的仓库复制一份到自己账号下，随便改'],
            ['Pull Request（PR）', '"我改好了，请你看一眼合并进去"'],
            ['Issue', '问题单 / 需求单，用来讨论和追踪'],
            ['Star', '收藏 + 点赞'],
            ['Clone', '把远端仓库完整下载到本地'],
          ],
        },
        {
          type: 'h',
          text: '几个同类平台',
        },
        {
          type: 'list',
          items: [
            '**GitHub**：最大生态，开源项目基本都在这',
            '**GitLab**：企业自建常用，CI/CD 强',
            '**Gitee（码云）**：国内访问快，需实名',
            '**Bitbucket**：和 Jira 生态绑定',
          ],
        },
        {
          type: 'note',
          tone: 'info',
          title: '它对非程序员也有用',
          text: '很多开源电子书、设计资源、配置模板都托管在 GitHub。你可以只做两件事：下载（Download ZIP）和提 Issue。不需要会写代码。',
        },
        {
          type: 'pitfall',
          items: [
            '**公开仓库 = 所有人可见且永久可能被克隆。** 传上去的密钥立刻作废重发。',
            '**免费账号的私有仓库有协作人数限制**（历史上如此，政策会变，用前确认）。',
            '**国内访问 GitHub 可能不稳定**，这是网络环境问题，不是账号问题。',
          ],
        },
        {
          type: 'case',
          items: [
            {
              scene: '想用某个开源工具，对方只给了一个 GitHub 链接',
              detail: '去 Releases 页面下载打包好的版本最省事。只有源码、没有 Releases 的才需要自己编译，那属于开发者场景。',
            },
            {
              scene: '代码改崩了，想退回昨天能用的版本',
              detail: '这就是版本管理的意义。用 Git 提交过就能回退；没提交过只能靠编辑器的本地历史，不一定救得回来。',
            },
            {
              scene: '同事让你「提个 PR」，你完全不知道指什么',
              detail: '就是把你改的代码提交上去，请求合并进主干，由别人审核。不会用的话，让对方带着走一遍最快。',
            },
          ],
        },
      ],
    },
    {
      slug: 'what-is-repo',
      title: '什么是仓库',
      summary: '仓库就是一个被版本控制工具盯着的文件夹，里面存着项目全部文件和完整历史。',
      minutes: 3,
      keywords: ['仓库', 'repository', 'repo', '版本', '历史'],
      blocks: [
        {
          type: 'p',
          text: '仓库（Repository，简称 repo）看起来就是个普通文件夹，但它里面多了一个隐藏目录 `.git`——所有历史快照、分支信息都存在那儿。**删掉 `.git`，仓库就退化成普通文件夹，历史全没了。**',
        },
        {
          type: 'analogy',
          title: '类比：带监控录像的房间',
          text: '房间里的东西你能随便挪（改文件），但摄像头（`.git`）把每一次变动都录下来了。你想知道上周三这面墙是什么样，调录像就行。',
        },
        {
          type: 'table',
          head: ['类型', '在哪', '作用'],
          rows: [
            ['本地仓库', '你的电脑上', '你直接编辑的地方'],
            ['远程仓库', 'GitHub / GitLab 等', '备份 + 协作 + 展示'],
            ['公开仓库', '任何人可见', '开源项目'],
            ['私有仓库', '仅授权的人可见', '公司项目、个人草稿'],
          ],
        },
        {
          type: 'pitfall',
          items: [
            '**不要在仓库里再套一个仓库。** 会出现"子模块"问题，非常难处理。',
            '**仓库不该存的东西**：依赖包（`node_modules`）、编译产物（`dist`）、密钥（`.env`）、大文件。这些写进 `.gitignore`。',
            '**仓库体积一旦变大很难减小**，因为历史会保留所有大文件。传大文件前先想清楚。',
          ],
        },
      ],
    },
    {
      slug: 'what-is-open-source',
      title: '什么是开源',
      summary: '开源是把源代码公开，并附上一份许可证，明确"你可以怎么用它"。',
      minutes: 4,
      keywords: ['开源', 'open source', '许可证', 'MIT', 'GPL', '协议'],
      blocks: [
        {
          type: 'p',
          text: '"能看到代码"不等于开源。真正的开源要满足两个条件：**源代码可获得**，且**有一份法律许可，明确授予你使用、修改、分发的权利**。没有许可证的公开代码，法律上你其实不能随便用。',
        },
        {
          type: 'analogy',
          title: '类比：菜谱公开',
          text: '开源就像把菜谱完整写出来贴在网上，还注明"欢迎照做、欢迎改良、欢迎开餐馆"。至于改良后要不要也公开菜谱——取决于他附的是哪种授权。',
        },
        {
          type: 'h',
          text: '三种最常见的许可证',
        },
        {
          type: 'table',
          head: ['许可证', '能商用吗', '改了要开源吗', '典型项目'],
          rows: [
            ['MIT', '能', '不用', 'React、Vue、jQuery'],
            ['Apache 2.0', '能', '不用（但要保留声明、注明改动）', 'Kubernetes、Android'],
            ['GPL v3', '能', '**要**（传染性）', 'Linux 内核、Git'],
            ['AGPL', '能', '要，且**网络服务也算分发**', 'MongoDB（早期）、Nextcloud'],
            ['BSD', '能', '不用', 'Go、Nginx（类 BSD）'],
          ],
        },
        {
          type: 'note',
          tone: 'warn',
          title: '商用场景必须看许可证',
          text: 'MIT / Apache 基本可以放心用；GPL 系列要求你的衍生作品也开源，闭源商业产品要避开。**公司用开源组件前，法务过一遍许可证是标准流程。**',
        },
        {
          type: 'pitfall',
          items: [
            '**"开源"不等于"免费"**（虽然多数免费）。也不等于"无限制"——许可证就是限制。',
            '**"源码可见"（source-available）不是开源。** 有些公司公开代码但禁止商用，那是另一种模式。',
            '**开源项目可能没人维护。** 用之前看最后一次提交时间、Issue 响应速度。',
          ],
        },
      ],
    },
    {
      slug: 'what-is-deploy',
      title: '什么是部署',
      summary: '部署就是把你本地跑得好好的东西，搬到一台别人也能访问的机器上，并保证它一直活着。',
      minutes: 5,
      keywords: ['部署', 'deploy', '上线', '发布', '服务器', 'CI/CD'],
      blocks: [
        {
          type: 'p',
          text: '本地 `npm run dev` 打开的东西，只有你自己能看到。部署要解决四个问题：**放到哪台机器、怎么把文件传过去、怎么让它常驻运行、怎么让别人用域名访问到。**',
        },
        {
          type: 'analogy',
          title: '类比：在家里试菜 vs 开餐厅',
          text: '在家做菜给自己吃（本地开发）只要锅和灶。开餐厅（部署）还要：租店面（服务器）、办执照（域名备案）、装门牌（DNS）、雇人常驻（进程守护）、应付客流（扩容）。菜谱一样，工程量差十倍。',
        },
        {
          type: 'h',
          text: '一条完整的上线链路',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**构建**：把源码打包成浏览器能跑的静态文件，或编译成可执行的后端程序。',
            '**上传**：把产物传到服务器（或用 Git 拉取）。',
            '**配置**：设置环境变量、数据库连接、端口。',
            '**启动**：让程序在后台常驻，开机自启、崩了自动重启。',
            '**接入域名**：DNS 解析到服务器 IP。',
            '**配 HTTPS**：申请证书（现在基本免费自动续）。',
            '**监控**：日志、错误报警、可用性检测。',
          ],
        },
        {
          type: 'h',
          text: '四种常见部署方式',
        },
        {
          type: 'table',
          head: ['方式', '适合', '成本', '难度'],
          rows: [
            ['静态托管（GitHub Pages / Vercel / Netlify）', '纯前端站、文档站', '免费', '极低，传上去就行'],
            ['对象存储 + CDN（OSS/COS）', '静态资源、图片', '极低', '低'],
            ['云服务器自己搭（ECS + Nginx）', '需要后端、数据库', '几十元/月起', '中，要会 Linux'],
            ['PaaS（Railway / Render / 云托管）', '小项目快速上线', '免费额度或按量', '低'],
          ],
        },
        {
          type: 'note',
          tone: 'key',
          title: '新手最省事的路径',
          text: '纯静态站 → 直接丢 Vercel 或 GitHub Pages，连服务器都不用买。等真的需要后端了，再上云服务器。**不要一上来就买服务器配 Nginx，会劝退。**',
        },
        {
          type: 'pitfall',
          items: [
            '**"本地能跑，线上不行"九成是环境差异**：Node 版本、环境变量、路径大小写、依赖没装全。',
            '**国内服务器放网站要备案**，这是个行政流程，不是技术问题，提前算时间。',
            '**部署不是终点。** 上线后要能看日志、能回滚上一个版本，否则出事只能干等。',
          ],
        },
      ],
    },
  ],
}
