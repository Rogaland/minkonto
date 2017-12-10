import React, {Component} from 'react';

import './Account.css';
import Employee from "./employee/Employee";
import Student from "./student/Student";
import Other from "./other/Other";


class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: ''
        };

    }

    componentDidMount() {
        fetch('/api/userprofile',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                    this.setState(json);
                    console.log(json);
                }
            );

        fetch('/api/role',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                    this.setState(json);
                    console.log(json);
                }
            );
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