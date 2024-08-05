import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axiosInstance from ".././axiosInstance";
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
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (petToEdit) {
            setPet(petToEdit);
        } else {
            setPet({
                name: "",
                breed: "",
                type:  "",
                description: "",
                photo: "",
                age:"",
            });
        }
    }, [petToEdit]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPet((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const formErrors = {};
        if (!pet.name) formErrors.name = "Заполните поле Имя";
        if (!pet.breed) formErrors.breed = "Заполните поле Порода";
        if (!pet.type) formErrors.type = "Заполните поле Вид";
        if (!pet.description) formErrors.description = "Заполните поле Описание";
        if (!pet.age) formErrors.age = "Заполните поле Возраст";
        return formErrors;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        try {
            onSave(pet);
            onHide();
        } catch (error) {
            console.error("Ошибка при сохранении питомца", error);
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
                    />
                    {errors.name && (
                        <Form.Text className="text-danger">
                            {errors.name}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="breed" style={{ marginTop: "30px" }}>
                    <Form.Control
                        type="text"
                        name="breed"
                        value={pet.breed}
                        onChange={handleInputChange}
                        placeholder="Порода"
                    />
                    {errors.breed && (
                        <Form.Text className="text-danger">
                            {errors.breed}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="type" style={{ marginTop: "30px" }}>
                    <Form.Control
                        type="text"
                        name="type"
                        value={pet.type}
                        onChange={handleInputChange}
                        placeholder="Вид"
                    />
                    {errors.type && (
                        <Form.Text className="text-danger">
                            {errors.type}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group
                    controlId="description"
                    style={{ marginTop: "30px" }}
                >
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={pet.description}
                        onChange={handleInputChange}
                        placeholder="Описание"
                    />
                    {errors.description && (
                        <Form.Text className="text-danger">
                            {errors.description}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="age" style={{ marginTop: "30px" }}>
                    <Form.Control
                        type="number"
                        name="age"
                        value={pet.age}
                        onChange={handleInputChange}
                        placeholder="Возраст"
                    />
                    {errors.age && (
                        <Form.Text className="text-danger">
                            {errors.age}
                        </Form.Text>
                    )}
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
                <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "30px" }}
                >
                    {petToEdit ? "Редактировать питомца" : "Добавить питомца"}
                </Button>
            </Form>
        </>
    );
}