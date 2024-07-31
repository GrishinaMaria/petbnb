import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import log from '../../logo/Petbnb.jpg';

const Footer = () => {
  return (
    <footer
      className="bg-primary text-light py-4"
      style={{
        //position: 'fixed',
        bottom: 0,
        width: '100%',
        // backgroundColor: 'green', //цвет фон
        zIndex: 1000,
        marginTop: '600px', // Отступ сверху
        borderRadius: '90% 90% 0% 0%',
      }}
    >
      <Container>
        <Row>
          <Col md={3}>
            <img
              src={log}
              alt="12321312"
              style={{
                width: '120px', // Устанавливаем ширину изображения
                height: 'auto', // Высота будет пропорциональна ширине
                borderRadius: '10px', // Применяем закругление углов
                marginTop: '5px', // Добавляем отступ сверху
              }}
            />
          </Col>
          <Col md={3}>
            <h5>Контакты</h5>
            <p>Телефон: +7 (777) 495-77-77</p>
          </Col>
          <Col md={3}>
            <h5>Адрес офиса</h5>
            <p>г.Белград, Бранкова ул. </p>
          </Col>
          <Col md={3}>
            <h5>Email службы поддержки</h5>
            <p>PetBnB@PetBnB.ru</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
