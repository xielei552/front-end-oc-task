import { map, chain, concat, praseInt } from 'lodash';
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
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { grey100, tealA700 } from 'material-ui/styles/colors';
import './style.css';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: Moment().month(),
      year: Moment().year(),
      open: false,
      date: {},
      anchorEl: {},
      selectedDate: null,
      hour: '',
      minute: '',
      note: ''
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
        month = 0;
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

    this.handleRequestClose = e => {
      this.setState({
        open: false
      });
    };

    this.handleClick = event => {
      event.preventDefault();
      console.log('clicked');
      console.log('event', event);
      console.log('event key', event.currentTarget.getAttribute('id'));

      this.setState({
        open: true,
        anchorEl: event.currentTarget,
        selectedDate: event.currentTarget.getAttribute('id')
      });
    };

    this.handleInputChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    };

    this.onClickSave = () => {
      const notes = this.state[this.state.selectedDate] || [];
      console.log('notes', notes);
      this.setState({
        [this.state.selectedDate]: concat(notes, {
          hour: this.state.hour,
          minute: this.state.minute,
          note: this.state.note
        })
      });
    };
  }
  render() {
    const { year, month, anchorEl, hour, minute, note } = this.state;
    console.log('this.state', this.state);
    console.log('this.state.year', year);
    console.log('this.state.month', month);
    console.log('this.state.anchorEl', anchorEl);
    console.log('this.state.hour', hour);
    console.log('this.state.minute', minute);
    console.log('this.state.note', note);
    const moment = extendMoment(Moment);
    const calendar = getCalendar(this.state.year, this.state.month);
    console.log('calendar: ', calendar);
    const weekArray = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const thruDate = chain(calendar)
      .map((week, key) =>
        chain(
          Array.from(week.by('day')).map(m => {
            let columnClassName = '';
            if (m.month() !== month) {
              columnClassName = 'date-muted';
            } else if (
              m.date() === moment().date() &&
              m.month() === moment().month()
            ) {
              columnClassName = 'date-current';
            }
            return (
              <TableRowColumn
                key={m.utc()}
                id={m.utc()}
                className={columnClassName}
                onMouseDown={this.handleClick}
              >
                {m.format('D')}
              </TableRowColumn>
            );
          })
        )
          .thru(row => <TableRow key={`row_${key}`}>{row}</TableRow>)
          .value()
      )
      .value();
    const renderCalendarDate = map(calendar, week =>
      map(
        Array.from(week.by('day'), m => (
          <TableRowColumn key={m.utc()}>{m.format('D')}</TableRowColumn>
        ))
      )
    );

    const rednerTableHeader = map(weekArray, item => (
      <TableHeaderColumn key={item}>{item}</TableHeaderColumn>
    ));

    const renderNotes = chain(this.state[this.state.selectedDate])
      .orderBy(['hour', 'asc'], ['minute', 'asc'])
      .map((item, index) => (
        <li key={index}>
          {Moment(parseInt(this.state.selectedDate)).format('MMMM YYYY')}{' '}
          {item.hour}
          {'-'}
          {item.minute}
          {' : '}
          {item.note}
        </li>
      ))
      .value();

    return (
      <div className="calendar">
        <div className="calendar__header" style={{ backgroundColor: tealA700 }}>
          <div className="calendar__header-left" onMouseDown={this.onClickPrev}>
            <i className="fas fa-angle-left" />
          </div>
          <div className="calendar__header-main">
            <h1 style={{ color: grey100 }}>
              {moment([year, month]).format('MMMM')}
            </h1>
            <h2 style={{ color: grey100 }}>{year}</h2>
          </div>
          <div
            className="calendar__header-right"
            onMouseDown={this.onClickNext}
          >
            <i className="fas fa-angle-right" />
          </div>
        </div>
        <Table
          className="calendar__main"
          selectable={false}
          onCellClick={this.handleClick}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>{rednerTableHeader}</TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{thruDate}</TableBody>
        </Table>
        <div className="calendar__notes">
          <ol>{renderNotes}</ol>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <div className="calendar__popover">
            <TextField
              id="hour"
              hintText="Hour"
              onChange={this.handleInputChange}
            />
            <TextField
              id="minute"
              hintText="Minute"
              onChange={this.handleInputChange}
            />
            <TextField
              id="note"
              hintText="Event Name"
              onChange={this.handleInputChange}
            />
            <RaisedButton label="Save" onClick={this.onClickSave} />
          </div>
        </Popover>
      </div>
    );
  }
}

export default Calendar;
