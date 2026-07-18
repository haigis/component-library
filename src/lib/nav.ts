/**
 * A navigation entry shared by SiteHeader and SiteFooter.
 * `href` renders a real <a>; `onClick` (alone) renders a <button>.
 * Both may be set — e.g. SPA routing with onClick preventDefault.
 */
export type NavItem = {
    id: string
    label: string
    href?: string
    onClick?: () => void
}
