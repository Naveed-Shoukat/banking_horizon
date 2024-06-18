'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import LogoLink from './LogoLink';
import Footer from './Footer';
import PlaidLink from './PlaidLink';

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <LogoLink
          linkClasses='gap-2 mb-12'
          imgClasses='size-[24px] max-xl:size-14'
          textClasses='sidebar-logo'
        />
        
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className='relative size-6'>
                <Image
                  src={link.imgURL}
                  fill
                  alt={`${link.label} Icon`}
                  className={cn({ 'brightness-[3] invert-0': isActive })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>
                {link.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} /> 
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
