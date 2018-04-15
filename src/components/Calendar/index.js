import { map, chain } from 'lodash';
import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import getCalendar from '../utils';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table';
import { white, tealA400 } from 'material-ui/styles/colors';
import './style.css';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: Moment().month(),
      year: Moment().year()
    };
  }
  render() {
    const moment = extendMoment(Moment);
    const calendar = getCalendar(this.state.year, this.state.month);
    console.log('calendar: ', calendar);
    const weekArray = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const thruDate = chain(calendar)
      .map((week, key) =>
        chain(
          Array.from(week.by('day')).map(m => (
            <TableRowColumn key={m.format('D')}>{m.format('D')}</TableRowColumn>
          ))
        )
          .thru(row => <TableRow key={`row_${key}`}>{row}</TableRow>)
          .value()
      )
      .value();
    const renderCalendarDate = map(calendar, week =>
      map(
        Array.from(week.by('day'), m => (
          <TableRowColumn key={m.format('D')}>{m.format('D')}</TableRowColumn>
        ))
      )
    );
    console.log('renderCalendarDate', renderCalendarDate);

    const rednerTableHeader = map(weekArray, item => (
      <TableHeaderColumn key={item}>{item}</TableHeaderColumn>
    ));
    return (
      <div className="calendar">
        <div className="calendar__header" style={{ backgroundColor: tealA400 }}>
          <div className="calendar__header-left">
            <i class="fas fa-angle-left" />
          </div>
          <div className="calendar__header-main">main</div>
          <div className="calendar__header-right">
            <i class="fas fa-angle-right" />
          </div>
        </div>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>{rednerTableHeader}</TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{thruDate}</TableBody>
        </Table>
      </div>
    );
  }
}

export default Calendar;
