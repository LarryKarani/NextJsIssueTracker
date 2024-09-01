'use client';

import React, {useEffect} from 'react';
import { Select } from '@radix-ui/themes';
import { User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = () => {

  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const {data} = await axios.get<User[]>('/api/users');
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3
    
  })

  if(isLoading) return <Skeleton/>

  if (error) return null

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(user => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect