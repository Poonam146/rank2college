"use client";
import { useState } from "react";
export default function predictor() {
    const [formData, setFormData] = useState({
    rank: '',
    seatType: 'OPEN',
    collegeType: 'all',
    domicile: 'all',
    gender: 'Gender-Neutral',
  });
  const [eligibleColleges, setEligibleColleges] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [eligibleMessage, setEligibleMessage] = useState('');
  
const predictCollege=()=>{
    setError('');
    setEligibleColleges([]);
    
    setIsLoading(true);
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="flex justify-center  px-4 py-10">
  <form
    onSubmit={(e) => e.preventDefault()}
    className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200 dark:border-gray-700"
  >
    {/* Rank Input */}
    <div className="space-y-2">
      <label htmlFor="rank" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Your Rank
      </label>
      <input
        type="number"
        id="rank"
        name="rank"
        placeholder="Enter your category rank"
        value={formData.rank}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
      />
    </div>

    {/* Category */}
    <div className="space-y-2">
      <label htmlFor="seatType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Your Category
      </label>
      <select
        id="seatType"
        name="seatType"
        value={formData.seatType}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="OPEN">OPEN</option>
        <option value="OPEN (PwD)">OPEN (PwD)</option>
        <option value="OBC-NCL">OBC-NCL</option>
        <option value="OBC-NCL (PwD)">OBC-NCL (PwD)</option>
        <option value="SC">SC</option>
        <option value="SC (PwD)">SC (PwD)</option>
        <option value="ST">ST</option>
        <option value="ST (PwD)">ST (PwD)</option>
      </select>
    </div>

    {/* College Type */}
    <div className="space-y-2">
      <label htmlFor="collegeType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Type of College
      </label>
      <select
        id="collegeType"
        name="collegeType"
        value={formData.collegeType}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="all">All Colleges</option>
        <option value="NIT">National Institute of Technology</option>
        <option value="IIIT">Indian Institute of Information Technology</option>
        <option value="GFTI">Government Funded Technical Institute</option>
      </select>
    </div>

    {/* State */}
    <div className="space-y-2">
      <label htmlFor="domicile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select State
      </label>
      <select
        id="domicile"
        name="domicile"
        value={formData.domicile}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="all">All States</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Bihar">Bihar</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Delhi">Delhi</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Puducherry">Puducherry</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
      </select>
    </div>

    {/* Gender */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Gender
      </label>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            id="genderNeutral"
            name="gender"
            value="Gender-Neutral"
            checked={formData.gender === "Gender-Neutral"}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-gray-700 dark:text-gray-300">Gender-Neutral</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            id="femaleOnly"
            name="gender"
            value="Female-only (including Supernumerary)"
            checked={formData.gender === "Female-only (including Supernumerary)"}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-gray-700 dark:text-gray-300">Female-only</span>
        </label>
      </div>
    </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
     
      <button
        type="button"
        onClick={predictCollege}
        disabled={isLoading}
        className="w-full sm:w-auto px-6  lg:ml-50 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Predicting..." : "Predict My Colleges"}
      </button>
    </div>

  </form>
  
</div>
   {error && <p style={{ color: 'red' }}>{error}</p>}


      
    </div>
  )
}
