import React from 'react';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const NewIssueForm = dynamic(() => import('../_components/issueForm'), { ssr: false, loading: () => <IssueFormSkeleton /> });

const NewIssuePage = () => {
  return (
    <NewIssueForm/>
  )
}

export default NewIssuePage;