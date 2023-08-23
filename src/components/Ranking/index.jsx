import { Avatar, Badge, Card } from 'antd';
import './styles.css';
import { CrownOutlined } from '@ant-design/icons';

const Ranking = () => {
  return (
    <Card className='ranking'>
      <h2 className='ranking-title'>
        <CrownOutlined />
        Ranking
        <CrownOutlined />
      </h2>
      <ul className='ranking-list'>
        <li className='ranking-item'>
          <span className='ranking-number'>1</span>
          <Badge count={99} className='ranking-avatar'>
            <Avatar shape='circle' size='large' />
          </Badge>
          <div className='ranking-info'>
            <span className='ranking-author'>Min</span>
            <span className='ranking-score'>lead</span>
          </div>
        </li>

        <li className='ranking-item'>
          <span className='ranking-number'>2</span>
          <Badge count={99} className='ranking-avatar'>
            <Avatar shape='circle' size='large' />
          </Badge>
          <div className='ranking-info'>
            <span className='ranking-author'>Min</span>
            <span className='ranking-score'>ahihi</span>
          </div>
        </li>
      </ul>
    </Card>
  );
};
export default Ranking;
