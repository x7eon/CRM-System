import { ConfigProvider, Menu } from "antd";
import type { ReactElement } from "react";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

function NavMenu(): ReactElement {
  const navigate = useNavigate();

  const handleNavigateMenu: MenuProps["onClick"] = (e) => {
    const routes: Record<string, string> = {
      1: "/",
      2: "/profile",
    };

    const route = routes[e.key];

    if (route) {
      navigate(route);
    }
  };

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "Меню",
      type: "group",
      children: [
        { key: "1", label: "Список задач" },
        { key: "2", label: "Профиль" },
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            activeBarBorderWidth: 0,
          },
        },
      }}
    >
      <Menu items={items} onClick={handleNavigateMenu} />
    </ConfigProvider>
  );
}

export default NavMenu;
