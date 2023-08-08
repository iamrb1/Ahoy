'use client';

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}


const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick

}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <Link 
      onClick={onClick}
      href={href}
      className={clsx(`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        text-white
        hover:text-pink-500
        hover:bg-blue-500
        `,
        active && "bg-blue-500 text-pink-500"
      )}
    >
      <Icon className="h-6 w-6"/>
    </Link>
  );
}

export default MobileItem;