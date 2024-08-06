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
  Tag,
  Badge,
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
    const fetchPets = async () => {
      try {
        const { data } = await axiosInstance.get(`${VITE_API}/owneraccount`);
        setPets(data.myPets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

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
        const { data } = await axiosInstance.patch(
          `${VITE_API}/owneraccount/${currentPet.id}`,
          savedPet,
        );
        setPets((prevPets) =>
          prevPets.map((pet) => (pet.id === data.id ? data : pet)),
        );
      } else {
        const { data } = await axiosInstance.post(
          `${VITE_API}/owneraccount`,
          savedPet,
        );
        setPets((prevPets) => [...prevPets, data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Ошибка при сохранении питомца', error);
    }
  };

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'unit',
    unit: 'year',
    unitDisplay: 'long',
  });
  const formattedExperience = formatter.format(petsitterInfo.experience);

  return (
    <>
      <Box className={styles.photobox}>
        <Image
          boxSize="500px"
          src={petsitterInfo.photo}
          className={styles.sitterphoto}
        />

        <Box pl={16}>
          <Heading as="h3" size="lg" mb={4}>
            Услуги:
          </Heading>
          <Stack mt={10} spacing={6}>
            {services.map((service, index) => {
              return (
                <Checkbox
                  colorScheme="cyan"
                  size="lg"
                  key={service.id}
                  isChecked={!!service.checked}
                  onChange={(e) => handleCheckboxChange(service.id)}
                  name={service.title}
                >
                  <div className={styles.checkbox}>
                    <span>{service.title}</span>
                    <span>{service.price} ₽</span>
                  </div>
                </Checkbox>
              );
            })}
          </Stack>
          <Text as="h4" size="md" mb={8} mt={8}>
            Общая стоимость: {totalSum}
          </Text>

          <Button colorScheme="cyan" variant="solid" onClick={onOpen}>
            Забронировать
          </Button>
        </Box>
      </Box>
      <Box className={styles.secondbox}>
        <Heading as="h2" size="xl" mb={4}>
          {petsitterInfo.username}
          <Badge ml="3" colorScheme="cyan" className={styles.badge}>
            {formattedExperience} опыта
          </Badge>

          <Divider />
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
          <div style={{ width: '100%', height: '400px', marginTop: '50px' }}>
            <YMaps>
              <Map
                width="100%"
                height="400px"
                defaultState={{
                  center: [sitter.geoX, sitter.geoY],
                  zoom: 12,
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
                      <img src="${sitter.photo}" alt="${sitter.username}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px;" />
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
          <ModalHeader color="#0987A0">Забронировать</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              <CalendarForm
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates}
              />
            }
            {!!pets.length && (
              <ChoosePet
                pets={pets}
                setPets={setPets}
                onPetSelect={handlePetSelect}
              />
            )}

            <Accordion allowToggle key={`${pets.length}`}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Добавить информацию о питомце
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <EditPetForm
                    onSave={handleSavePet}
                    // onHide={onHide}
                    petToEdit={null}
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="cyan" mr={3} onClick={handleSubmit}>
              Забронировать
            </Button>
            <Button
              colorScheme="cyan"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
