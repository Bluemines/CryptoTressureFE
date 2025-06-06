"use client"
import AddEasypaisaDrawer from "@/app/components/drawers/AddEasypaisaDrawer"
import { ArrowRightOutlined } from "@ant-design/icons"
import { useState } from "react"

const page = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='py-5'>
      <div className='text-[#c0c0c0] text-xl'>Connect Your Wallet</div>
      <div className='text-[#c0c0c0]'>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. <br /> Velit officia consequat duis enim velit mollit.
      </div>

      <div className='rounded p-4 border border-gray-500 my-4 w-full md:w-1/4'>
        <img src='/easypaisa.png' alt='' />

        <div className='text-[#858584]'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </div>

        <button className='text-[#7367F0] font-bold flex items-center gap-2 mt-4 cursor-pointer' onClick={() => setIsModalOpen(true)}>
          Connect Wallet <ArrowRightOutlined />
        </button>

        <AddEasypaisaDrawer open={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* otp modal */}
        {/* <Modal title='OTP Verification' open={false} footer={false} onCancel={() => setIsModalOpen(false)}>
          <div className="text-[#737373]">Please enter one time password below to continue</div>
          <div className='bg-[#2B2B2B] rounded-lg p-4 my-3 flex flex-col gap-2'>
            Type your 6 digit security code

            <Input.OTP formatter={(str) => str.toUpperCase()} />
          </div>
          <div className="my-4">
            <PrimaryButton className="w-full">Connect</PrimaryButton>
          </div>
          <div className="text-center text-[#C0C0C0]">
            Didn't get the code? <span className="text-[#7367F0]">Resend</span>
          </div>
        </Modal> */}
      </div>
    </div>
  )
}

export default page
