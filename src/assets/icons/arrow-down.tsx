import { IconSvgProps } from './types';

export const ArrowDownIcon = ({ fill = '#ffffff', ...props }: IconSvgProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.88769 14.0064L6.1123 11.9936L24 31.7642L41.8877 11.9936L44.1123 14.0064L24 36.2357L3.88769 14.0064Z"
      fill={fill}
    />
  </svg>
);
