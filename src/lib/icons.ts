import type * as React from "react"
import {
    ArrowRight,
    Battery,
    BookOpen,
    Calendar,
    Check,
    ChevronRight,
    CircleAlert,
    CircleCheck,
    Clock,
    Code,
    Compass,
    CreditCard,
    Database,
    Download,
    ExternalLink,
    Eye,
    FileText,
    Filter,
    Folder,
    Globe,
    Headphones,
    Heart,
    House,
    Image,
    Info,
    Layers,
    Lightbulb,
    Link,
    Lock,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Package,
    Paintbrush,
    Pencil,
    Phone,
    Play,
    RefreshCcw,
    Rocket,
    Search,
    Send,
    Settings,
    Share2,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Star,
    Tag,
    TrendingUp,
    Trash2,
    User,
    Users,
    Volume2,
    Wrench,
    X,
    Zap,
} from "lucide-react"

/**
 * Icons addressable by name, so icon choices can be stored as plain strings
 * (e.g. in a CMS select field) instead of component references.
 */
export const iconRegistry = {
    "alert-circle": CircleAlert,
    "arrow-right": ArrowRight,
    battery: Battery,
    "book-open": BookOpen,
    calendar: Calendar,
    check: Check,
    "check-circle": CircleCheck,
    "chevron-right": ChevronRight,
    clock: Clock,
    code: Code,
    compass: Compass,
    "credit-card": CreditCard,
    database: Database,
    download: Download,
    "external-link": ExternalLink,
    eye: Eye,
    "file-text": FileText,
    filter: Filter,
    folder: Folder,
    globe: Globe,
    headphones: Headphones,
    heart: Heart,
    home: House,
    image: Image,
    info: Info,
    layers: Layers,
    lightbulb: Lightbulb,
    link: Link,
    lock: Lock,
    mail: Mail,
    "map-pin": MapPin,
    menu: Menu,
    "message-circle": MessageCircle,
    package: Package,
    paintbrush: Paintbrush,
    pencil: Pencil,
    phone: Phone,
    play: Play,
    "refresh-ccw": RefreshCcw,
    rocket: Rocket,
    search: Search,
    send: Send,
    settings: Settings,
    share: Share2,
    "shield-check": ShieldCheck,
    "shopping-cart": ShoppingCart,
    sparkles: Sparkles,
    star: Star,
    tag: Tag,
    trash: Trash2,
    "trending-up": TrendingUp,
    user: User,
    users: Users,
    volume: Volume2,
    wrench: Wrench,
    x: X,
    zap: Zap,
} as const

export type IconName = keyof typeof iconRegistry

export type IconComponent = React.ComponentType<{
    className?: string
    "aria-hidden"?: boolean | "true"
    "aria-label"?: string
    focusable?: "false"
    role?: "img"
}>

/** Either a registry name (CMS-friendly) or a component (code-friendly). */
export type IconProp = IconName | IconComponent

/** All registry names — handy for building CMS select-field options. */
export const iconNames = Object.keys(iconRegistry) as IconName[]

export function resolveIcon(icon: IconProp): IconComponent {
    return typeof icon === "string" ? iconRegistry[icon] : icon
}
