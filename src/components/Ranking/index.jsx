import { Avatar, Badge, Card } from "antd";
import "./styles.css";
import { CrownOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { USER_API_URL } from "../../utils/constants";
import { getRankByPoints } from "../../utils/utils";
const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    axios
      .get(`${USER_API_URL}/user/ranking/?limit=10`, config)
      .then((res) => {
        window.console.log("aaa: " + JSON.stringify(res.data, null, 2));
        setRanking(res.data);
      })
      .catch((err) => {
        alert("Err: ", err);
      });
  }, []);

  return (
    <Card className="ranking">
      <h2 className="ranking-title">
        <CrownOutlined />
        Ranking
        <CrownOutlined />
      </h2>
      <ul className="ranking-list">
        {ranking.map((item, index) => (
          <li className="ranking-item" key={index}>
            <span
              className="ranking-number"
              style={{
                flex: 3,
                color:
                  index === 0
                    ? "gold"
                    : index === 1
                    ? "silver"
                    : index === 2
                    ? "brown"
                    : "black",
              }}
            >
              {index + 1}
            </span>
            <Badge
              count={getRankByPoints(item?.points)}
              className="ranking-avatar"
              style={{ flex: 3 }}
            >
              {item?.avatar ? (
                <Avatar shape="circle" size="large" src={item?.avatar} />
              ) : (
                <Avatar
                  shape="circle"
                  size="large"
                  style={{ backgroundColor: "grey" }}
                >
                  {item?.username?.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Badge>
            <div
              className="ranking-info"
              style={{ flex: 4, marginLeft: "25px" }}
            >
              <span className="ranking-author">
                {item?.username?.length > 8
                  ? item?.username?.substring(0, 8) + "..."
                  : item?.username}
              </span>
              <span className="ranking-score">{item?.points}</span>
            </div>
          </li>
        ))}

        {/* // <li className='ranking-item'>
        //   <span className='ranking-number'>1</span>
        //   <Badge count={99} className='ranking-avatar'>
        //     <Avatar shape='circle' size='large' />
        //   </Badge>
        //   <div className='ranking-info'>
        //     <span className='ranking-author'>Min</span>
        //     <span className='ranking-score'>lead</span>
        //   </div>
        // </li>

        // <li className='ranking-item'>
        //   <span className='ranking-number'>2</span>
        //   <Badge count={99} className='ranking-avatar'>
        //     <Avatar shape='circle' size='large' />
        //   </Badge>
        //   <div className='ranking-info'>
        //     <span className='ranking-author'>Min</span>
        //     <span className='ranking-score'>ahihi</span>
        //   </div>
        // </li> */}
      </ul>
    </Card>
  );
};
export default Ranking;
