import cubes from "../../public/cubes.png";
import chart from "../../public/chart-line.png";
import resource from "../../public/resourse.png";
import checkList from "../../public/check-list.png";
import setting from "../../public/setting-sidebar.png";

export const navItems = [
  {
    label: "Bosh sahifa",
    icon: cubes,
    path: "/home",
  },
  {
    label: "Hisobotlar",
    icon: chart,
    path: "/report",
  },
  {
    label: "Ovqatlar",
    icon: resource,
    path: "/dish",
  },
  {
    label: "Stollar",
    icon: resource,
    path: "/tables",
  },
  {
    label: "Pormo Codlar",
    icon: resource,
    path: "/promocodes",
  },
  {
    label: "Kategoriyalar",
    icon: checkList,
    path: "/category",
  },
  {
    label: "Sozlamalar",
    icon: setting,
    path: "/setting",
  },
];
