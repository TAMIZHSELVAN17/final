// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import logo from '../assets/Daas Computers LOGO.png';
// import { FaFacebook } from 'react-icons/fa';
// import { FaSquareInstagram } from 'react-icons/fa6';
// import { useInterested } from '../context/InterestedContext';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { interestedItems } = useInterested();

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const brandText = 'Daas Computers'.split('');

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Showroom', path: '/showroom' },
//     { name: 'Accessories', path: '/accessories' },
//     { name: 'Interested', path: '/interested' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Contact Us', path: '/contact' },
//   ];

//   const isActive = (path) => location.pathname.startsWith(path);

//   const navLinkClass = (path) =>
//     `relative font-medium px-3 py-1 rounded-md transition-all duration-200 ${
//       isActive(path)
//         ? 'text-yellow-300 border-b-2 border-yellow-300'
//         : 'text-white hover:text-yellow-300'
//     }`;

//   const desktopFadeVariant = {
//     hidden: { opacity: 0, x: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: { delay: i * 0.1, duration: 0.4 },
//     }),
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow-md select-none">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo + Brand */}
//           <Link to="/" className="flex items-center gap-3">
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="flex items-center gap-3"
//             >
//               <img
//                 src={logo}
//                 alt="Daas Computers logo"
//                 className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
//               />
//               <motion.h1
//                 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide flex flex-wrap"
//                 initial="hidden"
//                 animate="visible"
//                 variants={{
//                   visible: {
//                     transition: {
//                       staggerChildren: 0.05,
//                       delayChildren: 0.3,
//                     },
//                   },
//                 }}
//               >
//                 {brandText.map((char, index) => (
//                   <motion.span
//                     key={index}
//                     variants={{
//                       hidden: { opacity: 0, x: 20 },
//                       visible: { opacity: 1, x: 0 },
//                     }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {char === ' ' ? '\u00A0' : char}
//                   </motion.span>
//                 ))}
//               </motion.h1>
//             </motion.div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
//             {navLinks.map((item, i) => (
//               <motion.div
//                 key={item.path}
//                 custom={i}
//                 initial="hidden"
//                 animate="visible"
//                 variants={desktopFadeVariant}
//               >
//                 <Link to={item.path} className={navLinkClass(item.path)}>
//                   {item.name}
//                   {item.name === 'Interested' && interestedItems.length > 0 && (
//                     <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                       {interestedItems.length}
//                     </span>
//                   )}
//                 </Link>
//               </motion.div>
//             ))}

//             {/* Show Logout only if logged in */}
//             {isLoggedIn && (
//               <motion.div
//                 key="auth"
//                 custom={navLinks.length}
//                 initial="hidden"
//                 animate="visible"
//                 variants={desktopFadeVariant}
//               >
//                 <button
//                   onClick={handleLogout}
//                   className="text-white hover:text-red-400 font-semibold px-3"
//                 >
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </div>

//           {/* Social + Toggle */}
//           <div className="flex items-center space-x-3">
//             <a
//               href="https://www.facebook.com/share/1YjDfMJq8b/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group rounded-full bg-white border border-gray-300 shadow-md hover:border-blue-500 w-9 h-9 flex items-center justify-center hover:scale-105 transition duration-300"
//             >
//               <FaFacebook className="text-blue-600 group-hover:text-blue-700" size={25} />
//             </a>
//             <a
//               href="https://www.instagram.com/daascomputer?igsh=dGd6NDlhMGlpM2Fm"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group rounded-full bg-white border border-gray-300 shadow-md hover:border-pink-500 w-9 h-9 flex items-center justify-center hover:scale-105 transition duration-300"
//             >
//               <FaSquareInstagram className="text-pink-600 group-hover:text-pink-700" size={25} />
//             </a>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden text-white focus:outline-none p-1"
//               aria-label={isOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isOpen ? <X size={26} /> : <Menu size={26} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-blue-600 px-4 pt-2 pb-4 space-y-2"
//           >
//             {navLinks.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`relative block font-medium px-3 py-2 rounded-md transition-all duration-200 ${
//                   isActive(item.path)
//                     ? 'text-yellow-300 border-b-2 border-yellow-300 w-28'
//                     : 'text-white hover:text-yellow-300'
//                 }`}
//               >
//                 {item.name}
//                 {item.name === 'Interested' && interestedItems.length > 0 && (
//                   <span className="absolute top-1 right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                     {interestedItems.length}
//                   </span>
//                 )}
//               </Link>
//             ))}

