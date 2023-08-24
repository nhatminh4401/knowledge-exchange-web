import { Button, Row } from 'antd';
import { useState } from 'react';

const Comment = () => {
  const [isShowReply, setIsShowReply] = useState(false);

  const handleShowReplyForm = () => {
    setIsShowReply(!isShowReply);
  };

  return (
    <li className='comment-item'>
      <div className='comment-content'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        voluptatum.
      </div>
      <Row>
        <div className='comment-author'>
          by
          <span className='comment-author__name'>Min</span>
          <span className='comment-author__time'>25 Aug 2023</span>
        </div>
        <div className='comment-reply'>
          <span className='comment-reply__text' onClick={handleShowReplyForm}>
            Reply
          </span>
        </div>
      </Row>
      <ul className='reply-list'>
        <li className='reply-item'>
          <div className='reply-content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </div>
          <Row>
            <div className='reply-author'>
              by
              <span className='reply-author__name'>Min</span>
              <span className='reply-author__time'>25 Aug 2023</span>
            </div>
          </Row>
        </li>
        <li className='reply-item'>
          <div className='reply-content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </div>
          <Row>
            <div className='reply-author'>
              by
              <span className='reply-author__name'>Min</span>
              <span className='reply-author__time'>25 Aug 2023</span>
            </div>
          </Row>
        </li>
      </ul>
      {isShowReply && (
        <form className='comment-form'>
          <div className='comment-form__title'>Comment</div>
          <textarea className='comment-form__textarea'></textarea>
          <Button className='comment-form__btn'>Reply</Button>
        </form>
      )}
    </li>
  );
};
export default Comment;
