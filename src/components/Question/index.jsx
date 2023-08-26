import { Avatar, Badge, Card, Row } from "antd";
import "./styles.css";
import { LikeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../app/reducers/authReducer";
import { reviewClient } from "../../api/client";
import { useEffect, useState } from "react";

const Question = ({
  title,
  avatar,
  content,
  tags,
  user_id,
  username,
  created_date,
  category_name,
  questionId,
  like,
  reviewId,
  userLiked,
}) => {
  const token = useSelector(selectToken);
  const [likeCount, setLikeCount] = useState(0);
  const handleLikeQuestion = () => {
    if (reviewId) {
      reviewClient
        .put(`/review-question?id=${reviewId}`, {
          like: true,
        })
        .then((res) => {
          console.log(res.data);
          setLikeCount(likeCount + 1);
        });
    } else {
      reviewClient
        .post(`/review-question`, {
          question_id: questionId,
          like: true,
          rating: 1,
          report: "",
        })
        .then((res) => {
          console.log(res.data);
          setLikeCount(likeCount + 1);
        });
    }
  };

  useEffect(() => {
    reviewClient.get(`/review-question?id=${questionId}`).then((res) => {
      setLikeCount(res.data.length);
    });
  }, []);

  return (
    <Card className="question">
      <Link to={`/question/${questionId}`} style={{ color: "black" }}>
        <h3 className="question-title">{title}</h3>
      </Link>
      <div className="question-content">{content}</div>

      <ul className="tag-list">
        {tags &&
          tags?.map((item, index) => {
            return (
              <li key={index} className="tag-item">
                {item}
              </li>
            );
          })}
      </ul>
      <div className="question-category">{category_name}</div>
      <Row justify="space-between" className="question-footer">
        <div className="question-author">
          by
          {/* <div className="question-author__avatar"></div> */}
          <Link to={`/profile/${user_id}`}>
            <Avatar
              icon=""
              size={"30px"}
              src={avatar}
              style={{ marginLeft: 5, marginRight: 5 }}
            >
              {username?.charAt(0).toUpperCase()}
            </Avatar>
            {/* <div className="avatar">avatar</div> */}
          </Link>
          <span className="question-author__name">{username}</span>
          <span className="question-author__time">
            {moment(created_date).fromNow()}
          </span>
        </div>
        <div className="question-like">
          <Badge
            className="question-like__count"
            count={likeCount > 0 ? Number(likeCount) : 0}
          />
          <span className="question-like__icon">
            <LikeOutlined
              onClick={() => {
                if (!token) {
                  alert("Unauthorized access to like, please login first!");
                } else {
                  if (userLiked) {
                    alert("You already liked this question!");
                  } else {
                    handleLikeQuestion();
                  }
                }
              }}
            />
          </span>
        </div>
      </Row>
    </Card>
  );
};
export default Question;
