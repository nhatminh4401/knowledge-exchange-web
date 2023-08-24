import { Button, Card, Col, Row } from 'antd';
import Typography from 'antd/es/typography/Typography';
import './styles.css';
import Header from '../../components/Header';
import Comment from '../../components/Comment';

const QuestionDetail = () => {
  return (
    <>
      <Header />
      <main className='wrapper'>
        <div className='container'>
          <Typography.Title level={1}>Question Title</Typography.Title>
          <Typography.Title className='question-category' level={3}>
            Category name
          </Typography.Title>
          <Row>
            <div className='question-author'>
              by
              <div className='question-author__avatar'></div>
              <span className='question-author__name'>Min</span>
              <span className='question-author__time'>2 days ago</span>
            </div>
          </Row>
          <Row>
            <div className='question-content'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              inventore, quos sint quisquam autem veniam in dicta labore tempora
              deserunt? Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Iure ducimus cupiditate suscipit repellendus at assumenda
              deserunt eligendi amet adipisci minima?
            </div>
          </Row>
          <Row>
            <ul className='tag-list'>
              <li className='tag-item'>binh</li>
              <li className='tag-item'>hieu</li>
              <li className='tag-item'>cuong</li>
            </ul>
          </Row>
          <Row className='answer-section'>
            <Typography.Title level={2}>2 answers</Typography.Title>
            <Col span={24}>
              <Card>
                <div className='answer-author'>
                  <div className='answer-author__avatar'></div>
                  <span className='answer-author__name'>Min</span>
                  <span className='answer-author__time'>25 Aug 2023</span>
                </div>
                <div className='answer-content'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odiol
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente, aut!
                </div>
                <ul className='comment-list'>
                  <Comment />
                  <Comment />
                </ul>
              </Card>
              <Col>
                <form className='comment-form'>
                  <div className='comment-form__title'>Comment</div>
                  <textarea className='comment-form__textarea'></textarea>
                  <Button className='comment-form__btn'>
                    Post your comment
                  </Button>
                </form>
              </Col>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

export default QuestionDetail;
