import { GamepadIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <GamepadIcon className="h-5 w-5 text-primary" />
              <span>树树社区</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              游戏账号租赁、交易、陪玩、代练一站式平台
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">服务类目</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/listings?category=rental" className="hover:text-foreground">账号租赁</Link></li>
              <li><Link to="/listings?category=trade" className="hover:text-foreground">账号交易</Link></li>
              <li><Link to="/listings?category=companion" className="hover:text-foreground">游戏陪玩</Link></li>
              <li><Link to="/listings?category=boost" className="hover:text-foreground">代练服务</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">帮助中心</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">新手指南</a></li>
              <li><a href="#" className="hover:text-foreground">安全须知</a></li>
              <li><a href="#" className="hover:text-foreground">常见问题</a></li>
              <li><a href="#" className="hover:text-foreground">联系客服</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">关于我们</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">关于树树</a></li>
              <li><a href="#" className="hover:text-foreground">用户协议</a></li>
              <li><a href="#" className="hover:text-foreground">隐私政策</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          © 2024 树树社区. 保留所有权利.
        </div>
      </div>
    </footer>
  )
}
