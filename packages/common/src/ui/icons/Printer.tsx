import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export const Printer = (props: SvgIconProps): JSX.Element => {
  const combinedProps: SvgIconProps = { color: 'primary', ...props };
  return (
    <SvgIcon {...combinedProps} viewBox="0 0 21 20">
      <path d="M15 .833c.46 0 .833.373.833.834v5h.834c1.325 0 2.41 1.031 2.494 2.335l.006.165v4.166c0 1.381-1.12 2.5-2.5 2.5h-.834v2.5c0 .46-.373.834-.833.834H5c-.46 0-.833-.373-.833-.834v-2.5h-.834c-1.325 0-2.41-1.031-2.494-2.335l-.006-.165V9.167c0-1.381 1.12-2.5 2.5-2.5h.833v-5c0-.425.319-.776.73-.827L5 .833zM14.167 12.5H5.833v5h8.334v-5zm2.5-4.167H3.333c-.46 0-.833.373-.833.834v4.166c0 .46.373.834.833.834h.833v-2.5c0-.46.374-.834.834-.834h10c.46 0 .833.373.833.834v2.5h.834c.425 0 .775-.318.827-.73l.006-.104V9.167c0-.46-.373-.834-.833-.834zm-2.5-5.833H5.833v4.166h8.333V2.5z" />
    </SvgIcon>
  );
};
