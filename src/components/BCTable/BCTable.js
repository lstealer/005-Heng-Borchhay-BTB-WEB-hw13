import React from "react";
import {Table, Image, InputGroup, Col, Button, Row} from "react-bootstrap";
import "./BCTable.css";
import {Link} from "react-router-dom";
function convertDate(dateStr) {
    let dateString = dateStr;
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(6, 8);
    return year + "-" + month + "-" + day;
}

function BCTable(props) {
    return (
        <div>
            <h1>Article Management</h1>
            <Link to="/post">
                <Button>
                    Add New Article
                </Button>
            </Link>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
            </thead>
            {props.record.map((data) => {
                return (
                    <tbody>
                    <tr key={data.ID}>
                        <td className="id">{data.ID}</td>
                        <td>{data.TITLE}</td>
                        <td>{data.DESCRIPTION}</td>
                        <td>{convertDate(data.CREATED_DATE)}</td>
                        <td className="imageCol"><Image className="Image" src={data.IMAGE}/></td>
                        <td as={Row}>
                            <InputGroup as={Col}>
                                <InputGroup.Prepend>
                                    <Link to={"/view/" + data.ID}>
                                        <Button variant="success">
                                            View
                                        </Button>
                                    </Link>
                                    <Link to={"/update/" + data.ID}>
                                        <Button variant="warning">
                                            Update
                                        </Button>
                                    </Link>
                                </InputGroup.Prepend>
                                <InputGroup.Append>
                                        <Button variant="danger"
                                                onClick={props.delete.bind(this, data.ID)}
                                        >
                                            Delete
                                        </Button>
                                </InputGroup.Append>
                            </InputGroup></td>
                    </tr>
                    </tbody>
                )
            })}
        </Table>
            <div as={Row}>
            <InputGroup as={Col} style={{paddingLeft:"30vw"}}>
                <InputGroup.Prepend>
                    <Button onClick={props.first.bind(this)}>
                        First
                    </Button>
                    <Button onClick={props.prev.bind(this)}>
                      prev
                    </Button>
                    <input value={props.row} style={{width:"5vh" ,textAlign:"center"}} onChange={props.rowChange.bind(this)}/>
                    <Button onClick={props.next.bind(this)}>
                       next
                    </Button>
                </InputGroup.Prepend>
                <InputGroup.Append>
                    <Button onClick={props.last.bind(this)}>
                       last
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            </div>
        </div>
    )

}

export default BCTable
