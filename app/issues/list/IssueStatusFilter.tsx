'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';
import { Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';


const status: {label: string, value?: Status}[] = [
  {label: 'All'},
  {label: 'Open', value: 'OPEN'},
  {label: 'In Progress', value: 'IN_PROGRESS'},
  {label: 'Closed', value: 'CLOSED'}

]
const IssueStatusFilter = () => {

  const router = useRouter()
  const  searchParams = useSearchParams();

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams();
    if(status) params.append('status', status);

    if(searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy')!)
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`/issues/list${query}`)
  }
  return (
    <Select.Root 
      onValueChange={(status) =>handleStatusChange(status)}
      defaultValue={searchParams.get('status') || 'all'}
    >
      <Select.Trigger placeholder='Filter by status'/>
      <Select.Content>
      {status.map((s) => (
        <Select.Item value={s.value|| 'all'} key={s.value}>
          {s.label}
        </Select.Item>
      ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter