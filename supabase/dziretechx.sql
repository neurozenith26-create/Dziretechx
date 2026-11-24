-- DzireTechX website database setup.
--
-- Everything lives in its own `dziretechx` schema so the site can share a
-- Supabase project with other work without touching that project's tables.
-- It currently runs inside the arogya-diagnostics project. To move to a
-- dedicated project later: run this file there, add `dziretechx` under
-- Project Settings -> Data API -> Exposed schemas, copy the rows across, and
-- change VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. No code change needed.
--
-- Safe to run more than once. Paste into the Supabase SQL editor and run.
--
-- Access rules:
--   * Website visitors (anon) can only ADD a message. They cannot read,
--     change or delete anything, including what they just sent.
--   * Only users listed in dziretechx.admins can read, mark as read or delete
--     messages. Being signed in is not enough, because the auth user list may
--     be shared with another app.

create schema if not exists dziretechx;

-- Contact form messages --------------------------------------------------

create table if not exists dziretechx.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  company    text check (company is null or char_length(company) <= 200),
  message    text not null check (char_length(message) between 1 and 5000),
  status     text not null default 'new' check (status in ('new', 'read')),
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on dziretechx.contact_submissions (created_at desc);

-- Who may read the inbox -------------------------------------------------
-- Add an admin after creating their login (Authentication -> Users):
--   insert into dziretechx.admins (user_id, note)
--   select id, 'DzireTechX admin' from auth.users where email = 'someone@example.com';

create table if not exists dziretechx.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  note       text,
  created_at timestamptz not null default now()
);

-- Runs as the table owner so policies can check the admin list without
-- giving anyone direct access to it.
create or replace function dziretechx.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from dziretechx.admins where user_id = (select auth.uid())
  );
$$;

-- Privileges -------------------------------------------------------------

grant usage on schema dziretechx to anon, authenticated, service_role;

revoke all on all tables in schema dziretechx from anon, authenticated;
grant all on all tables in schema dziretechx to service_role;

grant insert (name, email, company, message, status)
  on dziretechx.contact_submissions to anon, authenticated;
grant select, delete on dziretechx.contact_submissions to authenticated;
grant update (status, read_at) on dziretechx.contact_submissions to authenticated;

revoke all on function dziretechx.is_admin() from public, anon;
grant execute on function dziretechx.is_admin() to authenticated, service_role;

-- Row level security -----------------------------------------------------

alter table dziretechx.contact_submissions enable row level security;
alter table dziretechx.admins enable row level security;
-- dziretechx.admins has no policies on purpose: nobody can read or change it
-- through the API. Manage it from the SQL editor.

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'dziretechx'
                 and tablename = 'contact_submissions'
                 and policyname = 'Visitors can send a message') then
    create policy "Visitors can send a message"
      on dziretechx.contact_submissions for insert
      to anon, authenticated
      with check (status = 'new');
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'dziretechx'
                 and tablename = 'contact_submissions'
                 and policyname = 'Admins can read messages') then
    create policy "Admins can read messages"
      on dziretechx.contact_submissions for select
      to authenticated
      using ((select dziretechx.is_admin()));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'dziretechx'
                 and tablename = 'contact_submissions'
                 and policyname = 'Admins can update messages') then
    create policy "Admins can update messages"
      on dziretechx.contact_submissions for update
      to authenticated
      using ((select dziretechx.is_admin()))
      with check ((select dziretechx.is_admin()));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'dziretechx'
                 and tablename = 'contact_submissions'
                 and policyname = 'Admins can delete messages') then
    create policy "Admins can delete messages"
      on dziretechx.contact_submissions for delete
      to authenticated
      using ((select dziretechx.is_admin()));
  end if;
end
$$;

-- Live updates for the /admin dashboard ----------------------------------

do $$
begin
  if exists (select 1 from pg_publication
             where pubname = 'supabase_realtime' and not puballtables)
     and not exists (select 1 from pg_publication_tables
                     where pubname = 'supabase_realtime'
                       and schemaname = 'dziretechx'
                       and tablename = 'contact_submissions') then
    alter publication supabase_realtime add table dziretechx.contact_submissions;
  end if;
end
$$;

notify pgrst, 'reload schema';
