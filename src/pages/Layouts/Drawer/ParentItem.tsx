import { Link } from '@mui/material';
import React from 'react';
import { Route } from '../../../routes'

type ParentItemProps = {
  open: boolean
  route: Route
  isCollaspe: () => boolean
  selectedFoldHandler?: (name: string) => void
}

function ParentItem({ open, route, isCollaspe, selectedFoldHandler }: ParentItemProps) {

  const { name, icon, isExternalLink } = route
  return (
    <div
      className={`linkItem `}
      onClick={selectedFoldHandler ? () => selectedFoldHandler(name) : () => { }}>
      <span>
        {icon}
      </span>
      <div>
        <span>{name}</span>
        {isExternalLink && <Link />}
        {selectedFoldHandler && <span />}
      </div>
    </div>
  )
}

export default ParentItem;
