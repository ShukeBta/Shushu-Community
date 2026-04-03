import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import { GamepadIcon, MenuIcon } from 'lucide-react'

export function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GamepadIcon className="h-6 w-6 text-primary" />
          <span>树树社区</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/listings?category=rental" className="text-muted-foreground hover:text-foreground transition-colors">
            账号租赁
          </Link>
          <Link to="/listings?category=trade" className="text-muted-foreground hover:text-foreground transition-colors">
            账号交易
          </Link>
          <Link to="/listings?category=companion" className="text-muted-foreground hover:text-foreground transition-colors">
            游戏陪玩
          </Link>
          <Link to="/listings?category=boost" className="text-muted-foreground hover:text-foreground transition-colors">
            代练服务
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm">个人中心</Button>
              </Link>
              <Link to="/listings/new">
                <Button size="sm">发布服务</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>退出</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">登录</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">注册</Button>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
