import React from 'react';

import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import SecurityIcon from 'material-ui-icons/Security';
import Button from 'material-ui/Button';
import Input, {InputAdornment, InputLabel} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Collapse from 'material-ui/transitions/Collapse';
import {FormControl, FormHelperText} from 'material-ui/Form';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Rules from "./rules/Rules";
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import 'whatwg-fetch'
import {CircularProgress} from 'material-ui/Progress';


const styles = theme => ({
    root: {
        padding: '5px'
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    labelContainer: {
        padding: '20px'
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
    }
});

class Password extends React.Component {

    onChangeNewPassword = (event) => {
        let password = event.target.value;

        // https://blogs.technet.microsoft.com/poshchap/2016/10/14/regex-for-password-complexity-validation/
        let passwordComplexityValidator = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]))([A-Za-z\\d@#$%^&£*\\-_+=[\\]{}|\\\\:',?/`~\"();!]|\\.(?!@)){8,16}$");
        let passwordUserNameValidator = new RegExp(this.state.user.cn, "i");
        let passwordFirstNameValidator = new RegExp(this.state.user.firstName, "i");
        let passwordLastNameValidator = new RegExp(this.state.user.lastName, "i");

        if (passwordComplexityValidator.test(password)
            && !passwordUserNameValidator.test(password)
            && !passwordFirstNameValidator.test(password)
            && !passwordLastNameValidator.test(password)) {
            if (password)
                this.setState({
                    newPasswordValid: true,
                    newPassword: password
                });
        }

    };
    isFormValid = () => {
        return (this.state.newPasswordValid && this.state.newPassword.length > 0 && this.state.repeatPasswordValid && this.state.repeatPassword.length > 0)
    }
    onChangeRepeatPassword = event => {
        let password = event.target.value;
        if (password === this.state.newPassword) {
            this.setState({
                repeatPasswordValid: true,
                repeatPassword: password
            });
        }
    }
    onDirtyNewPassword = (event) => {
        this.setState({newPasswordValid: false});
    };
    onDirtyRepeatPassword = (event) => {
        this.setState({repeatPasswordValid: false});
    };
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    handleClickShowNewPassword = () => {
        this.setState({showNewPassword: !this.state.showNewPassword});
    };
    updatePassword = () => {
        this.setState({showProgress: true});
        let user = this.state.user;
        user.password = this.state.newPassword;
        fetch('/api/password',
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
                if (response.status === 200) {
                    return response.json();
                }
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            })
            .then((json) => {
                    const url = this.queryParams.redirectUrl;
                    let status = json.status;
                    if (url !== undefined) {
                        this.setState({redirect: url});
                        status = `${status}. Du vil nå bli sendt videre til ${url}`;
                    }

                    this.showPasswordUpdateStatus(status);
                }
            )
            .catch((error) => {
                error.response.json().then((json) => {
                    this.showPasswordUpdateStatus(json.status);

                });
            });
    };
    handleClickShowRepeatPassword = () => {
        this.setState({showRepeatPassword: !this.state.showRepeatPassword});
    };
    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };
    showPasswordUpdateStatus = (updateStatus) => {

        this.setState({
            updateStatus: updateStatus,
            passwordUpdateNotify: true,
            showProgress: false
        });
    }
    handleRequestClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        this.setState({passwordUpdateNotify: false});

        if (this.state.redirect !== '') {
            window.location = this.state.redirect;
        }

    };

    constructor(props) {
        super(props);

        this.state = {
            newPasswordValid: true,
            repeatPasswordValid: true,
            newPassword: '',
            repeatPassword: '',
            expanded: false,
            showNewPassword: false,
            showRepeatPassword: false,
            user: {},
            updateStatus: '',
            passwordUpdateNotify: false,
            showProgress: false,
            redirect: ''
        };

        this.handleClickShowNewPassword = this.handleClickShowNewPassword.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.getPasswordSubheaderMessage = this.getPasswordSubheaderMessage().bind(this);

    }

    componentDidMount() {
        fetch('/api/password',
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
                }
            );
    }

    getPasswordSubheaderMessage = () => {
        let path = this.props.location.pathname;
        let message = "Her kan du bytte passord.";

        if (path.endsWith('expired')) {
            message = "Passordet er utløpt. Du må bytte passord nå!";
        }

        return message;
    }

    render() {
        const {classes} = this.props;

        this.getPasswordSubheaderMessage();

        return (
            <div className={classes.root}>
                {this.state.showProgress ?
                    <CircularProgress className={classes.progress} size={150} thickness={2}/> : ''}
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar>
                                <SecurityIcon/>
                            </Avatar>
                        }
                        title="Passord"
                        subheader={this.getPasswordSubheaderMessage()}
                    />

                    <CardContent>
                        <Paper className={classes.labelContainer}>
                            <form>
                                <FormControl fullWidth error={!this.state.newPasswordValid} required>
                                    <InputLabel htmlFor="password">Passord</InputLabel>
                                    <Input
                                        id="newPassword"
                                        type={this.state.showNewPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.onChangeNewPassword}
                                        onDirty={this.onDirtyNewPassword}

                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={this.handleClickShowNewPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {this.state.showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }


                                    />
                                    <FormHelperText>{this.state.newPasswordValid ? '' : 'Passordet følger ikke passordreglene'}</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth error={!this.state.repeatPasswordValid} required>
                                    <InputLabel htmlFor="password">Repeter passord</InputLabel>
                                    <Input

                                        id="repeatPassword"
                                        type={this.state.showRepeatPassword ? 'text' : 'password'}
                                        onChange={this.onChangeRepeatPassword}
                                        onDirty={this.onDirtyRepeatPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={this.handleClickShowRepeatPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {this.state.showRepeatPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText>{this.state.repeatPasswordValid ? '' : 'Passordet må være likt nytt passord'}</FormHelperText>
                                </FormControl>

                            </form>
                        </Paper>
                    </CardContent>
                    <CardActions>
                        <Button raised color="primary" disabled={!this.isFormValid()} onClick={this.updatePassword}>
                            Oppdater passordet
                        </Button>
                        <Button raised color="primary"
                                onClick={this.handleExpandClick}
                                onMouseDown={this.handleMouseDownPassword}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                        >
                            Vis passordregler
                        </Button>
                    </CardActions>
                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <Rules/>
                        </CardContent>
                    </Collapse>
                </Card>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.passwordUpdateNotify}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.updateStatus}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />

            </div>
        )
    }
}

Password.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Password);