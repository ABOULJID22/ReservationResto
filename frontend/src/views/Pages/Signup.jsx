import {Link,useNavigate} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../../axois-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate(); // pour la redirection

  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
        navigate("/home");

      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
   /*  <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" className="m-2" placeholder="Full Name"/>
          <input ref={emailRef} type="email" className="m-2" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" className="m-2" placeholder="Password"/>
          <input ref={passwordConfirmationRef} className="m-2" type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block bg-primary m-2" >Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div> */


    <div className="flex items-center min-h-screen bg-gray-50 mb-5 py-9">
  <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
    <div className="flex flex-col md:flex-row">
      <div className="h-32 md:h-auto md:w-1/2">
        <img
          className="object-cover w-full h-full"
          src="imgs/thumb/login.png"
          alt="img"
        />
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full">
          <div className="flex justify-center">
          <p >ABOULJID</p>
            <svg

              className="w-20 h-20 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >

            </svg>
          </div>
          <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
            Signup for Free
          </h1>
          <form onSubmit={onSubmit}>
            <div>
            {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
              <label className="block text-sm">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Full Name"
                ref={nameRef}
                required
              />
            </div>
            <div>
              <label className="block mt-4 text-sm">Email</label>
              <input

                type="email"
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Email Address"
                ref={emailRef}
                required
              />
            </div>
            <div>
              <label className="block mt-4 text-sm">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 mt-1"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </div>
            <div>
              <label className="block mt-4 text-sm">Repeat Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 mt-1"
                placeholder="Repeat Password"
                ref={passwordConfirmationRef}
                required
              />
            </div>
            <button
              className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              Signup
            </button>
          </form>
          <p className="message py-3">
            Already registered? <Link to="/login" className="text-sm text-blue-600 hover:underline">Sign In</Link>
          </p>
          {/* Ajouter l'option de connexion avec Google ici */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500 hover:bg-rose-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                <path d="M3.15283 7.3455L6.43833 9.755C7.32733 7.554 9.48033 6 11.9998 6C13.5293 6 14.9208 6.577 15.9803 7.5195L18.8088 4.691C17.0228 3.0265 14.6338 2 11.9998 2C8.15883 2 4.82783 4.1685 3.15283 7.3455Z" fill="#FF3D00"/>
                <path d="M12.0002 22.0003C14.5832 22.0003 16.9302 21.0118 18.7047 19.4043L15.6097 16.7853C14.5719 17.5745 13.3039 18.0014 12.0002 18.0003C9.39916 18.0003 7.19066 16.3418 6.35866 14.0273L3.09766 16.5398C4.75266 19.7783 8.11366 22.0003 12.0002 22.0003Z" fill="#4CAF50"/>
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
              </svg>
              <p className="text-sm text-blue-600 mr-2 py-2 hover:text-white">Continue with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>







</div>




  )
}
