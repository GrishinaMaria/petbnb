import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axiosInstance from '.././axiosInstance';
const { VITE_API } = import.meta.env;

export default function EditPetForm({ onHide, petToEdit, onSave }) {

    const [pet, setPet] = useState({
        name: "",
        breed: "",
        type: "",
        description: "",
        photo: "",
        age: "",
      });
    
      useEffect(() => {
        if (petToEdit) {
          setPet(petToEdit);
        } else {
          setPet({
            name: "",
            breed: "",
            type: "",
            description: "",
            photo: "",
            age: "",
          });
        }
      }, [petToEdit]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPet((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSave = async (e) => {
        e.preventDefault();
        try {
          if (petToEdit) {
            await axiosInstance.patch(`${VITE_API}/owneraccount/${petToEdit.id}`, pet);
          } else {
            await axiosInstance.post(`${VITE_API}/owneraccount`, pet);
          }
          onSave();
          onHide();
        } catch (error) {
          console.error('Ошибка при сохранении питомца', error);
        }
      };

      
  return (
    <>
        <Form onSubmit={handleSave}>
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              name="name"
              value={pet.name}
              onChange={handleInputChange}
              placeholder="Имя питомца"
              // required
            />
          </Form.Group>
          <Form.Group controlId="breed" style={{ marginTop: "30px" }}>
            <Form.Control
              type="text"
              name="breed"
              value={pet.breed}
              onChange={handleInputChange}
              placeholder="Порода"
              // required
            />
          </Form.Group>
          <Form.Group controlId="type" style={{ marginTop: "30px" }}>
            <Form.Control
              type="text"
              name="type"
              value={pet.type}
              onChange={handleInputChange}
              placeholder="Вид"
              // required
            />
          </Form.Group>
          <Form.Group controlId="description" style={{ marginTop: "30px" }}>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={pet.description}
              onChange={handleInputChange}
              placeholder="Описание"
              // required
            />
          </Form.Group>
          <Form.Group controlId="age" style={{ marginTop: "30px" }}>
            <Form.Control
              type="number"
              name="age"
              value={pet.age}
              onChange={handleInputChange}
              placeholder="Возраст"
              // required
            />
          </Form.Group>
          <Form.Group controlId="photo" style={{ marginTop: "30px" }}>
            <Form.Control
              type="text"
              name="photo"
              value={pet.photo}
              onChange={handleInputChange}
              placeholder="Ссылка на фото"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "30px" }}>
            {petToEdit ? "Обновить питомца" : "Добавить питомца"}
          </Button>
        </Form>
    </>
  )
}
