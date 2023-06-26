import {
  FaRegBuilding,
  FaArrowUp,
  FaUserAlt,
  FaUser,
  FaMarkdown,
} from "react-icons/fa";

export const smallWidgetData = [
  {
    leftIcon: FaRegBuilding,
    rightIcon: FaArrowUp,
    title: "Total Apartments",
    value: 1000,
  },
  {
    leftIcon: FaUserAlt,
    rightIcon: FaArrowUp,
    title: "Total Home Owner",
    value: 8000,
  },
  {
    leftIcon: FaUser,
    rightIcon: FaArrowUp,
    title: "Number of New Clients",
    value: 3000,
  },
  {
    leftIcon: FaMarkdown,
    rightIcon: FaArrowUp,
    title: "Number of verified house",
    value: 7000,
  },
];

export const pieChartData = [
  {
    type: "pie",
    labels: ["Active", "Inactive"],
    data: [534, 344],
  },
  {
    type: "doughnut",
    labels: [
      "Dhaka",
      "Khulna",
      "Barisal",
      "Sylhet",
      "Rajshahi",
      "Rangpur",
      "Mymensingh",
      "Chittagong",
    ],
    data: [5534, 7344, 5534, 7344, 5534, 7344, 5534, 7344],
  },
];
