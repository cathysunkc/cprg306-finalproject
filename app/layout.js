/*
 * Web Development 3 - CPRG306D
 * Week 8 - Assignment
 * Name: Cathy Sun
 * Date: 2024 Mar 16
 */

import { AuthContextProvider } from "./_utils/auth-context";

import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

export const metadata = {
  title: 'Music World',
  description: 'Web Development 2 - Final Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><AuthContextProvider>{children}</AuthContextProvider><Footer /></body>
    </html>
  );
}

