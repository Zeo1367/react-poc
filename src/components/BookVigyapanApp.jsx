import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TestLoginComponent from './TestLoginComponent';
import LoginComponent from "./LoginComponent";

class BookVigyapanApp extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" exact component={LoginComponent}/>
                            <Route path="/test" exact component={TestLoginComponent}/>
                            {/*<AuthenticatedRoute path="/logout" exact component={LogoutComponent}/>*/}
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default BookVigyapanApp