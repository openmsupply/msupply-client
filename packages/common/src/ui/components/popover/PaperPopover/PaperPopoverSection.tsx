import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface PaperPopoverSectionProps {
  label?: string;
  labelStyle?: React.CSSProperties;
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  children?: React.ReactNode;
}

export const PaperPopoverSection: FC<PaperPopoverSectionProps> = ({
  children,
  label,
  labelStyle,
  alignItems,
}) => (
  <Box
    gap={2}
    p={3}
    flexDirection="column"
    display="flex"
    alignItems={alignItems}
  >
    <Typography fontWeight="700" style={labelStyle}>
      {label}
    </Typography>
    {children}
  </Box>
);
