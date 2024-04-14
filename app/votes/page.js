/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */

import { useUserAuth } from '../_utils/auth-context.js';

export default function Page() {

    const { user } = useUserAuth();
    
    async function checkLogin() {
        if (!user)
            Response.redirect('../signin/');
    }

    useEffect(() => {   
        checkLogin();
      });

      

    return (
        <>
        <main > 
        {user &&      
          <>
            <div>abc</div>
          </> 
          
        }    
        </main>
        </>
    );


}