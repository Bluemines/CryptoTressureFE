import Header from "@/app/components/Header"
import AdminSidebar from "@/app/components/AdminSidebar"
import AuthGuard from "@/app/components/AuthGuard"
import CurrentUserFetcher from "@/app/components/CurrentUserFetcher"
import RedirectIfNotLoggedIn from "@/app/components/RedirectIfNotLoggedIn"
// import ClearLocalStorageOnExit from "@/app/components/ClearLocalStorageOnExit"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RedirectIfNotLoggedIn>
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
      {/* <ClearLocalStorageOnExit/> */}
    </RedirectIfNotLoggedIn>
  )
}

export default layout
