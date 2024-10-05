import cubes from "../../public/cubes.png";
import chart from "../../public/chart-line.png";
import resource from "../../public/resourse.png";
import checkList from "../../public/check-list.png";
import setting from "../../public/setting-sidebar.png";

export const navItems = [
  // {
  //   label: "Bosh sahifa",
  //   icon: cubes,
  //   path: "/home",
  // },
  {
    label: "Bosh sahifa",
    icon: chart,
    path: "/home",
  },
  {
    label: "Buyurtmalar",
    icon: chart,
    path: "/orders",
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
    label: "Ofitsiyantlar",
    icon: checkList,
    path: "/waiters",
  },
  {
    label: "Kassa",
    icon: setting,
    path: "/kassa",
  },
];
