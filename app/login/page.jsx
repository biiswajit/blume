import React from 'react';

const Login = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: `url('https://img.freepik.com/free-vector/gradient-pink-liquid-background_23-2149112212.jpg?semt=ais_hybrid')` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl flex bg-opacity-80 backdrop-blur-sm">
        <div className="flex flex-col items-center w-1/2">
          <img
            src="https://i.pinimg.com/564x/48/a3/54/48a354314bb3517dabc705eb3ee8b968.jpg"
            alt="Logo"
            className="w-36 h-36 mb-6"
          />
          <h1 className="text-2xl font-semibold mb-6">Sign in to your account</h1>
          <div className="w-full flex flex-col space-y-4">
            <button className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Login with Google
            </button>
            <button className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition">
              Login with GitHub
            </button>
            <button className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Login with Email
            </button>
          </div>
          <div className="mt-6">
            Don't have an account? <a href="#signup" className="text-blue-600 hover:underline">Sign up</a>
          </div>
        </div>
        <div className="ml-8 w-1/2">
          <h2 className="text-xl font-semibold mb-4">About Our Organization</h2>
          <p className="text-gray-700 mb-2">
            Welcome to StudySphere, where we innovate and create solutions that empower businesses worldwide.
            Our mission is to deliver top-notch services with a commitment to excellence.
          </p>
          <p className="text-gray-700">
            Join us today to be part of a forward-thinking community that values growth, creativity, and teamwork.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
