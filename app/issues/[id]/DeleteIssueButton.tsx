'use client';

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
 const [loading, setLoading] = useState(false);
 
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    await axios.delete(`/api/issues/${issueId}`);
    setLoading(false);
    router.push("/issues");
    router.refresh();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone{" "}
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={handleDelete} disabled={loading}>
              {loading && <Spinner />}
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
