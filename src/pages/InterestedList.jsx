// // src/pages/InterestedList.jsx
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useInterested } from '../context/InterestedContext';
// import Login from '../Components/Login';

// const InterestedList = () => {
//   const {
//     interestedItems,
//     removeFromInterested,
//     incrementItem,
//     decrementItem,
//   } = useInterested();

//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     console.log('🔍 Interested Items:', interestedItems);
//   }, [interestedItems]);

//   const handleCheckAvailability = () => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//       setShowLogin(true);
//       return;
//     }

//     submitInterestedItems(token, userId);
//   };

//   const submitInterestedItems = async (token, userId) => {
//     try {
//       const accessories = [];
//       const imageFiles = [];

//       for (let item of interestedItems) {
//         for (let i = 0; i < item.quantity; i++) {
//           accessories.push({
//             productName: item.name,
//             brandName: item.brand,
//             rating: 4.5,
//             description: `${item.name} by ${item.brand}`,
//             accessoryCategory: item.category || 'OTHERS',
//           });

//           const response = await fetch(item.image || 'https://via.placeholder.com/100x60');
//           const blob = await response.blob();
//           const file = new File([blob], `${item.name}-${i}.jpg`, { type: blob.type });
//           imageFiles.push(file);
//         }
//       }

//       const formData = new FormData();
//       const accessoriesBlob = new Blob([JSON.stringify(accessories)], { type: 'application/json' });
//       formData.append('accessories', new File([accessoriesBlob], 'accessories.json'));
//       imageFiles.forEach((file) => formData.append('images', file));

//       const res = await fetch(
//         `https://daas-computers.onrender.com/api/product/user/${userId}/add-accessories`,
//         {
//           method: 'POST',
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData,
//         }
//       );

//       const data = await res.text();

//       if (res.ok) {
//         toast.success('🎉 Thank you for visiting Daas Computers! Our team will contact you shortly.', {
//           position: 'top-center',
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: 'colored',
//         });
//         localStorage.removeItem('interestedItems');
//         setTimeout(() => window.location.reload(), 5200);
//       } else {
//         toast.error('❌ Submission failed: ' + data);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('❌ Unexpected error occurred.');
//     }
//   };

//   const handleLoginSuccess = () => {
//     setShowLogin(false);
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');
//     if (token && userId) {
//       submitInterestedItems(token, userId);
//     }
//   };

//   return (
//     <div className="p-4 min-h-screen bg-blue-50">
//       {showLogin && (
//         <Login
//           onSuccess={handleLoginSuccess}
//           onClose={() => setShowLogin(false)}
//         />
//       )}

//       <h2 className="text-2xl font-bold text-blue-700 mb-4">Interested Products</h2>

//       {interestedItems.length === 0 ? (
//         <p className="text-gray-600 italic">No products in your interested list.</p>
//       ) : (
//         <>
//           <table className="w-full bg-white rounded shadow text-sm mb-4">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="p-2">Image</th>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Brand</th>
//                 <th className="p-2">Quantity</th>
//                 <th className="p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {interestedItems.map((item, index) => (
//                 <tr key={item.name} className="border-t">
//                   <td className="p-2">
//                     <img
//                       src={item.image || 'https://via.placeholder.com/100x60'}
//                       onError={(e) => (e.target.src = 'https://via.placeholder.com/100x60')}
//                       className="w-24 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-2">{item.name}</td>
//                   <td className="p-2">{item.brand}</td>
//                   <td className="p-2">
//                     <div className="flex justify-center items-center gap-2">
//                       <button
//                         onClick={() => decrementItem(item.name)}
//                         className="px-2 bg-gray-300 rounded hover:bg-gray-400"
//                       >
//                         −
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => incrementItem(item.name)}
//                         className="px-2 bg-gray-300 rounded hover:bg-gray-400"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => {
//                         removeFromInterested(item.name);
//                         toast.info(`❌ Removed: ${item.name}`);
//                       }}
//                       className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-end">
//             <button
//               onClick={handleCheckAvailability}
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow font-semibold"
//             >
//               Check Availability
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default InterestedList;

// // src/pages/InterestedList.jsx
// // import React, { useEffect, useState } from 'react';
// // import { toast } from 'react-toastify';
// // import { useInterested } from '../context/InterestedContext';
// // import Login from '../Components/Login';

