import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./Details.css";
import Container from '@material-ui/core/Container';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: this.props.transactions,
        }
    }

    render() {
        return (
            <React.Fragment>
            <Container maxWidth="lg">
                <TableContainer >
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Reward Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.transactions.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.dateStr}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.points}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            </React.Fragment>
        )
    }
}
export default Details;