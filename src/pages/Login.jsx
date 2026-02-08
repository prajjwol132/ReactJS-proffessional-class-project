import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = (data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Login logic - store user in localStorage
        const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
        const user = users.find(u => u.email === data.email && u.password === data.password);
        
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          alert('Login successful! Welcome back, ' + user.firstName + '!');
          navigate('/');
          window.location.reload();
        } else {
          alert('Invalid email or password. Please try again.');
        }
      } else {
        // Register logic
        const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
        const existingUser = users.find(u => u.email === data.email);
        
        if (existingUser) {
          alert('An account with this email already exists. Please login instead.');
        } else {
          const newUser = {
            id: Date.now(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            createdAt: new Date().toISOString()
          };
          users.push(newUser);
          localStorage.setItem('hotelUsers', JSON.stringify(users));
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          alert('Registration successful! Welcome to Hotel TopView, ' + data.firstName + '!');
          navigate('/');
          window.location.reload();
        }
      }
      setIsLoading(false);
      reset();
    }, 1000);
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=400&fit=crop&q=80&fm=webp" 
          alt="Login Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h1>
            <p className="text-base md:text-lg text-white">
              {isLogin ? 'Sign in to access your account' : 'Create an account to start booking'}
            </p>
          </div>
        </div>
      </section>

      {/* Login/Register Form */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-md mx-auto">
          {/* Toggle Buttons */}
          <div className="flex mb-8 bg-gray-200 rounded-full p-1">
            <button
              onClick={() => { setIsLogin(true); reset(); }}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                isLogin ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); reset(); }}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                !isLogin ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              {!isLogin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      {...register('firstName', { required: !isLogin && 'First name is required' })}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      {...register('lastName', { required: !isLogin && 'Last name is required' })}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email.message}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    {...register('phone', { required: !isLogin && 'Phone number is required' })}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="+977 9800000000"
                  />
                  {errors.phone && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.phone.message}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password.message}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    {...register('confirmPassword', { 
                      required: !isLogin && 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-orange-500 hover:text-orange-600">Forgot password?</a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 md:py-4 px-6 rounded-full transition-colors duration-300 text-sm md:text-base flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600">Privacy Policy</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
