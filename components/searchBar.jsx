// "use client";

// import { useState, useEffect } from "react";
// import { searchProducts } from "../app/dataupdate/actions";
// import Pencil from "lucide-react"

// export default function SearchBar() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [sgst, setSgst] = useState(0);
//   const [cgst, setCgst] = useState(0);
//   const [includeSgst, setIncludeSgst] = useState(false);
//   const [includeCgst, setIncludeCgst] = useState(false);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       const results = await searchProducts(query);
//       const filteredResults = results.filter((product) =>
//         product.name.toLowerCase().startsWith(query.toLowerCase())
//       );
//       setResults(filteredResults);
//     } else {
//       setResults([]);
//     }
//   };

//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.trim()) {
//       const results = await searchProducts(value);
//       const filteredResults = results.filter((product) =>
//         product.name.toLowerCase().startsWith(value.toLowerCase())
//       );
//       setResults(filteredResults);
//     } else {
//       setResults([]);
//     }
//   };

//   const addToCart = (product) => {
//     setCart((prevCart) => [
//       ...prevCart,
//       { ...product, quantity: 0, amount: product.price, subtotal: 0 },
//     ]);
//     setResults([]);
//     setQuery("");
//   };

//   const handlePrint = () => {
//     const cartContent = document.getElementById("cart").innerHTML;
//     const printWindow = window.open("", "", "width=800,height=600");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print Cart</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               padding: 20px;
//             }
//             table {
//               width: 320px;
//               border-collapse: collapse;
//             }
//             th, td {
//               border: 1px solid #ddd;
//               padding: 8px;
//               text-align: left;
//             }
//             th {
//               background-color: #f4f4f4;
//             }
//           </style>
//         </head>
//         <body>
//           <h1>Cart Items</h1>
//           ${cartContent}
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   const handleQuantityChange = (index, value) => {
//     const updatedCart = cart.map((item, i) =>
//       i === index
//         ? {
//             ...item,
//             quantity: value,
//             subtotal: value * item.amount,
//           }
//         : item
//     );
//     setCart(updatedCart);
//   };

//   const handleAmountChange = (index, value) => {
//     const updatedCart = cart.map((item, i) =>
//       i === index
//         ? {
//             ...item,
//             amount: value,
//             subtotal: item.quantity * value,
//           }
//         : item
//     );
//     setCart(updatedCart);
//   };

//   const calculateTotal = () => {
//     const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
//     const sgstAmount = includeSgst ? (subtotal * sgst) / 100 : 0;
//     const cgstAmount = includeCgst ? (subtotal * cgst) / 100 : 0;
//     return subtotal + sgstAmount + cgstAmount;
//   };

//   const handleClearCart = () => {
//     const confirmClear = confirm("Are you sure you want to clear the cart?");
//     if (confirmClear) {
//       setCart([]);
//       localStorage.removeItem("cart");
//     }
//   };

//   const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="flex justify-between items-start">
//       <div className="relative w-full max-w-[400px] flex flex-row justify-between items-start">
//         <form onSubmit={handleSearch} className="relative w-full max-w-[400px]">
//           <input
//             type="text"
//             value={query}
//             onChange={handleInputChange}
//             placeholder="Search for groceries..."
//             className="relative w-full p-2 pr-10 text-rose-600 border border-rose-400 rounded-md appearance-none focus:outline-none"
//           />
//           <button type="submit" className="absolute top-3 right-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6 text-gray-400"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </button>
//         </form>
//         {results.length > 0 && (
//           <ul className="absolute w-[100%] max-h-[400px] bg-white border border-gray-300 rounded-md mt-10">
//             {results.map((product) => (
//               <li
//                 key={product._id}
//                 onClick={() => addToCart(product)}
//                 className="p-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {product.name} - ${product.price}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       {cart.length > 0 && (
//         <div id="cart" className="w-[620px] h-[400px] overflow-y-auto">
//           <h3 className="text-lg font-semibold mb-2">Cart</h3>
//           <table className="w-full">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded">
//               <tr>
//                 <th className="p-2">S.No</th>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Qty</th>
//                 <th className="p-2">Amount</th>
//                 <th className="p-2">Subtotal</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, index) => (
//                 <tr key={index}>
//                   <td className="p-2 text-center">{index + 1}</td>
//                   <td className="p-2 text-center">{item.name}</td>
//                   <td className="py-2 text-center">
//                     <input
//                       type="text"
//                       value={item.quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(index, parseFloat(e.target.value) || 0)
//                       }
//                       className="w-[60px] border rounded p-1 text-center"
//                     />
//                   </td>
//                   <td className="py-2 text-center">
//                     <div className="flex items-center w-fit mx-auto">
//                       <input
//                         type="text"
//                         value={item.amount}
//                         onChange={(e) =>
//                           handleAmountChange(index, parseFloat(e.target.value) || 0)
//                         }
//                         className="w-[60px] border rounded p-1 text-center"
//                       />
//                       <button
//                         className="ml-2 text-blue-500 hover:text-blue-700"
//                         onClick={() =>
//                           handleAmountChange(index, item.price)
//                         }
//                       >
//                         ✎
//                       </button>
//                     </div>
//                   </td>
//                   <td className="p-2 text-center">${item.subtotal.toFixed(2)}</td>
//                 </tr>
//               ))}
//               <tr className="font-semibold border-t">
//                 <td colSpan="2" className="p-2 text-right">
//                   Total Quantity:
//                 </td>
//                 <td className="p-2 text-center">{totalQuantity}</td>
//                 <td colSpan="2"></td>
//               </tr>
//             </tbody>
//           </table>
//           <div className="mt-4 flex items-center gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={includeSgst}
//                 className="w-4 size-8"
//                 onChange={() => setIncludeSgst(!includeSgst)}
//               />
//               <span className="text-sm"> Include SGST:</span>
//               <input
//                 type="text"
//                 value={sgst}
//                 onChange={(e) => setSgst(parseFloat(e.target.value) || 0)}
//                 className="w-[40px] border rounded p-1 text-center"
//                 disabled={!includeSgst}
//               />
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={includeCgst}
//                 className="w-4 size-8"
//                 onChange={() => setIncludeCgst(!includeCgst)}
//               />
//               <span className="text-sm"> Include CGST:</span>
//               <input
//                 type="text"
//                 value={cgst}
//                 onChange={(e) => setCgst(parseFloat(e.target.value) || 0)}
//                 className="w-[40px] border rounded p-1 text-center"
//                 disabled={!includeCgst}
//               />
//             </label>
//           </div>
//           <div className="mt-4 flex flex-col items-end">
//             <p className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
//             <div className="mt-2 flex gap-4">
//               <button
//                 onClick={handleClearCart}
//                 className="text-rose-400 hover:text-rose-600 px-4 py-2 rounded"
//               >
//                 Clear Cart
//               </button>
//               <button
//                 onClick={handlePrint}
//                 className="hover:bg-rose-600 bg-rose-400 text-white px-4 py-2 rounded"
//               >
//                 Print Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { searchProducts, submitCartToDatabase  } from "../app/dataupdate/actions";
import { Pencil } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [includeSgst, setIncludeSgst] = useState(false);
  const [includeCgst, setIncludeCgst] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      const results = await searchProducts(query);
      const filteredResults = results.filter((product) =>
        product.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const results = await searchProducts(value);
      const filteredResults = results.filter((product) =>
        product.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...product, quantity: 0, amount: product.price, subtotal: 0 },
    ]);
    setResults([]);
    setQuery("");
  };

  const handlePrint = async () => {
    try {
      const totalBill  = await submitCartToDatabase(cart);
      const result = await submitCartToDatabase(cart, sgst, cgst, includeSgst, includeCgst);
      if (result.success) {
        console.log('Cart data submitted successfully. Transaction ID:', result.transactionId);
      } else {
        console.error('Failed to submit cart data:', result.error);
      }
  
      // Rest of the print functionality
      const cartContent = document.getElementById("cart").innerHTML;
      // ... (rest of the print logic remains unchanged)
    } catch (error) {
      console.error('Error during print operation:', error);
    }
    const cartContent = document.getElementById("cart").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Cart</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 320px;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #e5e7eb;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f3f4f6;
            font-weight: 600;
            color: #374151;
          }
          .text-right {
            text-align: right;
          }
          .text-center {
            text-align: center;
          }
          .font-semibold {
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <h1>Cart Items</h1>
        ${cartContent}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleQuantityChange = (index, value) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? {
            ...item,
            quantity: value,
            subtotal: value * item.amount,
          }
        : item
    );
    setCart(updatedCart);
  };

  const handleAmountChange = (index, value) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? {
            ...item,
            amount: value,
            subtotal: item.quantity * value,
          }
        : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const sgstAmount = includeSgst ? (subtotal * sgst) / 100 : 0;
    const cgstAmount = includeCgst ? (subtotal * cgst) / 100 : 0;
    return subtotal + sgstAmount + cgstAmount;
  };

  const handleClearCart = () => {
    const confirmClear = confirm("Are you sure you want to clear the cart?");
    if (confirmClear) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex justify-between items-start">
      <div className="relative w-full max-w-[400px] flex flex-row justify-between items-start">
        <form onSubmit={handleSearch} className="relative w-full max-w-[400px]">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for groceries..."
            className="relative w-full p-2 pr-10 text-rose-600 border border-rose-400 rounded-md appearance-none focus:outline-none"
          />
          <button type="submit" className="absolute top-3 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
        {results.length > 0 && (
          <ul className="absolute w-[100%] max-h-[400px] bg-white border border-gray-300 rounded-md mt-10">
            {results.map((product) => (
              <li
                key={product._id}
                onClick={() => addToCart(product)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <div id="cart" className="w-[720px] h-[400px] border p-6 rounded-md overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">Cart</h3>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  S.No
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Qty
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseFloat(e.target.value) || 0)
                      }
                      className="w-[60px] border rounded p-1 text-center"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <input
                        type="text"
                        step={0.01}
                        value={item.amount}
                        onChange={(e) =>
                          handleAmountChange(index, parseFloat(e.target.value) || 0)
                        }
                        className="w-[60px] border rounded p-1 text-center"
                      />
                      <button
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        onClick={() => handleAmountChange(index, item.price)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    ${item.subtotal.toFixed(2)}
                  </td>
                </tr>
              ))}
                <tr className="font-semibold border-t">
              <td colSpan="2" className="p-2 text-right">
                 Total Quantity:
                 </td>
               <td className="p-2 text-center">{totalQuantity}</td>
              <td colSpan="1" className="p-2 text-right">
                 Amount:
                 </td>
               <td className="p-2">$ {subtotal}</td>
             </tr>
            </tbody>
          </table>
          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeSgst}
                className="w-4 size-8"
                onChange={() => setIncludeSgst(!includeSgst)}
              />
              <span className="text-sm"> Include SGST:</span>
              <input
                type="text"
                value={sgst}
                onChange={(e) => setSgst(parseFloat(e.target.value) || 0)}
                className="w-[40px] border rounded p-1 text-center"
                disabled={!includeSgst}
              />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeCgst}
                className="w-4 size-8"
                onChange={() => setIncludeCgst(!includeCgst)}
              />
              <span className="text-sm"> Include CGST:</span>
              <input
                type="text"
                value={cgst}
                onChange={(e) => setCgst(parseFloat(e.target.value) || 0)}
                className="w-[40px] border rounded p-1 text-center"
                disabled={!includeCgst}
              />
            </label>
          </div>
          <div className="mt-4 flex flex-col items-end">
            <p className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
            <div className="mt-2 flex gap-4">
              <button
                onClick={handleClearCart}
                className="text-rose-400 hover:text-rose-600 px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePrint}
                className="hover:bg-rose-600 bg-rose-400 text-white px-4 py-2 rounded"
              >
                Print Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

