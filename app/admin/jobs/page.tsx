'use client';

import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  job_type: string;
}

export default function JobsManagement() {
  const router = useRouter();

 

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
        <p className="text-gray-500 mt-1">Manage all your job postings</p>
      </div>

      <button
        onClick={() => router.push('/admin/create-job')}
        className="bg-[#0f3470] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0b2856] transition-colors mb-8 shadow-sm"
      >
        Create New Job
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">All Jobs ( {/*Jobs length  */}  )</h2>

       
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5eded] border-b border-gray-200 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
{/* maps here ... */}
                  <tr  className="hover:bg-gray-50 transition-colors text-gray-800">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">
                        {/* job title */}

                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{/* job location */}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-medium">
                        {/* job company  */}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-md border border-gray-200 shadow-sm">
                       {/* job category  */}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-md border border-gray-200 shadow-sm">
                       {/* job type */}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        className="text-sm font-medium border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 text-gray-700 px-3 py-1.5 rounded-md shadow-sm transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}