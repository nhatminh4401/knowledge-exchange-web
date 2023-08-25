import { Avatar, Badge, Card, Row } from "antd";
import "./styles.css";
import { LikeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../app/reducers/authReducer";
const Question = ({
  title,
  avatar,
  content,
  tags,
  user_id,
  username,
  created_date,
  category_name,
  like,
  userLiked,
}) => {
  const token = useSelector(selectToken);
  return (
    <Card className="question">
      <h3 className="question-title">{title}</h3>
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
            count={like > 0 ? Number(like) : 0}
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
                    alert("Liked!");
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
