import { Link, Route, Switch, useLocation } from "react-router-dom";
import LogIn from "./LogIn";
import styles from "./LoginAndSignUp.module.css";
import SignUp from "./SignUp";
import { useContext, useState } from "react";
import { LOGIN_LINK, SIGNUP_LINK } from "../../Constants";
import SelectUser from "./SelectUser";
import RedirectHandler from "../RedirectHandler/RedirectHandler";
import { AuthContext } from "../../Contexts/AuthContext";

const LogInAndSignUp = ({ dispatch }) => {
	const location = useLocation();

	let styleLogin = styles.not_active_button;
	let styleSignup = styles.not_active_button;

	const { hadnleLoginError, hadnleSignUpSuccessful, hadnleSignUpError } =
		useContext(AuthContext);

	const [userType, setUserType] = useState(() => {
		const data = localStorage.getItem("UserType");
		return data ? data : "department";
	});

	const handleOnChange = e => {
		localStorage.setItem("UserType", e.target.value);
		setUserType(e.target.value);
	};

	const handleSignUpStates = () => {
		hadnleSignUpSuccessful();
		hadnleSignUpError();
	};

	if (location.pathname.includes(SIGNUP_LINK)) {
		styleSignup = styles.active_button;
	} else {
		styleLogin = styles.active_button;
	}

	return (
		<div className="center_flex" style={{ height: "100%", padding: "10px" }}>
			<div className={styles.login_signup}>
				<RedirectHandler />

				<SelectUser userType={userType} handleOnChange={handleOnChange} />

				<Switch>
					<Route exact path={["/", "/auth", LOGIN_LINK]}>
						{/* <h1>Log in</h1> */}

						<LogIn userType={userType} />
					</Route>

					<Route path={SIGNUP_LINK}>
						<SignUp userType={userType} />
					</Route>
				</Switch>

				<ul>
					<li className={styleLogin} onClick={hadnleLoginError}>
						<Link to={LOGIN_LINK}>login</Link>
					</li>
					<li className={styleSignup} onClick={handleSignUpStates}>
						<Link to={SIGNUP_LINK}>signup</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default LogInAndSignUp;
