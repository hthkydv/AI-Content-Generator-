"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/Utils/db';
import { AIOutput, UserSubscription } from '@/Utils/schema';
import { useUser } from '@clerk/nextjs';

import React, { useContext, useEffect, useState } from 'react'
import { HISTORY } from '../History/page';
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsagecontext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptioncontext';
import { UpdateCreditContex } from '@/app/(context)/UpdateCreditContex';

function Usage() {

    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
    const { UserSubcription, setUserSubcription } = useContext(UserSubscriptionContext)
    const { updateCreditUsage, setupdateCreditUsage } = useContext(UpdateCreditContex)




    useEffect(() => {
        user && GetData();
        user && IsuserSubscribe();
    }, [user])

    useEffect(() => {
        user && GetData();


    }, [updateCreditUsage && user])

    const GetData = async () => {
        {/*@ts-ignore */ }
        const result: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
        GetTotalUsage(result)
    }
    const IsuserSubscribe = async () => {
        const result = await db.select().from(UserSubscription)
            .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));

        if (result) {
            setUserSubcription(true);
        }
    }



    const GetTotalUsage = (result: HISTORY[]) => {
        let total: number = 0;
        result.forEach(Element => {
            total = total + Number(Element.aiResponse?.length)

        });
        setTotalUsage(total)

    }

    return (
        <div className='m-5'>
            <div className='bg-primary text-white p-3 rounded-lg'>
                <h2 className='font-medium'>Credits </h2>
                <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3  '>
                    <div className='h-2 bg-white rounded-full'
                        style={{
                            width: `${(totalUsage / 100000) * 100}%`
                        }} >
                    </div>

                </div>
                <h2 className='text-sm my-2'>{totalUsage}/{UserSubcription ? "3,00,000" : "50,000"} Credits used</h2>
            </div>
            <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
        </div>
    )
}

export default Usage
