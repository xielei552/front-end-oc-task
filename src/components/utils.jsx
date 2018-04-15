import { map } from 'lodash';
import moment from 'moment';

const getCalendar = (year, month) => {
  const startDate = moment([year, month]);
  // console.log('startDate', startDate);
  const firstDay = moment(startDate).startOf('month');
  const endDay = moment(startDate).endOf('month');
  const monthRange = moment.range(firstDay, endDay);
  // console.log('monthRange', monthRange);

  const weekList = Array.from(monthRange.by('week'));
  // console.log('weekList', weekList);
  const weeks = map(weekList, month => month.week());
  // console.log('weeks', weeks);

  let calendar = [];

  for (let i = 0, len = weeks.length; i < len; i++) {
    const week = weeks[i];
    let firstWeekDay = '';
    let lastWeekDay = '';
    if (i > 0 && week < weeks[i - 1]) {
      firstWeekDay = moment([year, month])
        .add(1, 'year')
        .week(week);
      lastWeekDay = moment([year, month])
        .add(1, 'year')
        .week(week)
        .day(0)
        .day(6);
    } else {
      firstWeekDay = moment([year, month])
        .week(week)
        .day(0);
      lastWeekDay = moment([year, month])
        .week(week)
        .day(6);
    }
    console.log('firstWeekDay', firstWeekDay);
    const weekRange = moment.range(firstWeekDay, lastWeekDay);
    calendar.push(weekRange);
  }

  return calendar;
};

export default getCalendar;
