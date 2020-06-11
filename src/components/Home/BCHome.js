import React, {Component} from "react";

import BCTable from "../BCTable/BCTable";

function BCHome(props) {
    return <div className="container">
        <BCTable
            record={props.record}
            delete={props.deleteButtonClicked}
            first={props.firstButtonClicked}
            prev={props.prevButtonClicked}
            next={props.nextButtonClicked}
            last={props.lastButtonClicked}
            row={props.row}
            rowChange={props.rowChange}
        />
    </div>
}

export default BCHome