# AVA HOUSE Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 7-page static NDIS provider website for AVA HOUSE with referral form, deployed to Cloudflare Pages.

**Architecture:** Static HTML + Tailwind CSS (CDN), no build step. Each page is a standalone `.html` file sharing a common nav/footer pattern. One Cloudflare Pages Function handles referral form submission (Resend email + Supabase storage). Logo PNG served from `/public/`.

**Tech Stack:** HTML5, Tailwind CSS (CDN v3), Google Fonts (DM Serif Display + Plus Jakarta Sans), Cloudflare Pages, Cloudflare Pages Functions (JS), Resend API, Supabase.

---

### Task 1: Project Scaffolding + Git Init

**Files:**
- Create: `~/ava-house/.gitignore`
- Create: `~/ava-house/public/logo.png` (copy from Desktop)

**Step 1: Initialize git repo**

```bash
cd ~/ava-house
git init
```

**Step 2: Create .gitignore**

```
node_modules/
.env
.wrangler/
.DS_Store
```

**Step 3: Copy logo to public directory**

```bash
mkdir -p ~/ava-house/public
cp "/mnt/c/Users/tasig/OneDrive/Desktop/ava house logo.png" ~/ava-house/public/logo.png
```

**Step 4: Initial commit**

```bash
git add .gitignore public/logo.png
git commit -m "chore: project scaffolding with logo"
```

---

### Task 2: Home Page (index.html)

This is the foundation page — all other pages will replicate its nav/footer/head pattern.

**Files:**
- Create: `~/ava-house/index.html`

**Step 1: Create index.html with full page structure**

The page includes:
- `<head>`: Tailwind CDN, Google Fonts, meta tags, JSON-LD Organisation schema
- Sticky nav: logo left, links right (Home, About Us dropdown [Our Story, The Why], Our Approach, Services & Programs dropdown [Youth Programs], Contact Us, Make a Referral CTA button)
- Mobile hamburger menu (JS toggle)
- Hero section: heading "Preparing children, young adults for Independence" + subheading "Safe, nurturing, and future-focused care" + logo + CTA button
- Services section: 4 cards (Community Access, SIL, In-Home Support, Daily Living & Life Skills) with icons
- Care Model section: 5 pillars overview (Emotional, Practical, Cultural, Spiritual, Educational) with colored icons
- CTA banner: "Make a Referral" call-to-action
- Footer: logo, menu links, contact info, copyright "2025 A4 Solutions", Website Terms, Privacy Policy

**Color tokens to use throughout:**
- `bg-[#1A5632]` — Forest Green (nav, footer, primary buttons)
- `bg-[#0E3B22]` — Deep Green (hover states)
- `text-[#C5A028]` / `bg-[#C5A028]` — Rich Gold (accents, CTAs, icons)
- `bg-[#F5E6B8]` — Light Gold (subtle backgrounds)
- `bg-[#FAF8F0]` — Warm Cream (page background)
- `text-[#1A1A1A]` — Dark text

**Typography:**
- Headings: `font-['DM_Serif_Display']`
- Body: `font-['Plus_Jakarta_Sans']`

**Step 2: Open in browser to verify**

```bash
xdg-open ~/ava-house/index.html 2>/dev/null || echo "Open ~/ava-house/index.html in browser"
```

Verify: Nav renders with logo + links, hero section visible, 4 service cards, 5 care model pillars, CTA banner, footer. Mobile hamburger works.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: home page with nav, hero, services, care model, footer"
```

---

### Task 3: Our Story Page

**Files:**
- Create: `~/ava-house/our-story.html`

**Step 1: Create our-story.html**

Copy nav/footer/head from index.html. Content section:
- `<h1>` "Our Story"
- Full narrative paragraphs (from PDF content below)
- Logo image beside text on desktop (grid layout), stacked on mobile

**Content to include:**
> Ava House was born from a vision to give young people leaving care a real chance at a better future.
>
> Too many young people stepping out of care at 18 with no stable housing, no job, and no connection to who they are. Many, especially from Pacific Island and multicultural backgrounds, were missing the strong cultural and community support that helps guide and ground them through life.
>
> Ava House was created to fill that gap to be the village that raises, equips, and stands beside our young people.
>
> We understand that some of our young people come from deeply painful experiences, including trauma and abuse that have affected their sense of safety, identity, and trust. Our team provides genuine, trauma-informed, and culturally safe care, creating a space where healing, belonging, and hope can begin.
>
> Our approach is holistic addressing the whole person: mind, body, spirit, and culture. We honour our Pacific Island values of family, faith, and respect, offering care that restores dignity and builds resilience.
>
> At Ava House, we don't just provide a place to stay we build pathways to independence, stability, and pride.
>
> Because every young person deserves to learn today to survive tomorrow and to leave care culturally grounded, future ready.

**Step 2: Verify in browser**

Check: nav links work (especially Home link back), content readable, logo positioned correctly, mobile layout stacks.

**Step 3: Commit**

```bash
git add our-story.html
git commit -m "feat: our story page"
```

---

### Task 4: The Why Page

**Files:**
- Create: `~/ava-house/the-why.html`

**Step 1: Create the-why.html**

Copy nav/footer/head pattern. Content section:
- `<h1>` "The WHY"
- Stat highlight: "Over 60% of young people leaving care experience homelessness or unemployment within two years"
- Mission paragraphs (from PDF content below)

**Content to include:**
> Across Queensland, over 60% of young people leaving care experience homelessness or unemployment within two years. Many programs focus only on accommodation, leaving young people without the tools they need for adult life.
>
> Our WHY is simple: we believe every young person deserves the opportunity to thrive. That means leaving AVA House with a job or training, housing readiness, a driver's licence, financial literacy, and the confidence to stand independently.

**Design:** Feature the 60% statistic prominently — large gold number with green text, making it an impactful visual element.

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add the-why.html
git commit -m "feat: the why page with statistics"
```

