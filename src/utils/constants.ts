import { InsertLabel } from "@/utils/types";

export const defaultLabels: Omit<InsertLabel, "userId">[] = [
  {
    text: "Groceries",
    color: "#00ff00",
  },
  {
    text: "Living",
    color: "#6E260E",
  },
  {
    text: "Transport",
    color: "#0000FF",
  },
];
