'use client';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import LogoLink from './LogoLink';
import Footer from './Footer';
import PlaidLink from './PlaidLink';

const MobileNavbar = ({ user }: MobileNavbarProps) => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px'>
      <Sheet>
        <SheetTrigger>
          <Image
            src='/icons/hamburger.svg'
            alt='hamburger menue icon'
            height={30}
            width={30}
            className='cursor-pointer'
          />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-white'>
          <LogoLink linkClasses='px-4' />

          <div className='mobilenav-sheet'>
            <SheetClose asChild>
              <nav className='flex-h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ||
                    pathname.startsWith(`${link.route}/`);
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn('mobilenav-sheet_close w-full', {
                          'bg-bank-gradient': isActive,
                        })}
                      >
                        <Image
                          src={link.imgURL}
                          width={20}
                          height={20}
                          alt={`${link.label} Icon`}
                          className={cn({
                            'brightness-[3] invert-0': isActive,
                          })}
                        />
                        <p
                          className={cn('text-16 font-semibold text-black-2', {
                            '!text-white': isActive,
                          })}
                        >
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                {/* Need to fix styles for Mobile Navbar */}
                <PlaidLink user={user} />
              </nav>
            </SheetClose>
            <Footer user={user} type='mobile' />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
