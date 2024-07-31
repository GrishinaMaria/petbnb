import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Add this import
import axiosInstance from '../../axiosInstance';
import SitterCard from '../../components/SitterCard'; 
 

const { VITE_API } = import.meta.env;

export default function BuyerAccount({ user }) {
  const [sitters, setSitters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSitter, setNewSitter] = useState({
    name: "", // имя sittera
    age: "", // возраст
    experience: "", // опыт работы
    description: "", // описание о себе
    phone: "", // сот номер
    city: "", // город
    photo: "", // фото
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSitters = async () => {
      try {
        const { data } = await axiosInstance.get(`${VITE_API}/sitters/mine`);
        setSitters(data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching info sitters:', error);
        setIsLoading(false);
      }
    };

    fetchSitters();
  }, []);

  const handleInputChange = (e) => {
    setNewSitter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSitter = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axiosInstance.put(`${VITE_API}/sitters/${newSitter.id}`, newSitter);
      } else {
        await axiosInstance.post(`${VITE_API}/sitters`, newSitter);
      }
      setShowModal(false);
      setIsEdit(false);
      setNewSitter({
        name: "",
        age: "",
        experience: "",
        description: "",
        phone: "",
        city: "",
        photo: "",
      });
      const { data } = await axiosInstance.get(`${VITE_API}/sitters/mine`);
      setSitters(data);
    } catch (error) {
      console.log('Error adding info sitter:', error);
    }
  };

  const handleDeleteSitter = async (sitterId) => {
    try {
      await axiosInstance.delete(`${VITE_API}/sitters/${sitterId}`);
      setSitters(sitters.filter((sitter) => sitter.id !== sitterId));
    } catch (error) {
      console.log('Error deleting info sitter:', error);
    }
  };

  const handleEditSitter = (sitter) => {
    setNewSitter(sitter);
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Добро пожаловать, {user.username}</h2>
          <Button
            onClick={() => {
              setShowModal(true);
              setIsEdit(false);
            }}
          >
            Добавьте информацию о себе
          </Button>
        </Col>
      </Row>
      <h2></h2>
      <Row>
        {sitters.map((sitter) => (
          // <Col key={sitter.id} md={3}>
          //   <div className="sitter-card">
          //     <img src={sitter.photo} alt={sitter.name} />
          //     <h3>{sitter.name}</h3>
          //     <p>{sitter.description}</p>
          //     <Button variant="warning" onClick={() => handleEditSitter(sitter)}>Редактировать</Button>
          //     <Button variant="danger" onClick={() => handleDeleteSitter(sitter.id)}>Удалить</Button>
          //   </div>
          // </Col>
          <Col key={sitter.id} md={3}>
          <SitterCard
              sitter={sitter}
              isLoading={isLoading}
              user={user}
              onDelete={handleEditSitter}
              onEdit={handleDeleteSitter}
          />
      </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            {isEdit ? "Редактировать информацию о sitter" : "Добавить новую информация о sitter"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSitter} style={{ marginTop: "10px" }}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                value={newSitter.name}
                onChange={handleInputChange}
                placeholder="Имя"
                required
              />
            </Form.Group>
            <Form.Group controlId="age" style={{ marginTop: "30px" }}>
              <Form.Control
                type="number"
                name="age"
                value={newSitter.age}
                onChange={handleInputChange}
                placeholder="Возраст"
                required
              />
            </Form.Group>
            <Form.Group controlId="experience" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="experience"
                value={newSitter.experience}
                onChange={handleInputChange}
                placeholder="Опыт работы"
                required
              />
            </Form.Group>
            <Form.Group controlId="description" style={{ marginTop: "30px" }}>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newSitter.description}
                onChange={handleInputChange}
                placeholder="Описание"
                required
              />
            </Form.Group>
            <Form.Group controlId="phone" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="phone"
                value={newSitter.phone}
                onChange={handleInputChange}
                placeholder="Сотовый номер"
                required
              />
            </Form.Group>
            <Form.Group controlId="city" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="city"
                value={newSitter.city}
                onChange={handleInputChange}
                placeholder="Город"
                required
              />
            </Form.Group>
            <Form.Group controlId="photo" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="photo"
                value={newSitter.photo}
                onChange={handleInputChange}
                placeholder="Ссылка на фото"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: "30px" }}>
              {isEdit ? "Обновить информацию" : "Добавить информацию"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

