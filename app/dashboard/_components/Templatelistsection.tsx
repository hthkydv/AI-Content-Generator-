import Template from '@/app/(data)/Template'
import React, { useEffect, useState } from 'react'
import Templatecard from './Templatecard'

export interface TEMPLATE{
     name:string,
     desc:string,
     icon:string,
     category:string,
     aiPrompt:string,
     form?:FORM[],
     slug:string
}
export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

function Templatelistsection({userSearchInput}:any) {
  const [templatelist,settemplatelist]=useState(Template)
  useEffect(()=>{
    
    if(userSearchInput)
      {
        const filterData=Template.filter(item=>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
  
        );
        settemplatelist(filterData);
      }
      else{
        settemplatelist(Template);
      }
  
  },[userSearchInput])

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 p-10'>
      {templatelist.map((item:TEMPLATE,index:number)=>(
        <Templatecard{...item}/>
      ))}
      
    </div>
  )
}

export default Templatelistsection
