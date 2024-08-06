import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Button } from '@chakra-ui/react';
import NewAccountSitter from '../Account/NewAccountSitter';
import axiosInstance from '../../axiosInstance';
import AccountSitterCard from '../../components/AccountSitterCard/AccountSitterCard';
import AccountSitterServices from '../../components/AccountSitterServices/AccountSitterServices';
import FormAddServices from '../../components/FormAddServices/FormAddServices';
import SitterBookings from '../../components/SitterBookings';
import FormUpdSitter from '../../components/FormUpdSitter/FormUpdSitter';
import { Link } from 'react-router-dom';

const AccountSitterPage = ({ user}): JSX.Element => {
  const [oneSitter, setOneSitter] = useState({});
  const [tab, setTab] = useState(1)
  
  useEffect(() => {
    const axiosOneSitter = async () => {
      const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitter/${user.id}`)
     
      
        setOneSitter(data.oneSitter);
       
        
 }
      axiosOneSitter();
  }, [tab]);
    console.log(tab);
    
return (
<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList aria-orientation='vertical'>
    <Tab onClick={()=>setTab(1)}>Мой профиль</Tab>
    <Tab onClick={()=>setTab(2)}>Мои услуги</Tab>
    <Tab onClick={()=>setTab(3)}>Мои бронирования</Tab>
    <Tab onClick={()=>setTab(4)}>Чат</Tab>
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
    <TabPanel>
    <Link to={`/chat`}><Button>Чат</Button></Link>
    </TabPanel>
  </TabPanels>
</Tabs>
 );

}
export default AccountSitterPage
