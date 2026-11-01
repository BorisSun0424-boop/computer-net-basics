# 电脑与网络常识课

**在线阅读：https://borissun0424-boop.github.io/computer-net-basics/**

写给非技术人的基础常识站。8 章、63 个知识点、79 条术语，从"CPU 怎么算"一路讲到"大模型为什么会胡说"。

内容按一条因果链组织：**硬件 → 文件 → 存储归属 → 连接 → 网页 → 身份 → 工程 → 模型**。上层依赖下层，所以进站先看「知识地图」，想搞懂全貌就看「一次点击的完整旅程」。

## 跑起来

```bash
npm install
npm run dev        # 开发，默认 http://localhost:5173
npm run build      # 产出 dist/，纯静态文件
npm run preview    # 本地预览构建结果
```

构建产物是纯静态的，`dist/` 可以直接丢到 GitHub Pages、Vercel、Netlify、对象存储，也可以双击本地打开（路由用 hash，不依赖服务器配置）。

## 部署

线上站点由 `.github/workflows/deploy.yml` 自动发布：**push 到 `main` 即自动构建 + 上线**，约 1 分钟生效。

- 产物地址：https://borissun0424-boop.github.io/computer-net-basics/
- 构建在 GitHub Actions 里跑（`npm ci && npm run build`），`dist/` 不进仓库
- `vite.config.ts` 的 `base: './'` 是子路径部署的关键，删掉会导致 Pages 上白屏
- Pages 的 Source 必须是 **GitHub Actions**，不要改成「Deploy from a branch」

改内容后的发布流程：

```bash
git add -A && git commit -m "更新内容"
bash scripts/push.sh          # 构建检查 + 推送，约 1 分钟后线上生效
```

> **为什么不用 `git push`**：这台机器上 git 的 smart HTTP 通道被网络策略拦截（报 `Empty reply from server`），而 `api.github.com` 可达。`scripts/push.py` 因此改走 GitHub REST API 的 Git Data 接口，建立与本地 HEAD 等价的 tree/commit 再移动 `main` 指针，效果和 push 一致。换一台网络正常的电脑后，`git push` 可以直接用。

## 技术选型

| 层 | 选择 | 为什么 |
| --- | --- | --- |
| 构建 | Vite 5 | 冷启动快，产物小 |
| 框架 | React 18 + TypeScript | 组件化，内容与渲染分离 |
| 样式 | Tailwind CSS 3 | 排版集中在 `src/index.css`，改样式不用翻组件 |
| 路由 | react-router-dom 6（HashRouter） | 静态托管零配置，子路径部署也不会 404 |
| 状态 | 自建 localStorage store | 学习进度、测验成绩，无需后端 |

没有后端、没有数据库、没有登录。进度存在浏览器本地（`net-basics:read:v1`、`net-basics:quiz-best:v1`），换设备不会同步——如果需要云同步，那是另一个量级的工程。

## 目录

```
src/
├── content/            ← 所有文字内容在这里，改文案只动这个目录
│   ├── ch-hardware.ts  1 计算机是怎么工作的（7 篇）
│   ├── ch-path.ts      2 文件与路径（5 篇）
│   ├── ch-cloud.ts     3 本地与云端（6 篇）
│   ├── ch-network.ts   4 网络基础（9 篇）
│   ├── ch-web.ts       5 网页与上网（10 篇）
│   ├── ch-security.ts  6 账号与安全（5 篇）
│   ├── ch-dev.ts       7 开发最小概念（12 篇）
│   ├── ch-ai.ts        8 AI 与大模型（9 篇）
│   ├── glossary.ts     术语词典（79 条）
│   ├── scenarios.ts    常见场景问答（19 条）
│   ├── quiz.ts         测验题库（32 题，每轮抽 10）
│   └── index.ts        汇总、知识地图、学习路线、12 步旅程、上下篇导航
├── components/         Layout / Sidebar / SearchDialog / BlockRenderer / RichText
├── pages/              Home / MapPage / Roadmap / Journey / ChapterPage / TopicPage / Scenarios / Glossary / Quiz
├── hooks/useProgress.ts  localStorage store + 已读/成绩 hooks
├── lib/search.ts       全站搜索索引
└── types.ts            内容模型

scripts/push.sh          发布脚本（构建检查 + API 推送）
.github/workflows/        Actions 流水线：构建 + 发布到 Pages
```

## 知识地图的层级

章节和名词按 `L0–L7` 分层，定义在 `src/content/index.ts` 的 `mapLayers`，每章用 `layer` / `why` / `dependsOn` 三个字段声明自己在这一层的什么位置。侧边栏、知识地图页、章节页的「前置章节」全部从这三个字段读，改结构不用改组件。

## 怎么写一篇新知识点

在对应章节文件的 `topics` 数组里加一项：

```ts
{
  slug: 'my-topic',            // 出现在 URL 里，英文短横线
  title: '显示给读者的标题',
  summary: '一句话定义，也用于搜索摘要',
  minutes: 4,
  keywords: ['关键词'],
  blocks: [
    { type: 'p', text: '正文支持 **加粗** 和 `行内代码`。' },
    { type: 'analogy', title: '打个比方', text: '生活化类比。' },
    { type: 'h', text: '小标题' },
    { type: 'table', head: ['列一', '列二'], rows: [['a', 'b']] },
    { type: 'code', code: 'ls -la', caption: '说明' },
    { type: 'note', tone: 'key', title: '记住', text: '要点' },
    { type: 'pitfall', items: ['常见坑一'] },
  ],
}
```

`slug` 决定路由，`summary` 决定搜索结果里显示的那一句，其余随便写。侧边栏、章节页、学习路线、上下篇导航、搜索索引都会自动带上，不需要改任何组件。

## 内容原则

1. 先给比方，再给定义。
2. 只讲会用到的，不追求系统完备。
3. 每篇都写"常见坑"——多数人的问题不是不懂原理，是踩了同一个坑还以为是玄学。
