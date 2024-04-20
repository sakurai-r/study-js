export type Day = "月" | "火" | "水" | "木" | "金" | "土" | "日";

export const isHolidayIf = (day: Day) => {
  if (day === "土" || day === "日") {
    return true;
  } else {
    return false;
  }
};

export const isHolidaySwitch = (day: Day) => {
  switch (day) {
    case "土":
    case "日":
      return true;
    default:
      return false;
  }
};
