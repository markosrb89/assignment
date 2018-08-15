import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import history from "../../shared/history";
import Header from "./header";
import SearchRepos from "./search-repos";
import BookmarkedRepos from "./bookmarked-repos";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <Header />
                    <Switch>
                        <Route exact path="/" render={() => {
                            return <Redirect to="/repositories" />;
                        }} />
                        <Route exact path="/repositories" component={SearchRepos} />
                        <Route exact path="/bookmarked-repositories" component={BookmarkedRepos} />
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;