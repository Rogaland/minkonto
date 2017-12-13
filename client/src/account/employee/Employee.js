import React, {Component} from 'react';

import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Avatar from 'react-avatar';
import List, {ListItem, ListItemIcon} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import PhoneIcon from 'material-ui-icons/Phone';
import IphoneIcon from 'material-ui-icons/PhoneIphone';
import EyeIcon from 'material-ui-icons/RemoveRedEye';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import 'whatwg-fetch';
import {CircularProgress} from 'material-ui/Progress';
import {Grid, Typography, withStyles} from "material-ui";
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
        labelItem: {},
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

class Employee extends Component {

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
            profileUpdateNofify: false,
            updateStatus: '',
            showProgress: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);

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

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({profileUpdateNofify: false});
    };

    handleChange = (event) => {
        let user = this.state.user;
        Object.assign(user, {[event.target.name]: event.target.value})
        this.setState({user: user});
    };

    updateProfile = () => {
        let user = this.state.user;
        this.setState({showProgress: true});
        fetch('/api/userprofile',
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
                credentials: 'same-origin'
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({updateStatus: 'Profilen din ble oppdatert.'});
                }
                else {
                    console.log(response);
                    this.setState({updateStatus: 'Et problem oppstod. Profilen din ble IKKE oppdatert.'});
                }
                this.setState({profileUpdateNofify: true});
                this.setState({showProgress: false});
            });

    };


    render() {
        const {classes} = this.props;

        return (

            <div className="account">
                {this.state.showProgress ?
                    <CircularProgress className={classes.progress} size={150} thickness={2}/> : ''}

                <Card>
                    <CardHeader
                        avatar={
                            <Avatar name={`${this.state.user.firstName} ${this.state.user.lastName}`} color="#84b819"
                                    round={true}/>
                        }
                        title={`${this.state.user.firstName} ${this.state.user.lastName}`}
                        subheader={this.state.user.title}
                    />
                    <Divider/>
                    <CardContent>
                        <Paper className={classes.labelContainer}>
                            <Grid container spacing={40}>
                                <Grid item xs>
                                    <Typography type="body" gutterBottom>
                                        {this.state.user.displayNameLocation}
                                    </Typography>
                                    <Typography type="caption" gutterBottom>
                                        Arbeidssted
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography type="body" gutterBottom>
                                        {this.state.user.employeeNumber}
                                    </Typography>
                                    <Typography type="caption" gutterBottom>
                                        Ansattnummer
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
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
                                        {this.state.user.internalPhone}
                                    </Typography>
                                    <Typography type="caption" gutterBottom>
                                        Internnummer
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper elevation={1}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIcon/>
                                    </ListItemIcon>
                                    <TextField label="Kontornummer" name="officePhone"
                                               value={this.state.user.officePhone} onChange={this.handleChange}
                                               fullWidth/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <IphoneIcon/>
                                    </ListItemIcon>
                                    <TextField label="Mobil" name="mobile" value={this.state.user.mobile}
                                               onChange={this.handleChange}
                                               fullWidth/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <EyeIcon/>
                                    </ListItemIcon>
                                    <TextField label="Synlig mobil" name="publicMobile"
                                               value={this.state.user.publicMobile}
                                               onChange={this.handleChange} fullWidth/>
                                </ListItem>
                            </List>
                        </Paper>

                    </CardContent>
                    <CardActions>
                        <Button raised onClick={this.updateProfile} color="primary">
                            Oppdater profilen
                        </Button>
                    </CardActions>

                </Card>

                < Snackbar
                    anchorOrigin={
                        {
                            vertical: 'top',
                            horizontal:
                                'right',
                        }
                    }
                    open={this.state.profileUpdateNofify
                    }
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose
                    }
                    SnackbarContentProps={
                        {
                            'aria-describedby':
                                'message-id',
                        }
                    }
                    message={
                        <span id="message-id">{this.state.updateStatus}</span>
                    }
                    action={
                        [
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleRequestClose}
                            >
                                <CloseIcon/>
                            </IconButton>,
                        ]
                    }
                />
            </div>
        )
    }
}

Employee.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Employee);