import React, { useState } from 'react';
import axios from 'axios';

function NumberManagementService() {
  const [mergedNumbers, setMergedNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAndMergeNumbers = async () => {
    setLoading(true);
    const testServerUrls = [
      'http://20.244.56.144/numbers/primes',
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd',
    ];

    try {
      const responses = await Promise.all(testServerUrls.map(url => axios.get(url)));
      const mergedNumbers = responses
        .map(response => response.data.numbers)
        .flat() // Merge arrays
        .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
        .sort((a, b) => a - b); // Sort numbers

      setMergedNumbers(mergedNumbers);
    } catch (error) {
      console.error('Error fetching and merging numbers:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <button onClick={fetchAndMergeNumbers} disabled={loading}>
        Fetch and Merge Numbers
      </button>
      {loading && <p>Loading...</p>}
      {mergedNumbers.length > 0 && (
        <div>
          <h2>Merged Numbers:</h2>
          <ul>
            {mergedNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NumberManagementService;