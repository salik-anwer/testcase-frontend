import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/testcases')
      .then(response => {
        setTestCases(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the test cases!", error);
      });
  }, []);

  const handleInputChange = (id, field, value) => {
    setTestCases(prevTestCases =>
      prevTestCases.map(tc => (tc.id === id ? { ...tc, [field]: value } : tc))
    );
  };

  const handleSave = (id) => {
    const testCase = testCases.find(tc => tc.id === id);
    axios.put(`http://localhost:5000/testcases/${id}`, testCase)
      .then(response => {
        console.log("Test case updated successfully!");
      })
      .catch(error => {
        console.error("There was an error updating the test case!", error);
      });
  };

  const handleStatusChange = (id, status) => {
    setTestCases(prevTestCases =>
      prevTestCases.map(tc => (tc.id === id ? { ...tc, status } : tc))
    );
    handleSave(id);
  };

  return (
    <div className="bg-blue-900 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <input type="text" placeholder="Search issue.." className="w-full p-2 rounded-lg mb-4"/>
        <table className="w-full text-white mt-4">
          <thead>
            <tr>
              <th className="border p-2">Test Case Name</th>
              <th className="border p-2">Estimate Time</th>
              <th className="border p-2">Module</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map(testCase => (
              <tr key={testCase.id} className="text-center">
                <td className="border p-2">
                  <input
                    type="text"
                    value={testCase.name}
                    onChange={(e) => handleInputChange(testCase.id, 'name', e.target.value)}
                    className="text-black w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={testCase.estimate_time}
                    onChange={(e) => handleInputChange(testCase.id, 'estimate_time', e.target.value)}
                    className="text-black w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={testCase.module}
                    onChange={(e) => handleInputChange(testCase.id, 'module', e.target.value)}
                    className="text-black w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={testCase.priority}
                    onChange={(e) => handleInputChange(testCase.id, 'priority', e.target.value)}
                    className="text-black w-full"
                  />
                </td>
                <td className="border p-2">
                  <select
                    value={testCase.status}
                    onChange={(e) => handleStatusChange(testCase.id, e.target.value)}
                    className="text-black"
                  >
                    <option value="PASS">PASS</option>
                    <option value="FAIL">FAIL</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button onClick={() => handleSave(testCase.id)} className="text-white bg-blue-500 p-2 rounded-lg">
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
