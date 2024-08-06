import { Badge, Circle, Tbody, Td, Tr } from "@chakra-ui/react";
import axiosInstance from "../../axiosInstance";
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { LiaRubleSignSolid } from "react-icons/lia";
import { useState } from "react";

const OneService = ({ oneSitterService, setOneSitterServices }): JSX.Element => {
    const [changePrice, setChangePrice] = useState(false);
    const [inputPrice, setInputPrice] = useState(oneSitterService.price)
      const onHandleDelete = async () => {
    const { data } = await axiosInstance.delete(`${import.meta.env.VITE_API}/petsitterServices/${oneSitterService.id}`);
    if (data.message === 'success') {
      setOneSitterServices((prev) => prev.filter((delService) => delService.id !== oneSitterService.id));
    }
      };
    const changePriceHandler = async (e) => {
        e.preventDefault();
            const { data } = await axiosInstance.put(`${import.meta.env.VITE_API}/petsitterServices/${oneSitterService.id}`, { inputPrice })
           
            if (data.message === 'success') {
            
            setOneSitterServices((prev) =>
                prev.map((chService) => (chService.id === data.petsitterService.id ? data.petsitterService : chService))
            );
            
            
            setChangePrice((prev)=> !prev)
        }
    };
return (
 <Tbody display={'block'}>
          <Tr display={'flex'} height={'60px'}>
            
            <Td borderBottom={'1px solid #00A3C4'} minWidth={'500px'} >
              {oneSitterService.service.title}
            </Td>
            <Td minWidth={'100px'}>
                {changePrice ? (<form onSubmit={changePriceHandler}><input style={{width: '100%', backgroundColor: '#edf2f7', color: '#00A3C4', outline: 'none'}} required placeholder='price' defaultValue={oneSitterService.price} onChange={(e)=> setInputPrice(e.target.value)}/><button type="submit" style={{border: 'none'}} ><CheckIcon color={'#00A3C4'}/></button></form>) : 
                ( <Badge onClick={()=>setChangePrice((prev)=> !prev)} ml="1" color=" #00A3C4" display={'flex'} cursor={'pointer'}>
                 {oneSitterService.price} <LiaRubleSignSolid size={'17px'}/>
               </Badge>)}
             
            </Td>
            <Td><DeleteIcon type="button" onClick={onHandleDelete}/></Td>
        </Tr>
        
            </Tbody>
 );

}
export default OneService
