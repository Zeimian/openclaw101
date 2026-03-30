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

#### 核心发现 (Executive Summary)

1. **国内云服务商性价比更高** — 阿里云和华为云提供极具竞争力的入门级价格，年付低至68-249元
2. **海外云服务商稳定性更好** — AWS、Google Cloud和Azure在全球范围内提供更稳定的网络和服务
3. **配置选择需匹配使用场景** — 个人开发可选择2核4G，生产环境建议4核8G以上


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

> 在开始使用 OpenClaw 之前，你需要准备好开发环境和必要的账号资源。本章将指导你完成所有前置准备工作。

---

### 📋 系统要求

OpenClaw 支持主流操作系统，但对硬件和软件环境有一定要求：

#### 最低配置

| 项目 | 要求 |
|------|------|
| CPU | 2 核心 |
| 内存 | 4GB RAM |
| 存储 | 10GB 可用空间 |
| 操作系统 | Linux (Ubuntu 20.04+), macOS (12+), Windows 10/11 (with WSL2) |

#### 推荐配置

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


### 📚 部署指南（新增）

> **💡 2026-03-26 更新**
> 
> 我们已发布完整的平台部署指南，包含详细步骤、常见问题和一键安装脚本：
> 
> - [🪟 Windows 系统部署 OpenClaw 完整指南](/guides/windows-deployment) - **含 9 个踩坑解决方案**
> - [🍎 macOS 系统部署 OpenClaw 完整指南](/guides/macos-deployment)
> 
> 建议先阅读对应平台的指南，再回来继续本章学习。

---

## 🚀 OpenClaw 快速管理工具下载

> 💡 推荐使用官方管理工具快速完成 OpenClaw 的安装与配置，省去繁琐的手动操作。

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid rgba(100,149,237,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.4);">

<h3 style="color: #e0f0ff; font-size: 1.4em; margin-top: 0; text-align: center; letter-spacing: 0.05em;">⬇️ 一键安装包（推荐）</h3>

<div style="display: flex; justify-content: center; margin-top: 24px;">
<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(100,149,237,0.4); border-radius: 12px; padding: 20px; width: 100%; max-width: 500px;">
<div style="display: flex; flex-direction: column; gap: 10px;">
<a href="/downloads/OpenClawInstaller-exe-.zip" download style="display: flex; align-items: center; gap: 10px; background: rgba(46,204,113,0.2); border: 1px solid rgba(46,204,113,0.5); border-radius: 8px; padding: 12px 16px; text-decoration: none; transition: all 0.2s; color: #e0f0ff;">
  <span style="font-size: 1.4em;">🔥</span>
  <span><strong>OpenClawInstaller-exe-</strong> — Windows 一键安装程序 (.zip) <em style="color: #4cd137;">[推荐]</em></span>
</a>
</div>
</div>
</div>

<h3 style="color: #e0f0ff; font-size: 1.4em; margin-top: 32px; text-align: center; letter-spacing: 0.05em;">⬇️ 手动安装包</h3>

<div style="display: grid; gap: 20px; margin-top: 24px;">

<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(100,149,237,0.4); border-radius: 12px; padding: 20px;">
<h4 style="color: #64dfdf; margin: 0 0 12px 0; font-size: 1.1em;">🪟 Windows</h4>
<div style="display: flex; flex-direction: column; gap: 10px;">
<a href="/downloads/ClawPanel_0.10.0_x64-setup.exe" download style="display: flex; align-items: center; gap: 10px; background: rgba(100,149,237,0.15); border: 1px solid rgba(100,149,237,0.5); border-radius: 8px; padding: 12px 16px; text-decoration: none; transition: all 0.2s; color: #e0f0ff;">
  <span style="font-size: 1.4em;">📦</span>
  <span><strong>ClawPanel 0.10.0</strong> — Windows 安装程序 (.exe)</span>
</a>
<a href="/downloads/OpenClaw.Manager_0.0.11_x64-setup.exe" download style="display: flex; align-items: center; gap: 10px; background: rgba(100,149,237,0.15); border: 1px solid rgba(100,149,237,0.5); border-radius: 8px; padding: 12px 16px; text-decoration: none; transition: all 0.2s; color: #e0f0ff;">
  <span style="font-size: 1.4em;">⚙️</span>
  <span><strong>OpenClaw.Manager 0.0.11</strong> — Windows 安装程序 (.exe)</span>
