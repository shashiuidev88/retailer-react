import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "./Customer.css";
import Details from './Details';
import DetailsByMonth from "./DetailsByMonth";
import { InputLabel } from '@material-ui/core';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const customers = [
    { value: '1', label: 'Customer 1' },
    { value: '2', label: 'Customer 2' },
    { value: '3', label: 'Customer 3' }
];
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      title: {
        color: theme.palette.primary.light,
    }
})
class Customer extends Component {

    constructor() {
        super();
        this.state = {
            transactions: [],
            name: "",
            date: "",
            selectedMonths: [],
            amount: "",
            pointsSummary: []
        }
    }

    addTransactionHandler = () => {
        const transactions = this.state.transactions;
        const amount = this.state.amount;
        const date = new Date(this.state.date);

        let transactionObj = {
            name: this.state.name,
            date: date.getTime(),
            dateStr: date.toLocaleDateString(),
            amount: amount,
            month: date.getMonth().toString(),
            points: this.getPointsFromAmount(amount)
        }

        transactions.push(transactionObj);

        this.setState({ transactions: transactions });
    }

    getPointsFromAmount = (amount) => {
        const amountInt = parseInt(amount);
        if (amountInt >= 100) {
            return ((amountInt - 100) * 2) + 50;
        } else if (amountInt >= 50) {
            return amountInt - 50;
        } else {
            return 0;
        }
    }

    nameHandler = event => {
        this.setState({ name: event.target.value });
    }

    dateHandler = event => {
        this.setState({ date: event.target.value });
    }

    monthHandler = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ selectedMonths: value });
    }

    amountHandler = event => {
        this.setState({ amount: event.target.value });
    }

    rewardPerMonth = () => {
        const selectedMonths = this.state.selectedMonths;
        if(selectedMonths.length >3 ){
            alert("Please select only 3 months");
            return;
        }
        if(selectedMonths && selectedMonths.length > 0) {
            const pointsSummary = {
                months: selectedMonths.map(month => months[month]),
                customers: {}
            };

            let filteredList = this.state.transactions.filter(trans => selectedMonths.indexOf(trans.month) > -1);
            console.log(filteredList);
            filteredList.forEach((item) => {
                if (pointsSummary.customers[item.name] == null) {
                    pointsSummary.customers[item.name] = {
                        montlyPoints: {},
                        total: 0
                    };
                }
                
                const month = months[item.month];
                const customerMap = pointsSummary.customers[item.name];

                if (customerMap.montlyPoints[month] == null) {
                    customerMap.montlyPoints[month] = 0;
                }
                customerMap.montlyPoints[month] += item.points;
                customerMap.total += item.points;
                console.log(customerMap);
                pointsSummary.customers[item.name] = customerMap;
            });

            this.setState({ pointsSummary });
        } else {
            this.setState({ pointsSummary: {} });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                
                <form className={classes.root} noValidate autoComplete="off">
                <Container maxWidth="lg">
                    
                        <FormControl  margin="dense">
                            <TextField   className={classes.textField}
                                id="standard-select-currency"
                                select
                                label="Customer Name"
                                onChange={this.nameHandler}
                                helperText="Please select Customer name"
                            >
                                {customers.map((option) => (
                                    <MenuItem key={option.value} value={option.label}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField> <br />
                        </FormControl>
                        <FormControl  margin="dense">

                            <TextField id="date" label="Transaction Date" type="date"
                                 className={classes.textField} onChange={this.dateHandler}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl  margin="dense">
                            <TextField  className={classes.textField}
                                id="standard-number"
                                label="Amount"
                                type="number" onChange={this.amountHandler}
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>
                        <FormControl  margin="dense">
                            <Button onClick={() => this.addTransactionHandler()} variant="contained" color="primary">ADD</Button>
                        </FormControl>
                    
                    </Container>
                    </form>
                    <form className="" noValidate autoComplete="off">
                    <Container >
                        <FormControl  className={classes.formControl}>
                        <Typography className={classes.title} color="textSecondary">
                                        SELECT UPTO 3 MONTHS:
                                    </Typography>
                            <Select label="Month" className={classes.textField} onChange={this.monthHandler} multiple native >
                                {months.map((mon, index) => (<option key={index} value={index}>{mon}</option>))}
                            </Select>
                        </FormControl> <br/>
                        <FormControl >
                            <Button onClick={() => this.rewardPerMonth()} variant="contained" color="primary">Get Points Per Month</Button>
                        </FormControl>
                    </Container>
                    </form>
                
                {
                    this.state.transactions.length !== 0 &&
                    <Details transactions={this.state.transactions} selectedMonths={this.state.selectedMonths} />
                }
                <br/>
                {
                    this.state.pointsSummary.months && this.state.pointsSummary.months.length > 0 &&
                    <DetailsByMonth pointsSummary={this.state.pointsSummary} />
                }
                
           </React.Fragment>

        )
    }
}

export default  withStyles(styles)(Customer);