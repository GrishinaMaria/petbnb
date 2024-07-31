import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axiosInstance from '../../axiosInstance';

const { VITE_API } = import.meta.env;

export default function NewAccountSitter({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [currentSitter, setCurrentSitter] = useState({
    username: user.username || "",
    // age: user.age || "",
    description: user.description || "",
    experience: user.experience,
    photo: user.photo || "",
    geoX: user.geoX,
    geoY: user.geoY,
    city: user.city || "",
    phone: user.phone || "",
  });

  const handleInputChange = (e) => {
    setCurrentSitter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveSitter = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`${VITE_API}/petsitter`, currentSitter);
      setShowModal(false);
    } catch (error) {
      console.error('ошибка handleSaveSitter', error);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Добро пожаловать, {user.username}</h2>
          <Button onClick={() => setShowModal(true)}>
            Редактировать информацию о себе
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            Редактировать информацию о ситтере
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveSitter}>
            <Form.Group controlId="username">
              <Form.Control
                type="text"
                name="username"
                value={currentSitter.username}
                onChange={handleInputChange}
                placeholder="Имя"
                // required
              />
            </Form.Group>
            <Form.Group controlId="experience" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="experience"
                value={currentSitter.experience}
                onChange={handleInputChange}
                placeholder="Опыт работы"
                // required
              />
            </Form.Group>
            <Form.Group controlId="description" style={{ marginTop: "30px" }}>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentSitter.description}
                onChange={handleInputChange}
                placeholder="Описание"
                // required
              />
            </Form.Group>
            <Form.Group controlId="phone" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="phone"
                value={currentSitter.phone}
                onChange={handleInputChange}
                placeholder="Контактный номер"
                // required
              />
            </Form.Group>
            <Form.Group controlId="city" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="city"
                value={currentSitter.city}
                onChange={handleInputChange}
                placeholder="Город"
                // required
              />
            </Form.Group>
            <Form.Group controlId="photo" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="photo"
                value={currentSitter.photo}
                onChange={handleInputChange}
                placeholder="Ссылка на фото"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: "30px" }}>
              Обновить информацию
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
