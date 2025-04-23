"use client"

import { Button, ButtonProps } from "antd"

interface PrimaryButtonProps extends ButtonProps {
  bgColor?: string
  textColor?: string
  children: React.ReactNode
  className?: string
  [key: string]: any
}

const isDark = (hex: string): boolean => {
  const color = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  // Perceived brightness
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
};

const getHoverColor = (bgColor: string): string => {
  return isDark(bgColor) ? adjustColor(bgColor, 20) : adjustColor(bgColor, -20);
};

function adjustColor(hex: string, amount: number): string {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;

  // Expand shorthand hex (e.g., #abc -> #aabbcc)
  if (color.length === 3) {
    color = color
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  bgColor = "#7367F0",
  textColor = "#FFFFFF",
  children,
  className = "",
  ...rest
}) => {

  return (
    <Button
      className={`!border-none !font-medium transition-colors duration-200 ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor =
          getHoverColor(bgColor)
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = bgColor
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default PrimaryButton
