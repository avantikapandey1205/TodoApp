import dayjs from "dayjs";

export const noop = () => undefined;

export const getISOStringDateFromDate = (date) => {
    const t = date?.nativeEvent?.timestamp

    if (!t) {
        return ''
    }

    return dayjs(t).toISOString();
}


export const calculateSecondsUntilTrigger = (triggerDate) => {
    if(!triggerDate) return 0
    // Parse the trigger date using Day.js
    const triggerDateTime = dayjs(triggerDate);

    // Get the current date and time using Day.js
    const currentDateTime = dayjs();

    // Calculate the difference in seconds between the current date/time and the trigger date/time
    const secondsUntilTrigger = triggerDateTime.diff(currentDateTime, 'second');

    return secondsUntilTrigger;
}