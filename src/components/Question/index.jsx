import { Badge, Card, Row } from 'antd';
import './styles.css';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

const Question = () => {
  return (
    <Card className='question'>
      <h3 className='question-title'>title question</h3>
      <div className='question-content'>question content</div>
      <ul className='tag-list'>
        <li className='tag-item'>binh</li>
        <li className='tag-item'>hieu</li>
        <li className='tag-item'>cuong</li>
      </ul>
      <Row justify='space-between' className='question-footer'>
        <div className='question-author'>
          by
          <div className='question-author__avatar'></div>
          <span className='question-author__name'>Min</span>
          <span className='question-author__time'>2 days ago</span>
        </div>
        <div className='question-like'>
          <Badge className='question-like__count' count={1000} />
          <span className='question-like__icon'>
            <LikeOutlined />
          </span>
          <span className='question-unlike__icon'>
            <DislikeOutlined />
          </span>
        </div>
      </Row>
    </Card>
  );
};
export default Question;
