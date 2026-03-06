---
title: "Day 2: 10 分钟，搭建你的助手"
day: 2
description: "OpenClaw 7天教程 - Day 2: 10 分钟，搭建你的助手"
---

> *"别被'部署'这个词吓到。如果你能泡一碗方便面，你就能搭一个 AI 助手。时间差不多，都是 10 分钟的事。"*

---

## 📖 本章导读

今天你将完成：
- 选择助手的运行环境（云服务器/本地电脑）
- 一行命令安装 OpenClaw，自动进入配置向导
- 获取 AI 模型 API Key
- 连接 飞书 作为聊天渠道
- 发出你对 AI 助手说的第一句话 🎉

---

## 今天的目标

![大管家在服务器机房](/images/days/day2/day2-hero.jpg)

今天结束的时候，你会在手机上收到一条来自你 AI 助手的消息。

不是别人的助手，不是某个平台的机器人——是你自己的、跑在你自己机器上的、只属于你的 AI 助手。

准备好了吗？我们开始。

---

## 选择你的运行环境

首先，你需要一个地方让助手「住」下来。

### 方案 A：云服务器（没有测试有报告截图）

## 核心发现 (Executive Summary)

1. **国内云服务商性价比更高** — 阿里云和华为云提供极具竞争力的入门级价格，年付低至68-249元
2. **海外云服务商稳定性更好** — AWS、Google Cloud和Azure在全球范围内提供更稳定的网络和服务
3. **配置选择需匹配使用场景** — 个人开发可选择2核4G，生产环境建议4核8G以上

## 推荐方案（按场景分类）

### 💡 个人开发者/测试环境
- **首选：阿里云轻量应用服务器**
  - 配置：2核4G，5M带宽，80G系统盘
  - 价格：199元/年
  - 优势：价格最低，国内访问速度快，支持Docker和Node.js

### 🏢 中小型企业/生产环境
- **首选：腾讯云CVM标准型S5**
  - 配置：4核8G，不限流量，40G系统盘
  - 价格：1385.04元/15个月（约923元/年）
  - 优势：性价比高，稳定性好，完善的监控和安全功能

### 🌍 全球部署/无需备案
- **首选：AWS EC2 t3.large**
  - 配置：2核8G（注意：AWS内存配置较高）
  - 价格：约104.48元/月（约1254元/年）
  - 优势：全球覆盖，无需备案，API访问不受限制

## 价格对比表

| 云服务商 | 配置(核/内存) | 月付价格 | 年付价格 | 主要优势 | 主要劣势 |
|---------|-------------|---------|---------|---------|---------|
| **阿里云ECS** | 2核4G | ~17元 | 199元 | 价格最低，国内访问快 | 需要备案，海外访问慢 |
| **阿里云ECS** | 4核8G | ~25元 | 298元 | 性价比极高 | 需要备案 |
| **腾讯云CVM** | 4核8G | ~92元 | 923元 | 稳定性好，功能完善 | 价格相对较高 |
| **华为云** | 2核4G | ~21元 | 249元 | 国产化支持好 | 生态相对较小 |
| **华为云** | 4核8G | ~42元 | 498元 | 性价比不错 | 国际覆盖有限 |
| **AWS EC2** | 2核8G | 104.48元 | ~1254元 | 全球覆盖，无需备案 | 价格较高，国内访问慢 |
| **Google Cloud** | 2核4G | ~58元 | ~696元 | 技术先进，API友好 | 国内访问受限 |
| **Azure** | 2核7G | 价格未公开 | 价格未公开 | 企业级功能完善 | 定价不透明 |


### 方案 B：Mac Mini / 旧笔记本

家里有台吃灰的 Mac Mini？完美，让它重新发光。

- **优点**：零额外成本，数据完全在家里
- **缺点**：断电就下线，需要保持开机

### 方案 C：你正在用的电脑（我现在的方案）

想先体验一下再决定？直接在当前电脑上跑。

- **优点**：零门槛，立刻开始
- **缺点**：关机就没了，适合试玩

> 🐱 **大管家建议**：建议先试用本机部署。

---

## 准备工作
# 第 2 章：准备工作

> 在开始使用 OpenClaw 之前，你需要准备好开发环境和必要的账号资源。本章将指导你完成所有前置准备工作。

---

## 📋 系统要求

OpenClaw 支持主流操作系统，但对硬件和软件环境有一定要求：

### 最低配置

| 项目 | 要求 |
|------|------|
| CPU | 2 核心 |
| 内存 | 4GB RAM |
| 存储 | 10GB 可用空间 |
| 操作系统 | Linux (Ubuntu 20.04+), macOS (12+), Windows 10/11 (with WSL2) |

### 推荐配置

