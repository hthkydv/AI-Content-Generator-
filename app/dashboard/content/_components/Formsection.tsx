'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TEMPLATE } from '../../_components/Templatelistsection';

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput: (data: any) => void;
    loading: boolean;
}

function Formsection({ selectedTemplate, userFormInput, loading }: PROPS) {
    const [Formdata, setFormData] = useState<Record<string, any>>({});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...Formdata, [name]: value });
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        userFormInput(Formdata);
    };

    return (
        <div className='p-5 shadow-md border rounded-lg bg-white'>
            {selectedTemplate?.icon && (
                <Image
                    src={selectedTemplate.icon}
                    alt='icon'
                    width={70}
                    height={70}
                />
            )}
            {selectedTemplate?.name && (
                <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate.name}</h2>
            )}
            <p className='text-gray-500 text-sm'>{selectedTemplate?.desc || 'No description available'}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, i) => (
                    <div className='my-2 flex flex-col gap-2 mb-7' key={i}>
                        <label className='font-bold'>{item.label}</label>
                        {item.field === 'input' ? (
                            <Input
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                            />
                        ) : item.field === 'textarea' ? (
                            <Textarea
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                            />
                        ) : null}
                    </div>
                ))}
                <Button type='submit' className='w-full py-6' disabled={loading}>
                    {loading && <Loader2Icon className='animate-spin' />}
                    Generate Content
                </Button>
            </form>
        </div>
    );
}

export default Formsection;
