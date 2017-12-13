import React, {Component} from 'react';

import Card, {CardContent, CardHeader} from 'material-ui/Card';
import Avatar from 'react-avatar';
import 'whatwg-fetch';
import {CircularProgress, Grid, Paper, Typography, withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = theme => ({
        root: {
            padding: '50px',
            flexGrow: 1,
        },
        formControl: {
            margin: theme.spacing.unit,
        },
        labelContainer: {
            padding: '20px',
            marginBottom: '5px'
        },
        close: {
            width: theme.spacing.unit * 4,
            height: theme.spacing.unit * 4,
        },
        progress: {
            margin: `0 ${theme.spacing.unit * 2}px`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },

    })
;

class Student extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                dn: '',
                cn: '',
                firstName: '',
                lastName: '',
                mail: '',
                displayNameLocation: '',
                title: '',
                mobile: '',
                publicMobile: '',
                officePhone: '',
                employeeNumber: '',
                internalPhone: ''
            },
            showProgress: true,
        };

    }

    componentDidMount() {
        fetch('/api/userprofile',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                    this.setState({user: json});
                    this.setState({showProgress: false});
                }
            );
    }

    /*
    handleChange = (event) => {
        this.setState({
                [event.target.name]: event.target.value
            }
        )
    }

    updateProfile = () => {
        console.log(this.state);

        fetch('/api/userprofile',
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });

    }
*/

    render() {
        const {classes} = this.props;

        return (
            <div className="account">
                {this.state.showProgress && <CircularProgress className={classes.progress} size={150} thickness={2}/>}
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar name={`${this.state.user.firstName} ${this.state.user.lastName}`} color="#84b819"
                                    round={true}/>
                        }
                        title={`${this.state.user.firstName} ${this.state.user.lastName}`}
                        subheader={this.state.user.title}
                    />
                    <CardContent>
                        <Paper className={classes.labelContainer}>
                            <Grid container spacing={40}>
                                <Grid item xs>
                                    <Typography type="body" gutterBottom>
                                        {this.state.user.displayNameLocation}
                                    </Typography>
                                    <Typography type="caption" gutterBottom>
                                        Skole
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography type="body" gutterBottom>
                                        {this.state.user.mail}
                                    </Typography>
                                    <Typography type="caption" gutterBottom>
                                        E-post
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography type="body" gutterBottom>
                                        {this.state.user.mobile}
                                    </Typography>
                                    <Typography type="caption" gutterBottom>
                                        Mobil
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Student.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Student);