// // const InterestedList = () => {
// //   const {
// //     interestedItems,
// //     removeFromInterested,
// //     incrementItem,
// //     decrementItem,
// //   } = useInterested();

// //   const [showLogin, setShowLogin] = useState(false);

// //   useEffect(() => {
// //     console.log('🔍 Interested Items:', interestedItems);
// //   }, [interestedItems]);

// //   const handleCheckAvailability = () => {
// //     const token = localStorage.getItem('token');
// //     const userId = localStorage.getItem('userId');
// //     const contact = localStorage.getItem('emailOrMobile');

// //     if (!token || !userId) {
// //       setShowLogin(true);
// //       return;
// //     }

// //     submitInterestedItems(token, userId, contact);
// //   };

// //   const submitInterestedItems = async (token, userId, contact) => {
// //     try {
// //       const accessories = [];
// //       const imageFiles = [];

// //       for (let item of interestedItems) {
// //         accessories.push({
// //           productName: item.name,
// //           brandName: item.brand,
// //           rating: 4.5,
// //           quantity: item.quantity,
// //           description: `${item.name} by ${item.brand}`,
// //           accessoryCategory: item.category || 'OTHERS',
// //         });

// //         const response = await fetch(item.image || 'https://via.placeholder.com/100x60');
// //         const blob = await response.blob();
// //         const file = new File([blob], `${item.name}.jpg`, { type: blob.type });
// //         imageFiles.push(file);
// //       }

// //       const formData = new FormData();
// //       const accessoriesBlob = new Blob([
// //         JSON.stringify({ contact, accessories })
// //       ], { type: 'application/json' });
// //       formData.append('accessories', new File([accessoriesBlob], 'accessories.json'));
// //       imageFiles.forEach((file) => formData.append('images', file));

// //       const res = await fetch(
// //         `https://daas-computers.onrender.com/api/product/user/${userId}/add-accessories`,
// //         {
// //           method: 'POST',
// //           headers: { Authorization: `Bearer ${token}` },
// //           body: formData,
// //         }
// //       );

// //       const data = await res.text();

// //       if (res.ok) {
// //         toast.success('🎉 Thank you for visiting Daas Computers! Our team will contact you shortly.', {
// //           position: 'top-center',
// //           autoClose: 5000,
// //           hideProgressBar: false,
// //           closeOnClick: true,
// //           pauseOnHover: true,
// //           draggable: true,
// //           progress: undefined,
// //           theme: 'colored',
// //         });
// //         localStorage.removeItem('interestedItems');
// //         setTimeout(() => window.location.reload(), 5200);
// //       } else {
// //         toast.error('❌ Submission failed: ' + data);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('❌ Unexpected error occurred.');
// //     }
// //   };

// //   const handleLoginSuccess = () => {
// //     setShowLogin(false);
// //     const token = localStorage.getItem('token');
// //     const userId = localStorage.getItem('userId');
// //     const contact = localStorage.getItem('emailOrMobile');
// //     if (token && userId) {
// //       submitInterestedItems(token, userId, contact);
// //     }
// //   };

// //   return (
// //     <div className="p-4 min-h-screen bg-blue-50">
// //       {showLogin && (
// //         <Login
// //           onSuccess={handleLoginSuccess}
// //           onClose={() => setShowLogin(false)}
// //         />
// //       )}

// //       <h2 className="text-2xl font-bold text-blue-700 mb-4">Interested Products</h2>

