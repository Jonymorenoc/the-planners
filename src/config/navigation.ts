import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users2,
  PlaneTakeoff,
  BedDouble,
  FileText,
  Table,
  Images,
  Share2,
  Sparkles,
  PiggyBank,
  Link as LinkIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  description?: string;
};

export const plannerNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    accent: "bg-[#FDE8E4]",
  },
  {
    label: "Invitados",
    href: "/guests",
    icon: Users2,
    accent: "bg-[#E6F5F1]",
  },
  {
    label: "Vuelos",
    href: "/flights",
    icon: PlaneTakeoff,
    accent: "bg-[#ECE9FF]",
  },
  {
    label: "Hoteles",
    href: "/hotels",
    icon: BedDouble,
    accent: "bg-[#E3F2FF]",
  },
  {
    label: "Contratos",
    href: "/contracts",
    icon: FileText,
    accent: "bg-[#FFF4E3]",
  },
  {
    label: "Asientos",
    href: "/seating",
    icon: Table,
    accent: "bg-[#F8EFF7]",
  },
  {
    label: "Álbum",
    href: "/albums",
    icon: Images,
    accent: "bg-[#FDE8E4]",
  },
  {
    label: "Social",
    href: "/social",
    icon: Share2,
    accent: "bg-[#E6F5F1]",
  },
  {
    label: "Templates",
    href: "/templates",
    icon: Sparkles,
    accent: "bg-[#ECE9FF]",
  },
  {
    label: "Precios",
    href: "/pricing",
    icon: PiggyBank,
    accent: "bg-[#FFF4E3]",
  },
  {
    label: "Sitio",
    href: "/site",
    icon: LinkIcon,
    accent: "bg-[#E3F2FF]",
  },
  {
    label: "Invitaciones",
    href: "/admin/invitations",
    icon: Users2,
    accent: "bg-[#FDE8E4]",
  },
];

