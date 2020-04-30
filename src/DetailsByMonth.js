import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';

class DetailsByMonth extends Component {

  render() {
    var customers = Object.keys(this.props.pointsSummary.customers);
    return (
      <React.Fragment>
        <Container maxWidth="lg">
        <TableContainer >
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>Customer Name</TableCell>
                <TableCell colSpan={this.props.pointsSummary.months.length} align="center"><b>Month Rewards</b></TableCell>
                <TableCell rowSpan={2} align="right">Total Rewards</TableCell>
              </TableRow>
              <TableRow>
                {
                  this.props.pointsSummary.months.map((row) => <TableCell key={"month_" + row} align="center">{row}</TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                customers.map((customer, index) => {
                  const customerData = this.props.pointsSummary.customers[customer];
                  return <TableRow key={index + "_pSummary"}>
                    <TableCell component="th" scope="row">{customer}</TableCell>
                    {
                      this.props.pointsSummary.months.map((month) =>
                        <TableCell align="center" key={customer + "_" + month}>
                          {
                            customerData.montlyPoints[month] && customerData.montlyPoints[month] !== 0 ? customerData.montlyPoints[month] : '-'
                          }
                        </TableCell>
                      )
                    }
                    <TableCell align="right">{this.props.pointsSummary.customers[customer].total}</TableCell>
                  </TableRow>
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
      </React.Fragment>
    )
  }
}
export default DetailsByMonth;
