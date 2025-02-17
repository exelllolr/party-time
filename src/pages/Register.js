import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.success) {
        history.push('/login');
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded-md"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-md"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
