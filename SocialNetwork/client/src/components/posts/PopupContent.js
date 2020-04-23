//content.js
import React from "react";
import '../../styles/index.less';

export default ({ close, postID }) => {

    return (
        <div id="modal">
            <a className="close" onClick={close}>
            &times;
            </a>
            <div className="modal-header"><h2>{postID}</h2></div>
            <div className="modal-content">
                <b>Keep tracking of your post here:</b>
            </div>
        </div>
    )
};