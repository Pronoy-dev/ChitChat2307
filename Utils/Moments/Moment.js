import moment from "moment";

export function GetTimeNow() {
  return moment().format("MM DD YYYY h:mm:ss a");
}
