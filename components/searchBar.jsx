// 'use client'

// import { useState } from 'react'
// import { searchProducts } from '../app/dataupdate/actions'

// export default function SearchBar() {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState([])
//   const [cart, setCart] = useState([])

//   const handleSearch = async (e) => {
//     e.preventDefault()
//     if (query.trim()) {
//       const results = await searchProducts(query)
//       setResults(results)
//     } else {
//       setResults([])
//     }
//   }

//   const handleInputChange = async (e) => {
//     const value = e.target.value
//     setQuery(value)

//     if (value.trim()) {
//       const results = await searchProducts(value)
//       setResults(results)
//     } else {
//       setResults([])
//     }
//   }

//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product])
//     setResults([]) // Clear search results after adding to the cart
//     setQuery('') // Clear the search bar
//   }

//   return (
//     <div className="relative">
//       {/* Search Bar */}
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder="Search for groceries..."
//           className="w-full p-2 pr-10 border rounded-md"
//         />
//         <button type="submit" className="absolute right-2 top-2">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-400">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </button>
//       </form>

//       {/* Display Search Results */}
//       {results.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
//           {results.map((product) => (
//             <li
//               key={product._id}
//               onClick={() => addToCart(product)}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//             >
//               {product.name} - ${product.price}
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Display Cart Items */}
//       {cart.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Cart</h3>
//           <ul className="bg-gray-100 p-2 rounded-md">
//             {cart.map((item, index) => (
//               <li key={index} className="p-2 border-b last:border-0">
//                 {item.name} - ${item.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }



'use client'

import { useState, useEffect } from 'react'
import { searchProducts } from '../app/dataupdate/actions'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (query.trim()) {
      const results = await searchProducts(query)
      const filteredResults = results.filter(product =>
        product.name.toLowerCase().startsWith(query.toLowerCase())
      )
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }

  const handleInputChange = async (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim()) {
      const results = await searchProducts(value)
      const filteredResults = results.filter(product =>
        product.name.toLowerCase().startsWith(value.toLowerCase())
      )
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }

  const addToCart = (product) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...product, quantity: 1, total: product.price },
    ])
    setResults([])
    setQuery('')
  }

  const handleQuantityChange = (index, value) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? {
            ...item,
            quantity: value,
            total: value * item.price,
          }
        : item
    )
    setCart(updatedCart)
  }

  const handleEditQuantity = (e, index) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      handleQuantityChange(index, value)
    }
  }

  const handlePrint = () => {
    const cartContent = document.getElementById('cart').innerHTML
    const printWindow = window.open('', '', 'width=800,height=600')
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
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <h1>Cart Items</h1>
          ${cartContent}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleClearCart = () => {
    const confirmClear = confirm('Are you sure you want to clear the cart?')
    if (confirmClear) {
      setCart([])
      localStorage.removeItem('cart')
    }
  }

  return (
    <div className='flex justify-between items-start'>
    <div className="relative w-full max-w-[400px] flex flex-row jusify-between items-start">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-full max-w-[400px]">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for groceries..."
          className=" relative w-full p-2 pr-10 border rounded-md"
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

      {/* Display Search Results */}
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

      {/* Display Cart Table */}
      
    </div>
    {cart.length > 0 && (
        <div id="cart" className="mt-4 w-[320px]">
          <h3 className="text-lg font-semibold mb-2">Cart</h3>
          <table className="w-full">
            <thead className="border-b border-gray-400">
              <tr>
                <th className=" p-2">S.No</th>
                <th className=" p-2">Name</th>
                <th className=" p-2">Qty-kg</th>
                <th className=" p-2">Cost</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className=" p-2 text-center">{index + 1}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleEditQuantity(e, index)}
                      className="w-16 text-center border appearance-none rounded"
                    />
                  </td>
                  <td className=" p-2 text-center">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Print Cart
            </button>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


