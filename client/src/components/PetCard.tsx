import React from "react";
import { Card, Placeholder, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/Account/Cart.css";

export default function PetCard({ pet, isLoading, user, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
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
            onClick={handleCardClick}
        >
            {isLoading ? (
                <Placeholder as={Card.Img} variant="top" animation="wave">
                    <Placeholder xs={12} />
                </Placeholder>
            ) : (
                <Card.Img
                    variant="top"
                    src={pet.photo ||"https://via.placeholder.com/150"}
                    alt={pet.name}
                />
            )}
            <Card.Body>
                {isLoading ? (
                    <>
                        <Placeholder as={Card.Title} animation="wave">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="wave">
                            <Placeholder xs={7} />
                            <Placeholder xs={4} />
                            <Placeholder xs={4} />
                            <Placeholder xs={6} />
                            <Placeholder xs={8} />
                        </Placeholder>
                        <Placeholder.Button variant="primary" xs={6} />
                    </>
                ) : (
                    <>
                        <Card.Title>{pet?.name}</Card.Title>
                        <Card.Text className="pet-description">
                            {pet?.description}
                        </Card.Text>
                        <Card.Text>
                            <strong>Вид:</strong> {pet?.species}
                        </Card.Text>
                        <Card.Text>
                            <strong>Порода:</strong> {pet?.breed}
                        </Card.Text>
                        <Card.Text>
                            <strong>Возраст:</strong> {pet?.age}
                        </Card.Text>
                        <Card.Text>
                            <strong>Телефон:</strong> {pet?.phone}
                        </Card.Text>
                        <Card.Text>
                            <strong>Город:</strong> {pet?.city}
                        </Card.Text>
                        {user?.id === pet?.ownerId ? (
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
                        ) : (
                            <Button
                                variant="primary"
                                style={{ width: "100%" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert(
                                        "Only owners can edit or delete pets"
                                    );
                                }}
                            >
                                Details
                            </Button>
                        )}
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
