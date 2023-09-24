type MenuItem = {
  name: string
  icon: string
  url: string
  children?: MenuItem[]
}

export const MenuItems: MenuItem[] = [
  {
    name: "Home",
    icon: "BiHomeAlt",
    url: "/admpanel",
  },
  {
    name: "Blog",
    icon: "BiBookAdd",
    url: "/admpanel/blog",
  },
  {
    name: "Bookmarks",
    icon: "BiBookmark",
    url: "/admpanel/bookmark",
  },
  {
    name: "Social Media",
    icon: "IoShareSocialSharp",
    url: "/admpanel/socialmedia",
  },
  {
    name: "Newsletter",
    icon: "BiMailSend",
    url: "/admpanel/newsletter",
  },
  {
    name: "Users",
    icon: "BiUserCircle",
    url: "/admpanel/users",
  },
]
