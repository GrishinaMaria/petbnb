import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import axiosInstance from '../../axiosInstance';
const { VITE_API } = import.meta.env;


const FormUpdSitter= ({oneSitter, setOneSitter}): JSX.Element =>{
 const [showModal, setShowModal] = useState(false);
    const  [username, setUserName] = useState(oneSitter?.username || "")
    const [description, setDescription] = useState(oneSitter?.description || "")
    const [experience, setExperience] = useState(oneSitter?.experience || "")
    const [photo, setPhoto] = useState(oneSitter?.photo || "")
    const [geoX, setGeoX] = useState(oneSitter?.geoX)
    const [geoY, setGeoY] = useState(oneSitter?.geoY)
    const [city, setCity] = useState(oneSitter?.city || "")
    const [phone, setPhone] = useState(oneSitter?.phone || "")
    
   useEffect(() => {
    if (oneSitter) {
        setUserName(oneSitter.username || "");
        setDescription(oneSitter.description || "");
        setExperience(oneSitter.experience || "");
        setPhoto(oneSitter.photo || "");
        setGeoX(oneSitter.geoX);
        setGeoY(oneSitter.geoY);
        setCity(oneSitter.city || "");
        setPhone(oneSitter.phone || "");
    }
}, [oneSitter]);
 
  const handleSaveSitter = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.patch(`${VITE_API}/petsitter`, {username, description, experience, photo, geoX, geoY, city, phone});
        console.log('dataaaa', data);
      
      setOneSitter(data)
      setShowModal(false);
      
    } catch (error) {
      console.error('ошибка handleSaveSitter', error);
    }
  };
const handleImageChange = (e) => {
 const file = e.target.files[0];
 if (file) {
 const reader = new FileReader();
 reader.onload = () => {
    //  setPhoto(reader.result);
     console.log(reader.result);
     
 };
 reader.readAsDataURL(file);
  }
};
return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Добро пожаловать, {oneSitter?.username}</h2>
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
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Имя"
                // required
              />
            </Form.Group>
            <Form.Group controlId="experience" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="experience"
                value={experience}
                onChange={(e)=> setExperience(e.target.value)}
                placeholder="Опыт работы"
                // required
              />
            </Form.Group>
            <Form.Group controlId="description" style={{ marginTop: "30px" }}>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                placeholder="Описание"
                // required
              />
            </Form.Group>
            <Form.Group controlId="phone" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="phone"
                value={phone}
                onChange={(e)=> setPhone(e.target.value)}
                placeholder="Контактный номер"
                // required
              />
            </Form.Group>
            <Form.Group controlId="city" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="city"
                value={city}
                onChange={(e)=> setCity(e.target.value)}
                placeholder="Город"
                // required
              />
            </Form.Group>
            <Form.Group controlId="photo" style={{ marginTop: "30px" }}>
              <Form.Control
                type="text"
                name="photo"
                value={photo}
                onChange={(e)=> setPhoto(e.target.value)}
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
)

}
export default FormUpdSitter
