import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Message = ({show, setShow, message}) => {

  const toggleShow = () => setShow(!show);
  const toastStyle = {
    position: 'fixed',
    right: 10,
    bottom: 10,
  };
  const bodStyle = { display: 'inline-block' };
  const btnStyle = {
    backgroundColor: 'red',
    border: 0,
    padding: "0 5px",
    marginRight: 10,
  };

  return (
    <Row>
      <Col xs={6}>
        <Toast
          style={toastStyle}
          show={show}
          onClose={toggleShow}
          autohide
          delay={3000}
        >
          <Toast.Body style={bodStyle}>{message}</Toast.Body>
          <Button style={btnStyle} className="close-button" onClick={toggleShow}>x</Button>
        </Toast>
      </Col>
    </Row>
  );
}

export default Message;
