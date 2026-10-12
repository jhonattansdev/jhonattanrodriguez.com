create table client_sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  session_number int not null,
  session_date date not null,
  comments text,
  reto text,
  duration_minutes int,
  created_at timestamptz not null default now()
);

create index client_sessions_client_id_idx on client_sessions(client_id);

alter table client_sessions enable row level security;
-- Mismo criterio que las demás tablas del CRM: sin políticas (deny-all para
-- anon/authenticated), el acceso real pasa por lib/supabase/admin.ts.
