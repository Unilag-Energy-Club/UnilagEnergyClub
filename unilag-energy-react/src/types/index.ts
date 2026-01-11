export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  division?: string;
}

export interface Division {
  title: string;
  description: string;
  icon?: string;
}
