import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

type Listing = Database['public']['Tables']['listings']['Row']

const CATEGORY_LABELS: Record<string, string> = {
  rental: '账号租赁',
  trade: '账号交易',
  companion: '游戏陪玩',
  boost: '代练服务',
}

const CATEGORIES = ['rental', 'trade', 'companion', 'boost']

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const category = searchParams.get('category') || ''

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (category && CATEGORIES.includes(category)) {
        query = query.eq('category', category as 'rental' | 'trade' | 'companion' | 'boost')
      }

      const { data } = await query
      setListings(data || [])
      setLoading(false)
    }

    fetchListings()
  }, [category])

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {category ? CATEGORY_LABELS[category] : '全部服务'}
        </h1>
        <Link to="/listings/new">
          <Button>发布服务</Button>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <Button
          variant={!category ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSearchParams({})}
        >
          全部
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSearchParams({ category: cat })}
          >
            {CATEGORY_LABELS[cat]}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg" />
              <CardHeader>
                <div className="h-5 bg-muted rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl mb-4">暂无相关服务</p>
          <Link to="/listings/new">
            <Button>发布第一个服务</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Link key={listing.id} to={`/listings/${listing.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
                  {listing.images?.[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                      🎮
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{CATEGORY_LABELS[listing.category]}</Badge>
                    <span className="text-xs text-muted-foreground">{listing.game}</span>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                    {listing.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-lg font-bold text-primary">
                    ¥{listing.price.toFixed(2)}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
