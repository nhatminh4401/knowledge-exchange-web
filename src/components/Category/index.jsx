import { Card } from 'antd';
import './styles.css';

const Category = () => {
  return (
    <Card className='category'>
      <h3 className='category-id'>1</h3>
      <div className='category-name'>Technology</div>
      <div className='question-number'>10</div>
    </Card>
  );
};
export default Category;
