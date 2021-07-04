import { addHours } from "date-fns";

export default function createDate(initialDate) {
  const date = new Date(initialDate);
  return addHours(date, 5).toString();
}
