/* eslint-disable react/jsx-newline */
import type { Metadata } from 'next';
import Link from 'next/link';

import { twMerge } from 'tailwind-merge';

import { APP_ROUTES, raleway } from '@/common/constants';

import { SignInForm } from './_components/sign-in-form';

export const metadata: Metadata = {
  title: 'EX3 | Sign In'
};

export default function SignIn() {
  return (
    <>
      <section className="mx-auto space-y-1.5">
        <h2
          className={twMerge(
            'text-lg font-semibold text-center',
            raleway.className
          )}
        >
          EX3
        </h2>

        <div className="w-full h-[1px] bg-gray-700" />

        <h2 className="text-md text-gray-400 text-center">
          Sign in to your account
        </h2>
      </section>

      <section className="w-full flex flex-col justify-center mx-auto px-6 sm:w-[400px] sm:px-0">
        <SignInForm />

        <p className="mt-6 text-center text-sm text-gray-400">
          Not registered?{' '}
          <Link
            href={APP_ROUTES.Public.SignUp}
            className="leading-6 text-white hover:text-white/90"
          >
            Create account
          </Link>
        </p>
      </section>
    </>
  );
}
