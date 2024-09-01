 import { Status } from '@prisma/client';
import { Card, Flex,  Text } from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

 interface Props {
  open: string;
  inProgress: string;
  closed: string;
 }
 
 const IssueSummary = ({open, inProgress, closed}: Props) => {
   const statuses: {
    label: string;
    value: number;
    status: Status;
   }[] = [
     {label: 'Open Issues', value: parseInt(open), status: 'OPEN'},
     {label: 'In Progress Issues', value: parseInt(inProgress), status: 'IN_PROGRESS'},
     {label: 'Closed Issues', value: parseInt(closed), status: 'CLOSED'}
   ]
   return (
     <Flex gap="4">
        {statuses.map(({label, value, status}) => (
          <Card key={label}>
            <Flex direction={'column'} align={'center'} gap="2">
              <Link href={`/issues/list?status=${status}`} className="text-sm font-medium">
                {label}
              </Link>
              <Text size="5" className='font-bold'>{value}</Text>
            </Flex>
          </Card>
        ))}
     </Flex>
   )
 }
 
 export default IssueSummary