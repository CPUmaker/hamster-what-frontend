import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

const categoryIcons = [
  {
    id: 1,
    name: "Food",
    color: "#f39c12",
    icon: <Ionicons name="fast-food-outline" size={30} color="#f39c12" />,
  },
  {
    id: 2,
    name: "Transportation",
    color: "#9b59b6",
    icon: <Ionicons name="bus-outline" size={30} color="#9b59b6" />,
  },
  {
    id: 3,
    name: "Shopping",
    color: "#3498db",
    icon: <Ionicons name="cart-outline" size={30} color="#3498db" />,
  },
  {
    id: 4,
    name: "Entertainment",
    color: "#e74c3c",
    icon: <Ionicons name="game-controller-outline" size={30} color="#e74c3c" />,
  },
  {
    id: 5,
    name: "Housing",
    color: "#2c3e50",
    icon: <Ionicons name="home-outline" size={30} color="#2c3e50" />,
  },
  {
    id: 6,
    name: "Utilities",
    color: "#27ae60",
    icon: <Ionicons name="flash-outline" size={30} color="#27ae60" />,
  },
  {
    id: 7,
    name: "Other",
    color: "#8D7B68",
    icon: <Ionicons name="file-tray" size={30} color="#8D7B68" />,
  },
  {
    id: 8,
    name: "Salary",
    color: "#f39c12",
    icon: <FontAwesome5 name="hand-holding-usd" size={30} color="#f39c12" />,
  },
  {
    id: 9,
    name: "Interest",
    color: "#9b59b6",
    icon: (
      <MaterialCommunityIcons name="bank-outline" size={30} color="#9b59b6" />
    ),
  },
  {
    id: 10,
    name: "Investments",
    color: "#3498db",
    icon: <MaterialIcons name="attach-money" size={30} color="#3498db" />,
  },
  {
    id: 11,
    name: "Child benefit",
    color: "#f300f3",
    icon: (
      <MaterialCommunityIcons
        name="baby-face-outline"
        size={30}
        color="#f300f3"
      />
    ),
  },
  {
    id: 12,
    name: "Pension",
    color: "#4E6E81",
    icon: <Entypo name="shield" size={30} color="#4E6E81" />,
  },
  {
    id: 13,
    name: "Income",
    color: "#68B984",
    icon: <FontAwesome5 name="money-bill-alt" size={30} color="#68B984" />,
  },
];

export default categoryIcons;
