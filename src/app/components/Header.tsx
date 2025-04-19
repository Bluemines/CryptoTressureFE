"use client"
import { Avatar, Badge, Input } from "antd"
import { BellOutlined, SearchOutlined } from "@ant-design/icons"
import { useState } from "react"

const Header = () => {
  const [value, setValue] = useState("")
  // const onSearch = (value: string) => console.log("search:", value)
  return (
    <header className='flex items-center gap-4'>
      <Input
        placeholder='Search here'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // onPressEnter={onSearch}
        prefix={<SearchOutlined className='!text-[#6f6b7d]' />}
        allowClear
        className='custom-dark-input !bg-[#161616] !text-white !placeholder-gray-400 !border-none !rounded-md !py-2 !px-4'
      />
      <Badge count={4} size='small' offset={[-10, 10]} className="!text-[#737373]">
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
