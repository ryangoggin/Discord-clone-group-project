import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import { authenticate } from "./store/session";
import LoginPage from "./components/LoginPage";
import ServersSidebar from "./components/Servers/ServersSidebar";
// import TestChannels from "./components/Servers/TestChannels";
import Home from "./components/Home/"
import FriendsList from './components/FriendsList'
import MessageForm from "./components/MessageForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <LoginPage />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path='/register' component={SignupFormPage} />
      </Switch>
      {isLoaded && (
        <>
          <ServersSidebar />
          <Switch>
            <Route path='/channels/@me'>
              <FriendsList />
              </Route>
            {/* <Route path="/channels/:serverId/:channelId">
              <TestChannels />
            </Route> */}
            {/* for testing messages ONLY */}
            <Route path='/messages'>
              <MessageForm />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
