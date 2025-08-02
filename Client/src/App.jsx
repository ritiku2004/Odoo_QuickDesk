import React, { useState } from 'react'

function App() {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to Odoo Hackathon</h1>
          <p className="text-gray-700 mb-4">This is a simple React application styled with Tailwind CSS.</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Click Me
          </button>
        </div>
      </div>
    </>
  )
}

export default App
