import { Box, Heading, Flex, Card } from '@radix-ui/themes';
import Skeleton from "@/app/components/Skeleton";

const LoadingIssue = () => {
  return (
    <Box>
      <Heading>
        <Skeleton width={100} />
      </Heading>
      <Flex className="space-x-3" my="2">
        <Skeleton width={50} />
        <Skeleton width={100} />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}

export default LoadingIssue