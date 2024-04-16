import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconDashboard,
  IconInfoCircle,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "../styles/Navbar.module.css";

const data = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/about", label: "About", icon: IconInfoCircle },
];

const Navbar = () => {
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <h1>URPIn</h1>
          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        {/* <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a> */}
        <p>Developed by: Antara Newaz</p>
      </div>
    </nav>
  );

};

export default Navbar;
