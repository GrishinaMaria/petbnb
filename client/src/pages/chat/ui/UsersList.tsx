import React from 'react';
import { Stack } from 'react-bootstrap';
import DotOnlineIcon from '../../../widgets/icons/DotOnlineIcon';

export default function UsersList({ users, selectUser, setSelectUser }) {
  return (
    <Stack>
      <h6> Users </h6>
      {users.map((user) => (
        <div
          className="p-2"
          key={user.id}
          onClick={() => setSelectUser(user.id)}
          style={{
            cursor: 'pointer',
            width: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {user.photo && (
            <img
              src={user.photo}
              style={
                selectUser === user.id
                  ? { height: '140px', width: '140px' }
                  : { height: '100px', width: '100px' }
              }
            ></img>
          )}
          {user.username}
        </div>
      ))}
    </Stack>
  );
}
