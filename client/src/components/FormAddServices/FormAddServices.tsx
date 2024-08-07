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

    if (!petType) {
      setError("Please fill the pet type field.");
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
          <ModalHeader color="blue">Add Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={addServiceHandler}>
              <FormControl>
                <FormLabel color="blue">Pet Type</FormLabel>
                <Select
                  color="blue"
                  placeholder="Select pet type"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option value="кошки">Кошки</option>
                  <option value="собаки">Собаки</option>
                </Select>
                <FormControl>
                  <FormLabel color="blue">Service type</FormLabel>
                  <CheckboxGroup colorScheme="blue">
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
                <FormLabel color="blue">Price</FormLabel>
                <Input
                  type="number"
                  htmlSize={4}
                  color="blue"
                  width="auto"
                  value={price}
                  onChange={handlePriceChange}
                />
              </FormControl>
              {error && <p style={{ color: "red" }}>{error}</p>}

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" colorScheme="blue" type="submit">
                  Add Service
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
