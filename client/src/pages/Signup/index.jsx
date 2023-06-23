import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import  "./stylesss.css";
import React, { useState } from "react";
function Signup() {
	const googleAuth = () => {
		window.open(
			`http://localhost:8080/auth/google/callback`,
			"_self"
		);
	};
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [isSignedup, setisSignedup] = useState(false);

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			setTimeout(() => {
				navigate("/login");
			}, 500);
			
			setisSignedup(true);
			
			console.log(res.message);
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
			<h1 className='heading'>Sign up Form</h1>
			
			<div className='form_container'>
				<div className='left'>
					<img className='img' src="./images/signup.jpg" alt="signup" />
				</div>
				<div className='right'>
				<form className='form_container' onSubmit={handleSubmit}>
					<h2 className='from_heading'>Create Account</h2>
					<input className='input' type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required />
							<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className='input'
						/>
					<input  className='input' type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required />
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
						required
						className='input'
					/>
					{error && <div className='error_msg'>{error}</div>}
					<button type="submit" className='btn'>Sign Up</button>
					</form>
					<p className='text'>or</p>
					<button className='google_btn' onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign up with Google</span>
					</button>
					<p className='text'>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
					
				</div>
			</div>
			{isSignedup && (
        <div className="notification">
          <p>Signup Successful</p>
        </div>
      )}
		</div>
	);
}

export default Signup;