//             {/* Mobile Logout Button */}
//             {isLoggedIn && (
//               <div className="border-t border-blue-400 pt-2 mt-2">
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsOpen(false);
//                   }}
//                   className="block text-white hover:text-red-400 font-semibold px-3"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Navbar;

















import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Daas Computers LOGO.png';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { useInterested } from '../context/InterestedContext';
import contacticon from "../assets/image.png";
import Login from '../Components/Login';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { interestedItems } = useInterested();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [dropdownAnimation, setDropdownAnimation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowDropdown(true);
      setDropdownAnimation(true);
      setTimeout(() => {
        setDropdownAnimation(false);
        setShowDropdown(false);
      }, 4000);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logout Successful ✅');
    navigate('/');
  };

  const brandText = 'Daas Computers'.split('');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Showroom', path: '/showroom' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const navLinkClass = (path) =>
    `relative font-medium px-3 py-1 rounded-md transition-all duration-200 ${
      isActive(path)
        ? 'text-yellow-300 border-b-2 border-yellow-300'
        : 'text-white hover:text-yellow-300'
    }`;

  const desktopFadeVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const handleLoginOpen = () => {
    setShowLoginPopup(true);
    setDropdownAnimation(true);
    setTimeout(() => setDropdownAnimation(false), 2000);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow-md select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <img
                  src={logo}
                  alt="Daas Computers logo"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
                <motion.h1
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide flex flex-wrap"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                >
                  {brandText.map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>
            </Link>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.path}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={desktopFadeVariant}
                >
                  <Link to={item.path} className={navLinkClass(item.path)}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right: Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <div
                className="relative group"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setTimeout(() => setShowDropdown(false), 1000)}
              >
                <img
                  src={contacticon}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-white cursor-pointer"
                />
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-white text-sm font-semibold px-4 py-2 rounded shadow-md z-50 bg-gradient-to-r from-blue-500 to-indigo-600 border border-white ${
                        dropdownAnimation ? 'animate-bounce' : ''
                      }`}
                    >
                      {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                      ) : (
                        <button onClick={handleLoginOpen}>Login</button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="https://www.facebook.com/share/1YjDfMJq8b/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-white border border-gray-300 shadow-md hover:border-blue-500 w-9 h-9 flex items-center justify-center hover:scale-105 transition duration-300"
              >
                <FaFacebook className="text-blue-600 group-hover:text-blue-700" size={25} />
              </a>
              <a
                href="https://www.instagram.com/daascomputer?igsh=dGd6NDlhMGlpM2Fm"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-white border border-gray-300 shadow-md hover:border-pink-500 w-9 h-9 flex items-center justify-center hover:scale-105 transition duration-300"
              >
                <FaSquareInstagram className="text-pink-600 group-hover:text-pink-700" size={25} />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none p-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-blue-600 px-4 pt-2 pb-4 space-y-2"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`relative block font-medium px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-yellow-300 border-b-2 border-yellow-300 w-28'
                      : 'text-white hover:text-yellow-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isLoggedIn && (
                <div className="border-t border-blue-400 pt-2 mt-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block text-white hover:text-red-400 font-semibold px-3"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {showLoginPopup && (
        <Login
          onClose={() => setShowLoginPopup(false)}
          onSuccess={() => {
            setIsLoggedIn(true);
            setShowLoginPopup(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
