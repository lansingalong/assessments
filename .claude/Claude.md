# Reference

Always read `wellframe-mobile-library.html` before building or modifying any component.

#File management rules

- When making file changes or adding new files, always save immediately after each change without waiting for confirmation.
- At the start of every session, automatically start the development server and open the project in the browser on localhost.

# Design system rules

Always reference existing design system components before building anything new.

- Check `guidingcare-design-system.html` for existing patterns, components, and CSS classes before creating anything new
- Use CSS custom properties defined in `index.html` `:root` for all color, spacing, and typography values
- Follow the component patterns established in the GuidingCare UI — gc-* class naming convention
- Never hardcode color values — always use the CSS variables (e.g. `var(--teal)`, `var(--border)`)
- If a pattern doesn't exist in the design system, flag it before building and suggest the closest existing component
- Match existing class naming conventions (gc-nav, gc-btn, gc-modal, etc.)

# Accessibility rules

Every component must meet WCAG 2.1 AA standards. Always check for the following before considering a component complete:

- All interactive elements must be keyboard navigable and have visible focus states
- All images and icons must have descriptive alt text or aria-label
- Color contrast must meet minimum ratios — 4.5:1 for normal text, 3:1 for large text and UI components
- Never use color alone to convey meaning — always pair with text or icon
- All form inputs must have associated labels
- Use semantic HTML elements (button, nav, main, etc.) over generic divs where possible
- Dynamic content changes must be announced to screen readers via aria-live regions
- Modal and overlay components must trap focus and return focus on close
- Touch targets must be at least 44x44px
