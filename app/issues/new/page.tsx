'use client';

import React from 'react';
import axios from 'axios';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  const handleCreateIssue = async (data: IssueForm) => {
    console.log(data);
    const response = await axios.post('/api/issues', data);
    if (response.status === 201) {
      router.push('/issues');
    }
  };

  
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => handleCreateIssue(data))}
    >
      <TextField.Root placeholder="Create New Issue" {...register("title")} />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Description" />
        )}
      />
      <Button>Submit Issue</Button>
    </form>
  );
}

export default NewIssuePage