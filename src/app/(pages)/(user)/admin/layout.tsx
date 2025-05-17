import Header from "@/app/components/Header"
import AdminSidebar from "@/app/components/AdminSidebar"
import AuthGuard from "@/app/components/AuthGuard"
import CurrentUserFetcher from "@/app/components/CurrentUserFetcher"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard allowedRole='ADMIN'>
      <CurrentUserFetcher />
      <div className='min-h-screen flex'>
        <div className=''>
          <AdminSidebar />
        </div>
        <div className='flex-1 p-5 overflow-x-hidden'>
          <Header />
          {children}
        </div>
      </div>
    </AuthGuard>
  )
}

export default layout
