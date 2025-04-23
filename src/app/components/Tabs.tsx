import React, { Dispatch, SetStateAction } from 'react'

const Tabs = ({ tabs, activeTab, setActiveTab }: { tabs: string[], activeTab: string, setActiveTab: Dispatch<SetStateAction<string>> }) => {
  return (
    <div className='flex'>
      {tabs.map((item, index) => (
        <button key={index} className={`py-2 px-4 cursor-pointer hover:text-[#7367F0] ${activeTab === item ? 'border-b border-b-[#7367F0] text-[#7367F0]' : 'text-gray-400'}`} onClick={() => setActiveTab(item)}>
          {item}
        </button>
      ))}
    </div>
  )
}

export default Tabs