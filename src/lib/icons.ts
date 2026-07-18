import type * as React from "react"
import {
    ArrowRight,
    BookOpen,
    Calendar,
    Check,
    ChevronRight,
    CircleAlert,
    CircleCheck,
    Clock,
    Code,
    Compass,
    Database,
    Download,
    ExternalLink,
    Eye,
    FileText,
    Filter,
    Folder,
    Globe,
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
    Pencil,
    Phone,
    Play,
    Rocket,
    Search,
    Send,
    Settings,
    Share2,
    ShieldCheck,
    Sparkles,
    Star,
    Tag,
    TrendingUp,
    Trash2,
    User,
    Users,
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
    "book-open": BookOpen,
    calendar: Calendar,
    check: Check,
    "check-circle": CircleCheck,
    "chevron-right": ChevronRight,
    clock: Clock,
    code: Code,
    compass: Compass,
    database: Database,
    download: Download,
    "external-link": ExternalLink,
    eye: Eye,
    "file-text": FileText,
    filter: Filter,
    folder: Folder,
    globe: Globe,
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
    pencil: Pencil,
    phone: Phone,
    play: Play,
    rocket: Rocket,
    search: Search,
    send: Send,
    settings: Settings,
    share: Share2,
    "shield-check": ShieldCheck,
    sparkles: Sparkles,
    star: Star,
    tag: Tag,
    trash: Trash2,
    "trending-up": TrendingUp,
    user: User,
    users: Users,
    wrench: Wrench,
    x: X,
    zap: Zap,
} as const

export type IconName = keyof typeof iconRegistry

export type IconComponent = React.ComponentType<{ className?: string }>

/** Either a registry name (CMS-friendly) or a component (code-friendly). */
export type IconProp = IconName | IconComponent

/** All registry names — handy for building CMS select-field options. */
export const iconNames = Object.keys(iconRegistry) as IconName[]

export function resolveIcon(icon: IconProp): IconComponent {
    return typeof icon === "string" ? iconRegistry[icon] : icon
}
