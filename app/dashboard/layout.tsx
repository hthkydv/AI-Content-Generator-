"use client"
import React, { Children, useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsagecontext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptioncontext';
import { UpdateCreditContex } from '../(context)/UpdateCreditContex';

function layout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [UserSubcription, setUserSubcription] = useState<boolean>(false);
  const [updateCreditUsage, setupdateCreditUsage] = useState<any>()
  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider value={{ UserSubcription, setUserSubcription }}>
        <UpdateCreditContex.Provider value={{ updateCreditUsage, setupdateCreditUsage }}>
          <div className='bg-slate-100 h-screen'>
            <div className='md:w-64 hidden md:block fixed'>
              <SideNav />
            </div>
            <div className='md:ml-64'>
              <Header />
              {children}
            </div>
          </div>
        </UpdateCreditContex.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  )
}

export default layout
