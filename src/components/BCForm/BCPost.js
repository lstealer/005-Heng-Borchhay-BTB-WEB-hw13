import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import "./BCForm.css"
class BCPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            des: "",
            img:"https://www.clipartmax.com/png/middle/213-2132798_file-blank-empty-document-test-svg-png-icon-free-download-home-circle.png",
            button:true
        }
    }

    submitButtonClicked = () => {
        let object = {
            TITLE: this.state.title,
            DESCRIPTION: this.state.des,
            IMAGE:this.state.img
        }
        axios.post("http://110.74.194.124:15011/v1/api/articles", object).then((res) => {
            alert(res.data.MESSAGE)
        })
    }
    emptyChecker = (text) => {
        return text === "" ? true : false
    }
    titleOnChange = (event) => {
        this.setState({title: event.target.value},()=>{
            if(this.state.title!=="")
                if(this.state.des!=="")this.setState({button:false})
                else this.setState({button:true})
        })
    }
    desOnChange = (event) => {
        this.setState({des: event.target.value},
            ()=>{
                if(this.state.title!=="")
                    if(this.state.des!=="")this.setState({button:false})
                else this.setState({button:true})
            })
    }
    browseImage=(event)=>{
        if ( event.target.files && event.target.files[ 0 ] ) {
            let reader = new FileReader();
            reader.onload = ( e ) => {
                this.setState( { img: e.target.result } );
            };
            reader.readAsDataURL( event.target.files[ 0 ] );
        }
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
                                            onChange={this.titleOnChange}
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
                                            onChange={this.desOnChange}
                                        ></textarea>
                                        <label
                                            className="sms">{this.emptyChecker(this.state.des) ? "The field can't be empty" : null}</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="imgBox">
                                        <Image style={{width:"100%"}}
                                               className="image"
                                            src={this.state.img}
                                        />
                                    </div>
                                    <label for="group_image" className="btnBrowse">Browse</label>
                                    <input type="file"
                                           className="filetype"
                                           id="group_image"
                                           onChange={this.browseImage.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <Link to="/">
                                <Button
                                    disabled={this.state.button}
                                    variant="primary"
                                    className="btnAdd"
                                    onClick={this.submitButtonClicked.bind(this)}
                                >
                                    Post
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default BCPost