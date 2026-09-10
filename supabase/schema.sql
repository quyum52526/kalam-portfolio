-- Run once in the Supabase SQL editor (Project → SQL Editor → New query) for the /admin
-- content-upload CMS. Mirrors the shape lib/cms.ts's CmsEntryRow expects.

create table if not exists cms_entries (
  id uuid primary key default gen_random_uuid(),
  page_id text not null check (
    page_id in ('motion-reels', 'ai-generative', 'branding-visuals', 'web-experiences')
  ),
  -- Which PortfolioCategory group this item belongs to on its page — either an existing
  -- group's id/name (e.g. "logo-design" / "Logo Design") picked from the admin form's dropdown,
  -- or a brand-new custom section name typed there. Matched against the static
  -- data/portfolio/*.ts groups at render time by lib/cms.ts's resolveGroupForPage — see there
  -- for why this is stored as free text rather than a foreign key.
  group_id text not null default '',
  title text not null,
  description text,
  tags text[] not null default '{}',
  youtube_url text,
  image_path text,
  live_url text,
  details_text text,
  created_at timestamptz not null default now()
);

-- Safe to re-run on a table created before group_id existed.
alter table cms_entries add column if not exists group_id text not null default '';

create index if not exists cms_entries_page_id_idx on cms_entries (page_id);

-- All reads/writes go through the server-only Supabase service-role key (lib/supabase.ts),
-- never the anon key, so Row Level Security stays enabled with no policies — the service role
-- bypasses RLS entirely, and this keeps the table inaccessible to anon/public API callers.
alter table cms_entries enable row level security;

-- Storage bucket for branding-visuals / web-experiences image uploads. `public: true` so the
-- site's plain <img> tags (ItemCard.tsx) can load images directly, same as this project's other
-- remote thumbnails (e.g. i.ytimg.com) — writes still require the service-role key.
insert into storage.buckets (id, name, public)
values ('cms-uploads', 'cms-uploads', true)
on conflict (id) do nothing;
