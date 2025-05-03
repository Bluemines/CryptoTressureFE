import Login from "@/app/components/Login"
const page = () => {
  return (
    <div className='h-dvh flex'>
      <div className='w-[50%] lg:w-[50%] overflow-hidden'>
        <img
          src='/images/login-hero-img.png'
          alt=''
          className='h-[1016px] w-full'
        />
      </div>
      <div className='w-[50%] grid place-items-center'>
        <Login />
      </div>
    </div>
  )
}

export default page
