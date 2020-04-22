import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, message, Alert, List} from 'antd'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const FormItem = Form.Item

const PostForm = ({addPost}) => {
  const [text, setText] = useState('');
  const [loading, setloading] = useState(false);
  
  const handleAddPost = ()=>{
    setloading(true)
    addPost({text}).then(res=>{
      message.success('post success')
      setText('');
    }).finally(()=>{
      setloading(false)
    });
  }
  return (
    <div className='post-form'>
      <Alert message="Share your moments with us..." type="info" showIcon />
      {/*<div className='bg-primary p'>*/}
      {/*  <h3 style={{color: '#fff'}}>Share your moments with us...</h3>*/}
      {/*</div>*/}
      <Form className="form my-1" onFinish={handleAddPost}>
        <FormItem rules={[{required: true, message: 'Please input your post!'}]}>
          <Input.TextArea placeholder='happy to post' value={text}
                          autoSize={{minRows: 3, maxRows: 6}}
                          onChange={event => setText(event.target.value)}/>
        </FormItem>
        <Form.Item>
          <Button type="primary" disabled={!text.length} size="large" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/*<form*/}
      {/*  className='form my-1'*/}
      {/*  onSubmit={e => {*/}
      {/*    e.preventDefault();*/}
      {/*    */}
      {/*  }}*/}
      {/*>*/}
      {/*      <textarea*/}
      {/*        name='text'*/}
      {/*        cols='30'*/}
      {/*        rows='5'*/}
      {/*        placeholder='Create a post'*/}
      {/*        value={text}*/}
      {/*        onChange={e => setText(e.target.value)}*/}
      {/*        required*/}
      {/*      />*/}
      {/*  <input type='submit' className='btn btn-dark my-1' value='Submit'/>*/}
      {/*</form>*/}
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
