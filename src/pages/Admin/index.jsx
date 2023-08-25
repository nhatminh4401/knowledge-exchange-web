import Typography from 'antd/es/typography/Typography';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { questionClient } from '../../api/client';
import { Button, Col, Form, Input, List, Row, Select, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const Admin = () => {
  const [questionList, setQuestionList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    questionClient
      .get('/questions')
      .then((res) => {
        console.log(res.data);
        setQuestionList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    questionClient
      .get('/categories')
      .then((res) => {
        console.log(res.data);
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    questionClient
      .get('/tags')
      .then((res) => {
        console.log(res.data);
        setTagList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeStatus = (id) => {
    const token = localStorage.getItem(`token`);
    if (token) {
      questionClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete questionClient.defaults.headers['Authorization'];
    }
    const value = form.getFieldValue(id.toString() + 'status');
    questionClient
      .put(`/questions?id=${id}`, { status: value })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCategory = () => {
    const token = localStorage.getItem(`token`);
    if (token) {
      questionClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete questionClient.defaults.headers['Authorization'];
    }
    const value = form.getFieldValue('category');
    questionClient
      .post(`/categories`, { category_name: value })
      .then((res) => {
        console.log(res.data);
        setCategoryList([...res.data]);
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveCategory = (id) => {
    const token = localStorage.getItem(`token`);
    if (token) {
      questionClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete questionClient.defaults.headers['Authorization'];
    }
    questionClient
      .delete(`/categories`, { data: { id: id } })
      .then((res) => {
        console.log(res.data);
        setCategoryList(
          categoryList.filter((category) => category.category_ID !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddTag = () => {
    const token = localStorage.getItem(`token`);
    if (token) {
      questionClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete questionClient.defaults.headers['Authorization'];
    }
    const value = form.getFieldValue('tag');
    questionClient
      .post(`/tags`, { tag_name: value })
      .then((res) => {
        console.log(res.data);
        setTagList([...res.data]);
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveTag = (id) => {
    const token = localStorage.getItem(`token`);
    if (token) {
      questionClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete questionClient.defaults.headers['Authorization'];
    }
    questionClient
      .delete(`/tags`, { data: { id: id } })
      .then((res) => {
        console.log(res.data);
        setTagList(tagList.filter((tag) => tag.tag_ID !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className='wrapper'>
        <div className='container'>
          <Typography.Title>Admin</Typography.Title>
          <Form form={form}>
            {/* Update question status */}
            <Typography.Title level={3}>Manage questions</Typography.Title>
            <Row>
              <List>
                {questionList.map((question) => (
                  <List.Item key={question.question_ID}>
                    <Row>
                      <Col span={12}>
                        <h3>{question.title}</h3>
                        <p>{question.content}</p>
                        <p>{question.status}</p>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          name={question.question_ID.toString() + 'status'}
                        >
                          <Select
                            onChange={() =>
                              handleChangeStatus(question.question_ID)
                            }
                            style={{ width: 120 }}
                            defaultValue={question.status}
                            options={[
                              { value: 'Pending', label: 'Pending' },
                              { value: 'Approved', label: 'Approved' },
                              { value: 'Declined', label: 'Declined' },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </List.Item>
                ))}
              </List>
            </Row>
            {/* Manage category */}
            <Row>
              <Typography.Title level={3}>Manage category</Typography.Title>
              <Col span={24}>
                <Space.Compact style={{ width: '100%' }}>
                  <Form.Item name='category'>
                    <Input placeholder='category name' />
                  </Form.Item>
                  <Button type='primary' onClick={handleAddCategory}>
                    Add
                  </Button>
                </Space.Compact>
              </Col>
              <Col span={24}>
                <List>
                  {categoryList.map((category) => {
                    return (
                      <List.Item key={category.category_ID}>
                        {category.name}
                        <CloseOutlined
                          onClick={() =>
                            handleRemoveCategory(category.category_ID)
                          }
                        />
                      </List.Item>
                    );
                  })}
                </List>
              </Col>
            </Row>
            {/* Manage tag */}
            <Row>
              <Typography.Title level={3}>Manage tag</Typography.Title>
              <Col span={24}>
                <Space.Compact style={{ width: '100%' }}>
                  <Form.Item name='tag'>
                    <Input placeholder='tag name' />
                  </Form.Item>
                  <Button type='primary' onClick={handleAddTag}>
                    Add
                  </Button>
                </Space.Compact>
              </Col>
              <Col span={24}>
                <List>
                  {tagList.map((tag) => {
                    return (
                      <List.Item key={tag.tag_ID}>
                        {tag.name}
                        <CloseOutlined
                          onClick={() => handleRemoveTag(tag.tag_ID)}
                        />
                      </List.Item>
                    );
                  })}
                </List>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Admin;
