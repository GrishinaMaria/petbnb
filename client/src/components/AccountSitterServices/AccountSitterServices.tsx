import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';




const AccountSitterServices = ({ oneSitter }): JSX.Element => {
    const [oneSitterServices, setOneSitterServices] = useState(null)
    const axiosServices = async () => {
        if (oneSitter) {
                
        const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitterServices/${oneSitter.id}`)
        console.log(data, '--------------------');
        
        setOneSitterServices(data)
   }
        }
    useEffect(() => {
        axiosServices();
 }, [oneSitter])
    
// return (
// <div>
//         {/* {oneSitter?.availableServices && oneSitter?.availableServices?.map((availableService) => <div key={availableService?.id}><p>{availableService?.petType}</p><p>{availableService?.price}</p>
//             <p>{availableService?.service?.title }</p>
//         </div>)}   */}
//         {oneSitterServices && oneSitterServices.map((oneSitterService) => <div key={oneSitterService.id}><p>{oneSitterService.petType}</p><p>{oneSitterService.service.title }</p><p>{oneSitterService.price }</p></div>)}
//  </div>
//  );
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
