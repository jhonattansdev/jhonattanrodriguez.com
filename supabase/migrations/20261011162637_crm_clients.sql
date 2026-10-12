create table clients (
  id uuid primary key default gen_random_uuid(),
  client_code text not null unique,
  name text not null,
  objective text,
  phone text,
  email text,
  location text,
  role text,
  niche text,
  stage text not null default 'prospecto',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table client_objective_history (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  objective text not null,
  changed_at timestamptz not null default now()
);

create table client_payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  plan_id text not null,
  currency text not null check (currency in ('COP', 'USD')),
  amount numeric not null check (amount > 0),
  exchange_rate numeric,
  amount_usd numeric not null check (amount_usd > 0),
  payment_method text,
  paid_at date not null default current_date,
  created_at timestamptz not null default now()
);

create index client_objective_history_client_id_idx on client_objective_history(client_id);
create index client_payments_client_id_idx on client_payments(client_id);

alter table clients enable row level security;
alter table client_objective_history enable row level security;
alter table client_payments enable row level security;

-- Sin políticas a propósito: deny-all para los roles `anon`/`authenticated`.
-- Todo el acceso real de la app pasa por el cliente con la secret key
-- (lib/supabase/admin.ts, server-only), que ignora RLS. Esto es defensa en
-- profundidad, no el mecanismo de control de acceso.
