// https://next-auth.js.org/configuration/nextjs

// eslint-disable-next-line no-restricted-exports
export { default } from 'next-auth/middleware';

export const config = { matcher: ['/', '/book'] };
