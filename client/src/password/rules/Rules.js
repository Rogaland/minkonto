import React, {Component} from 'react';

import './Rules.css';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

class Rules extends Component {


    render() {

        return (
            <Paper className="passwordRules" elevation={20}>
                <Typography type="title">
                    Passord regler
                </Typography>
                <ul>
                    <li>Passordet må være&nbsp;
                        <div className="code">8-16 tegn</div>
                    </li>

                    <li>Passordet må inneholde karakterer fra minst 3 av kategoriene under:</li>
                    <ul>
                        <li>Store bokstaver&nbsp;
                            <p className="code">A-Z</p>
                        </li>
                        <li>Små bokstaver&nbsp;
                            <p className="code">a-z</p>
                        </li>
                        <li>Tall&nbsp;
                            <p className="code">0-9</p>
                        </li>
                        <li>Spesialtegn &nbsp;
                            <div
                                className="code">{`~ ! @ # $ % ^ & * _ - + = \` | \\ ( ) { } [ ] : ; " ' < > , . ? /`}</div>
                        </li>
                    </ul>
                    <li>Kan ikke inneholde:</li>
                    <ul>
                        <li>
                            <p className="code">brukernavn</p>
                        </li>
                        <li>
                            <p className="code">fornavn</p>
                        </li>
                        <li>
                            <p className="code">etternavn</p>
                        </li>
                    </ul>

                    <li>Tillegg:</li>
                    <ul>
                        <li>De&nbsp;
                            <p className="code">12 siste passord</p>
                            lagres i historien og kan ikke brukes.
                        </li>
                        <li>Passordet må endres hver&nbsp;
                            <p className="code">90</p>
                            &nbsp;dag.
                        </li>
                        <li>Passordet kan endres etter&nbsp;
                            <p className="code">2</p>
                            &nbsp;dager.
                        </li>
                    </ul>
                </ul>

            </Paper>
        );
    }
}

export default Rules;
