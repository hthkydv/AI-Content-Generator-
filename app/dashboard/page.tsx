"use client"
import React, { useState } from 'react'
import Searchsection from './_components/Searchsection'
import Templatelistsection from './_components/Templatelistsection'

function Dashboard() {
  const [userSearchInput, setuserSearchInput] = useState<string>()
  return (
    <div>
      {/* Search Section*/}
      <Searchsection onSearchInput={(value: string) => setuserSearchInput(value)} />

      {/*Template list Section */}
      <Templatelistsection userSearchInput={userSearchInput} />
    </div>
  )
}

export default Dashboard
