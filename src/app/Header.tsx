"use client"
import React from 'react'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi';

function Header() {
  return (
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item
          href="#"
          icon={HiHome}
        >
          <p>
            Home
          </p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Projects
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Flowbite React
        </Breadcrumb.Item>
      </Breadcrumb>
  )
}

export default Header