import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import { authenticate } from "./store/session";
import LoginPage from "./components/LoginPage";
import ServersSidebar from "./components/Servers/ServersSidebar";
import ChannelSideBar from "./components/ChannelSideBar";
import SplashPage from "./components/SplashPage";
import FriendsList from './components/FriendsList'
import MessageForm from "./components/MessageForm";
import ChannelTopBar from "./components/ChannelTopBar";
import UserMenu from "./components/UserMenu";
import NotFound from "./components/NotFound";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          {sessionUser ? (
            <>
            <Switch>
              <Route exact path='/'>
                <FriendsList />
                <UserMenu />
                <ServersSidebar />
              </Route>
              <Route exact path='/channels/@me'>
                <FriendsList />
                <UserMenu />
                <ServersSidebar />
              </Route>
              <Route exact path="/channels/:serverId/:channelId">
                <ChannelSideBar />
                <ChannelTopBar />
                <MessageForm />
                <UserMenu />
                <ServersSidebar />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </>
          ) :
          (
            <Switch>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path='/register'>
              <SignupFormPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          )}
        </>
      )}
    </>
  );
}

export default App;
