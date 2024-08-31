'use client';

import React from 'react';
import axios from 'axios';
import { TextField, Button, Callout } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [errorMessages, setErrorMessages] = React.useState<string|null>(null);
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  const handleCreateIssue = async (data: IssueForm) => {

    try {
      const response = await axios.post('/api/issues', data);
      if (response.status === 201) {
        router.push('/issues');
      }
    }catch (error) {
      setErrorMessages('An error occurred while creating the issue.');
    }
  };

  return (
    <div className="max-w-xl">
      {errorMessages && (
        <Callout.Root className="mb-5" color='red'>
          <Callout.Text>
            {errorMessages}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
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
    </div>
  );
}

export default NewIssuePage