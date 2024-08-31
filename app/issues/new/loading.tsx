import Skeleton from "@/app/components/Skeleton";
import { Box } from "@radix-ui/themes";


const LoadingNewIssues = () => {
  return (
    <Box className="space-y-3 max-w-xl">
      <Skeleton height={30} />
      <Skeleton height={200} />
      <Skeleton height={30} width={90} className="mt-5" />
    </Box>
  );
};

export default LoadingNewIssues;