---

### Task 5: Our Approach / Care Model Page

**Files:**
- Create: `~/ava-house/our-approach.html`

**Step 1: Create our-approach.html**

Copy nav/footer/head pattern. Content:
- `<h1>` "Our Care Model"
- Intro paragraph: "At AVA House, our care model is built on the belief that every young person deserves to heal, grow, and thrive in a supportive, culturally grounded environment. Our holistic framework blends Cultural, Spiritual, Emotional, Practical, and Educational care — nurturing identity, faith, resilience, and independence."
- 5 pillar cards, each with icon, title, and description:

1. **Emotional Care — Healing through Understanding**
   We provide trauma-informed and compassionate care that fosters emotional safety and trust. Through consistent relationships and understanding, young people begin to rebuild confidence and find their voice.

2. **Practical Care — Preparing for Independence**
   We help young people build everyday life skills, pursue education, and develop the confidence to transition into independent living. This includes hands-on training, mentoring, and lifelong learning opportunities.

3. **Cultural Care — Strength in Identity**
   We reconnect young people with their cultural roots, traditions, and community. By strengthening identity and belonging, we create a sense of pride and connection that supports long-term wellbeing.

4. **Spiritual Care — Guided by Faith and Hope**
   Faith-based supports offer a space for reflection, prayer, and connection to ancestral wisdom. We honour diverse spiritual journeys, providing guidance through faith and a sense of purpose for the future.

5. **Educational Care — Learning for Life**
   We believe education is empowerment. Our team supports school engagement, vocational training, and pathways to employment — equipping young people with tools to shape their own future.

- CSS house/umbrella visual: recreate the care model house diagram using CSS (the umbrella roof with Cultural + Spiritual Care on top, Emotional + Practical Care in the middle walls, Educational + Practical Care as the foundation). Use `bg-[#C5A028]` for the roof, `bg-[#1A5632]` for the walls, `bg-[#8B9E6B]` for the foundation.

**Step 2: Verify in browser**

Check: 5 pillars render with correct icons/colors, house visual looks reasonable, mobile stacks properly.

**Step 3: Commit**

```bash
git add our-approach.html
git commit -m "feat: our approach page with care model pillars and house visual"
```

---

### Task 6: Youth Programs Page

**Files:**
- Create: `~/ava-house/youth-programs.html`

**Step 1: Create youth-programs.html**

Copy nav/footer/head pattern. Content:
- `<h1>` "Youth Programs"
- Subtitle: "Our programs are designed to prepare young people aged 14–18 for adulthood."
- "Program Benefits" section with 6 cards in a 3x2 grid (2x3 on tablet, 1x6 on mobile):

1. **Residential Care** — Safe and nurturing environment with trauma-informed staff.
2. **Education & Employment Pathways** — Tutoring, TAFE access, apprenticeships, and local employer partnerships.
3. **Housing Readiness** — Tenancy training, bond savings, and rental support.
4. **Driver's Licence Program** — From learners through to provisional licences.
5. **Life Skills Training** — Cooking, cleaning, financial literacy, communication.
6. **Cultural & Pastoral Care** — Faith and cultural programs to strengthen identity and resilience.

