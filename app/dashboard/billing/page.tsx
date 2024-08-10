'use client'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { db } from '@/Utils/db';
import { UserSubscription } from '@/Utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptioncontext';

function Billing() {
    const [loading, setloading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>('Free'); // State to track selected plan
    const { UserSubcription, setUserSubcription } = useContext(UserSubscriptionContext);
    const { user } = useUser();

    const CreateSubcription = () => {
        setloading(true);
        axios.post('/api/create-subcription', {})
            .then(resp => {
                console.log(resp.data);
                onPayment(resp.data.id);
            }, (error) => {
                setloading(false);
            });
    }

    const onPayment = (subid: string) => {
        const options = {
            "key": process.env.NEXT_PUBLIC_RAZOPAY_KEY_ID,
            'subcription_id': subid,
            'name': "Hritik AI Apps",
            description: "Monthly Subscription fee",
            handler: async (resp: any) => {
                console.log(resp);
                if (resp) {
                    SaveSubscription(resp?.razorpay_payment_id);
                }
                setloading(false);
            }
        }
        // @ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const SaveSubscription = async (paymentId: string) => {
        const result = await db.insert(UserSubscription)
            .values({
                email: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
                active: true,
                paymentId: paymentId,
                joinDate: moment().format('DD/MM/YYYY')
            });
        console.log(result);
        if (result) {
            window.location.reload();
        }
    }

    // Styling for selected and non-selected cards
    const cardClass = (planName: string) => {
        return `rounded-2xl bg-white border p-5 transition-transform duration-200 ease-in-out ${selectedPlan === planName
            ? 'border-indigo-700 transform scale-105 shadow-lg'
            : 'border-gray-200'
            }`;
    }

    return (
        <div>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <div className='mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:6'>
                <h2 className='text-center font-bold text-3xl my-3'>Upgrade to Premium</h2>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center'>

                    {/* Free Plan Card */}
                    <div
                        className={cardClass('Free')}
                        onClick={() => setSelectedPlan('Free')}
                    >
                        <div className='text-center'>
                            <h2 className='text-lg font-medium text-gray-900'>
                                Free
                                <span className='sr-only'></span>
                            </h2>
                            <p className='mt-2 sm:mt-4'>
                                <strong className='text-3xl font-bold text-gray-900 sm:text-2xl'>$0</strong>
                                <span className='text-sm font-medium text-gray-700'>/month</span>
                            </p>
                        </div>

                        <ul className='mt-6 space-y-2'>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>100,000 words/month</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>50+ Content Templates</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>Unlimited Download & Copy</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>1 Month History</span>
                            </li>
                        </ul>

                        <div className='mt-6'>
                            <button className='w-full py-2 rounded-lg border border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-colors'>
                                Free Plan
                            </button>
                        </div>
                    </div>

                    {/* Premium Plan Card */}
                    <div
                        className={cardClass('Premium')}
                        onClick={() => setSelectedPlan('Premium')}
                    >
                        <div className='text-center'>
                            <h2 className='text-lg font-medium text-gray-900'>
                                Premium
                                <span className='sr-only'></span>
                            </h2>
                            <p className='mt-2 sm:mt-4'>
                                <strong className='text-3xl font-bold text-gray-900 sm:text-2xl'>$499</strong>
                                <span className='text-sm font-medium text-gray-700'>/month</span>
                            </p>
                        </div>

                        <ul className='mt-6 space-y-2'>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>300,000 words/month</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>50+ Templates Access</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>Unlimited Download & Copy</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 text-indigo-700'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                                <span className='text-gray-700'>6 Month History</span>
                            </li>
                        </ul>

                        <div className='mt-6'>
                            <button
                                onClick={CreateSubcription}
                                className='w-full py-2 rounded-lg bg-indigo-700 text-white hover:bg-indigo-800 transition-colors'
                            >
                                {loading ? (
                                    <>
                                        <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                                        Processing
                                    </>
                                ) : UserSubcription ? (
                                    "You are Pro !"
                                ) : (
                                    "Get Premium"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billing;
