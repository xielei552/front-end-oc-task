import moment from 'moment';

const getCalendar = (year, month) => {

  const startDate = moment([year, month]);
  const firstDay = moment(startDate).startOf('month');
  const endDay = moment(startDate).endOf('month');
  const monthRange = moment.range(firstDay, endDay);
  console.log('startDate util', startDate);
  console.log('monthRange util', monthRange);
  console.log('firstDay util', firstDay);

  const monthObject = Array.from(monthRange.by('week'));
  const weeks = Array.from(Array(monthObject.length).keys());
  console.log('monthObject', monthObject);
  console.log('weeks', weeks);
 
  let calendar = [];

  for (let i = 0, len = weeks.length; i < len; i++) {
    const week = weeks[i];
    let firstWeekDay = '';
    let lastWeekDay = '';
    if (i > 0 && week < weeks[i-1]){
      console.log('changed');
      firstWeekDay = moment([year, month]).add(1, "year").week(week).day(1);
      lastWeekDay = moment([year, month]).add(1, "year").week(week).day(7);
    }
    else{
      firstWeekDay = moment([year, month]).week(week).day(1);
      lastWeekDay = moment([year, month]).week(week).day(7);
    }
    console.log('firstWeekDay', firstWeekDay);
    console.log('lastWeekDay', lastWeekDay);
    const weekRange = moment.range(firstWeekDay, lastWeekDay);
    console.log('weekRange', weekRange);
    calendar.push(weekRange);
  }

  return calendar;
}

export default getCalendar;
