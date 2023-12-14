import React, { useState } from 'react'
import { LOGO } from '../utils/constant'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_AVTER } from '../utils/constant';
import { auth } from '../Firebase auth/Firebse';
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const [signOutContainer , setSignOutContainer] = useState(false);
  const user = useSelector((store) => store?.user);

  const SignOutHandeler = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (

        <div className='fixed w-full bg-gradient-to-b from-black flex justify-between z-50'>
            <img 
            src={LOGO}
            alt="logo"
            className=' h-20 z-10 ml-5 cursor-pointer'
              onClick={() => navigate('/')}
            />

            {
              user && 
              <div className=' mr-12'>
                <ul className=' flex justify-around items-center text-white  gap-5 mt-7'>
                  <li><Link to='#'>Home</Link></li>
                  <li><Link to='#'>TV Show</Link></li>
                  <li><Link to='#'>Movies</Link></li>
                  <li><Link to='#'>New & Popular</Link></li>
                </ul>
              </div>
            }
            {
              user && 
              <div className=' relative'>
                <img alt='user_Profile' src={USER_AVTER}
                  className=' mr-9 w-9 h-9 mt-5 aspect-square cursor-pointer'
                  onClick={() => (setSignOutContainer(!signOutContainer))}
                />
                {
                     signOutContainer && 
                     <div className=' absolute flex flex-col justify-between gap-y-3 bg-black opacity-90 p-3  text-white
                       text-sm text-opacity-75 min-w-[132px] rounded-md right-6 mt-1
                     '>
                       <Link>
                        <div className=' flex '>
                          <div className=' bg-green-600 w-5 h-5 mr-1'></div>
                          <p>{user?.displayName}</p>
                        </div>
                      </Link>
                       <Link>
                          <div className=' flex'>
                            <div className=' bg-blue-500 w-5 h-5 mr-1'></div>
                            <p>NooB aCc</p>
                          </div>
                      </Link>
                      <Link>
                        <div className=' flex'>
                          <div className=' bg-slate-500 w-5 h-5 mr-1'></div>
                          <p>Private</p>
                        </div>
                      </Link>

                      <div className=' h-[1px] w-full  bg-white'></div>
                      
                      <button 
                        className=' text-white text-sm'
                        onClick={SignOutHandeler}
                      >Sign out</button>
                     </div>
                }
              </div>
            }
            {
              !user &&
              <button className=' h-9 py-1 px-6 mt-7 mr-7 bg-red-600 rounded-sm text-white font-bold'
                onClick={() => navigate('/Login')}
              >Sign In</button>
            }
        </div>

  )
}

export default Header