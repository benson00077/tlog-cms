"use client"
import React, { useContext } from 'react'
import { Button } from 'flowbite-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { BiSolidBookReader, BiSolidEditAlt } from "react-icons/bi";
import { OnEditCtx } from './OnEditCtxWrapper';

function PostListActions() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const isViewMode = mode === 'view'

  const { onEditCtx, setOnEditCtx } = useContext(OnEditCtx)
  return (
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
  )
}

export default PostListActions