import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Card, CardBody, CardFooter, CardHeader, Circle, Flex, Heading, IconButton, List, ListIcon, ListItem, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaDog } from "react-icons/fa";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import { LiaRubleSignSolid } from "react-icons/lia";
const { VITE_API } = import.meta.env;

export default function SitterBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${VITE_API}/booking`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Ошибочка", error);
      });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${day} ${months[month - 1]} ${year}`;
  }

  return (
    <div style={{minHeight: '700px'}}>
      <h2>Входящие Брони</h2>
      <div style={{ display: "flex", gap: "50px" }}>
        {bookings.map((booking) => {
          const formattedStartDate = formatDate(booking.startdate);
          const formattedEndDate = formatDate(booking.enddate);

          return (
            // <div key={booking.id}>
            //   <h4>Услуги</h4>
            //   <ul>
            //     {booking.bookedServices.map((bookedService) => (
            //       <li key={bookedService.id}>{bookedService.Service.title}</li>
            //     ))}
            //   </ul>
            //   <p>
            //     Даты: {formattedStartDate} - {formattedEndDate}
            //   </p>
            //   <p>Общая стоимость: {booking.totalPrice} ₽</p>
            //   <h4>Владелец</h4>
            //   <p>Имя: {booking.owner.username}</p>
            //   <p>Контактный номер: {booking.owner.phone}</p>
            //   <h4>Питомец</h4>
            //   <p>Кличка: {booking.pet.name}</p>
            //   <p>Возраст: {booking.pet.age}</p>
            //   <p>Порода: {booking.pet.breed}</p>
            //   <p>Особые приметы: {booking.pet.description}</p>
            //   <img src={booking.pet.photo} style={{ width: "250px" }}></img>
            // </div>
            <>
  <TableContainer key={booking.id} width={'650px'} >
  <Table variant='simple' border={'2px solid'}>
    <Thead>
      <Tr>
        <Th bg={'#c2e9f730'}>Услуги</Th>
       
  <Th >
    <Flex direction={'column'}>
      {booking.bookedServices.map((bookedService) => (
    <Flex key={bookedService.id}  >
      <Text color={'#4a5568'} decoration={'underline #00A3C9 2px'}>{bookedService.Service.title}</Text>
    </Flex>))}
    </Flex>
    
  </Th>

        
      </Tr>
      <Tr>
        <Th bg={'#c2e9f730'}>Даты</Th>
        <Th>{formattedStartDate} - {formattedEndDate}</Th>
      </Tr>
      <Tr>
        <Th bg={'#c2e9f730'}>Общая стоимость</Th>
        <Th display={'flex'}>{booking.totalPrice}<LiaRubleSignSolid size={'17px'}/></Th>
      </Tr>
        <Tr borderBottom={'2px solid'}>
        <Th bg={'#c2e9f730'}>Питомец</Th>
        <Th height={'300px'}>
          <Card maxW='md' height={'90%'}>
  <CardHeader>
    <Flex >
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='pet' src={booking.pet.photo} />

        <Box minWidth={'100px'}>
          <Heading size='sm'>{booking.pet.name}</Heading>
          <Text>Возраст: {booking.pet.age} {booking.pet.age === 1 ? 'год' : 'лет'}</Text>
        </Box>
        <Circle size='45px' color='white'>
         <IconButton
        variant='ghost'
        colorScheme='gray'
        aria-label='See menu'
        boxSize={8}
        icon={<FaDog size={'30px'}/>}
      />
      </Circle>
      </Flex>
    </Flex>
  </CardHeader>

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Accordion allowToggle>
    <AccordionItem>
     <h2>
       <AccordionButton bgColor='#00A3C9' color='black' border='none' >
         <Box as='span' flex='1' textAlign='left' width={'170px'}>
           Подробнее
         </Box>
         <AccordionIcon />
       </AccordionButton>
     </h2>
     <AccordionPanel pb={4}>
       <Text>Порода: {booking.pet.breed}</Text>
       <Text>Особые приметы: {booking.pet.description}</Text>
     </AccordionPanel>
   </AccordionItem>
 </Accordion>
  </CardFooter>
</Card>
        </Th>
      </Tr>
      <Tr>
        <Th bg={'#c2e9f730'}>Владелец</Th>
        <Th>
          <Card maxW='md' height={'90%'}>
  <CardHeader>
    <Flex >
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='pet' src={booking.owner.photo} bg={'#00A3C4'}/>

        <Box minWidth={'100px'}>
          <Heading size='sm'>{booking.owner.username}</Heading>
          <Flex><Circle size='25px' bg='#00A3C4' color='white' marginRight='5px' marginBottom={'10px'}>
     <PhoneIcon />
   </Circle>
   <Text color={'black'}>{booking.owner.phone}</Text>
   </Flex>
   <Flex><Circle size='25px' bg='#00A3C4' color='white' marginRight='5px'>
     <EmailIcon />
   </Circle>
   <Text>{booking.owner.email}</Text>
   </Flex>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
</Card>
        </Th>
      </Tr>
    </Thead>
  </Table>
</TableContainer>
            </>
           
          );
        })}
        
      </div>
    </div>
  );
}