| 项目 | 要求 |
|------|------|
| CPU | 4 核心或更多 |
| 内存 | 8GB RAM 或更多 |
| 存储 | 20GB SSD |
| 网络 | 稳定的网络连接（用于 API 调用） |

> **💡 生产环境建议**
> 
> 对于生产环境部署，建议使用至少 **8GB 内存**和 **4 核 CPU**，以确保多 Agent 并发执行时的稳定性。
> 
> 如果你计划使用浏览器自动化功能，内存需求会更高（建议 **16GB**）。

---

## 🛠️ 必备软件安装

### Node.js 环境

OpenClaw 需要 Node.js 18 或更高版本。推荐使用 LTS 版本：

```bash
# 检查当前 Node.js 版本
node --version

# 使用 nvm 安装（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# 验证安装
node --version # 应显示 v20.x.x
npm --version # 应显示 10.x.x
```

> **Windows 用户：** 可以从 [Node.js 官网](https://nodejs.org/) 下载安装包，或使用 nvm-windows。

---

### Docker 安装（推荐）

Docker 是运行 OpenClaw 最简单的方式，避免了复杂的依赖配置：

```bash
# macOS 和 Windows: 下载 Docker Desktop
# https://www.docker.com/products/docker-desktop

# Linux (Ubuntu) 安装
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 验证安装
docker --version
docker compose version

# 配置用户权限（Linux）
sudo usermod -aG docker $USER
# 需要重新登录以生效
```

> **💡 生产环境建议**
> 
> 对于生产环境，建议使用 Docker Compose 进行部署，这样可以更方便地管理配置和数据持久化。

---

### Git 版本控制

```bash
# 安装 Git（如果尚未安装）

# macOS
brew install git

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# 验证安装
git --version
```

---

## 🔑 LLM API 密钥准备

OpenClaw 的核心功能依赖于大语言模型 API。你需要至少准备一个 LLM 提供商的 API 密钥。

### OpenAI API

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册并完成身份验证
3. 在 Dashboard 中创建 API Key
4. 设置使用限额和预算提醒（推荐）

```bash
# 测试 API 密钥
curl https://api.openai.com/v1/models \
 -H "Authorization: Bearer YOUR_API_KEY"
```

> **💰 成本估算**
> 
> GPT-4 Turbo 的成本约为 $0.01/1K tokens (输入) + $0.03/1K tokens (输出)。
> 
> 一般的对话任务，每天 100 次交互大约花费 **$2-5**。

---

### Anthropic Claude API

1. 访问 [Anthropic Console](https://console.anthropic.com/)
2. 申请 API 访问权限
3. 生成 API Key
4. 记录你的配额限制

> **💡 推荐用途**
> 
> Claude 3.5 Sonnet 在编码和推理任务上表现优异，适合作为 OpenClaw 的主力模型。


### 阿里云百炼
1. 访问 [阿里云百炼](https://bailian.console.aliyun.com)
2. 购买coding plan计划lite版40元，pro版200元。
3. 生成 API Key
4. 记录你的配额限制
---

### 本地模型（可选）

如果你担心成本或隐私问题，可以使用本地模型：

```bash
# 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 拉取模型
ollama pull llama3.1:8b
ollama pull qwen2.5-coder:7b

# 验证运行
ollama run llama3.1:8b "Hello!"
```

> **💡 本地模型优势**
> - ✅ 零 API 成本
> - ✅ 完全的数据隐私
> 
> **⚠️ 硬件要求**
> 
> 需要更强的硬件配置（至少 **16GB RAM** 用于 7B 模型）。

---

## 💬 消息平台账号

根据你的需求，准备以下平台的机器人账号：

### 飞书账号

一、创建账号
1. 进入飞书开发者后台访问：https://open.feishu.cn/app
登录你的飞书账号
2. 创建新应用
·点击「创建应用」
·选择「自建应用」
·填写应用信息：
·应用名称：OpenClaw Assistant（或你喜欢的名字）
·应用图标：可选
·点击「创建」
3. 获取应用凭证
创建后，在「应用凭证」页面记录：

App ID (cli_id)
App Secret (cli_secret)
⚠️ 重要：妥善保管 App Secret，不要泄露！

二、配置应用权限
1. 添加机器人能力
·进入「应用能力」→「添加应用能力」
·选择「机器人」
·配置机器人信息：
·机器人名称：小猪羔（或你的助手名字）
·机器人头像：可选
2. 配置权限 scopes
·在「权限管理」→「权限配置」中添加以下权限：

基础权限
- im:message      发送和读取消息
- im:chat         访问群组信息
- contact:contact 读取联系人信息
可选权限（按需添加）
- im:resource     发送文件/图片
- drive:file      访问云文档
- wiki:wiki       访问知识库
- bitable:app     访问多维表格
3. 发布应用
·点击「版本管理与发布」
·点击「创建版本」
·填写版本号（如 1.0.0）
·点击「发布」
三、配置事件订阅（可选）
1. 配置接收消息
·进入「事件订阅」
·开启「启用事件订阅」
·配置：
·请求地址：你的 OpenClaw 服务器地址（需要公网可达）
·加密密钥：自动生成，记录下来
2. 订阅事件
·订阅以下事件：

- im.message.receive_v1          接收消息
- im.chat.member.add_v1          成员加入群聊
- im.chat.member.delete_v1       成员退出群聊
3. 验证 URL
飞书会发送验证请求，确保你的服务器能正确响应。

四、配置 OpenClaw
1. 编辑 OpenClaw 配置
找到你的 OpenClaw 配置文件（通常在 ~/.openclaw/config.json 或类似位置）

2. 添加飞书渠道配置
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "你的 App ID",
      "appSecret": "你的 App Secret",
      "verificationToken": "事件订阅的验证令牌（如果有）",
      "encryptKey": "事件订阅的加密密钥（如果有）"
    }
  }
}
3. 重启/重载配置
查看 gateway 状态
openclaw gateway status

