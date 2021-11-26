import React, { useEffect, useState } from 'react';
import { UserIdContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Profil from './pages/Profil';
import Auth from './pages/Auth';
import NavBar from './components/Navigation/NavBar';


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
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Accueil} />
            <Route path="/Authentification" exact component={Auth} />
            <Route path="/profil" exact component={Profil} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
    </UserIdContext.Provider>
  );
};

export default App;