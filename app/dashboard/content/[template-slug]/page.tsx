'use client'
import React, { useContext, useState } from 'react'
import Formsection from '../_components/Formsection'
import Outputsection from '../_components/Outputsection'
import { TEMPLATE } from '../../_components/Templatelistsection'
import Template from '@/app/(data)/Template'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link';
import { constrainedMemory } from 'process'
import { chatSession } from '@/Utils/AiModal'
import { db } from '@/Utils/db'
import { AIOutput } from '@/Utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsagecontext'
import { useRouter } from 'next/navigation'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptioncontext'
import { UpdateCreditContex } from '@/app/(context)/UpdateCreditContex'
import { date } from 'drizzle-orm/pg-core'


interface PROPS {
  params: {
    'template-slug': string
  }
}

function Createnewcontent(props: PROPS) {

  const selectedTemplate: TEMPLATE | undefined = Template?.find((item) => item.slug == props.params['template-slug'])

  const [loading, setloading] = useState(false);
  const [aiOutput, setaiOutput] = useState<string>('');
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setupdateCreditUsage } = useContext(UpdateCreditContex)

  const { UserSubcription, setUserSubcription } = useContext(UserSubscriptionContext);
  const router = useRouter();


  const GenerateAIContent = async (FormData: any) => {
    if (totalUsage >= 100000 && !UserSubcription) {
      console.log('please up grade')
      router.push('/dashboard/billing')
      return;
    }
    setloading(true)
    const selectedPrompt = selectedTemplate?.aiPrompt;

    const finalAiprompt = JSON.stringify(FormData) + " ," + selectedPrompt;

    const result = await chatSession.sendMessage(finalAiprompt);

    console.log(result.response.text());
    setaiOutput(result?.response.text());
    await saveInDb(JSON.stringify(FormData), selectedTemplate?.slug, result?.response.text())
    setloading(false);
    setupdateCreditUsage(Date.now())

  }

  const saveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdat: moment().format('DD/MM/YYYY'),


    });
    console.log(result);
  }

  return (
    <div className='p-10'>
      <Link href={"/dashboard"}>
        <Button><ArrowLeft />Back</Button>
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        <Formsection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading} />
        <div className='col-span-2'>
          <Outputsection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default Createnewcontent
