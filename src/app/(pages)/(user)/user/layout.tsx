import Sidebar from "@/app/components/Sidebar"
import Header from "@/app/components/Header"
import AuthGuard from "@/app/components/AuthGuard"
import CurrentUserFetcher from "@/app/components/CurrentUserFetcher"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard allowedRole="USER">
      <CurrentUserFetcher />
      <div className='min-h-screen flex'>
        <div className=''>
          <Sidebar />
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
