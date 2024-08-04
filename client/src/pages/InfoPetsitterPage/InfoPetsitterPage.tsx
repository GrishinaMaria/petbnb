import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { CalendarSelected } from "@demark-pro/react-booking-calendar/dist/cjs/types";
const { VITE_API } = import.meta.env;

export default function InfoPetsitterPage() {
  const { sitterId } = useParams();

  const [services, setServices] = useState([]);
  const [petsitterInfo, setPetsitterInfo] = useState([]);

  const [sitter, setSitter] = useState(null);

  const [selectedPet, setSelectedPet] = useState(null);
  // const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [selectedDates, setSelectedDates] = useState<CalendarSelected[]>([]);


  const [totalSum, setTotalSum] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axiosInstance
      .get(`${VITE_API}/petsitterServices/${sitterId}`)
      .then((response) => {
        const petsitterServices = response.data;
        console.log(petsitterServices);

        const servicesData = petsitterServices.map((ps) => ({
          ...ps.service,
          price: ps.price,
          checked: false,
        }));

        setServices(servicesData);
        // setCheckedItems(new Array(servicesData.length).fill(false));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sitterId]);

  useEffect(() => {
    if (sitterId) {
      axiosInstance
        .get(`${VITE_API}/petsitter/${sitterId}`)
        .then((response) => {
          // console.log(response.data.oneSitter);
          setPetsitterInfo(response.data.oneSitter);
          setSitter(response.data.oneSitter);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sitterId]);



  const handleCheckboxChange = (serviceId) => {
    setServices((prev) => {
      const updatedServices = prev.map((item) =>
        item.id === serviceId ? { ...item, checked: !item.checked } : item
      );
      return updatedServices;
    });
  };

  useEffect(() => {
    const totPrice = services.reduce(
      (sum, item) => sum + (item.checked ? item.price : 0),
      0
    );
    setTotalSum(totPrice);
  }, [services]);

  const handlePetSelect = (petId) => {
    setSelectedPet(petId);
  };

  const dateChangeHandler = (dates) => {
    setDates(dates);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        `${VITE_API}/booking/${sitterId}`,
        {
          totalPrice: totalSum,
          startdate: selectedDates[0],
          enddate: selectedDates[1],
          petId: selectedPet,
          services: services.filter((service) => service.checked),
        }
      );
      console.log("забронировано", response.data);
      onClose();
    } catch (error) {
      console.error("ошибка", error);
    }
  };

  useEffect(() => {
    if (sitter) {
      ymaps.ready(init);
    }

    function init() {
      const map = new ymaps.Map("map", {
        center: [sitter.geoX, sitter.geoY],
        zoom: 10,
      });

      const placemark = new ymaps.Placemark([sitter.geoX, sitter.geoY], {
        balloonContent: `<strong>${sitter.username}</strong><br>${sitter.city}<br>${sitter.email}`,
        hintContent: sitter.username,
      });

      map.geoObjects.add(placemark);
    }
  }, [sitter]);

  return (
    <>
      <Box display="flex" gap="150px" margin="50px">
        <Image
          boxSize="500px"
          // src="https://i.pinimg.com/736x/f3/e5/46/f3e5465a61c0fe010a28af98ca3a5922.jpg"
          src={petsitterInfo.photo}
        />

        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Услуги:
          </Heading>
          <Stack pl={6} mt={1} spacing={3}>
            {services.map((service, index) => {
              return (
                <Checkbox
                  key={service.id}
                  isChecked={!!service.checked}
                  onChange={(e) => handleCheckboxChange(service.id)}
                  name={service.title}
                >
                  {service.title}
                  {service.price}
                </Checkbox>
              );
            })}
          </Stack>
          <Text as="h4" size="md" mb={4}>
          Общая сумма: {totalSum}
        </Text>
          {/* <div>
Общая сумма: {totalSum}
          </div> */}
          <Button mt={6} onClick={onOpen}>
            Забронировать
          </Button>
        </Box>
      </Box>
      <Box width="full" p={6} mt={6} borderRadius="md" boxShadow="md">
        <Heading as="h3" size="lg" mb={4}>
          Обо мне
        </Heading>
        <Text as="h4" size="md" mb={4}>
          {petsitterInfo.description}
        </Text>
        <div id="map" style={{ width: "100%", height: "300px" }}></div>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#3182ce">Забронировать</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="#3182ce">
            {<CalendarForm setSelectedDates={setSelectedDates} selectedDates={selectedDates}/>}
            {<ChoosePet onPetSelect={handlePetSelect} />}
            {/* {<EditPetForm />} */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Сохранить
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
