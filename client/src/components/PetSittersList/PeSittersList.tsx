import React, { useEffect, useState } from 'react';
import PetSitterCard from '../PetSitterCard/PetSitterCard';
import SittersMap from '../SittersMap/SittersMap';
import axiosInstance from '../../axiosInstance';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
  Flex,
  SimpleGrid,
  Container,
  Button,
} from '@chakra-ui/react';
import MapFunc from '../Map/MapFunc';

const arraySitters = [
  {
    id: 1,
    title: 'Катя',
    animal: 'кошки',
    corX: 55.8,
    corY: 36.8,
    Services: [{ прогулка: true }, { кормление: true }, { игра: false }],
    img: 'https://upload.wikimedia.org/wikipedia/ru/5/55/%D0%93%D0%BD%D0%B5%D0%B2_%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%28%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%29.png',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 2,
    title: 'Маша',
    animal: 'кошки',
    corX: 54.8,
    corY: 37.8,
    Services: [{ прогулка: false }, { кормление: true }, { игра: false }],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6TaQhArLyOOaYf4lKogZWD8U6g-8aB0iHWw&s',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 3,
    title: 'Ира',
    animal: 'кошки',
    corX: 55.9,
    corY: 37.8,
    Services: [{ прогулка: true }, { кормление: true }, { игра: false }],
    img: 'https://www.kino-teatr.ru/movie/posters/big/3/24073.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 4,
    title: 'Дима',
    animal: 'собаки',
    corX: 56.8,
    corY: 37.8,
    Services: [{ прогулка: true }, { кормление: false }, { игра: false }],
    img: 'https://upload.wikimedia.org/wikipedia/ru/4/4b/Avatar-2009.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 5,
    title: 'Гоша',
    animal: 'собаки',
    corX: 55.8,
    corY: 37.9,
    Services: [{ прогулка: true }, { кормление: true }, { игра: false }],
    img: 'https://www.kino-teatr.ru/movie/posters/big/0/24930.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 6,
    title: 'Паша',
    animal: 'кошки',
    corX: 55.8,
    corY: 37.9,
    Services: [{ прогулка: true }, { кормление: true }, { игра: true }],
    img: 'https://www.kino-teatr.ru/movie/posters/big/0/24930.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
];

const PeSittersList = (): JSX.Element => {
  const [sitters, setSitters] = useState([]);
  // const [servicesFilter, setServicesFilter] = useState('')
  const [services, setServices] = useState([]);
  const [servicesFilter, setServicesFilter] = useState('');
  const [value, setValue] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [page, setPage] = useState(0);

  const axiosPetsitters = async () => {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_API}/petsitter/all`,
    );

    setSitters(data.allSitters);
  };
  useEffect(() => {
    axiosPetsitters();
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValue(event.target.value);
    } else {
      setValue('');
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/services`,
        );
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleServicesSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setServicesFilter(event.target.value);
  };

  const filteredSitters = sitters
    .filter((sitter) => {
      return (
        value === '' ||
        sitter.availableServices.some(
          (availableService) => availableService.petType === value,
        )
      );
    })
    .filter((sitter) => {
      return (
        (servicesFilter === '' &&
          sitter.availableServices.some(
            (availableService) =>
              availableService.price >= minPrice &&
              availableService.price <= maxPrice,
          )) ||
        sitter.availableServices.some(
          (availableService) =>
            availableService.service.title === servicesFilter &&
            availableService.price >= minPrice &&
            availableService.price <= maxPrice,
        )
      );
    });

  const paginatedSitters = filteredSitters.slice(page * 6, (page + 1) * 6);

  const nextPageHandler = () => {
    if ((page + 1) * 6 < filteredSitters.length) {
      setPage(page + 1);
    }
  };

  const prevPageHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Container maxW="100%">
        <Flex direction="column" align="center" width="100%">
          <form style={{ width: '400px' }}>
            <FormControl>
              <FormLabel>Выберите вид питомца:</FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio
                    name="все"
                    value=""
                    checked={value === ''}
                    onChange={handleCheckboxChange}
                  >
                    Все
                  </Radio>
                  <Radio
                    name="кошки"
                    value="кошки"
                    checked={value === 'кошки'}
                    onChange={handleCheckboxChange}
                  >
                    Кошки
                  </Radio>
                  <Radio
                    name="собаки"
                    value="собаки"
                    checked={value === 'собаки'}
                    onChange={handleCheckboxChange}
                  >
                    Собаки
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Выберите вид услуг:</FormLabel>
              <Select
                value={servicesFilter}
                onChange={handleServicesSelectChange}
              >
                <option value="">Все виды услуг</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Цена от {minPrice} до {maxPrice} ₽
              </FormLabel>
              <Slider
                min={0}
                max={5000}
                value={maxPrice}
                onChange={(value) => setMaxPrice(value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={4}>
                  <Box color="tomato" />
                </SliderThumb>
              </Slider>
            </FormControl>
          </form>

          <Flex width="100%" justifyContent="center" mt={8}>
            <SimpleGrid columns={3} spacing={2} width="65%">
              {paginatedSitters.length > 0 ? (
                paginatedSitters.map((sitter) => (
                  <PetSitterCard key={sitter.id} sitter={sitter} />
                ))
              ) : (
                <Text>Не найдено петситтеров по заданным параметрам</Text>
              )}
               
  <Flex m={4} justifyContent="center" gridColumn="span 3">
    <Button onClick={prevPageHandler} disabled={page === 0} mr={4}>
      Назад
    </Button>
    <Button
      onClick={nextPageHandler}
      disabled={(page + 1) * 6 >= filteredSitters.length}
    >
      Вперёд
    </Button>
  </Flex>

            </SimpleGrid>
            <Box ml={8} width="35%">
              <MapFunc filteredSitters={paginatedSitters} />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default PeSittersList;
