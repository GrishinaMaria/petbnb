import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import PetCard from '../../components/PetCard';
import PetModal from '../../components/PetModal';
import EditPetForm from "../../components/EditPetForm";

const { VITE_API } = import.meta.env;

export default function NewAccountOwner({ user }) {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axiosInstance.get(`${VITE_API}/owneraccount`);
        setPets(data.myPets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  const handleAddPet = () => {
    setCurrentPet(null);
    setShowModal(true);
  };

  const handleEditPet = (pet) => {
    setCurrentPet(pet);
    setShowModal(true);
  };

  const handleDeletePet = async (petId) => {
    try {
      await axiosInstance.delete(`${VITE_API}/owneraccount/${petId}`);
      setPets(pets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.log("Ошибка handleDeletePet", error);
    }
  };


  const handleSavePet = () => {
    setShowModal(false);
    // Заново загрузить список питомцев после сохранения
    fetchPets();
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Добро пожаловать, {user.username}</h2>
          <Button onClick={handleAddPet}>Добавить описание о питомце</Button>
        </Col>
      </Row>
      <h2>Ваши питомцы:</h2>
      <Row>
        {pets.map((pet) => (
          <Col key={pet.id} md={3}>
            <PetCard
              pet={pet}
              onDelete={() => handleDeletePet(pet.id)}
              onEdit={() => handleEditPet(pet)}
            />
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPet ? "Редактировать питомца" : "Добавить питомца"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPetForm
            onHide={() => setShowModal(false)}
            petToEdit={currentPet}
            onSave={handleSavePet}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}