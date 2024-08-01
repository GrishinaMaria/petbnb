import React from "react";
import { Card, Button,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/Account/Cart.css";
import {EditPetForm} from "../components/EditPetForm";


export default function PetCard({ pet, user, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handlePetCardClick = () => {
        navigate(`/pets/${pet.id}`);
    };
    return (
        <Card
            className="mb-4 pet-card"
            style={{
                width: "15em",
                backgroundColor: "black",
                color: "white",
                borderRadius: "20px",
            }}
            onClick={handlePetCardClick}
        >
                <Card.Img
                    variant="top"
                    //src={pet.photo ||"https://via.placeholder.com/150"}
                    src={pet.photo || "https://images.dog.ceo/breeds/hound-english/n02089973_846.jpg"}
                    alt={pet.name}
                />
            <Card.Body>
                        <Card.Title>
                            <strong>Имя:</strong>{pet?.name}
                        </Card.Title>
                        <Card.Text>
                            <strong>Порода:</strong> {pet?.breed}
                        </Card.Text>
                        <Card.Text>
                            <strong>Вид:</strong> {pet?.type}
                        </Card.Text>
                        <Card.Text><strong>Описание:</strong>
                            {pet?.description}
                        </Card.Text>
                        <Card.Text>
                            <strong>Возраст:</strong> {pet?.age}
                        </Card.Text>
                        {user?.id === pet?.ownerId && (
                    <>
                        <Button
                            variant="danger"
                            style={{ width: "100%" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(pet?.id);
                            }}
                        >
                            Удалить
                        </Button>
                        <Button
                            variant="warning"
                            style={{ width: "100%", marginTop: "10px" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(pet);
                            }}
                        >
                            Редактировать
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
