'use client';

import { useState } from 'react';
import { Button, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { GiCardboardBox, GiCardboardBoxClosed } from 'react-icons/gi'

/**
 *  NOTICE: flowbite-react still work on Drawer component
 *  ref: https://github.com/themesberg/flowbite-react/issues/340
 */
export function MyMultiLevelDropdown() {
  const [show, setShow] = useState(false);
  return (
    <>
      {/* drawer init and show */}
      <Sidebar aria-label="Sidebar with multi-level dropdown example"
        className={`${show ? 'opactiy-1 w-1/6' : 'opacity-0 w-0'} absolute left-0 z-20`}>
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
      <button className="z-30 absolute left-2 bottom-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation"
        onClick={() => setShow(!show)}>
        {show
          ? <GiCardboardBox size={24} />
          : <GiCardboardBoxClosed size={24} />}
      </button>
    </>
  )
}


