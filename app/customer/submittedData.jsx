'use client';

import { useState } from 'react';
import { fetchSubmittedData } from './actions';

export default function SubmittedData() {
  const [submittedData, setSubmittedData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  async function handleFetchSubmittedData() {
    setIsFetching(true);
    setError(null);

    try {
      const data = await fetchSubmittedData();
      setSubmittedData(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred while fetching submitted data. Please try again.');
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="mt-4 max-w-md mx-auto">
      <button
        onClick={handleFetchSubmittedData}
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isFetching}
      >
        {isFetching ? 'Fetching...' : 'Show Submitted Data'}
      </button>
      {error && (
        <p className="mt-4 text-center text-red-600">
          {error}
        </p>
      )}
      {submittedData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Submitted Data:</h2>
          <ul className="space-y-2">
            {submittedData.map((item, index) => (
              <li key={index} className="p-2 border rounded-md">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Message:</strong> {item.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
