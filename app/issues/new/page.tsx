import React from 'react';
import { TextField, TextArea, Button } from '@radix-ui/themes';


const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Create New Issue'/>
      <TextArea placeholder='Description'/>
      <Button>Submit Issue</Button>
    </div>
  )
}

export default NewIssuePage