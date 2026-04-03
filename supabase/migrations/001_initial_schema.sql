-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  avatar_url text,
  bio text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Listings table
create table if not exists public.listings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  category text check (category in ('rental', 'trade', 'companion', 'boost')) not null,
  game text not null,
  price numeric(10, 2) not null check (price >= 0),
  currency text default 'CNY' not null,
  status text check (status in ('active', 'inactive', 'sold')) default 'active' not null,
  images text[] default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Orders table
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete restrict not null,
  buyer_id uuid references public.profiles(id) on delete restrict not null,
  seller_id uuid references public.profiles(id) on delete restrict not null,
  status text check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'disputed')) default 'pending' not null,
  amount numeric(10, 2) not null check (amount >= 0),
  currency text default 'CNY' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Messages table
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now() not null
);

-- Row Level Security policies
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.orders enable row level security;
alter table public.messages enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Listings policies
create policy "Active listings are viewable by everyone"
  on public.listings for select using (status = 'active' or auth.uid() = user_id);

create policy "Authenticated users can create listings"
  on public.listings for insert with check (auth.uid() = user_id);

create policy "Users can update own listings"
  on public.listings for update using (auth.uid() = user_id);

create policy "Users can delete own listings"
  on public.listings for delete using (auth.uid() = user_id);

-- Orders policies
create policy "Users can view their own orders"
  on public.orders for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Authenticated users can create orders"
  on public.orders for insert with check (auth.uid() = buyer_id);

create policy "Order parties can update orders"
  on public.orders for update using (auth.uid() = buyer_id or auth.uid() = seller_id);

-- Messages policies
create policy "Conversation participants can view messages"
  on public.messages for select using (auth.uid() = sender_id);

create policy "Authenticated users can send messages"
  on public.messages for insert with check (auth.uid() = sender_id);

-- Indexes for performance
create index if not exists listings_category_idx on public.listings(category);
create index if not exists listings_status_idx on public.listings(status);
create index if not exists listings_user_id_idx on public.listings(user_id);
create index if not exists orders_buyer_id_idx on public.orders(buyer_id);
create index if not exists orders_seller_id_idx on public.orders(seller_id);
create index if not exists messages_conversation_id_idx on public.messages(conversation_id);

-- Updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_listings_updated_at
  before update on public.listings
  for each row execute procedure public.handle_updated_at();

create trigger handle_orders_updated_at
  before update on public.orders
  for each row execute procedure public.handle_updated_at();
