import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import AustNoteBook from "./components/AustNoteBook";
import { Login, Registration, Navbar, Profile } from "./components";
import notFound from "./components/notFound";
import Logout from "./components/Logout";
import { getProfile } from "./service/userService";
import ProtectedRouter from "./components/common/ProtectedRouter";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const { data: user } = await getProfile();
      setUser(user);
      toast.info(`${user.firstName}, welcome to AustNoteBook.`);
    } catch (error) {
      setUser("");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar user={user} />
      <main className="myContainer">
        <Switch>
          <Route path="/aust-note-book" component={AustNoteBook} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/registration" component={Registration} />
          <Route path="/not-found" component={notFound} />
          <ProtectedRouter
            path="/profile"
            render={(props) => <Profile {...props} user={user} />}
          />

          <Redirect from="/" exact to="/aust-note-book" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
