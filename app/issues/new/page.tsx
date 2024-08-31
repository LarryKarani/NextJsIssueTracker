'use client';

import React from 'react';
import axios from 'axios';
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {createIssueSchema} from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
  const [errorMessages, setErrorMessages] = React.useState<string|null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();

  const handleCreateIssue = async (data: IssueForm) => {

    try {
      setLoading(true);
      const response = await axios.post('/api/issues', data);
      if (response.status === 201) {
        setLoading(false);
        router.push('/issues');
      }
    }catch (error) {
      setLoading(false);
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
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button disabled={loading}>Submit Issue {loading && <Spinner/>} </Button>
      </form>
    </div>
  );
}

export default NewIssuePage