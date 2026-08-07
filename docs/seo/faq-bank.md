# FAQ Bank — 50 Questions

FAQs earn their place twice: they answer the objection that stops someone
enquiring, and they're eligible for `FAQPage` structured data.

**Two rules, both non-negotiable:**

1. **The answer must be visible on the page.** Google requires the marked-up
   answer to appear in the rendered content. The `<Faq>` component keeps answers
   in the DOM (hidden via the `hidden` attribute, not unmounted) precisely for
   this reason.
2. **No question appears on two pages.** Duplicate FAQ markup across URLs is
   treated as spammy and can suppress the rich result site-wide.

Questions marked ✅ are already implemented. Wire the rest up as their pages land,
via `faqSchema(path, items)` from `src/seo/schema.ts`.

---

## Home — general (`/`)
1. ✅ What exactly do you do?
2. ✅ Where are you based, and do you work remotely?
3. ✅ Are you available for freelance work alongside your job?
4. ✅ What does a project cost?
5. ✅ Are the restaurant sites in your portfolio real clients?
6. ✅ Can you help with an existing website or dashboard?

## Services hub (`/services/`)
7. ✅ Why do you offer both data work and web development?
8. ✅ Do you work with businesses outside Kathmandu?
9. ✅ How do you price projects?
10. ✅ What do you need from me to start?
11. ✅ How long does a project take?
12. ✅ What happens after the project is delivered?

## Data & MIS hub (`/services/data/`)
13. ✅ What is the difference between MIS, business intelligence and business analysis?
14. ✅ Do I need Power BI, or will Excel or Google Sheets do?
15. ✅ My data is a mess. Is it too early to build a dashboard?
16. ✅ Can you take over an existing dashboard someone else built?
17. ✅ Will my team be able to maintain it after you're done?
18. ✅ Do you sign NDAs and handle confidential business data?

## Web hub (`/services/web/`)
19. ✅ How much does a restaurant website cost in Nepal?
20. ✅ Why does website speed matter so much in Nepal?
21. ✅ Can I update the menu and photos myself?
22. ✅ Do I need a website if I already have a Facebook or Instagram page?
23. ✅ Will my website show up on Google Maps?
24. ✅ What about online ordering and delivery apps?
25. ✅ Are the restaurant sites in your portfolio real businesses?

---

## Restaurant websites (`…/restaurant-website-development/`)
26. Do you build online ordering, or just the menu?
27. How do I handle a menu that changes seasonally?
28. Can the site take table reservations without a monthly subscription?
29. What photos do I need before we start?
30. How do I show up when someone searches "restaurant near Thamel"?
31. What happens if I want to add a second branch later?
32. Do you write the menu descriptions, or do I?

## Power BI (`…/power-bi-dashboard-development/`)
33. Do I need to buy Power BI licences, and how much are they?
34. Can the dashboard refresh automatically from our system?
35. Can different people see different data in the same dashboard?
36. What if our data lives in five different places?
37. Can you work with our existing Excel files rather than a database?
38. What do you need access to in order to start?

## Excel & Sheets (`…/excel-automation/`, `…/google-sheets-automation/`)
39. Will the automation break if someone edits the sheet?
40. Can it pull data from our website or a form automatically?
41. Is Google Sheets secure enough for sales data?
42. Can you fix a spreadsheet someone else built?

## MIS consulting (`…/mis-consulting/`)
43. We already have reports. Why would we need this?
44. Do you work on a retainer or per project?
45. Can you train someone on our team to take this over?

## Small business & hotel
46. What's the cheapest way to get a professional website in Nepal?
47. Do I own the website, or are we renting it from you?
48. What happens if I stop paying for maintenance?
49. Can guests book rooms directly, and how do payments work?
50. Can the site be in both English and Nepali?

---

## Writing good FAQ answers

- **40–100 words.** Long enough to be a real answer, short enough to be a snippet.
- **Answer in the first sentence**, then justify. Google lifts the opening.
- **Say the honest thing**, including when the answer costs you the sale. Q14 tells
  the reader they may not need Power BI; Q46 points at the cheap option. That is
  what makes the rest of the page believable — and it converts better than a page
  where every answer is "yes, hire me".
- **Never invent a number.** If pricing depends on scope, say what it depends on.
- **No keyword stuffing.** Write the question the way a customer would say it out
  loud, not the way a keyword tool prints it.
