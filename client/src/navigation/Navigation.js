// @flow weak

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Tab, Tabs} from "material-ui";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
});


class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;


        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Min profil" component={Link} to="/me"/>
                        <Tab label="Passord" component={Link} to="/password"/>
                    </Tabs>

                </AppBar>
            </div>
        )
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);

