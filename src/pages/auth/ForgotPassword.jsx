import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [method, setMethod] = useState('email');
  const [step, setStep] = useState('request'); // request, verify, reset
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 'request') {
      setStep('verify');
    } else if (step === 'verify') {
      setStep('reset');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              return to sign in
            </Link>
          </p>
        </div>

        {step === 'request' && (
          <>
            {/* Method Toggle */}
            <div className="flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-l-lg border ${
                  method === 'email'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setMethod('phone')}
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-r-lg border ${
                  method === 'phone'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Phone Number
              </button>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor={method === 'email' ? 'email' : 'phone'} className="sr-only">
                  {method === 'email' ? 'Email address' : 'Phone number'}
                </label>
                <input
                  id={method === 'email' ? 'email' : 'phone'}
                  name={method === 'email' ? 'email' : 'phone'}
                  type={method === 'email' ? 'email' : 'tel'}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={method === 'email' ? 'Enter your email' : 'Enter your phone number'}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Reset Code
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'verify' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="verification-code" className="sr-only">Verification Code</label>
              <input
                id="verification-code"
                name="verification-code"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter verification code"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify Code
              </button>
            </div>
          </form>
        )}

        {step === 'reset' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="new-password" className="sr-only">New Password</label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;