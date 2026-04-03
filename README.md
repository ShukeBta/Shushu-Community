# 树树社区 (Shushu Community)

游戏账号租赁、交易、陪玩、代练一站式平台

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 18 + TypeScript + Vite 5 + TailwindCSS + shadcn/ui |
| 后端 | Supabase（PostgreSQL 15 + GoTrue Auth + Edge Functions + Storage）|
| 部署 | 宝塔面板 + Nginx + Docker Compose |

## 功能特性

- 🎮 **账号租赁** - 安全租借高段位游戏账号
- 💰 **账号交易** - 买卖游戏账号，平台担保
- 🤝 **游戏陪玩** - 专业陪玩服务
- ⚡ **代练服务** - 快速提升游戏段位

## 快速开始

### 前置要求

- Node.js 18+
- npm 9+

### 本地开发

1. 克隆项目
   ```bash
   git clone <repo-url>
   cd Shushu-Community
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置环境变量
   ```bash
   cp .env.example .env
   # 编辑 .env 填入您的 Supabase 项目信息
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   ```

### Supabase 初始化

1. 安装 Supabase CLI: `npm install -g supabase`
2. 登录: `supabase login`
3. 链接项目: `supabase link --project-ref <your-project-ref>`
4. 执行迁移: `supabase db push`
5. 部署 Edge Functions: `supabase functions deploy create-order`

## 部署（宝塔面板 + Docker Compose）

1. 在宝塔面板安装 Docker 和 Docker Compose
2. 上传项目文件到服务器
3. 复制并配置 `.env` 文件
4. 修改 `nginx/conf.d/shushu.conf` 中的域名
5. 运行:
   ```bash
   docker-compose up -d
   ```

## 项目结构

```
├── src/
│   ├── components/       # UI 组件
│   │   ├── layout/      # 布局组件 (Navbar, Footer)
│   │   └── ui/          # shadcn/ui 基础组件
│   ├── contexts/        # React Context (AuthContext)
│   ├── lib/             # 工具库 (supabase client, utils)
│   ├── pages/           # 页面组件
│   └── types/           # TypeScript 类型定义
├── supabase/
│   ├── migrations/      # SQL 数据库迁移
│   └── functions/       # Edge Functions
├── nginx/               # Nginx 配置
├── docker-compose.yml   # Docker Compose 部署
└── Dockerfile.frontend  # 前端 Docker 镜像
```
