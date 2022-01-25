import { Link } from '@mui/material';
import React from 'react';
import { RouteChildren } from '../../../routes'

type ChildItemProps = {
  open: boolean
  childRoute: RouteChildren
}

function ChildItem({ open, childRoute }: ChildItemProps) {
  const { name, isExternalLink } = childRoute
  return (
    <div>
      <span>
        {/* {getInitials(name)} */}
        {name}
      </span>
      <div>
        <span>{name}</span>
        {isExternalLink && <Link />}
      </div>
    </div>
  );
}

export default ChildItem;
