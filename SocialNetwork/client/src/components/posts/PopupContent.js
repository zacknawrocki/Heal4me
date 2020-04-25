//content.js
import React from "react";
import {Link} from 'react-router-dom';
import '../../styles/index.less';

export default ({ close, postID }) => {
    return (
        <div id="modal">
            <a className="close" onClick={close}>
            &times;
            </a>
            <div className="modal-header"><h2>Stay up to date on your post!</h2></div>
            <div className="modal-content">
                <b>Keep this link safe: </b>
                <Link to={"/posts/" + postID}>http://localhost:3000/posts/{postID}</Link>
            </div>
        </div>
    )
};