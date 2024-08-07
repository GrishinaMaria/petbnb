import React from "react";
// import { Card, Button,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/Account/Cart.css";
import {EditPetForm} from "../components/EditPetForm";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Circle, Divider, Flex, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { FaCat, FaDog } from "react-icons/fa6";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { PiCat, PiDog } from "react-icons/pi";
import { SiDatadog } from "react-icons/si";
import { FaClipboardList } from "react-icons/fa";


export default function PetCard({ pet, user, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handlePetCardClick = () => {
        navigate(`/pets/${pet.id}`);
    };
    const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'unit',
    unit: 'year',
    unitDisplay: 'long',
  });
  const formattedAge = formatter.format(pet.age);
    return (
        // <Card
        //     className="mb-4 pet-card"
        //     style={{
        //         width: "15em",
        //         backgroundColor: "black",
        //         color: "white",
        //         borderRadius: "20px",
        //     }}
        //     onClick={handlePetCardClick}
        // >
        //         <Card.Img
        //             variant="top"
        //             //src={pet.photo ||"https://via.placeholder.com/150"}
        //             src={pet.photo || "https://images.dog.ceo/breeds/hound-english/n02089973_846.jpg"}
        //             alt={pet.name}
        //         />
        //     <Card.Body>
        //                 <Card.Title>
        //                     <strong>Имя:</strong>{pet?.name}
        //                 </Card.Title>
        //                 <Card.Text>
        //                     <strong>Порода:</strong> {pet?.breed}
        //                 </Card.Text>
        //                 <Card.Text>
        //                     <strong>Вид:</strong> {pet?.type}
        //                 </Card.Text>
        //                 <Card.Text><strong>Описание:</strong>
        //                     {pet?.description}
        //                 </Card.Text>
        //                 <Card.Text>
        //                     <strong>Возраст:</strong> {pet?.age}
        //                 </Card.Text>
        //                 {user?.id === pet?.ownerId && (
        //             <>
        //                 <Button
        //                     variant="danger"
        //                     style={{ width: "100%" }}
        //                     onClick={(e) => {
        //                         e.stopPropagation();
        //                         onDelete(pet?.id);
        //                     }}
        //                 >
        //                     Удалить
        //                 </Button>
        //                 <Button
        //                     variant="warning"
        //                     style={{ width: "100%", marginTop: "10px" }}
        //                     onClick={(e) => {
        //                         e.stopPropagation();
        //                         onEdit(pet);
        //                     }}
        //                 >
        //                     Редактировать
        //                 </Button>
        //             </>
        //         )}
        //     </Card.Body>
        // </Card>


        <Card maxW='sm' marginBottom={'20px'}>
  <CardBody>
    <Image
      src={pet.photo || "https://images.dog.ceo/breeds/hound-english/n02089973_846.jpg"}
      alt={pet.name}
      borderRadius='lg'
    />
    <Stack  spacing='1' minHeight={'220px'}>
      <Heading size='md'>{pet?.name}</Heading>
      <Flex >{pet?.type === 'кошка' ? (<Circle size='35px' bg='#00A3C4' color='white'>
                <Icon as={PiCat} boxSize={8}/>
              </Circle>) : <Circle size='35px' bg='#00A3C4' color='white'>
                <Icon as={PiDog} boxSize={8}/>
              </Circle>}
               <Text marginTop={'10px'} marginLeft={'10px'}>
        {pet?.breed}
      </Text></Flex>
      <Flex >
        <Circle size='35px' bg='#00A3C4' color='white'>
                Age
              </Circle>
              <Text marginTop={'10px'} marginLeft={'10px'}>
        {formattedAge} 
      </Text>
      </Flex>
      <Flex ><Circle size='35px' bg='#00A3C4' color='white'>
                <Icon as={FaClipboardList} boxSize={7}/>
              </Circle>
              <Text marginTop={'10px'} marginLeft={'10px'}>{pet?.description}</Text>
              </Flex>
    </Stack>
  </CardBody>
  <Divider color={'#00A3C4'}/>
  <CardFooter>
    <ButtonGroup spacing='2'>
    
      <DeleteIcon w={8} h={8} color={'#00A3C4'} type="button" onClick={(e) => {
                                e.stopPropagation();
                                onDelete(pet?.id);
                            }}/>
      <EditIcon w={8} h={8} color={'#00A3C4'} type="button" onClick={(e) => {
                                e.stopPropagation();
                                onEdit(pet);
                            }}/>
    </ButtonGroup>
  </CardFooter>
</Card>
    );
}