- Banner: "Program can be customised — Can be designed to suit the need of the children and young people being supported with a FEE FOR Service Model available." + Contact Us CTA button

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add youth-programs.html
git commit -m "feat: youth programs page with 6 program cards"
```

---

### Task 7: Contact Us Page

**Files:**
- Create: `~/ava-house/contact.html`

**Step 1: Create contact.html**

Copy nav/footer/head pattern. Content:
- `<h1>` "Contact Us"
- Contact info cards: phone, email, address (Brisbane QLD — leave placeholder if unknown)
- Map embed placeholder (optional)
- Link to referral form: "Need to make a referral? Use our referral form →"

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: contact us page"
```

---

### Task 8: Make a Referral Page (Form HTML)

**Files:**
- Create: `~/ava-house/referral.html`

**Step 1: Create referral.html**

Copy nav/footer/head pattern. Content:
- `<h1>` "Make a Referral"
- Multi-section form with styled Tailwind inputs:

**Section 1 — Referrer Information:**
- Full Name (required, text)
- Organisation (text)
- Role/Position (text)
- Email (required, email)
- Phone (required, tel)

**Section 2 — Young Person Details:**
- Full Name (required, text)
- Age / Date of Birth (text)
- Gender (select: Male, Female, Non-binary, Prefer not to say)
- Cultural Background (text)
- NDIS Number (text, optional)
- Funding Type (select: NDIS, Statutory Care, Justice-funded, Other)

**Section 3 — Referral Details:**
- Support Type Needed (checkboxes): Community Access, Supported Independent Living (SIL), In-Home Support, Daily Living & Life Skills, Youth Programs, Cultural & Pastoral Care
- Current Living Situation (textarea)
- Reason for Referral (required, textarea)
- Urgency (radio: Routine, Urgent, Crisis)

**Section 4 — Additional:**
- File upload for supporting documents (accept: .pdf,.doc,.docx,.jpg,.png)
- Consent checkbox (required): "I confirm I have consent to share this information and that the details provided are accurate to the best of my knowledge."
- Submit button: "Submit Referral"

Form `action="/api/referral"` `method="POST"` with JS fetch handler for async submission.

**JavaScript at bottom of page:**
- Form submit handler: preventDefault, collect FormData, POST to `/api/referral`, show success/error message, disable button during submission.

**Step 2: Verify in browser**

Check: all form fields render, validation works (required fields), mobile layout is touch-friendly (large inputs/buttons).

**Step 3: Commit**

```bash
git add referral.html
git commit -m "feat: make a referral form page"
```

---

### Task 9: Cloudflare Pages Function — Referral API

**Files:**
- Create: `~/ava-house/functions/api/referral.js`
- Create: `~/ava-house/.dev.vars` (local env, gitignored)

**Step 1: Add .dev.vars to .gitignore**

Append `.dev.vars` to `.gitignore`.

**Step 2: Create .dev.vars with placeholder secrets**

```
RESEND_API_KEY=re_xxxxx
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxx
```

**Step 3: Create the Pages Function**

`functions/api/referral.js`:

```javascript
export async function onRequestPost(context) {
  // 1. Parse form data
  // 2. Validate required fields (referrer name, email, phone, young person name, reason, consent)
  // 3. Send email via Resend to both addresses
  //    - margswork2214@gmail.com
  //    - tasigale68@gmail.com
  //    - From: AVA HOUSE Referrals <referrals@avahouse.com.au> (or noreply)
  //    - Subject: "New Referral: [Young Person Name] — [Urgency]"
  //    - HTML body: formatted referral details
  // 4. Save to Supabase referrals table
  // 5. Return JSON { success: true } or { success: false, error: "..." }
}
```

**Resend API call:** Use `fetch('https://api.resend.com/emails', { ... })` — no npm packages needed.

**Supabase insert:** Use `fetch(SUPABASE_URL + '/rest/v1/referrals', { ... })` with `apikey` and `Authorization` headers (explicit headers, not spread — per your Supabase header gotcha).

**CORS headers:** Add `Access-Control-Allow-Origin: *` for the response, plus handle OPTIONS preflight.

**Step 4: Test locally**

```bash
cd ~/ava-house
npx wrangler pages dev . --port 8788
```

Open `http://localhost:8788/referral.html`, fill form, submit. Check console for errors.

**Step 5: Commit**

```bash
git add functions/api/referral.js .gitignore
git commit -m "feat: referral API pages function (Resend + Supabase)"
```

---

### Task 10: SEO Files

**Files:**
- Create: `~/ava-house/robots.txt`
- Create: `~/ava-house/sitemap.xml`

