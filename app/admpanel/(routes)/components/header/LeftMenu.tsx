"use client"
import { useEffect } from "react"
import LeftMenuItem from "./LeftMenuItem"
import { MenuItems } from "../../routes"

const LeftMenu = () => {
  return (
    <aside
      className={`hidden md:block w-64 border-r border-zinc-200 dark:border-zinc-800 overflow-auto`}
    >
      <nav className="flex flex-col gap-4 py-0">
        <ul className="flex flex-col">
          {MenuItems.map((item, index) => (
            <LeftMenuItem
              key={index}
              title={item.name}
              icon={item.icon}
              url={item?.url}
              {...(item.children && {
                children: item.children.map((child, index) => (
                  <LeftMenuItem
                    key={index}
                    title={child.name}
                    url={child.url}
                  />
                )),
              })}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default LeftMenu
