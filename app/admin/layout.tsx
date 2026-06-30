// 'use client';

// import React, { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { supabase } from '@/lib/supabase/clientComponents';
// import Sidebar from '@/components/SideBar';
// import AdminLogin from './login/page'; 

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [session, setSession] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
//       setSession(currentSession);
//       setLoading(false);
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
//       setSession(currentSession);
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-[#f3f4f6]">
//         <Sidebar />
//         <div className="flex-1 p-8 flex items-center justify-center text-gray-500 font-medium">
//           Sessiya tekshirilmoqda...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-[#f3f4f6]">
//       <Sidebar /> 

//       <div className="flex-1 p-8 overflow-y-auto flex items-center justify-start">
       
//         {!session ? (
//           <div className="w-full flex justify-center items-center">
//             <AdminLogin /> 
//           </div>
//         ) : (
//           <div className="w-full h-full">
//             {children}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }