/*
 * Web Development 3 - CPRG306D
 * Week 8 - Assignment
 * Name: Cathy Sun
 * Date: 2024 Mar 16
 */

import { AuthContextProvider } from "../_utils/auth-context";
 
const Layout = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
 
export default Layout;