import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./styless.css";
import React from "react";

function Login() {
	const googleAuth = () => {
		window.open(
			`http://localhost:8080/auth/google/callback`,
			"_self"
		);
	};

	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			setTimeout(() => {
				window.location = "/";
			}, 1000);
			
			setIsLoggedIn(true);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className='container'>
			<h1 className='heading'>Log in Form</h1>
			<div className='form_container'>
				<div className='left'>
					<img className='img' src="./images/login.jpg" alt="login" />
				</div>
				<div className='right'>
				<form className='form_container' onSubmit={handleSubmit}>
					<h2 className='from_heading'>Members Log in</h2>
					<input type="email" className='input' placeholder="Email" name="email"
							onChange={handleChange}
							value={data.email}
							required/>
					<input 
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
					className='input' />
					{error && <div className='error_msg'>{error}</div>}
					<button type="submit" className='btn'>Log In</button>
					</form>
					<p className='text'>or</p>
					<button className='google_btn' onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
					<p className='text'>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</div>
			{isLoggedIn && (
        <div className="notification">
          <p>Login Successful</p>
        </div>
      )}

		</div>
	);
}

export default Login;
