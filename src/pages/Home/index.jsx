import { Col, Row, Tabs, Typography } from 'antd';
import Header from '../../components/Header';
import './styles.css';
import Question from '../../components/Question';
import Ranking from '../../components/Ranking';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { QUESTION_API_URL, REVIEW_API_URL } from '../../utils/constants';
import { userClient } from '../../api/client';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setToken, setUser } from '../../app/reducers/authReducer';

const App = () => {
  const [questionList, setQuestionList] = useState([]);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('mostRecent');
  const [reviewDataCount, setReviewDataCount] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedStatus, setLikedStatus] = useState({});
  const user = useSelector(selectUser);
  // const [order, setOrder] = useState("desc");

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   };
  //   axios
  //     .get(`${QUESTION_API_URL}/questions`, config)
  //     .then((res) => {
  //       window.console.log("question: " + JSON.stringify(res.data, null, 2));
  //       setQuestionList(res.data);
  //     })
  //     .catch((err) => {
  //       alert("Err: ", err);
  //     });
  // }, []);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const items = [
    {
      key: 'mostRecent',
      label: 'Most Recent',
      children: (
        <>
          {questionList &&
            questionList.map((question) => {
              return (
                <Question
                  key={question.question_ID}
                  title={question.title}
                  avatar={question.avatar}
                  content={question.content}
                  tags={question.tags}
                  user_id={question.user}
                  username={question.username}
                  created_date={question.created_date}
                  category_name={question.category_name}
                  like={question.like}
                  // userLiked={
                  //   likedStatus[question.question_ID]?.[user?.id] ?? false
                  // }
                />
              );
            })}
        </>
      ),
    },
    {
      key: 'oldest',
      label: 'Oldest',
      children: (
        <>
          {questionList &&
            questionList.map((question) => {
              return (
                <Question
                  key={question.question_ID}
                  title={question.title}
                  avatar={question.avatar}
                  content={question.content}
                  tags={question.tags}
                  user_id={question.user}
                  username={question.username}
                  created_date={question.created_date}
                  category_name={question.category_name}
                  like={question.like}
                  // userLiked={
                  //   likedStatus[question.question_ID]?.[user?.id] ?? false
                  // }
                />
              );
            })}
        </>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get(`${REVIEW_API_URL}/review-question?like`, config)
      .then((res) => {
        setReviewDataCount(res.data);
      })
      .catch((err) => {
        console.error('Error fetching review data count: ', err);
      });
  }, []);

  useEffect(() => {
    const likedStatusData = reviewDataCount.reduce((acc, review) => {
      if (review.question_ID !== null) {
        const questionID = review.question_ID;
        const userID = review.user;
        if (!acc[questionID]) {
          acc[questionID] = {};
        }
        acc[questionID][userID] = review.like;
      }
      return acc;
    }, {});

    // const likeCountsData = reviewDataCount.reduce((acc, review) => {
    //   if (review.question_ID !== null && review.like === true) {
    //     const questionID = review.question_ID;
    //     acc[questionID] = (acc[questionID] || 0) + 1;
    //   }
    //   return acc;
    // }, {});
    // setLikeCounts(likeCountsData);
    setLikedStatus(likedStatusData);
  }, [reviewDataCount]);

  useEffect(() => {
    const token = localStorage.getItem(`token`);
    if (token) {
      userClient.defaults.headers['Authorization'] = `Bearer ${token}`;
      userClient
        .get('/user')
        .then((res) => {
          console.log(res.data);
          dispatch(setUser(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      delete userClient.defaults.headers['Authorization'];
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'mostRecent') {
      axios
        .get(
          `${QUESTION_API_URL}/questions?sort=created_date&order=desc`,
          config
        )
        .then((res) => {
          const updatedQuestionList = res.data.map((question) => {
            return {
              ...question,
              like: likeCounts[question.question_ID] || 0,
            };
          });
          setQuestionList(updatedQuestionList);
        })
        .catch((err) => {
          alert('Err: ', err);
        });
    } else if (activeTab === 'oldest') {
      axios
        .get(
          `${QUESTION_API_URL}/questions?sort=created_date&order=asc`,
          config
        )
        .then((res) => {
          const updatedQuestionList = res.data.map((question) => {
            return {
              ...question,
              like: likeCounts[question.question_ID] || 0,
            };
          });
          setQuestionList(updatedQuestionList);
        })
        .catch((err) => {
          alert('Err: ', err);
        });
    }
  }, [activeTab, likeCounts]); // Gọi lại khi activeTab thay đổi

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
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
              <Tabs
                activeKey={activeTab}
                items={items}
                onChange={handleTabChange}
              />
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