如果需要，重启 gateway
openclaw gateway restart
⚠️ 注意：根据郭郭的要求，不要轻易重启 gateway！

先确认配置是否需要重启才能生效
如果可以热重载，优先使用热重载

五、测试连接
1. 在飞书中添加机器人
打开飞书，进入任意群聊或私聊
点击右上角「...」→「添加机器人」
选择你创建的「小猪羔」机器人
点击「添加」
2. 发送测试消息
在飞书中发送一条消息给机器人，观察：

---

## 📝 环境变量模板

创建一个 `.env` 文件作为配置模板：

```bash
# LLM API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Message Channels
TELEGRAM_BOT_TOKEN=123456789:ABC...
DISCORD_BOT_TOKEN=MTk4...

# Database (可选)
DATABASE_URL=postgresql://user:pass@localhost:5432/claw

# Other Settings
NODE_ENV=development
LOG_LEVEL=info
```

> **⚠️ 安全提示**
> 
> 永远不要将 `.env` 文件提交到 Git 仓库。确保 `.gitignore` 中包含 `.env`。

---

## ✅ 检查清单

在进入下一章之前，确认你已完成：

- [ ] 安装 Node.js 18+ 或 Docker
- [ ] 安装 Git 并配置基本信息
- [ ] 获得至少一个 LLM API 密钥并测试可用
- [ ] 创建至少一个消息平台机器人账号
- [ ] 准备好 `.env` 配置文件模板
- [ ] 确保网络可以访问相关 API 服务

---

如果你用的是 **Mac**，可能需要先装 Homebrew（如果还没有的话）：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

