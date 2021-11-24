import React, { useState } from 'react';
import Routes from "./components/Routes";
import { UserIdContext } from './components/Routes/AppContext';


const App = () => {

  const [userId, setUserId] = useState(null);

  return (
      <UserIdContext.Provider value={userId}>
        <Routes />
      </UserIdContext.Provider>
  );
};

export default App;