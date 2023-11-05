"use client"
import React from 'react'
import { Breadcrumb, Button } from 'flowbite-react'
import { HiHome } from 'react-icons/hi';

function PostTableInfo() {

  return (
    <>
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
          Posts
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}

export default PostTableInfo