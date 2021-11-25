import React, { useEffect, useState } from 'react';
import Routes from "./components/Routes";
import { UserIdContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {

  const [userId, setUserId]       = useState(null);
  const [userAdmin, setUserAdmin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchAuth = async() => {

      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/auth/`,
        withCredentials: true
      }).then((result) => {

        setUserId(result.data.userId);
        setUserAdmin(result.data.isAdmin);

      }).catch(() => {
        console.log('Token d\'identification inexistant !');
      })

    };

    fetchAuth();
    
    if (userId) {
      dispatch(getUser(userId))
    };

  }, [userId, userAdmin]);

  return (
      <UserIdContext.Provider value={userId}>
        <Routes />
      </UserIdContext.Provider>
  );
};

export default App;