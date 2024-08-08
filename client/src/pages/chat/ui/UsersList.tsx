import React from 'react';
import { Stack, Box, Text, Image} from "@chakra-ui/react";
import DotOnlineIcon from '../../../widgets/icons/DotOnlineIcon';

export default function UsersList({ users, selectUser, setSelectUser }) {
  //const visibleUsers = users.slice(0, 5); 
  return (
    <Stack spacing={4}>
      <Text color="#0BC5EA" fontWeight="bold"> Пользователи: </Text>
      {users.map((user) => (
        <Box
          p={2}
          key={user.id}
          onClick={() => setSelectUser(user.id)}
          cursor="pointer"
          width="250px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          // color={"#0BC5EA"}
          //overflowY="auto"
        >
          {user.photo && (
            <Image
              src={user.photo}
              borderRadius="50%"
              style={
                selectUser === user.id
                  ? { height: '140px', width: '140px' }
                  : { height: '100px', width: '100px' }
              }
            ></Image>
          )}
          {user.username}
        </Box>
      ))}
    </Stack>
  );
}


 