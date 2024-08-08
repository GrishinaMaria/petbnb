import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const FormAddServices = ({ oneSitter, setOneSitter }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [petType, setPetType] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const [service, setService] = useState({});
  
  
  const axiosServices = async () => {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_API}/services`
    );
    setServices(data);
  };
  useEffect(() => {
    axiosServices();
  }, []);
  // useEffect(() => {
  //   if (petType) {
  //       const serviceExists = oneSitter.availableServices.some(
  //   availableService => availableService.petType === petType && availableService.service.id === service.id
  // );

  // if (serviceExists) {
  //   setError(`This service (${service.id}) already exists for the selected pet type.`);
  //   return;
  //   };
  //   }
 
  // }, [petType])
  const addServiceHandler = async (e) => {
    e.preventDefault();

    if (!petType || !service || !price) {
      setError("Пожалуйства заполните все поля.");
      return;
    }
    //   const isServiceByPetTypeUnique = oneSitter.availableServices.every(availableService => availableService.petType !== petType);

    //   if (!isServiceByPetTypeUnique) {
    //     setError('This service already exists.');
    //     return;
    //   }
    console.log(petType, '========');
    


    const { data } = await axiosInstance.post(
      `${import.meta.env.VITE_API}/petsitterServices`,
      { sitterId: oneSitter?.id, serviceId: service.id, petType, price }
    );
   
   
    setOneSitter((prev) => {
      if (oneSitter.availableServices) {
        return {
        ...prev,
        ["availableServices"]: [
          ...prev.availableServices,
          data.petsitterService,
        ],
        };
        
     }
    });
    console.log(oneSitter, 'posle dobavlenia');
    
    
    onClose();
    setPetType("");
    setPrice(0);
    setError("");
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newPrice = inputValue !== "" ? parseFloat(inputValue) : "";
    setPrice(newPrice);
  };
  
  return (
    <>
      <Button onClick={onOpen}>Добавить услугу</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#00A3C9">Добавить услугу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={addServiceHandler}>
              <FormControl>
                <FormLabel color="#00A3C9">Вид животного</FormLabel>
                <Select
                  color="#00A3C9"
                  placeholder="Выбрать вид животного"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option value="кошки">Кошки</option>
                  <option value="собаки">Собаки</option>
                </Select>
                <FormControl>
                  <FormLabel color="#00A3C9">Услуга</FormLabel>
                  <CheckboxGroup colorScheme="#00A3C9">
                    {services.map((current) => (
                      <Stack
                        key={current.id}
                        spacing={[1, 5]}
                        direction={["column", "row"]}
                        color="blue"
                      >
                        <Checkbox
                          // value={current.id}
                          isChecked={service.id === current.id}
                          onChange={() => setService(current)}
                        >
                          {current.title}
                        </Checkbox>
                      </Stack>
                    ))}
                  </CheckboxGroup>
                </FormControl>
              </FormControl>
              <FormControl>
                <FormLabel color="#00A3C9">Цена</FormLabel>
                <Input
                  type="number"
                  htmlSize={4}
                  color="#00A3C9"
                  width="auto"
                  value={price}
                  onChange={handlePriceChange}
                />
              </FormControl>
              {error && <p style={{ color: "#00A3C9" }}>{error}</p>}

              <ModalFooter>
                <Button variant="ghost" color="#00A3C9" mr={3} onClick={onClose}>
                  Закрыть
                </Button>
                <Button bg="#00A3C9" type="submit">
                  Добавить
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default FormAddServices;
