---
description: "瞩目AI 中转站快速开始：注册账号、获取 API Key，并把 ChatBox / NextChat / Cursor 的 API Base 切换到中转接口。"
---

# 快速开始：接入瞩目AI 中转 API

这一章是整个教学基地的起点。读完之后，你会得到三样东西：

1. 一个属于自己的瞩目AI 账号。
2. 一把可用的 API Key。
3. 一份能直接套进 ChatBox、NextChat、Cursor 等软件的 API Base 配置。

::: tip 你需要记住的两个地址
- 中转站主网址（注册 / 充值 / 获取 API Key）：**[https://zhumuai.com](https://zhumuai.com)**
- 中转 API 接口地址（填到 ChatBox / NextChat / Cursor 等软件里）：**`https://zzzplus.com/v1`**
:::

::: warning 不要再去用官方接口
凡是教程里出现 `https://api.openai.com` 或 `https://api.openai.com/v1`，都要替换成上方的中转 API 接口地址，否则在国内网络下会连不通，也享受不到中转节点的稳定性和价格优惠。
:::

## 第一步：注册账号并获取 API Key

1. 浏览器访问 [https://zhumuai.com](https://zhumuai.com)，使用邮箱完成注册并登录。
2. 进入「**令牌 / API Key**」页面，点击「新建令牌」。
3. 给这把 Key 起一个能看出用途的名字，例如 `chatbox-mac`、`cursor-work`，方便后续区分。
4. 复制生成的 API Key（通常以 `sk-` 开头），妥善保存。这把 Key 只会显示一次。

::: caution 安全提醒
- 不要把 API Key 截图上传到公开网络，也不要写进会被推送到 GitHub 的代码里。
- 一台设备一把 Key，丢失或泄露时可以直接在中转站后台禁用，不影响其他设备。
- 如果怀疑 Key 被滥用，先去中转站后台禁用，再重新生成新的。
:::

## 第二步：把官方 API Base 替换为中转接口

各家客户端的设置位置略有不同，但要做的事是一样的：**把官方接口 `https://api.openai.com` 改成 `https://zzzplus.com/v1`，再把 API Key 填进去。**

### ChatBox

1. 打开 ChatBox，进入「设置 → 模型设置」。
2. 模型提供方选择 **OpenAI API** 或 **OpenAI 兼容**。
3. 配置项：
   - **API Host / API 域名**：`https://zzzplus.com`
   - **API Path / 路径**：`/v1/chat/completions`（多数版本会自动补全，只填 Host 也可以）
   - **API Key**：粘贴第一步获取的 Key
4. 保存后随便发一句话测试，能正常返回即接入成功。

### NextChat

1. 进入「设置 → 自定义接口」。
2. 配置项：
   - **接口地址 / Base URL**：`https://zzzplus.com/v1`
   - **API Key**：粘贴你的 Key
   - **模型**：可以填 `gpt-4o-mini`、`gpt-4o`、`gpt-5` 等中转站支持的模型
3. 回到对话页测试一句话即可。

### Cursor

1. 打开 Cursor，进入 `Settings → Models`。
2. 把 **OpenAI API Key** 填成你的中转 Key。
3. 找到 **Override OpenAI Base URL**，把它打开并填写：`https://zzzplus.com/v1`。
4. 点击「Verify」按钮，验证通过即可。
5. 在右下角模型选择器中确认能成功调用 GPT 系列模型。

### Codex CLI / 其他 OpenAI 兼容客户端

绝大多数客户端都遵循 OpenAI 的 API 规范，只要找到这两个配置就能接入：

| 配置项 | 值 |
| --- | --- |
| `OPENAI_API_BASE` / `Base URL` / `API Host` | `https://zzzplus.com/v1` |
| `OPENAI_API_KEY` / `API Key` | 第一步获取的 Key |

如果客户端只支持环境变量，可以这样设置（以 macOS / Linux 为例）：

```bash
export OPENAI_API_BASE="https://zzzplus.com/v1"
export OPENAI_API_KEY="sk-你的中转 Key"
```

Windows PowerShell：

```powershell
setx OPENAI_API_BASE "https://zzzplus.com/v1"
setx OPENAI_API_KEY "sk-你的中转 Key"
```

## 第三步：用一句话验证接入是否成功

不管用哪款客户端，建议第一次都先发一条简短的对话，例如：

> 用一句话告诉我现在是哪一年，并简单说明你是哪个模型。

如果能正常返回内容，就说明：

- 网络可达 ✅
- API Base 配置正确 ✅
- API Key 有效 ✅

之后再回到 [学习路线](./00-overview.md) 或 [入口地图](/platform/)，挑一个适合自己的方向继续学习就好。

## 常见问题

**Q：是不是必须订阅 ChatGPT Plus / Pro？**

不需要。本教程围绕瞩目AI 中转 API 展开，按 token 用多少花多少，不强制订阅 ChatGPT 官方套餐。

**Q：中转 Key 可以同时用在多台设备吗？**

可以。但建议每台设备 / 每个客户端单独建一把 Key，方便单独禁用和统计用量。

**Q：报 401 / 403 / 余额不足怎么办？**

按顺序排查：

1. 回中转站后台确认账号余额、Key 是否被禁用。
2. 检查客户端里的 API Base 是否填的是 `https://zzzplus.com/v1`，而不是官方地址。
3. 确认 Key 没有多余空格、没有被截断。

**Q：能调用哪些模型？**

以中转站后台「模型列表」为准。常见的 GPT 系列、Claude 系列模型大多都覆盖，具体名字直接照抄后台展示的字符串填入客户端即可。
