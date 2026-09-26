# AayuTatva Website Quality Report

Date: 26 September 2026

## Result

- Automated browser tests: **38 passed, 0 failed**
- Production build: **Passed**
- Pages covered: homepage, treatments, insurance, and height session
- Desktop viewport: 1440 × 900
- Mobile viewports: 320 × 844, 390 × 844, and 430 × 844

## Issues found and fixed

1. **Low contrast supporting text** — Muted labels and supporting copy on all four pages did not consistently meet WCAG AA contrast. Colors were darkened while preserving the forest, linen, and ochre design.
2. **Review rails lacked keyboard access** — Both horizontal review carousels now accept keyboard focus and show a visible focus ring.
3. **Small explanatory text** — Important height guidance, review context, reading sources, and form privacy text were 9–10px. These are now at least 12px with a comfortable line height.
4. **Inconsistent subpage font** — Subpages referenced Inter without loading it. All pages now use the loaded DM Sans body font and Playfair Display/Georgia headings.
5. **Missing favicon** — The browser generated a 404 request. The AayuTatva logo is now configured as the favicon.
6. **Several gold numeric labels had insufficient contrast** — Treatment numbers, process steps, and value labels now use a darker accessible ochre.
7. **Ambiguous navigation test selector** — The test now scopes the mobile “Book consultation” assertion to the navigation menu.
8. **Subpage navigation overlapped hero content on mobile** — The mobile subpage header now reserves space for both navigation rows, so overlines and headings are not clipped.
9. **Height-session consent checkbox stacked incorrectly** — The checkbox and consent copy now align in one readable row.
10. **320px viewport overflow** — The fixed body minimum width was removed and the narrow navigation label was compacted.

## Automated test cases

### Routing and structure

1. Homepage renders with one visible H1.
2. Treatments page renders with one visible H1.
3. Insurance page renders with one visible H1.
4. Height page renders with one visible H1.
5. Homepage headings do not skip levels.
6. Treatments headings do not skip levels.
7. Insurance headings do not skip levels.
8. Height headings do not skip levels.
9. Document title, language, and description metadata are present.

### Accessibility and readability

10. Homepage has no serious or critical WCAG violations.
11. Treatments page has no serious or critical WCAG violations.
12. Insurance page has no serious or critical WCAG violations.
13. Height page has no serious or critical WCAG violations.
14. Key reading text is at least 12px with adequate line height.
15. Primary mobile controls meet the 44px touch target requirement.
16. Keyboard focus is visible.
17. Form controls have associated labels.
18. Name and phone fields provide autocomplete metadata.
19. Required fields expose their required state.

### Responsive layout and assets

20. Homepage has no horizontal overflow at 390px.
21. Treatments page has no horizontal overflow at 390px.
22. Insurance page has no horizontal overflow at 390px.
23. Height page has no horizontal overflow at 390px.
24. Homepage images load successfully.
25. Treatments images load successfully.
26. Insurance images load successfully.
27. Height page images load successfully.
28. Doctor portrait crops remain centered.
29. Six insurer logo cards are present.
30. NABH accreditation image is visible and loaded.

### Interaction and motion

31. Reduced-motion preference suppresses animations and transitions.
32. Hero carousel manual controls change slides.
33. Review carousel controls move the review rail.
34. Desktop navigation exposes core destinations.
35. Mobile navigation opens and exposes core actions.
36. Appointment dates cannot be selected in the past.

### Content and security hygiene

37. Height page includes Dr. Manish, the growth graphic, five reviews, and the registration form.
38. New-tab links prevent opener access, phone and WhatsApp destinations are valid, placeholder language is absent, and all routes render without console errors.

## Commands

```bash
npm run test:quality -- --workers=2
npm run build
```
