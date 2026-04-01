#Reference
Always read wellframe-mobile-library.html before building or modifying any component. Do not proceed with any UI work until this file has been read.

#File management rules
Save immediately after every file change — do not batch or wait for confirmation
At the start of every session, start the development server and open the project in the browser on localhost
If the dev server is already running, do not start a second instance

#Design system rules
Always reference existing design system components before building anything new. Do not invent patterns.

Check wellframe-mobile-library.html for existing patterns, components, and CSS classes before creating anything new
Use CSS custom properties defined in index.html :root for all color, spacing, and typography values
Follow the gc-* class naming convention (e.g. gc-nav, gc-btn, gc-modal)
Never hardcode color, spacing, or typography values — always use CSS variables (e.g. var(--teal), var(--border))
If a pattern doesn't exist in the design system, stop and flag it before building — suggest the closest existing component and ask before proceeding
Never create a new CSS class if an existing one can be reused or extended

#Accessibility rules
Every component must meet WCAG 2.1 AA before it is considered complete. Check all of the following:
All interactive elements must be keyboard navigable with visible focus states
All images and icons must have descriptive alt text or aria-label
Color contrast must meet minimum ratios — 4.5:1 for normal text, 3:1 for large text and UI components
Never use color alone to convey meaning — always pair with text or an icon
All form inputs must have associated <label> elements
Use semantic HTML elements (button, nav, main, header, etc.) over generic div and span where possible
Dynamic content changes must be announced to screen readers via aria-live regions
Modals and overlays must trap focus on open and return focus to the trigger element on close
All touch targets must be at least 44×44px