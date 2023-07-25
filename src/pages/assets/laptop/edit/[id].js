import { useRouter } from "next/router";

const LaptopEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default LaptopEdit;
