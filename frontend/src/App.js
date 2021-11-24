import React, { useEffect, useState } from 'react';
import Routes from "./components/Routes";
import { UserIdContext } from './components/Routes/AppContext';
import axios from 'axios';

const App = () => {

  const [userId, setUserId]       = useState(null);
  const [userAdmin, setUserAdmin] = useState(null);

  useEffect(() => {

    const fetchAuth = async() => {

      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/auth/`,
        withCredentials: true
      }).then((result) => {
        // console.log(result.data.userId);
        // console.log(result.data.isAdmin);
        setUserId(result.data.userId);
        setUserAdmin(result.data.isAdmin);

      }).catch(() => {
        console.log('Token d\'identification inexistant !');
      })

    };

    fetchAuth();
   

  }, [userId, userAdmin]);

  return (
      <UserIdContext.Provider value={userId}>
        <Routes />
      </UserIdContext.Provider>
  );
};

export default App;