// 'use client'

// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom' // Assuming React Router is used
// import { fetchSubmissions, updateSubmission, deleteSubmission } from './actions'

// export default function SubmissionModal() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [submissions, setSubmissions] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [editingId, setEditingId] = useState(null)

//   useEffect(() => {
//     if (isOpen) {
//       loadSubmissions()
//     }
//   }, [isOpen])

//   async function loadSubmissions() {
//     setIsLoading(true)
//     const fetchedSubmissions = await fetchSubmissions()
//     setSubmissions(fetchedSubmissions)
//     setIsLoading(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }

//   function closeModal() {
//     setIsOpen(false)
//     setEditingId(null)
//   }

//   async function handleEdit(id, updatedData) {
//     const result = await updateSubmission(id, updatedData)
//     if (result.success) {
//       setSubmissions(submissions.map(sub => sub._id === id ? { ...sub, ...updatedData } : sub))
//       setEditingId(null)
//     } else {
//       alert('Failed to update submission')
//     }
//   }

//   async function handleDelete(id) {
//     const result = await deleteSubmission(id)
//     if (result.success) {
//       setSubmissions(submissions.filter(sub => sub._id !== id))
//     } else {
//       alert('Failed to delete submission')
//     }
//   }

//   function handleViewAll() {
//     navigate('/submissions', { state: { submissions } }) // Navigate to the table page with data
//   }

//   return (
//     <>
//       <button
//         onClick={openModal}
//         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//       >
//         View Submissions
//         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//           -&gt;
//         </span>
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold mb-4">Submissions</h2>
//             {isLoading ? (
//               <p>Loading submissions...</p>
//             ) : submissions.length === 0 ? (
//               <p>No submissions found.</p>
//             ) : (
//               <div className="space-y-4">
//                 {submissions.map((submission) => (
//                   <div key={submission._id} className="border p-4 rounded-md">
//                     {editingId === submission._id ? (
//                       <EditForm
//                         submission={submission}
//                         onSave={(updatedData) => handleEdit(submission._id, updatedData)}
//                         onCancel={() => setEditingId(null)}
//                       />
//                     ) : (
//                       <>
//                         <h3 className="font-bold">{submission.name}</h3>
//                         <p>{submission.email}</p>
//                         <p>{submission.message}</p>
//                         <div className="mt-2 space-x-2">
//                           <button
//                             onClick={() => setEditingId(submission._id)}
//                             className="bg-blue-500 text-white px-2 py-1 rounded"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(submission._id)}
//                             className="bg-red-500 text-white px-2 py-1 rounded"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <button
//               onClick={closeModal}
//               className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//             <button
//               onClick={handleViewAll}
//               className="mt-4 bg-green-500 text-white px-4 py-2 rounded ml-2"
//             >
//               View All in Table
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// function EditForm({ submission, onSave, onCancel }) {
//   const [name, setName] = useState(submission.name)
//   const [email, setEmail] = useState(submission.email)
//   const [message, setMessage] = useState(submission.message)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSave({ name, email, message })
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Message"
//         required
//         className="w-full p-2 border rounded"
//       ></textarea>
//       <div className="space-x-2">
//         <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
//         <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
//       </div>
//     </form>
//   )
// }



'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SubmissionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  function handleViewSubmissions() {
    router.push('/submissions') // Navigate to the submissions page
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-rose-400 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
      >
        View Submissions
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Submissions
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Here you can view all submissions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleViewSubmissions}
                >
                  View All Submissions
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


