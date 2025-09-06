"use client";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Predictor() {
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
  
  const predictCollege = async () => {
    setError('');
    setEligibleColleges([]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      if (!data.eligibleColleges || data.eligibleColleges.length === 0) {
        setEligibleMessage(
          'No eligible colleges found for the given rank. Redirecting to FAQ...'
        );
        setTimeout(() => (window.location.href = '/faqs'), 5000);
      } else {
        displayResults(data.eligibleColleges);
      }
    } catch (error) {
      setError('Error fetching data');
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  function displayResults(colleges) {
    const filtered = colleges.filter((c) => c);

    if (!filtered || filtered.length === 0) {
      setEligibleMessage('No eligible colleges found.');
      setTimeout(() => (window.location.href = '/faq'), 1000);
      return;
    }

    if (formData.domicile === 'all') {
      setEligibleMessage(`Showing ${filtered.length} eligible options.`);
      setEligibleColleges(filtered);
    } else {
      const homeState = filtered.filter(
        (c) => c['Quota'] === 'HS' && c['State'] === formData.domicile
      );
      const otherState = filtered.filter((c) => !(c['Quota'] === 'HS'));

      setEligibleMessage(
        `Showing ${homeState.length + otherState.length} options. Data updated till 2024 round 5.`
      );

      const combined = [];
      if (homeState.length > 0) {
        combined.push({ isHeader: true, text: `🏠 Home State (${formData.domicile})` });
        combined.push(...homeState);
      }
      if (otherState.length > 0) {
        combined.push({ isHeader: true, text: '🌍 Other States' });
        combined.push(...otherState);
      }

      setEligibleColleges(combined);
    }
  }

  const calculateProbability = (opening, closing, rank) => {
    const range = closing - opening;
    const pos = rank - opening;

    if (pos < 0) return 'Very High';
    if (pos < range * 0.25) return 'High';
    if (pos < range * 0.75) return 'Medium';
    return 'Low';
  };

  const getProbabilityClass = (prob) => {
    switch (prob) {
      case 'Very High':
        return 'bg-green-600 text-white';
      case 'High':
        return 'bg-lime-500 text-black';
      case 'Medium':
        return 'bg-yellow-400 text-black';
      case 'Low':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

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

      {/* Results */}
      {eligibleMessage && (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
          <p
            className="text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: eligibleMessage }}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-6 space-y-4">
        {eligibleColleges.map((college, idx) =>
          college.isHeader ? (
            <h2
              key={idx}
              className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mt-6"
            >
              {college.text}
            </h2>
          ) : (
           <div
  key={idx}
  className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition w-full"
>
  {/* Institute + Program */}
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
    {college["Institute"]}
  </h3>
  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
    {college["Academic Program Name"]}
  </p>

  {/* Badges */}
  <div className="flex flex-wrap gap-2 mb-3">
    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100">
      {college["Quota"]}
    </span>
    <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">
      {college["Seat Type"]}
    </span>
    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100">
      {college["Gender"]}
    </span>
    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
      {college["Institute Type"]}
    </span>
  </div>

  {/* Ranks Grid */}
  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
      <p className="text-gray-500 dark:text-gray-400">Opening Rank</p>
      <p className="font-medium text-gray-900 dark:text-white">
        {college["Opening Rank"]}
      </p>
    </div>
    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
      <p className="text-gray-500 dark:text-gray-400">Closing Rank</p>
      <p className="font-medium text-gray-900 dark:text-white">
        {college["Closing Rank"]}
      </p>
    </div>
  </div>

  {/* State */}
  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
    📍 {college["State"]}
  </p>

  {/* Probability */}
  <span
    className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${getProbabilityClass(
      calculateProbability(
        college["Opening Rank"],
        college["Closing Rank"],
        formData.rank
      )
    )}`}
  >
    {calculateProbability(
      college["Opening Rank"],
      college["Closing Rank"],
      formData.rank
    )}{" "}
    Chance
  </span>
</div>

          )
        )}
      </div>
    </div>
  );
}