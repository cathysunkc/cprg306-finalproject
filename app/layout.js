/*
 * Web Development 2 - CPRG306D
 * Week 2 - Assignment
 * Name: Cathy Sun
 * Date: 2024 April 8
 */

import { Inter } from "next/font/google";
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Music World',
  description: 'Web Development 2 - Final Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> <Header/>{children}<Footer/></body>
    </html>
  );
}
