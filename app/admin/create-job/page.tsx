'use client';

import { useRouter } from 'next/navigation';
export default function CreateJob() {
  const router = useRouter();
 

 



   
     


  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <button 
        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md px-3 py-1.5 bg-white shadow-sm mb-6 transition-all"
      >
        ← Back to Jobs
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-1">Create New Job</h1>
      <p className="text-gray-500 mb-8">Fill in the form below to create a new job posting</p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Job</h2>

        <form  className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                name="title"
                required
                
                placeholder="e.g., Senior Frontend Engineer"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3470] focus:border-transparent text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                name="company"
                required
                placeholder="e.g., TechCorp"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3470] focus:border-transparent text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g., San Francisco, CA"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3470] focus:border-transparent text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Salary (Optional)</label>
              <input
                type="text"
                name="salary"
                placeholder="e.g., $100,000 - $150,000"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3470] focus:border-transparent text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-gray-800"
              >
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Management">Management</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
              <select
                name="jobType"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-gray-800"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="Job description and responsibilities..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-gray-800 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements (comma-separated)</label>
            <input
              type="text"
              name="requirements"
              placeholder="e.g., React, TypeScript, 5+ years experience, Node.js"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-[#0f3470] text-white py-3 rounded-lg font-medium hover:bg-[#0b2856] transition-colors disabled:bg-gray-400"
            >
            </button>
            <button
              type="button"
              className="w-full bg-gray-50 text-gray-700 border border-gray-200 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}