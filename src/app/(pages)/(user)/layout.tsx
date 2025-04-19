import Sidebar from "@/app/components/Sidebar"
import Header from "@/app/components/Header"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex'>
      <div className=''>
        <Sidebar />
      </div>
      <div className="flex-1 p-5">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default layout
