"use client"
import { HistoryIcon, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Usage from './UsageTrack'
import Link from 'next/link'

function SideNav() {
  const Menulist = [{
    Name: 'Home',
    icon: Home,
    path: '/dashboard'
  }, {
    Name: 'History',
    icon: HistoryIcon,
    path: '/dashboard/History'
  }, {
    Name: 'Billing',
    icon: WalletCards,
    path: '/dashboard/billing'
  }, {
    Name: 'Setting',
    icon: Settings,
    path: '/dashboard/Setting'
  }]

  const path = usePathname();
  useEffect(() => {
    console.log(path)

  }, [])


  return (
    <div className='h-screen relative p-5 shadow-sm border bg-white' >
      <div className='flex justify-center '>
        <Image src={'/logo.svg'} alt='log' width={160} height={100} />
      </div>
      <hr className='my-6 border ' />
      <div className='mt-3'>
        {Menulist.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div className={`flex gap-2 mb-2 p-3
            hover:bg-primary hover:text-white rounded-lg
            cursor-pointer items-center
            ${path == menu.path && 'bg-primary text-white'}`} >
              <menu.icon className='h-6 w-6' />
              <h2 className='text-lg' >{menu.Name}</h2>

            </div>
          </Link>
        ))}
      </div>
      <div className='absolute bottom-10 left-0 w-full' >
        <Usage />
      </div>
    </div>
  )
}

export default SideNav
