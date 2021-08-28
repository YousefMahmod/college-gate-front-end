import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from "./LoginAndSignUp.module.css";
import SelectUser from "./SelectUser";
// import { useHistory } from "react-router-dom";

const LogIn = ({ userType }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { logIn } = useContext(AuthContext);
	const { logInError } = useContext(AuthContext);

	const handleSubmit = e => {
		e.preventDefault();

		const userInfo = { email: username, password };

		logIn(userType, userInfo);
		// dispatch({type:"LOGIN", userInfo, typeOfUser});
		setUsername("");
		setPassword("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				required
				id="email"
				value={username}
				onChange={e => setUsername(e.target.value)}
				placeholder="Email"
			/>

			<br />
			<br />

			<input
				type="password"
				required
				id="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<br />
			<br />

			<input
				type="submit"
				value="log in"
				// className={styles.login_signup_button}
				className={`submit_button ${styles.login_signup_button}`}
			/>
			{logInError && (
				<p style={{ color: "red", marginTop: "8px" }}>{logInError}</p>
			)}
		</form>
	);
};

export default LogIn;
