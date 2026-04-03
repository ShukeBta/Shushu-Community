# 鼠鼠交易平台

> 游戏账号租赁、交易、陪玩、代练一站式平台

# 展示图片
## 桌面平板手机三端适配，可封装为douyin、weixix小程序、APP、等

### 鼠鼠交易平台相关截图

<div style="display: flex; gap: 6px; overflow-x: auto; padding: 4px 0;">
  <img src="https://picui.ogmua.cn/s1/2026/04/03/69cf8268ee89b.webp" width="16%" alt="img1">
  <img src="https://picui.ogmua.cn/s1/2026/04/03/69cf826a2d283.webp" width="16%" alt="img2">
  <img src="https://picui.ogmua.cn/s1/2026/04/03/69cf826a5e112.webp" width="16%" alt="img3">
  <img src="https://picui.ogmua.cn/s1/2026/04/03/69cf826aae529.webp" width="16%" alt="img4">
  <img src="https://picui.ogmua.cn/s1/2026/04/03/69cf826acdc35.webp" width="16%" alt="img5">
  <img src="https://picui.ogmua.cn/s1/2026/04/03/69cf827a3d77e.webp" width="16%" alt="img6">
</div>

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 18 + TypeScript + Vite 5 + TailwindCSS + shadcn/ui |
| 后端 | Supabase（PostgreSQL 15 + GoTrue Auth + Edge Functions + Storage） |
| 部署 | 宝塔面板 + Nginx + Docker Compose |

## 系统要求

| 组件 | 最低版本 | 推荐版本 |
|------|---------|---------|
| 操作系统 | CentOS 7+ / Ubuntu 20.04+ | Ubuntu 22.04 LTS |
| Node.js | 18+ | 20 LTS |
| Docker | 20.10+（含 Docker Compose v2） | 24+ |
| 内存 | **4 GB** | 8 GB+ |
| 磁盘 | 20 GB | 40 GB+ |

## 快速开始

### 一、准备服务器