**Step 1: Create robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://ava-house.pages.dev/sitemap.xml
```

**Step 2: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://ava-house.pages.dev/</loc><priority>1.0</priority></url>
  <url><loc>https://ava-house.pages.dev/our-story</loc><priority>0.8</priority></url>
  <url><loc>https://ava-house.pages.dev/the-why</loc><priority>0.8</priority></url>
  <url><loc>https://ava-house.pages.dev/our-approach</loc><priority>0.8</priority></url>
  <url><loc>https://ava-house.pages.dev/youth-programs</loc><priority>0.8</priority></url>
  <url><loc>https://ava-house.pages.dev/contact</loc><priority>0.7</priority></url>
  <url><loc>https://ava-house.pages.dev/referral</loc><priority>0.9</priority></url>
</urlset>
```

**Step 3: Commit**

```bash
git add robots.txt sitemap.xml
git commit -m "feat: SEO files — robots.txt and sitemap.xml"
```

---

### Task 11: Deploy to Cloudflare Pages

**Step 1: Create GitHub repo**

```bash
cd ~/ava-house
gh repo create tasigale68/ava-house --public --source=. --push
```

**Step 2: Create Cloudflare Pages project**

```bash
cd ~/ava-house
npx wrangler pages project create ava-house --production-branch main
```

**Step 3: Deploy**

```bash
npx wrangler pages deploy . --project-name ava-house
```

**Step 4: Set environment secrets in Cloudflare dashboard**

Via CLI or dashboard, set for production:
- `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

**Step 5: Verify deployment**

Open `https://ava-house.pages.dev` — check all pages load, nav works, referral form submits.

**Step 6: Commit any deployment config**

```bash
git add -A
git commit -m "chore: deployment configuration"
```

---

### Task 12: Supabase Setup (Referrals Table)

**Step 1: Create referrals table**

Run SQL in Supabase (choose existing project or create new one):

```sql
CREATE TABLE referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Referrer
  referrer_name TEXT NOT NULL,
  referrer_organisation TEXT,
  referrer_role TEXT,
  referrer_email TEXT NOT NULL,
  referrer_phone TEXT NOT NULL,
  -- Young Person
  young_person_name TEXT NOT NULL,
  young_person_age TEXT,
  young_person_gender TEXT,
  cultural_background TEXT,
  ndis_number TEXT,
  funding_type TEXT,
  -- Referral Details
  support_types TEXT[], -- array of selected support types
  current_living_situation TEXT,
  reason_for_referral TEXT NOT NULL,
  urgency TEXT DEFAULT 'routine', -- routine, urgent, crisis
  -- Additional
  document_url TEXT,
  consent_given BOOLEAN DEFAULT false,
  -- Metadata
  status TEXT DEFAULT 'new', -- new, reviewed, accepted, declined
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon key (form submissions)
CREATE POLICY "Allow anonymous inserts" ON referrals
  FOR INSERT WITH CHECK (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER referrals_updated_at
  BEFORE UPDATE ON referrals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**Step 2: Note Supabase URL + anon key**

Get from Supabase dashboard → Settings → API. Update `.dev.vars` and Cloudflare Pages env vars.

**Step 3: Test insert**

Submit a test referral through the live form. Verify row appears in Supabase table editor.

---

## Task Dependencies

```
Task 1 (scaffolding) → Task 2 (home page, establishes nav/footer pattern)
Task 2 → Tasks 3-8 (all pages copy from index.html pattern, can be parallelized)
Task 8 (referral form) → Task 9 (API function)
Task 9 → Task 12 (Supabase table needed for API)
Task 10 (SEO) — independent
Task 11 (deploy) — after all pages + API complete
```

**Parallelizable:** Tasks 3, 4, 5, 6, 7 can all be built simultaneously after Task 2.

---

## Notes for Implementer

- **Logo file:** `public/logo.png` — the new circular emblem with thatched-roof house, golden path, wheat branches
- **No build step:** Tailwind via CDN `<script src="https://cdn.tailwindcss.com"></script>` — in production consider switching to Tailwind CLI for smaller bundle
- **Nav dropdowns:** Pure CSS/JS, no framework needed. "About Us" dropdown contains Our Story + The Why. "Service & Programs" dropdown contains Youth Programs.
- **Mobile nav:** Hamburger icon toggles a full-height slide-in menu
- **Resend from address:** Use `onboarding@resend.dev` until a custom domain is verified in Resend
- **Supabase headers gotcha:** Always use explicit `Authorization` header objects, not spread — this is a known issue from Valencia AI
- **Form file upload:** For MVP, skip file upload in the API (just capture text fields). File upload can be added later with Supabase Storage.
- **Copyright:** "© 2025 A4 Solutions All rights reserved."
