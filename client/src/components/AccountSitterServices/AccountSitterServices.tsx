import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Badge, Box, Circle, Flex, Heading, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { FaCat } from "react-icons/fa6";
import { FaDog } from "react-icons/fa";
import OneService from '../OneService/OneService';


// const AccountSitterServices = ({oneSitter}): JSX.Element => {
//   const [oneSitterServices, setOneSitterServices] = useState(null)
  
 
  


//   useEffect(() => {
//   const axiosServices = async () => {
      
      
//         if (oneSitter?.id) {
        
                
//         const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitterServices/${oneSitter.id}`)
        
        
//         setOneSitterServices(data)
//    }
//         }
//        axiosServices(); 
      
//  }, [oneSitter])
    
//     return (
//     <Flex >
//   {oneSitterServices && oneSitterServices.map((oneSitterService)=> 
//   <Box ml="3" key={oneSitterService.id}>
//     <Text fontWeight="bold">
//       {oneSitterService.petType}
//     </Text>
//     <Text fontSize="sm">{oneSitterService.service.title}
//         <Badge ml="1" color="blue">
//         {oneSitterService.price}р/час
//       </Badge>
//     </Text>
//       </Box>
//       )}
// </Flex>
// );

// }
// export default AccountSitterServices

const AccountSitterServices = ({ oneSitter }): JSX.Element => {
  const [oneSitterServices, setOneSitterServices] = useState(null);

  useEffect(() => {
    const axiosServices = async () => {
      if (oneSitter?.id) {
        const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitterServices/${oneSitter.id}`);
        setOneSitterServices(data);
      }
    };
    
    axiosServices();
  }, [oneSitter]);


  const groupServicesByPetType = () => {
    if (!oneSitterServices) return [];

    const groupedServices = {};

    
    oneSitterServices.forEach((service) => {
      const { petType } = service;
      if (!groupedServices[petType]) {
        groupedServices[petType] = [];
      }
      groupedServices[petType].push(service);
    });

    
    const servicesArray = Object.keys(groupedServices).map((petType) => ({
      petType,
      services: groupedServices[petType],
    }));

    return servicesArray;
  };

  const groupedServices = groupServicesByPetType();

  return (
  //   <Flex>
  //     {groupedServices.map((group) => (
  //       <Box ml="3" key={group.petType}>
  //         <Text fontWeight="bold">{group.petType === 'кошки' ? (<Circle size='45px' bg='#00A3C4' color='white'><Icon as={FaCat} boxSize={8}/></Circle>) : (<Circle size='45px' bg='#00A3C4' color='white'><Icon as={FaDog} boxSize={8}/></Circle>)}</Text>
  //         {group.services.map((oneSitterService) => (
  //           <Text key={oneSitterService.id} fontSize="sm">
  //             {oneSitterService.service.title}
  //             <Badge ml="1" color="blue">
  //               {oneSitterService.price}р/час
  //             </Badge>
  //           </Text>
  //         ))}
  //       </Box>
  //     ))}
  //   </Flex>
  // );
<TableContainer display='flex'>
  {groupedServices.map((group) => (
    <Table variant='simple' key={group.petType} color='black' minWidth='400px' marginRight='80px' >
      
      <Thead>
        <Heading>{group.petType === 'кошки' ? (
              <Circle size='45px' bg='#00A3C4' color='white'>
                <Icon as={FaCat} boxSize={8}/>
              </Circle>
            ) : (
              <Circle size='45px' bg='#00A3C4' color='white'>
                <Icon as={FaDog} boxSize={8}/>
              </Circle>
            )}</Heading>
      </Thead>
      <>
        {group.services.map((oneSitterService) => (
          <OneService key={oneSitterService.id} oneSitterService={oneSitterService} setOneSitterServices={setOneSitterServices } />
        ))}
      </>
    </Table>
  ))}
</TableContainer>
  )
};

export default AccountSitterServices;
