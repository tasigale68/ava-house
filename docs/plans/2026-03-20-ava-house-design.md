# AVA HOUSE Website Design

**Date:** 2026-03-20
**Status:** Approved

## Overview
New website for AVA HOUSE — Brisbane-based NDIS provider supporting children and young adults (14-18) leaving care, preparing for independence. Focus on Pacific Island and multicultural backgrounds. Statutory care, NDIS, and Justice-funded young people across Queensland.

**Tagline:** "Building Stronger Placements, Brighter Futures"

## Architecture
- **Stack:** Static HTML + Tailwind CSS (CDN), multi-page
- **Hosting:** Cloudflare Pages (`ava-house.pages.dev`)
- **Form handling:** Cloudflare Pages Function (`/functions/api/referral.js`)
- **Email:** Resend → margswork2214@gmail.com + tasigale68@gmail.com
- **Database:** Supabase (referrals table, for future Titus CRM integration)
- **Project directory:** `~/ava-house`

## Color Scheme (from new logo)
| Token | Hex | Usage |
|-------|-----|-------|
| Forest Green | `#1A5632` | Headers, nav, buttons, footer |
| Deep Green | `#0E3B22` | Hover states, dark accents |
| Rich Gold | `#C5A028` | Accents, CTAs, highlights, icons |
| Light Gold | `#F5E6B8` | Subtle backgrounds, card borders |
| Warm Cream | `#FAF8F0` | Page backgrounds |
| White | `#FFFFFF` | Cards, content areas |
| Dark Text | `#1A1A1A` | Body text |

## Typography
- **Headings:** DM Serif Display
- **Body:** Plus Jakarta Sans

## Pages (7 HTML files)

### 1. index.html — Home
- Hero: tagline + new logo + CTA
- Services overview (4 cards: Community Access, SIL, In-Home Support, Daily Living)
- Care Model summary (5 pillars with icons)
- CTA banner → Make a Referral

### 2. our-story.html — Our Story
- Full narrative text from current site
- Logo beside text

### 3. the-why.html — The Why
- Statistics + mission statement

### 4. our-approach.html — Our Care Model
- 5 pillars detailed (Emotional, Practical, Cultural, Spiritual, Educational)
- House diagram visual (CSS recreation of umbrella/house model)

### 5. youth-programs.html — Youth Programs
- 6 program cards (Residential Care, Education & Employment, Housing Readiness, Driver's Licence, Life Skills, Cultural & Pastoral)
- "Programs can be customised" banner + CTA

### 6. contact.html — Contact Us
- Basic contact info display

### 7. referral.html — Make a Referral
- **Referrer:** Name, organisation, role, email, phone
- **Young Person:** Name, age/DOB, gender, cultural background, NDIS number (optional), funding type (NDIS/Statutory/Justice/Other)
- **Referral Details:** Support type needed (checkboxes), current living situation, reason for referral, urgency (routine/urgent/crisis)
- **Additional:** File upload, consent checkbox

## Shared Components
- **Nav:** Sticky top, logo left, links right, mobile hamburger menu
- **Footer:** Logo, menu links, contact info, "2025 A4 Solutions", Website Terms, Privacy Policy
- **Mobile:** Fully responsive, hamburger nav, stacked cards, touch-friendly inputs

## Cloudflare Pages Function
- `functions/api/referral.js` — POST handler
  - Validates form data
  - Sends formatted email via Resend to both addresses
  - Saves to Supabase `referrals` table
  - Returns success/error JSON

## SEO
- Semantic HTML5
- Meta titles + descriptions per page
- Open Graph tags
- JSON-LD Organisation schema
- `robots.txt` + `sitemap.xml`

## Future
- Plug referrals into titus-crm.com
- Custom domain (avahouse.com.au or similar)
