import LeftMenuItem from "./LeftMenuItem"
import { MenuItems } from "../../routes"

const SheetMenu = () => {
  return (
    <aside className={`w-full mt-5 overflow-auto`}>
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

export default SheetMenu
