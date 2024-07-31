import React, { useState } from 'react';
import { Image, Checkbox, Stack, Box, Button, Heading, Text } from '@chakra-ui/react';

export default function InfoPetsitterPage() {

  const services = ['Погулять', 'Покормить', 'Поиграть', 'Отвезти к ветеринару', 'Груминг'];

  const [checkedItems, setCheckedItems] = useState(new Array(services.length).fill(false));

 
  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  return (
    <>
   
    <Box display='flex' gap='150px' margin='50px'>
      <Image boxSize='500px' src='https://i.pinimg.com/736x/f3/e5/46/f3e5465a61c0fe010a28af98ca3a5922.jpg' />

      <Box>
        <Heading as='h3' size='lg' mb={4}>
          Услуги:
        </Heading>
        <Stack pl={6} mt={1} spacing={3}>
          {services.map((service, index) => (
            <Checkbox
              key={index}
              isChecked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
            >
              {service}
            </Checkbox>
          ))}
        </Stack>
        <Button mt={6} onClick={() => alert('тест')}>
          Забронировать
        </Button>
      </Box>
    </Box>
          <Box width='full' p={6} mt={6} borderRadius='md' boxShadow='md'>
          <Heading as='h4' size='md' mb={4}>
            Описание
          </Heading>
          <Text>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </Text>
        </Box>
        </>
  );
}