// //       {interestedItems.length === 0 ? (
// //         <p className="text-gray-600 italic">No products in your interested list.</p>
// //       ) : (
// //         <>
// //           <table className="w-full bg-white rounded shadow text-sm mb-4">
// //             <thead className="bg-blue-600 text-white">
// //               <tr>
// //                 <th className="p-2">Image</th>
// //                 <th className="p-2">Name</th>
// //                 <th className="p-2">Brand</th>
// //                 <th className="p-2">Quantity</th>
// //                 <th className="p-2">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {interestedItems.map((item, index) => (
// //                 <tr key={item.name} className="border-t">
// //                   <td className="p-2">
// //                     <img
// //                       src={item.image || 'https://via.placeholder.com/100x60'}
// //                       onError={(e) => (e.target.src = 'https://via.placeholder.com/100x60')}
// //                       className="w-24 h-16 object-cover rounded"
// //                     />
// //                   </td>
// //                   <td className="p-2">{item.name}</td>
// //                   <td className="p-2">{item.brand}</td>
// //                   <td className="p-2">
// //                     <div className="flex justify-center items-center gap-2">
// //                       <button
// //                         onClick={() => decrementItem(item.name)}
// //                         className="px-2 bg-gray-300 rounded hover:bg-gray-400"
// //                       >
// //                         −
// //                       </button>
// //                       <span>{item.quantity}</span>
// //                       <button
// //                         onClick={() => incrementItem(item.name)}
// //                         className="px-2 bg-gray-300 rounded hover:bg-gray-400"
// //                       >
// //                         +
// //                       </button>
// //                     </div>
// //                   </td>
// //                   <td className="p-2">
// //                     <button
// //                       onClick={() => {
// //                         removeFromInterested(item.name);
// //                         toast.info(`❌ Removed: ${item.name}`);
// //                       }}
// //                       className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// //                     >
// //                       Remove
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

// //           <div className="flex justify-end">
// //             <button
// //               onClick={handleCheckAvailability}
// //               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow font-semibold"
// //             >
// //               Check Availability
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default InterestedList;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useInterested } from '../context/InterestedContext';
import Login from '../Components/Login';

const InterestedList = () => {
  const {
    interestedItems,
    removeFromInterested,
    incrementItem,
    decrementItem,
    clearInterestedItems, // ✅ New function to clear cart
  } = useInterested();

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    console.log('🔍 Interested Items:', interestedItems);
  }, [interestedItems]);

  const handleCheckAvailability = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setShowLogin(true);
      return;
    }

    submitInterestedItems(token, userId);
  };

  const submitInterestedItems = async (token, userId) => {
    try {
      const accessories = [];
      const imageFiles = [];

      for (let item of interestedItems) {
        for (let i = 0; i < item.quantity; i++) {
          accessories.push({
            productName: item.name,
            brandName: item.brand,
            rating: 4.5,
            description: `${item.name} by ${item.brand}`,
            accessoryCategory: item.category || 'OTHERS',
          });

          const response = await fetch(item.image || 'https://via.placeholder.com/100x60');
          const blob = await response.blob();
          const file = new File([blob], `${item.name}-${i}.jpg`, { type: blob.type });
          imageFiles.push(file);
        }
      }

      const formData = new FormData();
      const accessoriesBlob = new Blob([JSON.stringify(accessories)], { type: 'application/json' });
      formData.append('accessories', new File([accessoriesBlob], 'accessories.json'));
      imageFiles.forEach((file) => formData.append('images', file));

      const res = await fetch(
        `https://daas-computers.onrender.com/api/product/user/${userId}/add-accessories`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await res.text();

      if (!res.ok) {
        toast.error('❌ Submission failed: ' + data);
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Unexpected error occurred.');
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);

    toast.success('🎉 Thank you for visiting Daas Computers! Our team will contact you shortly.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    // ✅ Clear the interested items immediately
    clearInterestedItems();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      submitInterestedItems(token, userId);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-blue-50">
      {showLogin && (
        <Login
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      <h2 className="text-2xl font-bold text-blue-700 mb-4">Interested Products</h2>

      {interestedItems.length === 0 ? (
        <p className="text-gray-600 italic">No products in your interested list.</p>
      ) : (
        <>
          <table className="w-full bg-white rounded shadow text-sm mb-4">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Brand</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {interestedItems.map((item, index) => (
                <tr key={item.name} className="border-t">
                  <td className="p-2">
                    <img
                      src={item.image || 'https://via.placeholder.com/100x60'}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/100x60')}
                      className="w-32 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.brand}</td>
                  <td className="p-2">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => decrementItem(item.name)}
                        className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => incrementItem(item.name)}
                        className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => {
                        removeFromInterested(item.name);
                        toast.info(`❌ Removed: ${item.name}`);
                      }}
                      className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <button
              onClick={handleCheckAvailability}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow font-semibold"
            >
              Check Availability
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InterestedList;
