import React from "react";
import { Card, Placeholder, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/Account/Cart.css";

export default function SitterCard({
    sitter,
    isLoading,
    user,
    onEdit,
    onDelete,
}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/sitters/${sitter.id}`);
    };

    return (
        <Card
            className="mb-4 sitter-card"
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
                    src="https://via.placeholder.com/150"
                    alt={sitter.name}
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
                        <Card.Title>{sitter?.name}</Card.Title>
                        <Card.Text className="sitter-description">
                            {sitter?.description}
                        </Card.Text>
                        <Card.Text>
                            <strong>Возраст:</strong> {sitter?.age}
                        </Card.Text>
                        <Card.Text>
                            <strong>Опыт работы:</strong> {sitter?.experience}
                        </Card.Text>
                        <Card.Text>
                            <strong>Телефон:</strong> {sitter?.phone}
                        </Card.Text>
                        <Card.Text>
                            <strong>Город:</strong> {sitter?.city}
                        </Card.Text>
                        {user?.id === sitter?.ownerId ? (
                            <>
                                <Button
                                    variant="danger"
                                    style={{ width: "100%" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(sitter?.id);
                                    }}
                                >
                                    Удалить
                                </Button>
                                <Button
                                    variant="warning"
                                    style={{ width: "100%", marginTop: "10px" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(sitter);
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
                                        "Only owners can edit or delete sitters"
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
