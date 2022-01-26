import { Link } from '@mui/material';
import React from 'react';
import { RouteChildren } from '../../../routes'

type ChildItemProps = {
  open: boolean
  isCollaspe: () => boolean
  childRoute: RouteChildren
}

function ChildItem({ open, isCollaspe, childRoute }: ChildItemProps) {
  const { name, isExternalLink } = childRoute
  return (
    <div
      className={`linkItem`}
    >
      <span>
        {/* {getInitials(name)} */}
      </span>
      <div>
        <span>{name}</span>
        {isExternalLink && <Link />}
      </div>
    </div>
  );
}

export default ChildItem;
