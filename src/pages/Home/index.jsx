import { Col, Row, Tabs, Typography } from 'antd';
import Header from '../../components/Header';
import './styles.css';
import Question from '../../components/Question';
import Ranking from '../../components/Ranking';

const App = () => {
  const items = [
    {
      key: '1',
      label: 'Most Recent',
      children: (
        <>
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </>
      ),
    },
    {
      key: '2',
      label: 'Oldest',
      children: (
        <>
          <Question />
        </>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Header />
      <div className='wrapper'>
        <div className='container'>
          <div>
            <Typography.Title level={1}>Questions</Typography.Title>
            <p>Ask a question and get a quick answer.</p>
          </div>
          <Row>
            <Col span={18} className='questions'>
              <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
            </Col>
            <Col span={5}>
              <Ranking />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default App;
