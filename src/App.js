import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [feedbackList, setFeedbackList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('https://feedback-backend-wtbh.onrender.com/feedback');
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const validate = (field, value) => {
    let error = "";

    if (field === "name") {
      if (!value.trim()) {
        error = "Name is required";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = "Name must only contain letters and spaces";
      }
    }

    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        error = "Enter a valid email address";
      }
    }

    if (field === "message") {
      if (!value.trim()) {
        error = "Feedback message cannot be empty";
      } else if (value.length < 10) {
        error = "Feedback message should be at least 10 characters long";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFeedback({
      ...feedback,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: validate(name, value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🟢 Form Submitted!"); // Debug Log
    console.log("🟢 Feedback Data:", feedback); // Debug Log

    let newErrors = {
      name: validate("name", feedback.name),
      email: validate("email", feedback.email),
      message: validate("message", feedback.message)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      const response = await fetch('https://feedback-backend-wtbh.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting feedback:", errorData.error);
        alert("Error submitting feedback");
        return;
      }

      setSuccessMessage("✅ Thank you! Your feedback has been submitted successfully.");

      setFeedback({ name: '', email: '', message: '' });
      setErrors({});
      fetchFeedback();

      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-6">Feedback Application</h1>
      
      {/* ✅ Success Message Animation */}
      <AnimatePresence>
        {successMessage && (
          <motion.p 
            className="text-green-700 bg-green-100 border border-green-500 rounded-md p-3 text-center mb-4 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Feedback:</label>
          <textarea
            name="message"
            value={feedback.message}
            onChange={handleChange}
            placeholder="Enter your feedback"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        
        <motion.button 
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-bold hover:shadow-xl transform transition hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>

      <h2 className="text-2xl font-semibold text-white mt-6">Submitted Feedback</h2>
      <ul className="mt-4 space-y-3 w-full max-w-lg">
        <AnimatePresence>
          {feedbackList.map((item, index) => (
            <motion.li 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-semibold">{item.name} (<em className="text-sm text-gray-500">{item.email}</em>)</p>
              <p className="text-gray-700">{item.message}</p>
              <p className="text-gray-500 text-sm">{new Date(item.timestamp).toLocaleString()}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
