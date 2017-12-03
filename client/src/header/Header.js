import React, {Component} from 'react';

import logo from './rogfk_liggende_farger.jpg';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <img src={logo} alt=''/>
            </div>
        )
    }
}

export default Header;