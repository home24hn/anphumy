@AGENTS.md

# APM Tech — working agreement

`ARCHITECTURE.md` is the Single Source of Truth for this project. Read it before:

- adding a route, page, or admin feature;
- adding a package or changing the stack (Next.js App Router, TypeScript, Tailwind, Supabase — locked, see section 40);
- changing the database schema, RLS policies, or localization strategy;
- expanding `/admin` beyond project management (it is intentionally limited — see section 12 and 37).

If a request conflicts with `ARCHITECTURE.md`, say so before implementing — don't silently change the architecture.

Priorities, in order (section 41): dễ vận hành > an toàn > đơn giản > dễ bảo trì > trải nghiệm admin > performance > dễ mở rộng > visual novelty. Don't over-engineer (section 42).
