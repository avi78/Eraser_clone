"use client"
import React, { useEffect } from 'react'
import {Button} from '@/components/ui/button'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation, useQuery } from 'convex/react'
import {api} from '@/convex/_generated/api'

function Dashboard() {

  const {user}:any = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser,{email:user?.email});

  const createUser=useMutation(api.user.createUser);
  useEffect(() => {
    if(user){
      if(getUser == undefined)
      {
        createUser({
          name:user.given_name,
          email:user.email,
          image:user.picture
        }).then(resp=>{
          console.log(resp)
        })
      }
    }
  },[user])

  return (
    <div>
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>
  )
}

export default Dashboard
