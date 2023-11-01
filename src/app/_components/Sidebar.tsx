'use client';

import { Button, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { FaChevronLeft } from 'react-icons/fa'

type Props = {
  show: boolean
  togglerOnClick: (val: boolean) => void
}
/**
 *  NOTICE: flowbite-react still work on Drawer component
 *  ref: https://github.com/themesberg/flowbite-react/issues/340
 */
export function MyMultiLevelDropdown({ show, togglerOnClick }: Props) {
  return (
    <div className='absoltue left-0'>
      {/* drawer init and show */}
      <Sidebar aria-label="Sidebar with multi-level dropdown example"
        className={`fixed left-0 inset-y-0 z-20 ${show ? 'opacity-100' : 'opacity-0 -translate-x-80'} transition-all pl-8`}>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
            >
              <p>
                Posts
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
            >
              <p>
                Dashboard
              </p>
            </Sidebar.Item>
            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="E-commerce"
            >
              <Sidebar.Item href="#">
                Products
              </Sidebar.Item>
              <Sidebar.Item href="#">
                Sales
              </Sidebar.Item>
              <Sidebar.Item href="#">
                Refunds
              </Sidebar.Item>
              <Sidebar.Item href="#">
                Shipping
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item
              href="#"
              icon={HiInbox}
            >
              <p>
                Inbox
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiUser}
            >
              <p>
                Users
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiShoppingBag}
            >
              <p>
                Products
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
            >
              <p>
                Sign In
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiTable}
            >
              <p>
                Sign Up
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      {/* <Button /> z-index is buggy */}
      {/* <Button outline className='absolute left-2 bottom-2 z-30' 
        onClick={() => setShow(!show)}>
        <GiCardboardBox size={24} />
      </Button> */}

      <button
        onClick={() => togglerOnClick(!show)}
        // className="fixed left-0 top-26 z-30 flex items-center justify-center bg-blue-500 text-white p-2 rounded-md"
        className="flex fixed left-0 inset-y-0 z-30 items-center justify-center bg-slate-400/30 text-white p-2 rounded-md"
      >
        <FaChevronLeft size={16} className={`${show ? '' : 'rotate-180'} transition-all`} />
      </button>

      <MyBackdrop show={show} togglerOnClick={togglerOnClick} />
    </div>
  )
}

function MyBackdrop({ show, togglerOnClick }: Props) {
  return <>
    {show && (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center"
        onClick={() => togglerOnClick(false)}></div>
    )}
  </>
}
