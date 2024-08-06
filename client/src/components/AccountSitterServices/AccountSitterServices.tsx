import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';




const AccountSitterServices = ({oneSitter}): JSX.Element => {
  const [oneSitterServices, setOneSitterServices] = useState(null)
  
 
  


  useEffect(() => {
  const axiosServices = async () => {
      console.log(oneSitter, 'eto onesitter---');
      
        if (oneSitter?.id) {
        
                
        const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitterServices/${oneSitter.id}`)
        
        
        setOneSitterServices(data)
   }
        }
       axiosServices(); 
      
 }, [oneSitter])
    
    return (
    <Flex >
  {oneSitterServices && oneSitterServices.map((oneSitterService)=> 
  <Box ml="3" key={oneSitterService.id}>
    <Text fontWeight="bold">
      {oneSitterService.petType}
    </Text>
    <Text fontSize="sm">{oneSitterService.service.title}
        <Badge ml="1" color="blue">
        {oneSitterService.price}р/час
      </Badge>
    </Text>
      </Box>
      )}
</Flex>
);

}
export default AccountSitterServices
