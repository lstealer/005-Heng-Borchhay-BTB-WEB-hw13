import React, {Component} from 'react';
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BCTable from "./components/BCTable/BCTable";
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom";
import BCView from "./components/BCView/BCView";
import BCHome from "./components/Home/BCHome";
import BCUpdate from "./components/BCForm/BCUpdate";
import {Button, Form} from "react-bootstrap";
import BCPost from "./components/BCForm/BCPost";
import BCHeader from "./components/Home/BCHeader";

class App extends Component {
    constructor() {
        super();
        this.state = {
            record: [],
            page: 1,
            row: 3,
            view: {},
            reach: false
        }
    }

    deleteButtonClicked = (id) => {
        axios.delete("http://110.74.194.124:15011/v1/api/articles/" + id)
            .then((res) => {
                    alert(res.data.MESSAGE)
                    this.stateRefresh()
                }
            )
    }
    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    stateRefresh = () => {
        axios.get("http://110.74.194.124:15011/v1/api/articles?page=" + this.state.page + "&limit=" + this.state.row)
            .then((res) => {
                if (res.data.DATA.length === 0 && !this.state.reachLast) {
                    alert("Reach the end of the page")
                    this.setState(ps => ({reach: true, page: ps - 1}), () => {
                    })
                } else {
                    this.setState({record: res.data.DATA, reach: false})
                }
            })
    }
    checkLast = () => {

    }
    nextButtonClicked = () => {
        if (!this.state.reach)
            this.setState(prevState => ({page: prevState.page + 1}), () => {
                this.stateRefresh()
            })

    }
    prevButtonClicked = () => {
        if (this.state.page > 1) {
            this.setState(prevState => ({page: prevState.page - 1}), () => {
                    this.stateRefresh()
                }
            )
        }
    }
    firstButtonClicked = () => {
        this.setState({page: 1}, () => {
            this.stateRefresh()
        })
    }
    lastButtonClicked = () => {
        while (!this.state.reachLast)
            this.nextButtonClicked()
    }

    // componentWillUpdate() {
    //     this.stateRefresh()
    // }
    rowChange = (event) => {
        this.setState({row: event.target.value}, () => {
            this.stateRefresh()
        })
    }

    componentWillMount() {
        this.stateRefresh()
    }


    render() {
        return (
            <div className={App}>
                <Router>
                    <BCHeader/>
                    <Switch>
                        <Route path="/" exact render={() => {
                            return <BCHome
                                record={this.state.record}
                                deleteButtonClicked={this.deleteButtonClicked}
                                nextButtonClicked={this.nextButtonClicked}
                                firstButtonClicked={this.firstButtonClicked}
                                prevButtonClicked={this.prevButtonClicked}
                                lastButtonClicked={this.lastButtonClicked}
                                row={this.state.row}
                                rowChange={this.rowChange}
                            />
                        }}/>
                        <Route path="/home" exact render={() => {
                            return <BCHome
                                record={this.state.record}
                                deleteButtonClicked={this.deleteButtonClicked}
                                nextButtonClicked={this.nextButtonClicked}
                                firstButtonClicked={this.firstButtonClicked}
                                prevButtonClicked={this.prevButtonClicked}
                                lastButtonClicked={this.lastButtonClicked}
                                row={this.state.row}
                                rowChange={this.rowChange}
                            />
                        }}/>
                        <Route path="/view/:id"
                               component={BCView}
                        />
                        <Route path="/update/:id"
                               component={BCUpdate}
                        />
                        <Route path="/post"
                               component={BCPost}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }

}

export default App;
