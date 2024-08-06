import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  CardBody,
  Divider,
  CardFooter,
  ButtonGroup,
  Card,
} from '@chakra-ui/react';
import EditPetForm from '../../components/EditPetForm';
import ChoosePet from '../../components/ChoosePet';
import CalendarForm from '../../components/CalendarForm';
import axiosInstance from '../../axiosInstance';
import { CalendarSelected } from '@demark-pro/react-booking-calendar/dist/cjs/types';
const { VITE_API } = import.meta.env;
import { YMaps, Map, ObjectManager } from '@pbe/react-yandex-maps';
import styles from './InfoPetsitterPage.module.css';

export default function InfoPetsitterPage() {
  const navigate = useNavigate();
  const { sitterId } = useParams();

  const [services, setServices] = useState([]);
  const [petsitterInfo, setPetsitterInfo] = useState([]);

  const [sitter, setSitter] = useState(null);

  const [selectedPet, setSelectedPet] = useState(null);

  const [selectedDates, setSelectedDates] = useState<CalendarSelected[]>([]);

  const [totalSum, setTotalSum] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`${VITE_API}/petsitterServices/${sitterId}`)
      .then((response) => {
        const petsitterServices = response.data;

        const servicesData = petsitterServices.map((ps) => ({
          ...ps.service,
          price: ps.price,
          checked: false,
        }));

        setServices(servicesData);
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
        item.id === serviceId ? { ...item, checked: !item.checked } : item,
      );
      return updatedServices;
    });
  };

  useEffect(() => {
    const totPrice = services.reduce(
      (sum, item) => sum + (item.checked ? item.price : 0),
      0,
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
        },
      );
      console.log('забронировано', response.data);
      onClose();
      navigate('/account/owner');
    } catch (error) {
      console.error('ошибка', error);
    }
  };

  const deleteSpaces = petsitterInfo.description
    ? petsitterInfo.description.replace(/<br\s*\/?>/g, '\n\n')
    : '';



  const handleSavePet = async (savedPet) => {
    try {
        if (currentPet) {
            const { data } = await axiosInstance.patch(`${VITE_API}/owneraccount/${currentPet.id}`, savedPet);
            setPets((prevPets) => prevPets.map((pet) => (pet.id === data.id ? data : pet)));
        } else {
            const { data } = await axiosInstance.post(`${VITE_API}/owneraccount`, savedPet);
            setPets((prevPets) => [...prevPets, data]);
        }
        setShowModal(false);
    } catch (error) {
        console.error("Ошибка при сохранении питомца", error);
    }
};

  
  return (
    <>
      <Box className={styles.photobox}>


        {/* <Image boxSize="500px" src={petsitterInfo.photo} /> */}

        <Card>
  <CardBody>
    <Image
    boxSize="450px"
    src={petsitterInfo.photo}
          alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{petsitterInfo.username}</Heading>
      
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>

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

          <Button colorScheme="cyan" variant="solid" mt={6} onClick={onOpen}>
            Забронировать
          </Button>
        </Box>
      </Box>
      <Box className={styles.secondbox} >
      <Heading as="h3" size="lg" mb={4}>
         {petsitterInfo.username}
        </Heading>
        <Heading as="h3" size="lg" mb={4}>
          Обо мне
        </Heading>

        <Text as="h4" size="md" mb={4}>
          {deleteSpaces.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Text>

        {sitter && (
          <div style={{ width: '100%', height: '400px' }}>
            <YMaps>
              <Map
                width="100%"
                height="400px"
                defaultState={{
                  center: [sitter.geoX, sitter.geoY],
                  zoom: 10,
                }}
              >
                <ObjectManager
                  objects={{
                    openBalloonOnClick: true,
                  }}
                  options={{
                    clusterize: false,
                  }}
                  defaultFeatures={{
                    type: 'FeatureCollection',
                    features: [
                      {
                        type: 'Feature',
                        id: 1,
                        geometry: {
                          type: 'Point',
                          coordinates: [sitter.geoX, sitter.geoY],
                        },
                        properties: {
                          balloonContent: `
                    <div style="max-width: 100%;">
                      <img src="${sitter.photo}" alt="${sitter.username}" style="width: 100%; height: auto; margin-bottom: 10px;" />
                      <strong>${sitter.username}</strong><br>
                      ${sitter.city}<br>
                      ${sitter.email}
                    </div>`,
                          hintContent: sitter.username,
                        },
                      },
                    ],
                  }}
                  modules={[
                    'objectManager.addon.objectsBalloon',
                    'objectManager.addon.clustersBalloon',
                  ]}
                />
              </Map>
            </YMaps>
          </div>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#3182ce">Забронировать</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="#3182ce">
            {
              <CalendarForm
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates}
              />
            }
            {<ChoosePet  pets={pets} setPets={setPets} onPetSelect={handlePetSelect}/>}

            <Accordion allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Добавить информацию о питомце
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <EditPetForm
    onSave={
      handleSavePet
    }
    // onHide={onHide}
    petToEdit={null} 
  />
    </AccordionPanel>
  </AccordionItem>
</Accordion>

            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Забронировать
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