"use client"
import PrimaryButton from "@/app/components/ui/PrimaryButton"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Input, Modal } from "antd"
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

      <div className='rounded p-4 border border-gray-500 my-4 w-1/4'>
        <img src='/easypaisa.png' alt='' />

        <div className='text-[#858584]'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </div>

        <button className='text-[#7367F0] font-bold flex items-center gap-2 mt-4 cursor-pointer' onClick={() => setIsModalOpen(true)}>
          Connect Wallet <ArrowRightOutlined />
        </button>

        <Modal title='Link Easypaisa Account' open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
          <div className='bg-[#2B2B2B] rounded-lg p-4 flex flex-col gap-2'>
            <label htmlFor='cnic'>CNIC</label>
            <Input
              name='cnic'
              placeholder='Enter Your CNIC Number'
              className='!bg-[#1B1B1B] !text-white !placeholder-gray-400 !border-gray-700 focus:!border-[#7367F0] focus:!shadow-none rounded'
            />
            <label htmlFor='accountNumber'>Account Number</label>
            <Input
              name='accountNumber'
              placeholder='Enter Your Account Number'
              className='!bg-[#1B1B1B] !text-white !placeholder-gray-400 !border-gray-700 focus:!border-[#7367F0] focus:!shadow-none rounded'
            />
          </div>
          <div className="mt-8">
            <PrimaryButton className="w-full">Connect</PrimaryButton>
          </div>
        </Modal>

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
