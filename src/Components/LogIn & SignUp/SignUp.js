import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from './LoginAndSignUp.module.css';

const SignUp = ({userType}) => {

    const history = useHistory();

    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [departmentState, setDepartment] = useState("");

    const {signUp} = useContext(AuthContext);

    console.log("userType", userType);

    const handleSubmit = (e) =>{

        let userInfo = 
        {
            key,
            user:{
                name ,
                email ,
                password,
                passwordConfirm ,
                departmentId :departmentState
            }
        }
        switch (userType) {
            case "department":
                userInfo =  {
                    key,
                    department:{
                        name ,
                        email ,
                        password,
                        passwordConfirm ,
                        departmentName :departmentState
                    }
                }
                break;
        
            default:
                break;
        }
        e.preventDefault();
        // dispatch({type:"SIGNUP", userInfo: userInfo, userType});

        signUp(userType, userInfo);
        // history.push({pathname:`/${userType}/login`});
        setKey("");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setDepartment("");
    }
  
    return ( 
        <form onSubmit={handleSubmit}>

            <input 
                type="text" 
                required 
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="key"
            />

            <br />
            <br />

            <input 
                type="text" 
                required 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
            />

            <br />
            <br />

            <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
            />

            <br />
            <br />

            <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
            />
           
            <br />
            <br />

            <input 
                type="password" 
                required 
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                placeholder="password confirm"
            />

            <br />
            <br />

            {(userType === "department") ? 
                (<input 
                    type="text"     
                    required 
                    value={departmentState}
                    onChange={e => setDepartment(e.target.value)}
                    placeholder="department name"
                />) 
            :
                (<input 
                    type="text" 
                    required 
                    value={departmentState}
                    onChange={e => setDepartment(e.target.value)}
                    placeholder="department Id"
                />)
            }

            <br />
            <br />

            <input type="submit" value="signup" className={styles.login_signup_button}/>

        </form>
    );
}
 
export default SignUp;