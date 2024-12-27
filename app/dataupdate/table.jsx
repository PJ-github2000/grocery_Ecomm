
// import { useLocation } from 'react-router-dom'

// export default function SubmissionsTable() {
//   const location = useLocation()
//   const { submissions } = location.state || { submissions: [] } // Retrieve passed data

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Submissions Table</h1>
//       {submissions.length === 0 ? (
//         <p>No submissions available.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Name</th>
//               <th className="border border-gray-300 p-2">Email</th>
//               <th className="border border-gray-300 p-2">Message</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((submission) => (
//               <tr key={submission._id}>
//                 <td className="border border-gray-300 p-2">{submission.name}</td>
//                 <td className="border border-gray-300 p-2">{submission.email}</td>
//                 <td className="border border-gray-300 p-2">{submission.message}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }



'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchSubmissions, deleteSubmission } from '../actions'

export default function SubmissionsPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadSubmissions()
  }, [])

  async function loadSubmissions() {
    setIsLoading(true)
    const fetchedSubmissions = await fetchSubmissions()
    setSubmissions(fetchedSubmissions)
    setIsLoading(false)
  }

  async function handleDelete(id) {
    const result = await deleteSubmission(id)
    if (result.success) {
      setSubmissions(submissions.filter(sub => sub._id !== id))
    } else {
      alert('Failed to delete submission')
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-4">Submissions</h2>
      {isLoading ? (
        <p>Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Name</th>
                <th className="border px-4 py-2 bg-gray-100">Email</th>
                <th className="border px-4 py-2 bg-gray-100">Message</th>
                <th className="border px-4 py-2 bg-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission._id}>
                  <td className="border px-4 py-2">{submission.name}</td>
                  <td className="border px-4 py-2">{submission.email}</td>
                  <td className="border px-4 py-2">{submission.message}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDelete(submission._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


