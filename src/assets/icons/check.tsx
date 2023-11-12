import { IconSvgProps } from './types';

export const CheckIcon = ({ fill = '#ffffff', ...props }: IconSvgProps) => (
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
      d="M4.98389 23.7701L7.01616 21.5633L20.3789 33.8693L41.8856 9.99603L44.1145 12.004L20.5777 38.1307L4.98389 23.7701Z"
      fill={fill}
    />
  </svg>
);
