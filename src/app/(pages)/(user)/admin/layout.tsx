

import Header from "@/app/components/Header"
import AdminSidebar from "@/app/components/AdminSidebar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex'>
      <div className=''>
        <AdminSidebar />
      </div>
      <div className="flex-1 p-5">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default layout