</a>
</div>
</div>

<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(100,149,237,0.4); border-radius: 12px; padding: 20px;">
<h4 style="color: #64dfdf; margin: 0 0 12px 0; font-size: 1.1em;">🍎 macOS</h4>
<div style="display: flex; flex-direction: column; gap: 10px;">
<a href="/downloads/ClawPanel_0.10.0_x64.dmg" download style="display: flex; align-items: center; gap: 10px; background: rgba(100,149,237,0.15); border: 1px solid rgba(100,149,237,0.5); border-radius: 8px; padding: 12px 16px; text-decoration: none; transition: all 0.2s; color: #e0f0ff;">
  <span style="font-size: 1.4em;">📦</span>
  <span><strong>ClawPanel 0.10.0</strong> — macOS 安装程序 (.dmg)</span>
</a>
<a href="/downloads/OpenClaw.Manager_0.0.11_universal.dmg" download style="display: flex; align-items: center; gap: 10px; background: rgba(100,149,237,0.15); border: 1px solid rgba(100,149,237,0.5); border-radius: 8px; padding: 12px 16px; text-decoration: none; transition: all 0.2s; color: #e0f0ff;">
  <span style="font-size: 1.4em;">⚙️</span>
  <span><strong>OpenClaw.Manager 0.0.11</strong> — macOS 安装程序 (.dmg)</span>
</a>
</div>
</div>

</div>
</div>

#### 🚀 一键部署方法

##### 1. macOS / Linux 一键安装

在终端中运行以下命令，自动完成所有依赖安装和配置：

```bash
curl -fsSL https://raw.githubusercontent.com/miaoxworld/OpenClawInstaller/main/install.sh | bash
```

**安装脚本会自动：**
- ✅ 检查系统环境
- ✅ 安装必要的依赖（Node.js、Git 等）
- ✅ 下载 OpenClaw 核心文件
- ✅ 启动交互式配置向导
- ✅ 配置后台守护进程

##### 2. Windows 一键安装

**方式 A：使用 PowerShell（推荐）**

1. 按 `Win + X` → 选择 `Windows PowerShell (管理员)` 或 `终端 (管理员)`
2. 复制并粘贴以下命令：

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/miaoxworld/OpenClawInstaller/main/install.ps1" -OutFile "OpenClawInstaller.ps1"
```

3. 按 Enter 执行
4. 然后运行：`.\OpenClawInstaller.ps1`

**方式 B：下载应用程序安装（推荐新手）**

如果你不熟悉命令行，可以直接下载 Windows 应用程序：

📥 **[下载 OpenClawInstaller-exe-.zip](/downloads/OpenClawInstaller-exe-.zip)**

**安装步骤：**
1. 下载上面的 ZIP 文件
2. 解压到任意文件夹
3. 双击 `OpenClawInstaller.exe` 运行
4. 按照图形界面提示完成安装和配置

> **💡 提示**
> 
> - 如果下载速度慢，可以使用代理或 VPN
> - 首次运行可能需要 Windows Defender 确认，点击「仍要运行」即可
> - 安装过程中会自动下载 Node.js 和其他依赖，请保持网络连接

**方式 C：使用 WSL（高级用户）**

如果你已安装 WSL2，可以在 WSL 终端中运行 Linux 命令：

```bash
curl -fsSL https://raw.githubusercontent.com/miaoxworld/OpenClawInstaller/main/install.sh | bash
```

> **⚠️ 注意**
> 
> 确保 WSL 中已安装 Node.js 22+。如果没有，运行：
> ```bash
> curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
> sudo apt install -y nodejs
> ```

---

### 🪟 Windows WSL 部署速查（2026-03-11 最新版）

> **前置环境：** 一台恢复出厂设置的干净 Windows 11 电脑
> 
> **最终目标：** 在本地 Linux 环境中稳定运行 OpenClaw，对接阿里百川 Coding 计划大模型

#### 第一阶段：安装 WSL

```powershell
# 方式 1：命令行一键安装（可能超时）
wsl --install

