/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */


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
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
