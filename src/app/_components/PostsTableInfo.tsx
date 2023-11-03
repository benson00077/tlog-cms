"use client"
import React, { useContext } from 'react'
import { Breadcrumb, Button } from 'flowbite-react'
import { HiHome } from 'react-icons/hi';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { BiSolidBookReader, BiSolidEditAlt } from "react-icons/bi";
import { OnEditCtx } from '../(main)/posts/OnEditCtxWrapper';

function PostTableInfo() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const isViewMode = mode === 'view'

  const { onEditCtx, setOnEditCtx } = useContext(OnEditCtx)

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

      <Button.Group >
        <Button title={`Mode: ${mode}`} onClick={() => {
          router.replace(pathname + `?mode=${isViewMode ? 'edit' : 'view'}`)
        }}>
          {isViewMode ? <BiSolidBookReader size={16} /> : <BiSolidEditAlt size={16} />}
          <span className='pl-2'> Mode </span>
        </Button>
        <Button
          onClick={() => console.log(onEditCtx)}
          color={`${onEditCtx.length > 0 ? 'light' : 'dark'}`} disabled={isViewMode}>
          Save
        </Button>
      </Button.Group>
    </>
  )
}

export default PostTableInfo