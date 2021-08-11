import { useContext, useState } from "react";
import { BrowserRouter,
      Switch,
      Route,
      Link,
      useRouteMatch,
      useParams,  
      Redirect,
      useHistory,
      useLocation} from "react-router-dom";
import Account from "./Components/Account/Account";
// import CheckAuth from "./Components/LogIn/CheckAuth";
import LogIn from "./Components/LogIn & SignUp/LogIn";
import LogInAndSignUp from "./Components/LogIn & SignUp/LoginAndSignUp";
import NotFound from "./Components/NotFound/NotFound";
import RedirectHandler from "./Components/RedirectHandler/RedirectHandler";
import Student from "./Components/Student/Student";
import { LOGIN_LINK, SIGNUP_LINK } from "./Constants";
import { AuthContext } from "./Contexts/AuthContext";

function App() {

  
  //let Loggedin = false;
  // const [token, setToken] = useState(null);
  // const {token} = useContext(AuthContext);
  // const {setToken} = useContext(AuthContext);
  // console.log(token);
  // const auth = {token:null, user:{}}
  //get states from context api
  const {user} = useContext(AuthContext);
  // const {dispatch} = useContext(AuthContext);
  const {token} = useContext(AuthContext);

  // const {pathLogin} = useContext(AuthContext);

  console.log("token", token);

  // console.log("App.js");

  // notFound
  // / department/login or others 
  return (
    <div className="App">
      
        <BrowserRouter>
          
          <Switch>
           
            <Route 
              exact 
              path={["/","/auth", LOGIN_LINK, SIGNUP_LINK]} 
              component={LogInAndSignUp}
            />

            <Route 
              path={["/student", "/professor", "/department"]} 
              component={Account}
            />

            <Route path="*" component={NotFound}/>

          </Switch>
        
        </BrowserRouter>
      
      
    
    </div>
  );
}
function Home() {

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  console.log("history", history);
  console.log("location", location);
  console.log("match", match);

  // test cases => right path /student/home so if /department/warnings or login 
  // => enter other routes not found page 

  if(location.pathname === "/"){
    console.log(location.pathname);
    history.replace({pathname:"/home"})
    console.log(match.url);
  }
  
  
  return (
    <Switch>

        <Route path="/home">
            <div>Home 
            
            </div>
        </Route>
        <Route path="/user">
            <div>user 
            
            </div>
        </Route>
    </Switch>
 
  )
  
}
function Login() {

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  console.log("history", history);
  console.log("location", location);
  console.log("match", match);

  // test cases => right path /student/home so if /department/warnings or login 
  // => enter other routes not found page 

  // if(location.pathname === "/"){
  //   console.log(location.pathname);
  //   history.replace({pathname:"/home"})
  //   console.log(match.url);
  // }
  
  
  return (
    <Switch>

        
        <Route path={`/${match.path}/user`}>
            <div>user login 
            
            </div>
        </Route>
        <Route exact path={`${match.path}/asd`}>
            <div>login 
            
            </div>
        </Route>
    </Switch>
 
  )
  
}


export default App;