# 方式 2：微软商店安装（推荐，绕过网络问题）
# 打开 Microsoft Store → 搜索 "Ubuntu 22.04.5 LTS" → 安装
```

**⚠️ 踩坑 1：VPN 导致安装超时**
- **现象：** `WININET_E_TIMEOUT` 错误或进度条卡在 1.5%
- **解决：** 关闭 VPN，或改用微软商店安装

**⚠️ 踩坑 2：WSL 2 内核更新失败**
- **解决：** 手动下载 WSL2 内核安装包

#### 第二阶段：配置 Linux 环境

```bash
# 更新软件源并安装基础工具
sudo apt update
sudo apt install curl git -y

# 安装 Node.js v22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

**⚠️ 踩坑 3：Node.js 版本过低**
- **解决：** 必须使用 nodesource 源安装 v22，apt 默认版本太老

#### 第三阶段：安装 OpenClaw

```bash
# 切换 npm 镜像源（关键！）
npm config set registry https://registry.npmmirror.com
npm cache clean --force

# 运行官方安装脚本
curl -fsSL https://openclaw.ai/install.sh | bash
```

**⚠️ 踩坑 4：npm 安装超时**
- **原因：** npm 默认连接海外服务器
- **解决：** 切换淘宝镜像源

**⚠️ 踩坑 5：权限不足错误**
- **解决：** 使用 `sudo` 或在用户目录下安装

#### 第四阶段：核心参数配置

```bash
# 启动配置向导
openclaw configure
```

**配置要点：**
- **API Base URL:** `https://coding.dashscope.aliyuncs.com/v1`
- **API Key:** 阿里百川 Coding 计划密钥
- **Gateway bind mode:** LAN (All interfaces)
- **⚠️ 极度重要：** 保存生成的 Token（飞书连接的唯一"钥匙"）

#### 第五阶段：点火启动

```bash
# 启动服务
openclaw start

# 浏览器访问（关键！）
# 使用 localhost 绕过跨域错误
http://localhost:18789
```

**⚠️ 踩坑 8：跨域错误（CORS）**
- **现象：** 局域网 IP 访问报 `origin not allowed`
- **解决：** 使用 `http://localhost:18789` 访问

**⚠️ 踩坑 9：端口被占用**
- **解决：** `lsof -i :18789` 查找占用进程，`kill` 后重启

> **📖 完整文档：** [OpenClaw Windows WSL 终极排坑指南](/guides/windows-deployment) - 包含 9 个踩坑详细解决方案 + 飞书对接教程

---

### ⌨️ 快速打开命令行（Windows 用户必看）

> 在 Windows 上安装 OpenClaw，你需要使用命令行。以下是 **最快的方式**：

#### 方式 1：PowerShell（推荐）⭐

```
Win + X → 按 A
```

**说明：** 直接打开 **管理员 PowerShell**，所有安装命令都能执行。

#### 方式 2：Windows Terminal（最佳体验）

```
Win 键 → 输入 wt → Enter
```

**说明：** Windows Terminal 支持多标签、分屏、主题，是开发者的首选。

> **💡 未安装 Windows Terminal？**
> 
> 在 PowerShell 中运行一行命令即可安装：
> ```powershell
> winget install Microsoft.WindowsTerminal
> ```

#### 方式 3：传统 CMD

```
Win + R → 输入 cmd → Enter
```

**说明：** 传统的命令提示符，功能有限，不推荐用于 OpenClaw 安装。

---

#### 🎯 推荐工作流

1. **按 `Win + X` → 按 `A`** 打开管理员 PowerShell
2. **复制安装命令** 粘贴到 PowerShell
3. **按 Enter** 执行

**就这么简单！**

> **💡 提示**
> 
> - **Windows 11：** 默认使用 PowerShell，CMD 需要手动切换
> - **Windows 10：** `Win + X` 菜单可设置默认 CMD 或 PowerShell
> - **管理员权限：** 某些命令（如安装全局 npm 包）需要管理员权限

---

#### 🪟 Windows 安装完整流程（WSL）

> **2026-03-11 更新：含 9 个踩坑解决方案**
> 
> 1. **安装 WSL：** 微软商店下载 Ubuntu 22.04.5 LTS（绕过网络超时）
> 2. **配置环境：** 安装 Node.js v22（必须用 nodesource 源）
> 3. **安装 OpenClaw：** 切换 npm 淘宝镜像，运行安装脚本
> 4. **配置参数：** 保存 Gateway Token（飞书连接钥匙）
> 5. **启动服务：** 使用 `localhost` 访问绕过跨域错误
> 
> **📖 完整指南：** [Windows WSL 终极排坑指南](/guides/windows-deployment)

