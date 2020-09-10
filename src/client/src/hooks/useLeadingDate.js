import {useReducer} from "react";
import moment from "moment";
import {DATE_FORMAT} from "../constants";


const useLeadingDate = (timeSpan) => {
    const reducer = (date, action) => {
        switch (action) {
            case 'increment':
                return moment(date).add(timeSpan, 'day').format(DATE_FORMAT);
            case 'decrement':
                return moment(date).subtract(timeSpan, 'day').format(DATE_FORMAT);
            default:
                throw new Error();
        }
    }

    const [leadingDate, moveLeadingDate] = useReducer(reducer, moment().format(DATE_FORMAT));

    return [leadingDate, moveLeadingDate];
}

export default useLeadingDate;