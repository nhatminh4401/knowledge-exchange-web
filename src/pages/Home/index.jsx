import { Col, Row, Tabs, Typography } from "antd";
import Header from "../../components/Header";
import "./styles.css";
import Question from "../../components/Question";
import Ranking from "../../components/Ranking";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { QUESTION_API_URL } from "../../utils/constants";
const App = () => {
  const [questionList, setQuestionList] = useState([]);
  const [activeTab, setActiveTab] = useState("mostRecent");
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
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const items = [
    {
      key: "mostRecent",
      label: "Most Recent",
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
                />
              );
            })}
        </>
      ),
    },
    {
      key: "oldest",
      label: "Oldest",
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
                />
              );
            })}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (activeTab === "mostRecent") {
      axios
        .get(
          `${QUESTION_API_URL}/questions?sort=created_date&order=desc`,
          config
        )
        .then((res) => {
          window.console.log("question: " + JSON.stringify(res.data, null, 2));
          setQuestionList(res.data);
        })
        .catch((err) => {
          alert("Err: ", err);
        });
    } else if (activeTab === "oldest") {
      axios
        .get(
          `${QUESTION_API_URL}/questions?sort=created_date&order=asc`,
          config
        )
        .then((res) => {
          window.console.log("question: " + JSON.stringify(res.data, null, 2));
          setQuestionList(res.data);
        })
        .catch((err) => {
          alert("Err: ", err);
        });
    }
  }, [activeTab]); // Gọi lại khi activeTab thay đổi

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="container">
          <div>
            <Typography.Title level={1}>Questions</Typography.Title>
            <p>Ask a question and get a quick answer.</p>
          </div>
          <Row>
            <Col span={18} className="questions">
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
