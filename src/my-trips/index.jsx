import { db } from '@/services/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCardItem from './components/UserTripCardItem'

function MyTrips() {
  const navigate = useNavigate()
  const [userTips,setUserTips]= useState([])
  useEffect(()=>{
    getUsersTrips()
    console.log(userTips,'used trips')

  },[])
  /* USED TO GET ALL USER TRIPS */
  const getUsersTrips =async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      navigate('/')
      return;
    }
    const q = query(collection(db,'AITrips'),where('userEmail','==',user?.email))
    const querySnapshot = await getDocs(q);
    setUserTips([])

    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    setUserTips(trips); // update only once
    
  }
  return (
    <div className='p-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTips?.length>0?userTips.map((trip,index)=>(
          <UserTripCardItem trip = {trip}  key={index} />
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
          <div key = {index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

          </div>
        ))
      }
      </div>
    </div>
  )
}

export default MyTrips