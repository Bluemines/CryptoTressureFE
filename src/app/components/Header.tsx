"use client"
import { Avatar, Badge } from "antd"
import { BellOutlined, SearchOutlined } from "@ant-design/icons"
import { useState } from "react"
import { Input } from "@mui/material"

const Header = () => {
  const [value, setValue] = useState("")
  // const onSearch = (value: string) => console.log("search:", value)
  return (
    <header className='flex items-center gap-4 z-50'>
      <div className='relative w-full'>
        <Input
          placeholder='Search here'
          disableUnderline
          className='bg-[#161616] px-4 py-2 rounded-md w-full ps-10'
        />
        <div className='absolute left-4 top-[50%] -translate-y-[50%]'>
          <SearchOutlined className='!text-[#6f6b7d]' />
        </div>
      </div>
      {/* <Input
        placeholder='Search here'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // onPressEnter={onSearch}
        prefix={<SearchOutlined className='!text-[#6f6b7d]' />}
        allowClear
        className='!bg-[#161616] !text-white !border-none !rounded-md !py-2 !px-4 placeholder-gray'
      /> */}
      <Badge
        count={1}
        size='small'
        offset={[-10, 10]}
        className='!text-[#737373]'
      >
        <BellOutlined className='text-3xl text-gray-400' />
      </Badge>
      <div className='relative inline-block'>
        <Avatar
          size={38}
          src='https://i.pravatar.cc/300'
          className='border-2 border-white'
        />
        <span className='absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-500' />
      </div>
    </header>
  )
}

export default Header
