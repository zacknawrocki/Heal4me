import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, message, Alert, List} from 'antd'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';
import Popup from "reactjs-popup";
import PopupContent from "./PopupContent.js";

const FormItem = Form.Item;
// todo: put this in an environment variable
const anonID = '5ea19d468e390b6b8b7eedef';

const PostForm = ({addPost}) => {
  const [text, setText] = useState('');
  const [loading, setloading] = useState(false);
  const [postID, setPostID] = useState(null);
  const [userID, setUserID] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  

  const setPostIDNull = () => {
    setPostID(null);
  }

  const handleAddPost = ()=>{
    setloading(true)
    addPost({text}).then(res=>{
      message.success('post success')
      const {_id, user} = res;
      console.log(anonID);
      console.log(user);
      setUserID(user);
      setPostID(_id);
      setOpenModal(true);
      setText('');
    }).finally(()=>{
      setloading(false)
    });
  }

  return (
    <div className='post-form'>
      <div id="modal-wrap" onClick={setPostIDNull}>
        {postID !== null && userID === anonID &&
        <Popup modal open={true}>
          {close => <PopupContent close={close} postID={postID} />}
        </Popup>
        }
      </div>
      <Alert message="Share your moments with us..." type="info" showIcon />
      <Form className="form my-1" onFinish={handleAddPost}>
        <FormItem rules={[{required: true, message: 'Please input your post!'}]}>
          <Input.TextArea placeholder='Please leave your post' value={text}
                          autoSize={{minRows: 3, maxRows: 6}}
                          onChange={event => setText(event.target.value)}/>
        </FormItem>
        <Form.Item>
          <Button type="primary" disabled={!text.length} size="large" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  {addPost}
)(PostForm);
