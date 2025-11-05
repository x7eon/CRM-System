import { ConfigProvider, Menu } from "antd";
import type { ReactElement } from "react";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

function NavMenu(): ReactElement {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      navigate("/");
    } else if (e.key === "2") {
      navigate("/profile");
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
      <Menu items={items} onClick={onClick} />
    </ConfigProvider>
  );
}

export default NavMenu;
