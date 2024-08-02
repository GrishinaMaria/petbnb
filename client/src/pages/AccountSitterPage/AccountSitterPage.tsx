import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import NewAccountSitter from '../Account/NewAccountSitter';
import axiosInstance from '../../axiosInstance';
import AccountSitterCard from '../../components/AccountSitterCard/AccountSitterCard';
import AccountSitterServices from '../../components/AccountSitterServices/AccountSitterServices';
import FormAddServices from '../../components/FormAddServices/FormAddServices';


const AccountSitterPage = ({ user}): JSX.Element => {
    const [oneSitter, setOneSitter] = useState(null);
        const axiosOneSitter = async () => {
        const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitter/${user.id}`)
        console.log(data.oneSitter, 'mmm');
        
        setOneSitter(data.oneSitter);
       
        
 }
  useEffect(() => {
      axiosOneSitter();
  }, []);
    
return (
<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList aria-orientation='vertical'>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <NewAccountSitter oneSitter={oneSitter} user={user} setOneSitter={setOneSitter } />
    <AccountSitterCard oneSitter={oneSitter}/>
    </TabPanel>
    <TabPanel>
     <h2>Мои услуги</h2> 
     <FormAddServices oneSitter={oneSitter} setOneSitter={setOneSitter } />
      <AccountSitterServices oneSitter={oneSitter}/>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
 );

}
export default AccountSitterPage
