import { Badge, Tbody, Td, Tr } from "@chakra-ui/react";
import axiosInstance from "../../axiosInstance";
import { DeleteIcon } from '@chakra-ui/icons'


const OneService = ({ oneSitterService, setOneSitterServices }): JSX.Element => {
      const onHandleDelete = async () => {
    const { data } = await axiosInstance.delete(`${import.meta.env.VITE_API}/petsitterServices/${oneSitterService.id}`);
    if (data.message === 'success') {
      setOneSitterServices((prev) => prev.filter((delService) => delService.id !== oneSitterService.id));
    }
  };
return (
 <Tbody>
          <Tr>
            
            <Td borderBottom={'1px solid #00A3C4'}>
              {oneSitterService.service.title}
            </Td>
            <Td>
              <Badge ml="1" color=" #00A3C4">
                 {oneSitterService.price} р
               </Badge>
            </Td>
            <Td><DeleteIcon type="button" onClick={onHandleDelete}/></Td>
        </Tr>
        
            </Tbody>
 );

}
export default OneService
