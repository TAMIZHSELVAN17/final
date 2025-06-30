// import React, { useState, useEffect } from 'react';

// const Login = ({ onSuccess, onClose }) => {
//   const [step, setStep] = useState(1);
//   const [emailMobile, setEmailMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const [timer, setTimer] = useState(30);
//   const [status, setStatus] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const LoginSendOtpUrl = 'https://daas-computers.onrender.com/auth/send-otp';
//   const LoginVerifyOtpUrl = 'https://daas-computers.onrender.com/auth/verify-otp';

//   useEffect(() => {
//     let countdown;
//     if (step === 2 && timer > 0) {
//       countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearInterval(countdown);
//   }, [step, timer]);

//   const resetLogin = () => {
//     setStep(1);
//     setEmailMobile('');
//     setOtp('');
//     setTimer(30);
//     setStatus('');
//     setErrorMessage('');
//     if (onClose) onClose();
//   };

//   const isValidInput = (input) => {
//     const isMobile = /^\d{10}$/.test(input.trim());
//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
//     return isMobile || isEmail;
//   };

//   const handleRequestOtp = async () => {
//     const trimmed = emailMobile.trim();
//     if (!trimmed || !isValidInput(trimmed)) {
//       setErrorMessage('Enter a valid 10-digit mobile or email');
//       return;
//     }
//     setErrorMessage('');
//     setStatus('Sending OTP...');

//     try {
//       const res = await fetch(LoginSendOtpUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ input: trimmed }),
//       });
//       const result = await res.text();
//       setStatus(result);
//       if (res.ok) {
//         setStep(2);
//         setTimer(30);
//       } else {
//         throw new Error(result);
//       }
//     } catch (err) {
//       setStatus('Network error or server issue');
//     }
//   };

