import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import axiosInstance from ".././axiosInstance";
import { Button, Image } from "@chakra-ui/react";
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
    const [imagePreview, setImagePreview] = useState(pet.photo);

    useEffect(() => {
        if (petToEdit) {
            setPet(petToEdit);
            setImagePreview(petToEdit.photo);
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
            onHide && onHide();
        } catch (error) {
            console.error("Ошибка при сохранении питомца", error);
        }
    };
//     const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//         setPet.photo(`/profilePhoto/${file.name}`); 
//       };
//       reader.readAsDataURL(file);

//       const formData = new FormData();
//       formData.append('file', file);

//       fetch(`http://localhost:3100${VITE_API}/owneraccount/upload`, {
//         method: 'POST',
//         body: formData,
//       }).then((response) => {
//         if (!response.ok) {
//           console.error('Ошибка загрузки файла');
//         }
//       }).catch((error) => {
//         console.error('Ошибка загрузки файла:', error);
//       });  
//     }
    //   };
    const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string); // Update image preview if needed
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:3100${VITE_API}/owneraccount/upload`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                console.error('Ошибка загрузки файла');
                // Handle error state or feedback to the user
            } else {
                // Assuming successful upload, update pet.photo with the server response
                response.json().then(data => {
                    setPet(prevPet => ({
                        ...prevPet,
                        photo: `/profilePhoto/${file.name}` // Adjust to what your server returns as the image URL
                    }));
                });
            }
        })
        .catch((error) => {
            console.error('Ошибка загрузки файла:', error);
            // Handle network errors or server-side errors
        });
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
                {/* <Form.Group controlId="photo" style={{ marginTop: "30px" }}>
                    <Form.Control
                        type="text"
                        name="photo"
                        value={pet.photo}
                        onChange={handleInputChange}
                        placeholder="Ссылка на фото"
                    />
                </Form.Group> */}
                <Form.Group style={{marginTop: '20px', display: 'flex'}}>
      <Button type="button" onClick={() => document.getElementById('imageUpload')?.click()} marginRight={'20px'}>
        Загрузить фото
      </Button>
      <Image src={imagePreview} alt="Profile Preview" width={'50px'} height={'50px'}/>
      <input
        id="imageUpload"
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageUpload}
      />
      {/* {photo && <p>Ссылка на загруженное фото: {photo}</p>} */}
    </Form.Group>
                <Button
                    colorScheme="cyan"
                    variant="outline"
                    type="submit"
                    style={{ marginTop: "30px" }}
                >
                    {petToEdit ? "Редактировать питомца" : "Добавить питомца"}
                </Button>
            </Form>
        </>
    );
}