import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Avatar, Box, Card, CardHeader, Circle, Flex, Heading, Table, TableContainer, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { LiaRubleSignSolid } from "react-icons/lia";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
const { VITE_API } = import.meta.env;

export default function OwnerBookings() {
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

  // return (
  //   <>
      
  //     <div style={{ display: "flex", gap: "50px" }}>
  //       {bookings.map((booking) => {
  //         const formattedStartDate = formatDate(booking.startdate);
  //         const formattedEndDate = formatDate(booking.enddate);

  //         return (
  //           <div key={booking.id}>
  //             <h4>Записи</h4>
  //             <ul>
  //               {booking.bookedServices.map((bookedService) => (
  //                 <li key={bookedService.id}>{bookedService.Service.title}</li>
  //               ))}
  //             </ul>
  //             <p>
  //               Даты: {formattedStartDate} - {formattedEndDate}
  //             </p>
  //             <p>Общая стоимость: {booking.totalPrice} ₽</p>
  //             <h4>Петситтер:</h4>
  //             <p>Имя: {booking.sitter.username}</p>
  //             <p>Контактный номер: {booking.sitter.phone}</p>
  //             <h4>Питомец</h4>
  //             <p>{booking.pet.name}</p>
  //             <img src={booking.pet.photo} style={{ width: "250px" }}></img>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </>
  // );


  return (
    <div style={{minHeight: '700px'}}>
      <h4 style={{marginBottom: '20px'}}>Записи</h4>
       {bookings.map((booking) => {
          const formattedStartDate = formatDate(booking.startdate);
         const formattedEndDate = formatDate(booking.enddate);
         return (
    
  <TableContainer key={booking.id} width={'700px'} >
  <Table variant='simple' border={'2px solid'}>
    <Thead>
      <Tr>
        <Th bg={'#c2e9f730'}>Услуги</Th>
       
  <Th >
    <Flex direction={'column'}>
      {booking.bookedServices.map((bookedService) => (
    <Flex key={bookedService.id}  >
      <Text color={'#4a5568'} >{bookedService.Service.title}</Text>
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
        <Th height={'100px'}>
          <Card maxW='md' height={'90%'}>
  <CardHeader>
    <Flex >
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='pet' src={booking.pet.photo} />

        <Box minWidth={'100px'}>
          <Heading size='sm'>{booking.pet.name}</Heading>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
</Card>
        </Th>
      </Tr>
      <Tr>
        <Th bg={'#c2e9f730'} borderBottom={'2px solid #00A3C4'}>Петситтер</Th>
        <Th borderBottom={'2px solid #00A3C4'}>
          <Card minW='md' height={'90%'}>
  <CardHeader>
    <Flex >
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='pet' src={booking.sitter.photo} bg={'#00A3C4'} marginBottom={'50px'} />

        <Box minWidth={'100px'}>
          <Heading size='sm'>{booking.sitter.username}</Heading>
          <Flex><Circle size='25px' bg='#00A3C4' color='white' marginRight='5px' marginBottom={'10px'}>
     <PhoneIcon />
   </Circle>
   <Text color={'black'}>{booking.sitter.phone}</Text>
   </Flex>
   <Flex><Circle size='25px' bg='#00A3C4' color='white' marginRight='5px'>
     <EmailIcon />
   </Circle>
   <Text>{booking.sitter.email}</Text>
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
           
           
          );
          })}
  </div>
)
}
