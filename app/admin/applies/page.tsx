'use client';


interface Application {
  id: number;
  job_id: string;
  full_name: string;
  email: string;
  created_at: string;
  jobs?: {
    title: string;
    company: string;
  };
}

export default function JobApplicationsPage() {
  

  return (
    <div className="w-full min-h-screen bg-[#fafafa] py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Job Applications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage all job applications ( {/* Length */}  total)
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-150 bg-white">
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Name</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Email</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Job</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Applied Date</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                      Hozircha arizalar mavjud emas.
                    </td>
                  </tr>
                    <tr  className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">
                        {/* Name */}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                       {/* Email */}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                                {/* job's title; company  */}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {/* Date */}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold space-x-4 text-right">
                        <button className="text-gray-900 hover:underline transition-all">
                          View
                        </button>
                        <button 
                          className="text-red-600 hover:underline transition-all"
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
    </div>
  );
}