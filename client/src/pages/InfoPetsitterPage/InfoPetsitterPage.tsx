import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import {
  Image,
  Checkbox,
  Stack,
  Box,
  Button,
  Heading,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import EditPetForm from "../../components/EditPetForm";
import ChoosePet from "../../components/ChoosePet";
import CalendarForm from "../../components/CalendarForm";
import axiosInstance from "../../axiosInstance";
const { VITE_API } = import.meta.env;

export default function InfoPetsitterPage() {
  const { sitterId } = useParams(); 
  const services = [
    "Погулять",
    "Покормить",
    "Поиграть",
    "Отвезти к ветеринару",
    "Груминг",
  ];
  const { isOpen, onOpen, onClose } = useDisclosure()


  
  const [checkedItems, setCheckedItems] = useState(
    new Array(services.length).fill(false)
  );

  const [selectedPet, setSelectedPet] = useState(null);
  const [dates, setDates] = useState({ startDate: '', endDate: '' });

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handlePetSelect = (petId) => {
    setSelectedPet(petId);
  };

  const dateChangeHandler = (dates) => {
    setDates(dates);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`${VITE_API}/petsitterbooking/${sitterId}`, { // Замените на ваш эндпоинт
        totalPrice: 100, 
        startdate: dates.startDate,
        enddate: dates.endDate,
        petId: selectedPet,
      });
      console.log('забронировано', response.data);
      onClose();
    } catch (error) {
      console.error('ошибка', error);
    }
  };

  return (
    <>
      <Box display="flex" gap="150px" margin="50px">
        <Image
          boxSize="500px"
          src="https://i.pinimg.com/736x/f3/e5/46/f3e5465a61c0fe010a28af98ca3a5922.jpg"
        />

        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Услуги:
          </Heading>
          <Stack pl={6} mt={1} spacing={3}>
            {services.map((service, index) => (
              <Checkbox
                key={index}
                isChecked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
              >
                {service}
              </Checkbox>
            ))}
          </Stack>
          <Button mt={6} onClick={onOpen}>
            Забронировать
          </Button>
        </Box>
      </Box>
      <Box width="full" p={6} mt={6} borderRadius="md" boxShadow="md">
        <Heading as="h4" size="md" mb={4}>
          Описание
        </Heading>
        <Text>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. The standard chunk of Lorem Ipsum used since the
          1500s is reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </Text>
      </Box>
   
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="#3182ce">Забронировать</ModalHeader>
            <ModalCloseButton />
            <ModalBody color="#3182ce">
              {<CalendarForm onDatesChange={dateChangeHandler} />}
              {<ChoosePet onPetSelect={handlePetSelect} />}
           {/* {<EditPetForm />} */}
            </ModalBody>
  
            <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Сохранить
            </Button>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Отмена
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>



    </>
  );
}
