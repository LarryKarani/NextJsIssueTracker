'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';
import { Status } from '@prisma/client';


const status: {label: string, value?: Status}[] = [
  {label: 'All'},
  {label: 'Open', value: 'OPEN'},
  {label: 'In Progress', value: 'IN_PROGRESS'},
  {label: 'Closed', value: 'CLOSED'}

]
const IssueStatusFilter = () => {
  return (
    <Select.Root defaultValue='all'>
      <Select.Trigger placeholder='Filter by status...'/>
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