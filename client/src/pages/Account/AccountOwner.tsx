import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import PetCard from '../../components/PetCard'; 
import  EditPetForm from "../../components/EditPetForm";

const { VITE_API } = import.meta.env;

export default function OwnerAccount({ user }) {
    const [pets, setPets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPet, setNewPet] = useState({
        name: "",  // имя питомца
        species: "", //вид
        breed: "", //порода
        age: "",  //возраст
        description: "", //описание о животном
        phone: "", // сот телефон
        city: "", // город
        photo: "", //фото
    });
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const { data } = await axiosInstance.get(`${VITE_API}/pets/mine`);
                setPets(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchPets();
    }, []);

    const handleInputChange = (e) => {
        setNewPet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axiosInstance.put(
                    `${VITE_API}/pets/${newPet.id}`,
                    newPet
                );
            } else {
                await axiosInstance.post(`${VITE_API}/pets`, newPet);
            }
            setShowModal(false);
            setIsEdit(false);
            setNewPet({
                name: "",
                species: "",
                breed: "",
                age: "",
                description: "",
                phone: "",  
                photo: "",
            });
            const { data } = await axiosInstance.get(`${VITE_API}/pets/mine`);
            setPets(data);
        } catch (error) {
            console.log("Error adding pet:", error);
        }
    };

    const handleDeletePet = async (petId) => {
        try {
            await axiosInstance.delete(`${VITE_API}/pets/${petId}`);
            setPets(pets.filter((pet) => pet.id !== petId));
        } catch (error) {
            console.log("Error deleting pet:", error);
        }
    };

    const handleEditPet = (pet) => {
        setNewPet(pet);
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
                        Добавьте описание о вашем питомце
                    </Button>
                </Col>
            </Row>
            <h2>Ваши питомцы:</h2>
            <Row>
                {pets.map((pet) => (
                    <Col key={pet.id} md={3}>
                        <PetCard
                            pet={pet}
                            isLoading={isLoading}
                            user={user}
                            onDelete={handleDeletePet}
                            onEdit={handleEditPet}
                        />
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dark">
                        {isEdit
                            ? "Редактировать информацию о питомце"
                            : "Добавить новую информация о питомце"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddPet} style={{ marginTop: "10px" }}>
                        <Form.Group controlId="name">
                            <Form.Control
                                type="text"
                                name="name"
                                value={newPet.name}
                                onChange={handleInputChange}
                                placeholder="Имя"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="species"
                            style={{ marginTop: "30px" }}
                        >
                            <Form.Control
                                type="text"
                                name="species"
                                value={newPet.species}
                                onChange={handleInputChange}
                                placeholder="Вид"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="breed"
                            style={{ marginTop: "30px" }}
                        >
                            <Form.Control
                                type="text"
                                name="breed"
                                value={newPet.breed}
                                onChange={handleInputChange}
                                placeholder="Порода"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="age"
                            style={{ marginTop: "30px" }}
                        >
                            <Form.Control
                                type="number"
                                name="age"
                                value={newPet.age}
                                onChange={handleInputChange}
                                placeholder="Возраст"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="description"
                            style={{ marginTop: "30px" }}
                        >
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={newPet.description}
                                onChange={handleInputChange}
                                placeholder="Описание"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="phone"
                            style={{ marginTop: "30px" }}
                        >
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="phone"
                                value={newPet.phone}
                                onChange={handleInputChange}
                                placeholder="Сотовый телефон"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="city"
                            style={{ marginTop: "30px" }}
                        >
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="city"
                                value={newPet.city}
                                onChange={handleInputChange}
                                placeholder="Город"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="photo"
                            style={{ marginTop: "30px" }}
                        >
                            <Form.Control
                                type="text"
                                name="photo"
                                value={newPet.photo}
                                onChange={handleInputChange}
                                placeholder="Ссылка на фото"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ marginTop: "30px" }}
                        >
                            {isEdit ? "Обновить питомца" : "Добавить питомца"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
