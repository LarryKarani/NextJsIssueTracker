import Pagination from "@/app/components/pagination";
import IssueActions from "@/app/issues/list/IssueActions";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
 
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const where = { status: status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
