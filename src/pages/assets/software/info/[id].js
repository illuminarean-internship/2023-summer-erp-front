import { useRouter } from "next/router";

const SoftwareInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default SoftwareInfo;
