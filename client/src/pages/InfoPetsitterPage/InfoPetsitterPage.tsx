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
const { VITE_API } = import.meta.env;

export default function InfoPetsitterPage() {
  const { sitterId } = useParams();

  const [services, setServices] = useState([]);
  const [petsitterInfo, setPetsitterInfo] = useState([]);
  console.log(services);

  const [sitter, setSitter] = useState(null);

  const [selectedPet, setSelectedPet] = useState(null);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const [selectedServices, setSelectedServices] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axiosInstance
      .get(`${VITE_API}/petsitterServices/${sitterId}`)
      .then((response) => {
        const petsitterServices = response.data;
        const servicesData = petsitterServices.map((ps) => ps.service);

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

  // const [checkedItems, setCheckedItems] = useState(
  //   new Array(services.length).fill(false)
  // );
  // console.log(checkedItems);
console.log(services);

  const handleCheckboxChange = (serviceId) => {
    setServices((prev) => {
      const searchItemIndex = prev.findIndex((item) => (item.id === serviceId));
      console.log(serviceId, prev,searchItemIndex);

      prev[searchItemIndex].checked = !prev[searchItemIndex].checked;
      return [...prev];
    });
    // setCheckedItems((prevCheckedItems) => {
    //   const newCheckedItems = [...prevCheckedItems];
    //   newCheckedItems[serviceId] = !newCheckedItems[serviceId];
    //   return newCheckedItems;
    // });
  };

  const handlePetSelect = (petId) => {
    setSelectedPet(petId);
  };

  const dateChangeHandler = (dates) => {
    setDates(dates);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        `${VITE_API}/petsitterbooking/${sitterId}`,
        {
          totalPrice: 100,
          startdate: dates.startDate,
          enddate: dates.endDate,
          petId: selectedPet,
          services: services.filter(service => service.checked)
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
        balloonContent: `<strong>${sitter.username}</strong><br>${sitter.description}`,
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
              console.log(service.checked);
              
              return (
              <Checkbox
                key={service.id}
                isChecked={!!service.checked}
                onChange={(e) => handleCheckboxChange(service.id)}
                name={service.title}
              >
                {service.title}
              </Checkbox>
            )})}
          </Stack>
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
            {<CalendarForm onDatesChange={dateChangeHandler} />}
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
