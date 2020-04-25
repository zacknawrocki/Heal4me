import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../actions/post';
import {Alert, Button, Form, Input, message} from "antd";

const FormItem = Form.Item
const CommentForm = ({postId, addComment}) => {
  const [text, setText] = useState('');
  const [loading, setloading] = useState(false);
  
  const handleAddComment = ()=>{
    setloading(true)
    addComment(postId, {text}).then(res=>{
      message.success('post success')
      setText('');
    }).finally(()=>{
      setloading(false)
    });
  }
  
  return (
    <div className='post-form'>
      <Alert message="Comment the post" type="info" showIcon />
      <Form className="form my-1" onFinish={handleAddComment}>
        <FormItem rules={[{required: true, message: 'Please input your Comment!'}]}>
          <Input.TextArea placeholder='Please leave a comment' value={text}
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  {addComment}
)(CommentForm);
