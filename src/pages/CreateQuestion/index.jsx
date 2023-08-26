import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import Header from '../../components/Header';
import TextArea from 'antd/es/input/TextArea';
import { questionClient } from '../../api/client';
import { useEffect, useState } from 'react';

const CreateQuestion = () => {
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    questionClient
      .get('/categories')
      .then((res) => {
        console.log(res.data);
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmitForm = (values) => {
    const token = localStorage.getItem(`token`);
    if (token) {
      questionClient.defaults.headers['Authorization'] = `Bearer ${token}`;
      questionClient
        .post('/questions', values)
        .then((res) => {
          console.log(res.data);
          alert('Create question successfully!');
          form.resetFields();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      delete questionClient.defaults.headers['Authorization'];
    }
  };

  return (
    <>
      <Header />
      <main className='wrapper'>
        <div className='container'>
          <Typography.Title level={1}>Create Question</Typography.Title>
          <Form form={form} onFinish={handleSubmitForm}>
            <Row>
              <Col span={24}>
                <Form.Item name='title'>
                  <Input placeholder='title...' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='content'>
                  <TextArea rows={4} placeholder='content...' />
                </Form.Item>
              </Col>
              <Form.Item name='category_id'>
                <Select
                  options={categoryList.map((item) => ({
                    value: item.category_ID,
                    label: item.name,
                  }))}
                  style={{ width: 250, marginRight: 10 }}
                />
              </Form.Item>

              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Row>
          </Form>
        </div>
      </main>
    </>
  );
};
export default CreateQuestion;
