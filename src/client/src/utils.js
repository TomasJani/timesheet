import * as moment from "moment";
import {TIME_FORMAT} from "./constants";

export function compareDates(a, b) {
    return moment(a.start, TIME_FORMAT).diff(moment(b.end, TIME_FORMAT));
}