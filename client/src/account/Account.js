import React, {Component} from 'react';

import './Account.css';
import 'whatwg-fetch';
import Employee from "./employee/Employee";
import Student from "./student/Student";
import Other from "./other/Other";


class Account extends Component {

    componentDidMount = () => {
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
                    this.setState(json);
                }
            );

        fetch('/api/role',
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
                    this.setState(json);
                }
            );
    }

    constructor(props) {
        super(props);

        this.state = {
            role: ''
        };

    }

    render() {

        if (this.state.role === 'Employee') {
            return (<Employee/>);
        }
        if (this.state.role === 'Student') {
            return (<Student/>);
        }
        return (<Other/>);
    }
}

export default Account;