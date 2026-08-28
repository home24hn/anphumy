-- APM Tech — Supabase schema (section 17 of ARCHITECTURE.md)
-- Run this once in the Supabase SQL Editor for your project.

create extension if not exists pgcrypto;

-- ============================================================
-- Table: projects
-- ============================================================
create table if not exists public.projects (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  title_vi          text not null,
  title_en          text,
  category          text not null check (category in (
                      'security', 'network', 'access-control', 'elv-maintenance',
                      'solar', 'bess', 'energy-management'
                    )),
  location_vi       text,
  location_en       text,
  year              integer,
  summary_vi        text,
  summary_en        text,
  work_items_vi     jsonb not null default '[]',
  work_items_en     jsonb not null default '[]',
  cover_image_url   text,
  featured          boolean not null default false,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_featured_idx on public.projects (featured);
create index if not exists projects_slug_idx on public.projects (slug);

-- ============================================================
-- Table: project_images
-- ============================================================
create table if not exists public.project_images (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects (id) on delete cascade,
  image_url     text not null,
  caption_vi    text,
  caption_en    text,
  alt_vi        text,
  alt_en        text,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists project_images_project_id_idx on public.project_images (project_id);

-- ============================================================
-- updated_at trigger
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

-- Automatically stamp published_at when a project transitions to published.
create or replace function public.set_published_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and old.status is distinct from 'published' then
    new.published_at = now();
  elsif new.status = 'draft' then
    new.published_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists projects_set_published_at on public.projects;
create trigger projects_set_published_at
  before update on public.projects
  for each row
  execute function public.set_published_at();

drop trigger if exists projects_set_published_at_insert on public.projects;
create trigger projects_set_published_at_insert
  before insert on public.projects
  for each row
  when (new.status = 'published')
  execute function public.set_published_at();

-- ============================================================
-- Row Level Security (section 29)
-- Public: SELECT published projects only.
-- Admin (any authenticated user — accounts are created directly in
-- Supabase Auth, there is no public signup): full CRUD.
-- ============================================================
alter table public.projects enable row level security;
alter table public.project_images enable row level security;

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects"
  on public.projects for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "admin full access projects" on public.projects;
create policy "admin full access projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "public read images of published projects" on public.project_images;
create policy "public read images of published projects"
  on public.project_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_images.project_id and p.status = 'published'
    )
  );

drop policy if exists "admin full access project_images" on public.project_images;
create policy "admin full access project_images"
  on public.project_images for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Storage: bucket for project cover + gallery images (section 21)
-- Path convention: projects/{project-id}/cover/... and
-- projects/{project-id}/gallery/...
-- ============================================================
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

drop policy if exists "public read project images" on storage.objects;
create policy "public read project images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'projects');

drop policy if exists "admin write project images" on storage.objects;
create policy "admin write project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'projects');

drop policy if exists "admin update project images" on storage.objects;
create policy "admin update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'projects');

drop policy if exists "admin delete project images" on storage.objects;
create policy "admin delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'projects');
