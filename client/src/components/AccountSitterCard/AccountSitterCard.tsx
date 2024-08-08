import { Icon, PhoneIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Card, CardBody, CardHeader, Circle, Flex, Heading, Text } from '@chakra-ui/react';
import { CgHomeAlt } from "react-icons/cg";
import { MdWorkHistory } from "react-icons/md";


const AccountSitterCard = ({ oneSitter }): JSX.Element => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'unit',
    unit: 'year',
    unitDisplay: 'long',
  });
  const formattedExp = formatter.format(oneSitter.experience);
  
  
  return (
    <>{oneSitter.id ? (<Card maxW='md'>
  <CardHeader>
    <Flex >
      <Flex  flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='photo' src={oneSitter.photo} width='200px' height='200px' marginRight='40px'/>

        <Box>
          <Heading size='sm'>{oneSitter.username}</Heading>
          <Flex><Circle size='25px' bg='#00A3C4' color='white' marginRight='5px'><Icon as={MdWorkHistory} /></Circle><Text>{formattedExp} опыта</Text></Flex>
          <Flex><Circle size='25px' bg='#00A3C4' color='white' marginRight='5px'><Icon as={CgHomeAlt} /></Circle><Text>{oneSitter.city}</Text></Flex>
          <Flex><Circle size='25px' bg='#00A3C4' color='white' marginRight='5px'>
     <PhoneIcon />
   </Circle>
   <Text>{oneSitter.phone}</Text>
   </Flex>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
  <CardBody>
  <Accordion allowToggle>
   <AccordionItem>
     <h2>
       <AccordionButton bgColor='#00A3C9' color='black' border='none'>
         <Box as='span' flex='1' textAlign='left'>
           About me
         </Box>
         <AccordionIcon />
       </AccordionButton>
     </h2>
     <AccordionPanel pb={4}>
       {oneSitter.description}
     </AccordionPanel>
   </AccordionItem>
 </Accordion>
  </CardBody>
</Card>) : null}</>
  
//     <>
//       {oneSitter?.id  ? (  <div>
//       <p>{oneSitter.username}</p>
//       <Accordion defaultIndex={[0]} allowMultiple>
//   <AccordionItem>
//     <h2>
//       <AccordionButton>
//         <Box as='span' flex='1' textAlign='left'>
//           About me
//         </Box>
//         <AccordionIcon />
//       </AccordionButton>
//     </h2>
//     <AccordionPanel pb={4}>
//       {oneSitter.description}
//     </AccordionPanel>
//   </AccordionItem>
// </Accordion>
//         {/* <p> {oneSitter.description}</p> */}
//         <p>My experience: {oneSitter.experience}</p>
//         <p>  <Circle size='25px' bg='#00A3C4' color='white'>
//     <PhoneIcon />
//   </Circle>
//  {oneSitter.phone}</p>
//         <img src={oneSitter.photo} alt=''/>
//         </div>) : null}
//     </>
 );

}
export default AccountSitterCard
