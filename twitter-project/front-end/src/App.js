import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppReducer from './reducers/AppReducer';
import {useCallback, useEffect, useReducer} from "react";
import AppContext from "./components/AppContext";
import axios from "axios";

function App() {
  const initialState = {user: null, posts:[]};
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Check current user
  // useCallback khong tao function la nua
  const checkCurrentUser = useCallback( async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "get",
        url: "api/v1/auth",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(option);
      if(response.data.data.user) {
        const {userName} = response.data.data.user;
        dispatch({type: "CURRENT_USER", payload: {userName}});
      }
    } catch (error){
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);
  
  return (
    // Router bao ngoai toan bo app
    <Router>
      {/* AppContext.Provider cung cap thong tin tiep can */}
      <AppContext.Provider value={{state, dispatch}}>
        <div className="container">
          <Header />
          <Switch>
            {/* Login */}
            <Route exact path="/login">
              <Login />
            </Route>
            {/* Register */}
            <Route exact path="/register">
              <Register />
            </Route>
            {/* Main  gom form va post list*/}
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="*">
              <div>Page Not Found</div>
            </Route>
          </Switch>
        </div>
      </AppContext.Provider> 
    </Router>
  );
}

export default App;
