"use client";

import { ErrorMessage } from "@/app/components";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField, Spinner } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const NewIssueForm = ({issue}: {issue?: Issue}) => {
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();

  const handleCreateIssue = async (data: IssueFormData) => {
    try {
      setLoading(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push("/issues");
      } else {
        await axios.post("/api/issues", data);
        router.push("/issues");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessages("An error occurred while creating the issue.");
    }
  };

  return (
    <div className="max-w-xl">
      {errorMessages && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{errorMessages}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => handleCreateIssue(data))}
      >
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Create New Issue"
          {...register("title")}
        />
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button disabled={loading}>
          {issue ? "Update Issue" : " Submit Issue "}
          {loading && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default NewIssueForm;
