'use client'
import Tabs from '@/app/components/Tabs'
import PrimaryButton from '@/app/components/ui/PrimaryButton'
import StatsCard from '@/app/components/ui/StatsCard'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DataTable from '@/app/components/DataTable/DataTable'

const page = () => {
  const statsData = [
    { label: 'Available Balance', value: '24K', bgColor: 'bg-[#6F4FF2]' },
    { label: 'Available Credits', value: '82K', bgColor: 'bg-[#50BB25]' },
    { label: 'Available Debts', value: '200', bgColor: 'bg-[#F9D62C]' },
  ]

  const dataSource = [
    {
      sr: 1,
      username: 'John Doe',
      currency: 'USD',
      amount: 'Rs 1332',
      source: 'Lorem Ipsum',
      date: '1 min ago',
    },
    {
      sr: 2,
      username: 'John Doe',
      currency: 'USD',
      amount: 'Rs 1332',
      source: 'Lorem Ipsum',
      date: '1 min ago',
    },
    {
      sr: 3,
      username: 'John Doe',
      currency: 'USD',
      amount: 'Rs 1332',
      source: 'Lorem Ipsum',
      date: '1 min ago',
    },
  ]

  const columns = [
    {
      name: 'Sr#',
      selector: (row: any) => row.sr,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row: any) => row.username,
    },
    {
      name: 'Currency',
      selector: (row: any) => row.currency,
    },
    {
      name: 'Amount',
      selector: (row: any) => row.amount,
    },
    {
      name: 'Source',
      selector: (row: any) => row.source,
    },
    {
      name: 'Date',
      selector: (row: any) => row.date,
    },
  ]

  const tabs = ['Credit', 'Debit']
  const [activeTab, setActiveTab] = useState(tabs[0])
  const router = useRouter()

  return (
    <div className='text-white py-5'>
      <div className='flex items-center justify-between'>
        <div className='text-xl'>P2P Wallet</div>
        <div className='flex gap-2 items-center'>
          <div className='bg-[#2B2B2B] py-2 px-4 rounded'>
            Easypaisa account *******1234 is connected
          </div>
          <div>
            <PrimaryButton
              onClick={() => router.push('/user/wallet/add-new-wallet')}
              bgColor='#7367F0'
              className='!text-white !border-none !font-medium'
            >
              Add new Wallet
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className='flex gap-4 my-4'>
        {statsData.map((item, index) => (
          <StatsCard
            key={index}
            label={item.label}
            value={item.value}
            bgColor={item.bgColor}
          />
        ))}
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='mt-4'>
        {activeTab === 'Credit' && (
          <DataTable data={dataSource} columns={columns} themeStyle='gray' />
        )}
        {activeTab === 'Debit' && (
          <DataTable data={dataSource} columns={columns} themeStyle='gray' />
        )}
      </div>
    </div>
  )
}

export default page
