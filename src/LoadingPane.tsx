import React from 'react'

function Loading() {
    return (
        <div className={"d-flex flex-row m-5 mx-auto"}>
            <b>Loading crimes in the selected area...   </b>
            <span>&nbsp; &nbsp; &nbsp;</span>
            <div className="spinner-border text-secondary"></div>
        </div>
    )
}

export default Loading