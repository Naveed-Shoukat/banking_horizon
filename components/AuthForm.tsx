'use client';
import React, { useState } from 'react';
import LogoLink from './LogoLink';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.action';
import PlaidLink from './PlaidLink';

interface AuthFormProps {
  type: string;
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const isSignIn = type === 'sign-in';
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(isSignIn);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      // Sing up with Appwrite and create a plaid link token

      // Sign Up Funcationality
      if (!isSignIn) {
        const userData = {
          email: formData.email!,
          password: formData.password!,
          address1: formData.address1!,
          firstName: formData.firstName!,
          lastName: formData.lastName!,
          city: formData.city!,
          state: formData.stateCode!,
          postalCode: formData.postalCode!,
          dateOfBirth: formData.dateOfBirth!,
          ssn: formData.ssn!,
        };

        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (isSignIn) {

        const response = await signIn({
          email: formData.email,
          password: formData.password,
        });

        if (response) router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    console.log(formData);
    setIsLoading(false);
  };

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <LogoLink />
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account' : isSignIn ? 'Sign In' : 'Sign Up'}
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className='flex flex-col gap-4'>
          <PlaidLink user={user} variant='primary' />
        </div>
      ) : (
        <React.Fragment>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {!isSignIn && (
                <React.Fragment>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='firstName'
                      label='First Name'
                      placeholder='Enter your First Name'
                    />
                    <CustomInput
                      control={form.control}
                      name='lastName'
                      label='Last Name'
                      placeholder='Enter your Last Name'
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name='address1'
                    label='Address'
                    placeholder='Enter your Address'
                  />
                  <CustomInput
                    control={form.control}
                    name='city'
                    label='City'
                    placeholder='Enter your City'
                  />
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='stateCode'
                      label='State Code'
                      placeholder='Ex: NY'
                    />
                    <CustomInput
                      control={form.control}
                      name='postalCode'
                      label='Postal / ZIP Code'
                      placeholder='Ex: 32000'
                    />
                  </div>

                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='dateOfBirth'
                      label='Date of Birth'
                      placeholder='YYYY-MM-DD'
                    />
                    <CustomInput
                      control={form.control}
                      name='ssn'
                      label='SSN'
                      placeholder='Social Security Number'
                    />
                  </div>
                </React.Fragment>
              )}
              <CustomInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter your Email ID'
              />
              <CustomInput
                control={form.control}
                name='password'
                label='Password'
                placeholder='Enter your password'
              />

              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <React.Fragment>
                      <Loader2 size={20} className='animate-spin' /> &nbsp;
                      Loading...
                    </React.Fragment>
                  ) : isSignIn ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <Link
              href={isSignIn ? '/sign-up' : '/sign-in'}
              className='form-link'
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </React.Fragment>
      )}
    </section>
  );
};

export default AuthForm;
