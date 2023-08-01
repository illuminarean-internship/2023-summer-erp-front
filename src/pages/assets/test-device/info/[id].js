import { useRouter } from "next/router";

const TestDeviceInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default TestDeviceInfo;