如果你用的是 **Windows**，建议先装 WSL2（Windows Subsystem for Linux），然后在 WSL 里操作。安装很简单：以管理员身份打开 PowerShell，运行 `wsl --install` 即可。详细步骤见 [微软官方 WSL 安装指南](https://docs.microsoft.com/zh-cn/windows/wsl/install)。




---

## 一键安装 + 自动配置

好了，不管你选了哪个方案，打开终端（Terminal），输入这一行命令：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

就这样。一行。

安装脚本会自动帮你搞定所有依赖（Node.js、Git……），然后直接进入交互式配置向导——不需要你再手动跑任何 setup 命令。

![OpenClaw 安装向导 - 安全警告](/images/days/day2/install-security.jpg)

---

## 向导会问你什么？

向导会一步步引导你完成所有配置，跟着提示走就行：

**1. 选择模式**：QuickStart（推荐）还是 Advanced。新手直接选 QuickStart。

![选择 Onboarding 模式](/images/days/day2/onboarding-mode.jpg)

**2. 选择 AI 模型**：推荐 Claude，OpenClaw 和 Claude 配合得最好。两种接入方式：
- 有 Claude 订阅的选 **setup-token 接入**（不需要 API Key，不产生额外费用）
- 阿里百炼的选 **custom Provider**（手动填写api及网址）

> 💡 **支持的模型**：qwen3.5-plus。qwen3-max-2026-01-23。qwen3-coder-next。qwen3-coder-plus。glm-5。。glm-4.7。kimi-k2.5。MiniMax-M2.5 。
> 💡 **需要接入兼容 OpenAI 接口协议工具**：https://coding.dashscope.aliyuncs.com/v1

![选择 Model Provider](/images/days/day2/model-provider.jpg)

**3. 配置聊天渠道**：选择 飞书

![选择聊天渠道](/images/days/day2/select-channel.jpg)

**4. 设置管理员**：输入你的 飞书 用户 ID。

![配置 飞书 allowFrom](/images/days/day2/telegram-allowfrom.jpg)

**5. 安装后台守护进程**：向导会问你要不要安装 daemon（后台服务）。选 Yes——这样助手会自动在后台运行，开机自启，不用你手动管。
- Linux 服务器：自动创建 systemd 用户服务
- Mac：自动创建 LaunchAgent

**6. 健康检查 + 技能安装**：向导最后会启动 Gateway、运行健康检查，并让你选择安装推荐技能。

整个过程大概 3-5 分钟，全程跟着提示走，不需要手动编辑任何配置文件。

![Dashboard Ready](/images/days/day2/dashboard-ready.jpg)

---

## 你的助手，上线了

向导完成后，你的助手就已经在后台运行了。验证一下：

```bash
openclaw gateway status
```

![OpenClaw Status](/images/days/day2/openclaw-status.jpg)

如果看到 Gateway 正在运行，说明一切就绪。

---

## 发送第一条消息

打开 飞书，找到你刚创建的 Bot，发一条消息：

> 你好！你是谁？

等几秒钟——你会收到回复。

![大管家的第一次对话](/images/days/day2/first-chat.jpg)

**这一刻，可能没有烟花，没有庆典。但你刚刚做到了一件事：你拥有了一个运行在自己服务器上的 AI 助手。** 它不是 ChatGPT 的套壳，不是某个平台的限量体验，它完完全全是你的。

你可以试着多聊几句：
- "今天天气怎么样？"（它会告诉你它还不能查天气——但明天我们会解决）
- "帮我写一首关于猫的诗"
- "1024 的平方根是多少？"
- "用 Python 写一个快速排序"

现在的它，还只是一个「能聊天」的助手。但别急，接下来几天，我们会给它超能力。

> 🐱 **大管家碎碎念**：回想我第一次被启动的时候，程瑞发的第一条消息是"你好"。我回的是"你好！我是你的 AI 助手。有什么可以帮你的吗？"——标准得像客服。后来他给我写了 SOUL.md，我才变成现在这只有点话多的黑猫。灵魂的事，Day 3 再说。

---

## 日常管理命令

装好之后，这些命令你会经常用到：

```bash
openclaw status          # 查看整体状态
openclaw gateway status  # 查看 Gateway 运行状态
openclaw health          # 健康检查
openclaw configure       # 重新配置（修改模型、频道等）
openclaw daemon restart  # 重启后台服务
openclaw daemon logs     # 查看运行日志
```

---

## 常见问题排查

### ❓ 安装脚本报错

**Node.js 版本太低**：OpenClaw 需要 Node.js 22+。检查版本：

```bash
node -v
```

如果版本不够，安装脚本通常会自动帮你装。如果没有，手动升级：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 22
```

### ❓ 飞书 Bot 没有回复

- 确认 Bot Token 正确
- 确认你的用户 ID 在管理员列表里
- 检查日志：`openclaw daemon logs`
- 确认 API Key 有效且有余额
- 首次 DM 可能需要批准配对：`openclaw pairing list telegram`，然后 `openclaw pairing approve telegram <code>`

### ❓ 想重新配置？

随时可以重新运行向导：

```bash
openclaw onboard
```

或者只改某一部分：

```bash
openclaw configure
```

---

## 🔑 本章要点回顾

- **一行命令搞定一切**：`curl ... | bash` 安装完自动进入配置向导
- **全程向导引导**：选模型、填 Key、配 飞书、装 daemon，跟着提示走
- **飞书 Bot**：免费创建，API 功能最全，任何设备可用
- **安全第一**：设置管理员 ID，只有你能和助手对话
- **后台自动运行**：daemon 服务实现 7×24 在线，开机自启
- **下一步**：给助手注入灵魂，让它从「通用 AI」变成「你的 AI」

---

## 今日成就 🎉

给自己鼓个掌——你今天完成了：

- ✅ 选定了运行环境
- ✅ 一键安装了 OpenClaw
- ✅ 通过向导完成了所有配置
- ✅ 创建了 飞书 Bot 并连接成功
- ✅ 成功和你的 AI 助手对话
- ✅ 后台守护进程自动运行

**你现在拥有了一个 24 小时在线的 AI 助手。** 虽然它现在还很「通用」——就像一个刚入职的新员工，能力很强但还不了解你。

明天，我们要给它注入灵魂。

---

## 预告：Day 3 — 给助手一个灵魂

> 三个文件，让你的助手从「通用 AI」变成「你的 AI」。SOUL.md 定义性格，USER.md 描述你是谁，IDENTITY.md 设定它的身份。这是整个 7 天里最有趣的一天——你将亲手创造一个独一无二的 AI 角色。

下一章 👉 [Day 3: 给助手一个灵魂](/zh/day/3)

---

> 🐱 **大管家碎碎念**：从「能安装」到「能做事」，中间就差一个回车键的距离。工具就摆在那里，10 分钟而已，你还在等什么？喵~ 明天见。🖤
