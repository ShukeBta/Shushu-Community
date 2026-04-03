# 常见问题（FAQ）

## Q1: Docker Compose 启动失败，端口被占用

```
Error: bind: address already in use
```

```bash
lsof -i :5432            # 查找占用进程
kill -9 <PID>            # 停止进程
# 或修改 docker-compose.yml 中的端口映射
```

## Q2: 前端构建报错 `npm ERR! ERESOLVE`

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Q3: 白屏，控制台报 CORS 错误

1. 检查 `.env.production` 中 `VITE_SUPABASE_URL` 是否正确
2. 确认 Nginx 反代已生效：`nginx -t && nginx -s reload`
3. 确认 Kong 运行正常：`docker compose ps | grep kong`

## Q4: 数据库连接失败 `password authentication failed`

```bash
grep POSTGRES_PASSWORD .env
# 如需重置：
docker compose down
docker volume rm shu-Community_db-data  # ⚠️ 会清空数据
docker compose up -d
```

## Q5: Edge Functions 报错 `Function not found`

```bash
./deploy.sh fn            # 重启 Edge Functions
./deploy.sh logs functions # 查看日志
```

## Q6: SSL 证书无法 HTTPS 访问

1. 宝塔面板确认证书已申请
2. 检查 Nginx 配置中证书路径
3. `nginx -t && nginx -s reload`
4. 确认 443 端口已放行

## Q7: `./deploy.sh migrate` 报大量 ERROR

如果都是 `already exists` 或 `duplicate key`，这是**正常的**。只有非重复类错误才需处理。

```bash
ls -la /tmp/db_pre_migrate_*.sql.gz          # 查看备份
zcat /tmp/db_pre_migrate_最新时间.sql.gz | docker exec -i pd-supabase-db psql -U supabase_admin -d postgres  # 回滚
```

## Q8: 服务器内存不足，容器频繁重启

```bash
free -h
docker stats --no-stream
# 如内存 < 4GB，可注释 docker-compose.yml 中 studio 服务
# 或升级至 8GB+
```

## Q9: 宝塔看不到 Docker 容器

1. 安装宝塔「Docker 管理器」≥ 3.0
2. 命令行管理：`./deploy.sh status`

## Q10: 管理员登录提示"无权限"

``
```

## 调试工具

```bash
# 测试 Edge Function
curl -X POST https://api.域名/functions/v1/ \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# 测试 REST API
curl https://api.域名/rest/v1/platform_settings -H "apikey: 

# 测试 Auth
curl https://api.域名/auth/v1/settings
```
