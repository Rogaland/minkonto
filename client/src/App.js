/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";
import {createMuiTheme, MuiThemeProvider, withStyles} from "material-ui";

import {blue, grey} from 'material-ui/colors';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Account from "./account/Account";
import Password from "./password/Password";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: grey,
    },
    status: {
        danger: 'orange',
    },
});

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
});

class App extends React.Component {

    render() {
        const {classes} = this.props;

        return (

            <MuiThemeProvider theme={theme}>
                <BrowserRouter basename='/profile'>
                    <div className={classes.root}>
                        <Header/>
                        <Navigation/>
                        <Route exact path='/me' component={Account}/>
                        <Route path='/password' component={Password}/>
                        <Redirect from="/" to="/me"/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    };

}

export default withStyles(styles)(App);