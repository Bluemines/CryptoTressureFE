import Login from "@/app/components/Login"
const page = () => {
  return (
    <div className='h-dvh flex'>
      <div className='w-[50%] lg:w-[50%] overflow-hidden hidden md:block'>
        
        <img
          src='/images/login-hero-img.png'
          alt=''
          className='h-[1016px] w-full'
        />
      </div>
      <div className='md:w-[50%] w-full grid place-items-center p-6'>
        <Login />
      </div>
    </div>
  )
}

export default page
