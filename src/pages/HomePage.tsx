import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ShieldCheckIcon, ZapIcon, StarIcon, UsersIcon } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'rental',
    title: '账号租赁',
    description: '安全租借高段位账号，体验顶级游戏内容',
    icon: '🎮',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    id: 'trade',
    title: '账号交易',
    description: '买卖游戏账号，公平交易有保障',
    icon: '💰',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    id: 'companion',
    title: '游戏陪玩',
    description: '专业陪玩老师，让游戏更有趣',
    icon: '🤝',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    id: 'boost',
    title: '代练服务',
    description: '快速提升段位，职业代练团队',
    icon: '⚡',
    color: 'bg-orange-500/10 text-orange-500',
  },
]

const FEATURES = [
  {
    icon: ShieldCheckIcon,
    title: '安全保障',
    description: '平台担保交易，资金安全有保障',
  },
  {
    icon: ZapIcon,
    title: '快速响应',
    description: '卖家快速响应，高效完成服务',
  },
  {
    icon: StarIcon,
    title: '评价体系',
    description: '真实用户评价，服务质量可查',
  },
  {
    icon: UsersIcon,
    title: '专业团队',
    description: '认证服务商，专业素质有保证',
  },
]

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              游戏服务
              <span className="text-primary"> 一站搞定</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              树树社区提供专业的游戏账号租赁、交易、陪玩、代练服务。
              安全可靠，快捷高效，让您的游戏体验更上一层楼。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/listings">
                <Button size="lg" className="w-full sm:w-auto">浏览服务</Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">免费注册</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-3">服务类目</h2>
          <p className="text-muted-foreground text-center mb-10">选择您需要的游戏服务类型</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/listings?category=${cat.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-2 ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {cat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-3">为什么选择我们</h2>
          <p className="text-muted-foreground text-center mb-10">树树社区的优势与承诺</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-3">准备好了吗？</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            加入树树社区，开始您的游戏服务之旅
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary">立即注册</Button>
            </Link>
            <Link to="/listings">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                浏览服务
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
