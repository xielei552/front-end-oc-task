import { map } from 'lodash';
import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import getCalendar from '../utils';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table';

class Calendar extends Component {
  render() {
    const moment = extendMoment(Moment);
    const weekArray = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const start = moment('2011-04-15', 'YYYY-MM-DD');
    const end = moment('2020-11-27', 'YYYY-MM-DD');
    const range = moment.range(start, end);
    console.log('range', range);
    console.log('calendar', moment().calendar());
    console.log('getCalendar', getCalendar(2018, 0));

    const rednerTableHeader = map(weekArray, item => (<TableHeaderColumn>{item}</TableHeaderColumn>));
    return (
      <div className="calender-table">
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              {rednerTableHeader}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Calendar;
