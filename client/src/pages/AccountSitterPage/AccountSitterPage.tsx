import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import NewAccountSitter from '../Account/NewAccountSitter';
import axiosInstance from '../../axiosInstance';
import AccountSitterCard from '../../components/AccountSitterCard/AccountSitterCard';
import AccountSitterServices from '../../components/AccountSitterServices/AccountSitterServices';
import FormAddServices from '../../components/FormAddServices/FormAddServices';
import SitterBookings from '../../components/SitterBookings';
import FormUpdSitter from '../../components/FormUpdSitter/FormUpdSitter';


const AccountSitterPage = ({ user}): JSX.Element => {
  const [oneSitter, setOneSitter] = useState({});
  console.log(user.id, 'user id from page');
  
  useEffect(() => {
    const axiosOneSitter = async () => {
        const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitter/${user.id}`)
        setOneSitter(data.oneSitter);
       
        
 }
      axiosOneSitter();
  }, []);
  
  useEffect(() => {
    console.log('onesitter', oneSitter);
     
   },[oneSitter])
    
return (
<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList aria-orientation='vertical'>
    <Tab>Мой профиль</Tab>
    <Tab>Мои услуги</Tab>
    <Tab>Мои бронирования</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    {/* <NewAccountSitter oneSitter={oneSitter} user={user} setOneSitter={setOneSitter } /> */}
    <FormUpdSitter oneSitter={oneSitter} setOneSitter={setOneSitter}/>
    <AccountSitterCard oneSitter={oneSitter}/>
    </TabPanel>
    <TabPanel>
     <h2>Мои услуги</h2> 
     <FormAddServices oneSitter={oneSitter} setOneSitter={setOneSitter } />
      <AccountSitterServices oneSitter={oneSitter}/>
    </TabPanel>
    <TabPanel>
      <SitterBookings/>
    </TabPanel>
  </TabPanels>
</Tabs>
 );

}
export default AccountSitterPage
