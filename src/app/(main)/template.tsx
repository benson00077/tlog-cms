"use client"
import React, { useState } from 'react'
import { MyMultiLevelDropdown } from '../_components/Sidebar'


export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const [drawerShow, setDrawerShow] = useState(false)
  return (
    <>
      <MyMultiLevelDropdown show={drawerShow} togglerOnClick={setDrawerShow} />
      <div className={`pl-8`}>
        {children}
      </div>
    </>
  )
}