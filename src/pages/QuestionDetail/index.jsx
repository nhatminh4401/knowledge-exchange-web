import { Button, Card, Col, Row } from "antd";
import Typography from "antd/es/typography/Typography";
import "./styles.css";
import Header from "../../components/Header";
import Comment from "../../components/Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import { QUESTION_API_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/reducers/authReducer";
import { userClient } from "../../api/client";
import moment from "moment";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

const QuestionDetail = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState({});
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`${QUESTION_API_URL}/questions?id=${id}`, config)
      .then((res) => {
        console.log(res.data);
        setQuestionData(res.data[0]);
      })
      .catch((err) => {
        alert("Error: Question not exists", err);
        setQuestionData([]);
      });
  }, [id]);

  const token = localStorage.getItem(`token`);
  useEffect(() => {
    if (token) {
      userClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      // reviewClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      userClient
        .get("/user")
        .then((res) => {
          console.log(res.data);
          dispatch(setUser(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
      // axios
      //   .get(`${REVIEW_API_URL}/review-question?like`, config)
      //   .then((res) => {
      //     setReviewDataCount(res.data);
      //   })
      //   .catch((err) => {
      //     console.error("Error fetching review data count: ", err);
      //   });
      // reviewClient
      //   .get("/review")
      //   .then((res) => {
      //     console.log(res.data);
      //     setReviewList([...res.data]);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } else {
      delete userClient.defaults.headers["Authorization"];
    }
  }, [token, dispatch]);

  return (
    <>
      <Header />
      <main className="wrapper">
        <div className="container">
          <Typography.Title level={1}>{questionData?.title}</Typography.Title>
          <Typography.Title className="question-category" level={3}>
            {questionData?.category_name}
          </Typography.Title>
          <Row>
            <div className="question-author">
              by
              <Link to={`/profile/${questionData?.user}`}>
                <Avatar
                  icon=""
                  size={"30px"}
                  src={questionData?.avatar}
                  style={{ marginLeft: 5, marginRight: 5 }}
                >
                  {questionData?.username?.charAt(0).toUpperCase()}
                </Avatar>
                {/* <div className="avatar">avatar</div> */}
              </Link>
              <span className="question-author__name">
                {questionData?.username}
              </span>
              <span className="question-author__time">
                {moment(questionData?.created_date).fromNow()}
              </span>
            </div>
          </Row>
          <Row>
            <div className="question-content">{questionData?.content}</div>
          </Row>
          <Row>
            <ul className="tag-list">
              {questionData?.tags &&
                questionData?.tags?.map((item, index) => {
                  return (
                    <li key={index} className="tag-item">
                      {item}
                    </li>
                  );
                })}
            </ul>
          </Row>
          <Row className="answer-section">
            <Typography.Title level={2}>2 answers</Typography.Title>
            <Col span={24}>
              <Card>
                <div className="answer-author">
                  <div className="answer-author__avatar"></div>
                  <span className="answer-author__name">Min</span>
                  <span className="answer-author__time">25 Aug 2023</span>
                </div>
                <div className="answer-content">Hello</div>
                <ul className="comment-list">
                  <Comment />
                  <Comment />
                </ul>
              </Card>
              <Col>
                <form className="comment-form">
                  <div className="comment-form__title">Comment</div>
                  <textarea className="comment-form__textarea"></textarea>
                  <Button className="comment-form__btn">
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
