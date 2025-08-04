import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getAuthUser } from '../lib/api';

const useAuthUser = () => {
  //axios
  //set up  react query / transtack
  const authUser = useQuery({queryKey:['authUser'],
    queryFn : getAuthUser,
    //using retry-> false for loading only once..
    retry : false, // auth check
  });
  return {
    isLoading : authUser.isLoading,
    authUser : authUser.data?.user
  }
}

export default useAuthUser