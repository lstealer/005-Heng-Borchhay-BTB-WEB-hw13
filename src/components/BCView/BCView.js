import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import axios from "axios"
import {Link} from "react-router-dom";

class BCView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            des: ""
        }
    }

    componentWillMount() {
        axios.get("http://110.74.194.124:15011/v1/api/articles/" + this.props.match.params.id).then((res) => {
                if (res.data.DATA === null) {
                    alert("The Record might have deleted!!!")
                } else this.setState({
                        record: res.data.DATA,
                        title: res.data.DATA.TITLE,
                        des: res.data.DATA.DESCRIPTION,
                        img: res.data.DATA.IMAGE
                    }
                )
            }
        )
    }

    emptyChecker = (text) => {
        return text === "" ? true : false
    }
    titleOnChange = (event) => {
        this.setState({title: event.target.value})
    }
    desOnChange = (event) => {
        this.setState({des: event.target.value})
    }

    render() {
        return (
            <div className="container">
                <div className="frm">
                    <div className="headerfrm">
                        <span>Article Info</span>
                    </div>
                    <form className="upl">
                        <div className="body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">TITLE: <span id="span-name"
                                                                                     className="text-danger"></span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Title"
                                            name="title"
                                            value={this.state.title}

                                        />
                                        <label
                                            className="sms">{this.emptyChecker(this.state.title) ? "The field can't be empty" : null}</label>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">DESCRIPTION: <span id="span-phone"
                                                                                              className="text-danger"></span></label>
                                        <textarea
                                            style={{height: "160px"}}
                                            className="form-control"
                                            placeholder="Description"
                                            name="des"
                                            value={this.state.des}
                                        ></textarea>
                                        <label
                                            className="sms">{this.emptyChecker(this.state.des) ? "The field can't be empty" : null}</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="imgBox">
                                        <Image src={this.state.img}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default BCView