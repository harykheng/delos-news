import moment from "moment"

export const getPrice = (publishDate) => {
    const given = moment(publishDate, "YYYY-MM-DD");
    const currentDate = moment().startOf('day');

    const beetweenDate = moment.duration(currentDate.diff(given)).asDays();

    if(beetweenDate > 7) {
        return 0;
    }
    else if(beetweenDate <= 7){
        return 20000;
    }
    else {
        return 50000;
    }
}