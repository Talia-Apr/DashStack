import dayjs from "dayjs";
import React from "react";
interface Props {
    date: dayjs.Dayjs;
    onClickPrevious: () => void;
    onClickNext: () => void;
    changeMonth: (month: number) => void;
    changeYear: (year: number) => void;
}
declare const Calendar: React.FC<Props>;
export default Calendar;