1. 安装宝塔面板（[详细步骤](docs/deployment.md#1-安装宝塔面板)）
2. 在宝塔「软件商店」安装：**Nginx**、**Node.js 版本管理器**（选 20 LTS）、**Docker 管理器**
3. 放行端口 80 / 443（阿里云、腾讯云需同时在安全组放行）

### 二、一键部署

```bash
# 1. 克隆项目
git clone https://github.com/你的用户名/项目名.git
cd Shushu-Community

# 2. 预览部署流程（不实际执行）
chmod +x deploy.sh && ./deploy.sh install --dry-run

# 3. 确认无误后正式部署
./deploy.sh
```

部署脚本将自动完成：
- ✅ 环境检查（Docker / Node.js / npm）
- ✅ 交互式配置（域名、API 模式、管理员账号、SMTP、第三方服务）
- ✅ 生成安全密钥（数据库密码、JWT Secret、Anon Key、Service Role Key）
- ✅ 创建 Kong API 网关配置（自动嵌入密钥，兼容 Kong 2.8）
- ✅ 构建前端项目（自动生成 `.env.production`）
- ✅ 启动 Docker 容器（健康检查确保启动顺序：DB → Auth/REST/Realtime/Storage → Kong）
- ✅ 自动创建管理员账号并分配超级管理员权限
- ✅ 生成 Nginx 配置文件和备份脚本

### 三、配置 Nginx

部署完成后，脚本会输出 Nginx 配置。根据你选择的 API 模式：

**同域名模式（推荐）：**
1. 宝塔面板 → 网站 → 添加站点 → 域名填你的域名 → PHP 选纯静态
2. 站点设置 → 配置文件 → 在 `#REWRITE-END` 之后粘贴 `nginx_spa_proxy.conf` 内容
3. SSL → Let's Encrypt → 申请 → 强制 HTTPS

**子域名模式：**
1. 添加主站点（纯静态）+ API 站点（反向代理到 `http://127.0.0.1:8080`）
2. 分别申请 SSL 证书

```bash
# 验证并重载 Nginx
nginx -t && nginx -s reload
```

## 架构概览

```
用户浏览器 (React SPA)
    │ HTTPS
    ▼
Nginx (宝塔面板)
├── 静态文件 /dist/*
├── API 反向代理 → Kong Gateway (:8080)
│   ├── 
│   ├── 
│   ├── Realtime   (/realtime/v1/)— 实时通信
│   └── 
└── 
```

### 容器启动顺序（健康检查保障）

```
db (PostgreSQL)  ── healthcheck:  ──┐
                                               ├── auth    ── healthcheck: 
                                               ├── rest    ── healthcheck: 
                                               ├── realtime── healthcheck:
                                                      │
                                          全部 healthy 后
                                                      ▼
                                                  kong ()
```

## 部署脚本命令

| 命令 | 简写 | 说明 |
|------|------|------|
| `./deploy.sh install` | （默认） | 首次完整部署 |
| `./deploy.sh update-frontend` | `uf` | 重新构建并部署前端 |
| `./deploy.sh restart-backend` | `rb` | 重启所有后端容器 |
| `./deploy.sh update-functions` | `fn` | 仅重启 Edge Functions |
| `./deploy.sh migrate` | `mg` | 执行数据库迁移（自动备份） |
| `./deploy.sh status` | `st` | 查看容器运行状态 |
| `./deploy.sh logs <服务>` | `log` | 查看指定服务日志（如 `logs auth`） |
| `./deploy.sh logs all` | — | 查看所有服务日志 |
| `./deploy.sh backup` | `bk` | 立即执行数据库备份 |
| `./deploy.sh clean [天数]` | `cl` | 清理旧备份和临时文件（默认保留 30 天） |
| `./deploy.sh full-update` | `fu` | 一键全量更新（pull+migrate+前端+函数+健康检查） |
| `./deploy.sh self-update` | `su` | 仅更新 deploy.sh 脚本自身 |
| `./deploy.sh pull` | `pl` | 拉取最新代码并智能提示后续操作 |
| `./deploy.sh health-check` | `hc` | 一键检查所有服务健康状态 |
| `./deploy.sh cdn [提供商]` | — | CDN 部署（aliyun / tencent / manual） |
| `./deploy.sh help` | `-h` | 显示帮助信息 |

### 全局选项

| 选项 | 简写 | 说明 |
|------|------|------|
| `--dry-run` | `-n` | 预览模式，仅显示将要执行的操作而不实际执行 |
| `--yes` | `-y` | 跳过确认提示，自动确认所有操作 |

```bash
# 示例：预览完整部署流程
./deploy.sh install --dry-run

# 示例：预览数据库迁移
./deploy.sh migrate -n

# 示例：全量更新（跳过确认）
./deploy.sh fu -y
```

## Docker 服务一览

| 服务名 | 容器名 | 端口（仅绑定 127.0.0.1） | 健康检查 |
|--------|--------|-------------------------|---------|
| db | shushu-db | 3210 | `pg_isready` |
| auth | shushu-auth | 8888 | `wget /health` |
| rest | shushu-rest | 4000 | `wget /` |
| realtime | shushu-realtime | 3000 | `TCP :3000` |
| storage | shushu-storage | 6000 | `wget /status` |
| kong | shushu-kong | 8080/8443 | 依赖上游健康 |
| functions | shushu-functions | 8000（内部） | — (20 个函数，含频率限制) |
| studio | shushu-studio | 77521 | — |
| meta | shushu-meta | 8080 | — |

> ⚠️ 端口 8080 和 77521 **不要对外暴露**，通过 Nginx 反向代理或 SSH 隧道访问。

## 安全策略

### 数据库安全
- 
## 常见问题


## 更新部署

```bash
cd /www/server/shu-Community

# 一键全量更新（推荐）
./deploy.sh fu

# 或分步更新：
git pull
./deploy.sh mg     # 数据库迁移
./deploy.sh uf     # 前端更新
./deploy.sh fn     # Edge Functions 更新
./deploy.sh rb     # 重启后端
./deploy.sh hc     # 健康检查
```

## 健康检查

```bash
chmod +x healthcheck.sh && ./healthcheck.sh
```

自动检测：Docker 状态、容器运行、端口监听、Nginx 配置、API 连通性、数据库连接、磁盘空间、SSL 证书。

## 📖 详细文档

| 文档 | 内容 |
|------|------|
| [服务器准备与部署](docs/deployment.md) | 宝塔面板安装、Docker 配置、手动部署步骤 |
| 
| [Nginx 与 SSL 配置](docs/nginx.md) | 同域名/子域名模式、API 反代、SSL 证书 |
| [前后端分离部署](docs/cdn-deploy.md) | 阿里云 OSS / 腾讯云 COS / CDN 部署方案 |
| 
| [运维与安全](docs/ops.md) | 备份、监控、日志、安全加固、定时任务 |
| [常见问题 FAQ](docs/faq.md) | 部署常见报错及解决方案 |
| [创作者计划](docs/creator-program.md) | 鼠鼠创作者计划详情与奖励规则 |

## License

联系我请随时留言，独立开发不易，感谢
