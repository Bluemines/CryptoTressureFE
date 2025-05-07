import Header from "@/app/components/Header"
import AdminSidebar from "@/app/components/AdminSidebar"
import AuthGuard from "@/app/components/AuthGuard"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard allowedRole='ADMIN'>
      <div className='min-h-screen flex'>
        <div className=''>
          <AdminSidebar />
        </div>
        <div className='flex-1 p-5'>
          <Header />
          {children}
        </div>
      </div>
    </AuthGuard>
  )
}

export default layout
