import React from 'react';


const AccountSitterCard = ({ oneSitter }): JSX.Element => {
  console.log(oneSitter, 'onesitter from accountCard');
  
return (
    <>
      {oneSitter  ? (  <div>
        <p>{oneSitter.username}</p>
        <p>About me: {oneSitter.description}</p>
        <p>My experience: {oneSitter.experience}</p>
        <p>Phone number: {oneSitter.phone}</p>
        <img src={oneSitter.photo} alt=''/>
        </div>) : null}
    </>
 );

}
export default AccountSitterCard
