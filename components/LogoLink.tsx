import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface LogoLinkProps {
  linkClasses?: string;
  imgClasses?: string;
  textClasses?: string;
}

const LogoLink = ({linkClasses = '', imgClasses = '', textClasses = ''}: LogoLinkProps) => {
  return (
    <Link href='/' className={`flex cursor-pointer items-center gap-1 ${linkClasses}`}>
      <Image
        src='/icons/logo.svg'
        width={34}
        height={34}
        alt='Horizon Logo'
        className={imgClasses}
      />

      <h1
        className={`text-26 font-ibm-plex-serif font-bold text-black-1 ${textClasses}`}
      >
        Horizon
      </h1>
    </Link>
  );
};

export default LogoLink;
