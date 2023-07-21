import { useRouter } from "next/router";

const LaptopInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default LaptopInfo;