//   const handleResendOtp = async () => {
//     setStatus('Resending OTP...');
//     try {
//       const res = await fetch(LoginSendOtpUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ input: emailMobile }),
//       });
//       const result = await res.text();
//       setStatus(result);
//       if (res.ok) setTimer(30);
//     } catch (err) {
//       setStatus('Network error during resend');
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp.trim() || otp.length < 4) {
//       setErrorMessage('Enter a valid OTP');
//       return;
//     }
//     setErrorMessage('');
//     setStatus('Verifying OTP...');

//     try {
//       const res = await fetch(LoginVerifyOtpUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ input: emailMobile, otp }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setStatus(data.message || 'OTP verified!');
//         if (data.token) {
//           localStorage.setItem('token', data.token);
//           localStorage.setItem('emailOrMobile', emailMobile);

//           const base64Url = data.token.split('.')[1];
//           const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//           const jsonPayload = decodeURIComponent(
//             atob(base64)
//               .split('')
//               .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//               .join('')
//           );
//           const payload = JSON.parse(jsonPayload);
//           localStorage.setItem('userId', payload.userId);

//           if (onSuccess) onSuccess(data.token);

//           setTimeout(() => {
//             resetLogin();
//           }, 1000);
//         }
//       } else {
//         setStatus(data.error || 'OTP verification failed');
//       }
//     } catch (err) {
//       setStatus('Network error during verification');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="flex bg-white rounded-lg shadow-lg w-[500px] h-[600px] relative overflow-hidden">
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-3xl font-bold z-50"
//           onClick={resetLogin}
//         >
//           ×
//         </button>

//         <div
//           className="flex flex-col justify-center items-center w-2/5 p-10 text-white"
//           style={{ background: 'linear-gradient(135deg, #2874f0, #6b48ff)' }}
//         >
//           <h2 className="text-2xl font-bold mb-5">Login</h2>
//           <p className="text-gray-200 mb-5 text-center">
//             Experience the efficiency of Daas computers!
//           </p>
//           <div className="flex space-x-2">
//             <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
//             <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
//             <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
//           </div>
//         </div>

//         <div className="w-3/5 p-10 flex flex-col justify-center">
//           {step === 1 && (
//             <>
//               <label className="text-lg font-medium text-gray-700 mb-2">
//                 Enter Mobile Number or Email
//               </label>
//               <input
//                 type="text"
//                 className="w-full border-b-2 border-gray-300 focus:border-indigo-600 p-2 outline-none"
//                 placeholder="e.g. 9876543210 or email@example.com"
//                 value={emailMobile}
//                 onChange={(e) => setEmailMobile(e.target.value)}
//               />
//               {errorMessage && (
//                 <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
//               )}
//               <p className="text-gray-500 text-sm mt-3 text-center">
//                 Continue to access Daas computers
//               </p>
//               <button
//                 onClick={handleRequestOtp}
//                 className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:scale-105 transition-transform"
//               >
//                 Request OTP
//               </button>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <label className="text-lg font-medium text-gray-700 mb-2 mt-4">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 className="w-full border-b-2 border-gray-300 focus:border-indigo-600 p-2 outline-none"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               {errorMessage && (
//                 <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
//               )}
//               <button
//                 onClick={handleVerifyOtp}
//                 className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg hover:scale-105 transition-transform"
//               >
//                 Verify OTP
//               </button>

//               <div className="text-sm text-gray-600 text-center mt-4">
//                 {timer > 0 ? (
//                   <span>Resend available in 00:{timer.toString().padStart(2, '0')}</span>
//                 ) : (
//                   <button
//                     className="text-blue-600 hover:underline"
//                     onClick={handleResendOtp}
//                   >
//                     Resend Code
//                   </button>
//                 )}
//               </div>
//             </>
//           )}

//           {status && (
//             <p className="text-center text-yellow-500 font-medium mt-4">
//               {status}
//             </p>
//           )}

//           <button
//             onClick={resetLogin}
//             className="mt-6 text-gray-600 hover:text-red-600 underline self-center"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = ({ onSuccess, onClose }) => {
  const [step, setStep] = useState(1);
  const [emailMobile, setEmailMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const LoginSendOtpUrl = 'https://daas-computers.onrender.com/auth/send-otp';
  const LoginVerifyOtpUrl = 'https://daas-computers.onrender.com/auth/verify-otp';

  useEffect(() => {
    let countdown;
    if (step === 2 && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [step, timer]);

  const resetLogin = () => {
    setStep(1);
    setEmailMobile('');
    setOtp('');
    setTimer(30);
    setStatus('');
    setErrorMessage('');
    if (onClose) onClose();
  };

  const isValidInput = (input) => {
    const isMobile = /^\d{10}$/.test(input.trim());
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
    return isMobile || isEmail;
  };

  const handleRequestOtp = async () => {
    const trimmed = emailMobile.trim();
    if (!trimmed || !isValidInput(trimmed)) {
      setErrorMessage('Enter a valid 10-digit mobile or email');
      return;
    }
    setErrorMessage('');
    setStatus('Sending OTP...');

    try {
      const res = await fetch(LoginSendOtpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: trimmed }),
      });
      const result = await res.text();
      setStatus(result);
      if (res.ok) {
        setStep(2);
        setTimer(30);
      } else {
        throw new Error(result);
      }
    } catch (err) {
      setStatus('Network error or server issue');
    }
  };

  const handleResendOtp = async () => {
    setStatus('Resending OTP...');
    try {
      const res = await fetch(LoginSendOtpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: emailMobile }),
      });
      const result = await res.text();
      setStatus(result);
      if (res.ok) setTimer(30);
    } catch (err) {
      setStatus('Network error during resend');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length < 4) {
      setErrorMessage('Enter a valid OTP');
      return;
    }
    setErrorMessage('');
    setStatus('Verifying OTP...');

    try {
      const res = await fetch(LoginVerifyOtpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: emailMobile, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message || 'OTP verified!');
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('emailOrMobile', emailMobile);

          const base64Url = data.token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const payload = JSON.parse(jsonPayload);
          localStorage.setItem('userId', payload.userId);

          toast.success("Login Successful ✅");

          if (onSuccess) onSuccess(data.token);

          setTimeout(() => {
            resetLogin();
          }, 1000);
        }
      } else {
        setStatus(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setStatus('Network error during verification');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex bg-white rounded-lg shadow-lg w-[500px] h-[600px] relative overflow-hidden">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-3xl font-bold z-50"
          onClick={resetLogin}
        >
          ×
        </button>

        <div
          className="flex flex-col justify-center items-center w-2/5 p-10 text-white"
          style={{ background: 'linear-gradient(135deg, #2874f0, #6b48ff)' }}
        >
          <h2 className="text-2xl font-bold mb-5">Login</h2>
          <p className="text-gray-200 mb-5 text-center">
            Experience the efficiency of Daas computers!
          </p>
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="w-3/5 p-10 flex flex-col justify-center">
          {step === 1 && (
            <>
              <label className="text-lg font-medium text-gray-700 mb-2">
                Enter Mobile Number or Email
              </label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 focus:border-indigo-600 p-2 outline-none"
                placeholder="e.g. 9876543210 or email@example.com"
                value={emailMobile}
                onChange={(e) => setEmailMobile(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
              )}
              <p className="text-gray-500 text-sm mt-3 text-center">
                Continue to access Daas computers
              </p>
              <button
                onClick={handleRequestOtp}
                className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:scale-105 transition-transform"
              >
                Request OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="text-lg font-medium text-gray-700 mb-2 mt-4">
                Enter OTP
              </label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 focus:border-indigo-600 p-2 outline-none"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
              )}
              <button
                onClick={handleVerifyOtp}
                className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg hover:scale-105 transition-transform"
              >
                Verify OTP
              </button>

              <div className="text-sm text-gray-600 text-center mt-4">
                {timer > 0 ? (
                  <span>Resend available in 00:{timer.toString().padStart(2, '0')}</span>
                ) : (
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={handleResendOtp}
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </>
          )}

          {status && (
            <p className="text-center text-yellow-500 font-medium mt-4">
              {status}
            </p>
          )}

          <button
            onClick={resetLogin}
            className="mt-6 text-gray-600 hover:text-red-600 underline self-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
