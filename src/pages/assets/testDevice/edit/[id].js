import { useRouter } from "next/router";

const TestDeviceEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default TestDeviceEdit;