---

### 🛠️ 必备软件安装

#### Node.js 环境

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

> **Windows 用户：** 我们已发布完整的 Windows 部署指南，包含详细步骤和一键安装脚本：
> - [🪟 Windows 系统部署 OpenClaw 完整指南](/guides/windows-deployment)
> 
> 或者从 [Node.js 官网](https://nodejs.org/) 下载安装包，或使用 nvm-windows。

---

#### Docker 安装（推荐）

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

#### Git 版本控制

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

### 🔑 LLM API 密钥准备

OpenClaw 的核心功能依赖于大语言模型 API。你需要至少准备一个 LLM 提供商的 API 密钥。

#### OpenAI API

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

#### Anthropic Claude API

1. 访问 [Anthropic Console](https://console.anthropic.com/)
2. 申请 API 访问权限
3. 生成 API Key
4. 记录你的配额限制

> **💡 推荐用途**
> 
> Claude 3.5 Sonnet 在编码和推理任务上表现优异，适合作为 OpenClaw 的主力模型。


#### 阿里云百炼
1. 访问 [阿里云百炼](https://bailian.console.aliyun.com)
2. 购买coding plan计划lite版40元，pro版200元。
3. 生成 API Key
4. 记录你的配额限制
---

#### 本地模型（可选）

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

### 💬 消息平台账号

根据你的需求，准备以下平台的机器人账号：

#### 飞书账号

**一、创建账号**

1. 进入飞书开发者后台访问：https://open.feishu.cn/app
   - 登录你的飞书账号
2. 创建新应用
   - 点击「创建应用」
   - 选择「自建应用」
   - 填写应用信息：
     - 应用名称：OpenClaw Assistant（或你喜欢的名字）
     - 应用图标：可选
   - 点击「创建」
3. 获取应用凭证
   - 创建后，在「应用凭证」页面记录：
     - App ID (cli_id)
     - App Secret (cli_secret)
   - ⚠️ 重要：妥善保管 App Secret，不要泄露！

**二、配置应用权限**

1. 添加机器人能力
   - 进入「应用能力」→「添加应用能力」
   - 选择「机器人」
   - 配置机器人信息：
     - 机器人名称：小猪羔（或你的助手名字）
     - 机器人头像：可选
2. 配置权限 scopes
   - 在「权限管理」→「权限配置」中添加以下权限：

**基础权限**
- `im:message` - 发送和读取消息
- `im:chat` - 访问群组信息
- `contact:contact` - 读取联系人信息

**可选权限（按需添加）**
- `im:resource` - 发送文件/图片
- `drive:file` - 访问云文档
- `wiki:wiki` - 访问知识库
- `bitable:app` - 访问多维表格

3. 发布应用
   - 点击「版本管理与发布」
   - 点击「创建版本」
   - 填写版本号（如 1.0.0）
   - 点击「发布」

**三、配置事件订阅（可选）**

1. 配置接收消息
   - 进入「事件订阅」
   - 开启「启用事件订阅」
   - 配置：
     - 请求地址：你的 OpenClaw 服务器地址（需要公网可达）
     - 加密密钥：自动生成，记录下来
2. 订阅事件
   - 订阅以下事件：
     - `im.message.receive_v1` - 接收消息
     - `im.chat.member.add_v1` - 成员加入群聊
     - `im.chat.member.delete_v1` - 成员退出群聊
3. 验证 URL
   - 飞书会发送验证请求，确保你的服务器能正确响应。

**四、配置 OpenClaw**

1. 编辑 OpenClaw 配置
   - 找到你的 OpenClaw 配置文件（通常在 `~/.openclaw/config.json` 或类似位置）

2. 添加飞书渠道配置

```json
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
```

3. 重启/重载配置
   - 查看 gateway 状态：`openclaw gateway status`
   - 如果需要，重启 gateway：`openclaw gateway restart`
   - ⚠️ 注意：根据郭郭的要求，不要轻易重启 gateway！
     - 先确认配置是否需要重启才能生效
     - 如果可以热重载，优先使用热重载

**五、测试连接**

1. 在飞书中添加机器人
   - 打开飞书，进入任意群聊或私聊
   - 点击右上角「...」→「添加机器人」
   - 选择你创建的「小猪羔」机器人
   - 点击「添加」
2. 发送测试消息
   - 在飞书中发送一条消息给机器人，观察响应

---

### 🏢 可选：接入企业微信

> **💡 2026-03-09 更新**
> 
> 除了飞书，你还可以接入企业微信作为 OpenClaw 的聊天渠道。
> 
> - [🏢 企业微信接入 OpenClaw 完整指南](/guides/wecom-integration)
> 
> **企业微信 vs 飞书，选哪个？**
> 
> | 特性 | 飞书 | 企业微信 |
> |------|------|---------|
> | 个人使用 | ✅ 免费版功能齐全 | ✅ 免费版功能齐全 |
> | 企业使用 | ✅ 适合互联网/科技公司 | ✅ 适合传统企业/微信生态 |
> | 移动端体验 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
> | 与微信互通 | ❌ | ✅ 可接收微信消息 |
> | API 友好度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
> 
> **建议：**
> - 个人用户/小团队 → 选 **飞书**（API 更友好，文档更全）
> - 已在使用企业微信 → 选 **企业微信**（员工无需额外安装）
> - 需要与微信互通 → 选 **企业微信**

---

### 📝 环境变量模板

创建一个 `.env` 文件作为配置模板：

```bash
# LLM API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Message Channels
TELEGRAM_BOT_TOKEN=123456789:ABC...
DISCORD_BOT_TOKEN=MTk8...
WECOM_CORP_ID=你的企业 ID
WECOM_AGENT_ID=你的应用 ID
WECOM_SECRET=你的应用 Secret

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

### ✅ 检查清单

在进入下一章之前，确认你已完成：

- [ ] 安装 Node.js 18+ 或 Docker
- [ ] 安装 Git 并配置基本信息
- [ ] 获得至少一个 LLM API 密钥并测试可用
- [ ] 创建至少一个消息平台机器人账号（飞书/企业微信/Telegram）
- [ ] 准备好 `.env` 配置文件模板
- [ ] 确保网络可以访问相关 API 服务

#### 🎯 推荐配置

**个人用户/小团队：**
- ✅ 飞书机器人（免费，API 友好）
- ✅ 阿里云百炼 API（首月¥7.9）

**企业用户：**
- ✅ 企业微信机器人（员工无需额外安装）
- ✅ 阿里云百炼 API（企业版）

**高级用户：**
- ✅ 多平台接入（飞书 + 企业微信 + Telegram）
- ✅ 本地模型（Ollama + Llama3.1）

---

如果你用的是 **Mac**，我们已发布完整的 macOS 部署指南：
- [🍎 macOS 系统部署 OpenClaw 完整指南](/guides/macos-deployment)

可能需要先装 Homebrew（如果还没有的话）：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

如果你用的是 **Windows**，我们强烈建议参考完整的部署指南：
- [🪟 Windows 系统部署 OpenClaw 完整指南](/guides/windows-deployment) - **含 9 个踩坑解决方案**

**Windows 安装速查：**
1. 微软商店安装 Ubuntu 22.04.5 LTS（绕过网络超时）
2. 安装 Node.js v22：`curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -` （在 WSL 中运行）
3. 切换 npm 镜像：`npm config set registry https://registry.npmmirror.com` （在 WSL 中运行）
4. 运行安装脚本：`curl -fsSL https://openclaw.ai/install.sh | bash` （在 WSL 中运行）
5. 配置 Gateway：保存 Token，使用 `localhost` 访问

**📖 完整指南包含：**
- 9 个踩坑详细解决方案（VPN 超时、npm 超时、跨域错误等）
- 5 阶段部署流程图
- 飞书机器人对接教程
- 完整命令清单

详细步骤见 [Windows WSL 终极排坑指南](/guides/windows-deployment)。




---

## 一键安装 + 自动配置

好了，不管你选了哪个方案，打开终端（Terminal），输入这一行命令：

**macOS/Linux/WSL 用户：**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows 用户（PowerShell）：**
```powershell
Invoke-WebRequest -Uri "https://openclaw.ai/install.ps1" -OutFile "OpenClawInstaller.ps1"; .\OpenClawInstaller.ps1
```

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
