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

    this.onClickPrev = () => {
      let month = null;
      let year = null;
      if (this.state.month === 0) {
        month = 11;
        year = this.state.year - 1;
      } else {
        month = this.state.month - 1;
        year = this.state.year;
      }

      this.setState({
        month: month,
        year: year
      });
    };

    this.onClickNext = () => {
      let month = null;
      let year = null;
      if (this.state.month === 11) {
        month = 11;
        year = this.state.year + 1;
      } else {
        month = this.state.month + 1;
        year = this.state.year;
      }

      this.setState({
        month: month,
        year: year
      });
    };
  }
  render() {
    const { year, month } = this.state;
    console.log('this.state.year', year);
    console.log('this.state.month', month);
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

    const rednerTableHeader = map(weekArray, item => (
      <TableHeaderColumn key={item}>{item}</TableHeaderColumn>
    ));
    return (
      <div className="calendar">
        <div className="calendar__header" style={{ backgroundColor: tealA400 }}>
          <div className="calendar__header-left" onMouseDown={this.onClickPrev}>
            <i className="fas fa-angle-left" />
          </div>
          <div className="calendar__header-main">
            <h1>{moment([year, month]).format('MMMM')}</h1>
            <h2>{year}</h2>
          </div>
          <div
            className="calendar__header-right"
            onMouseDown={this.onClickNext}
          >
            <i className="fas fa-angle-right" />
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
