import { useRouter } from "next/router";

const SoftwareEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default SoftwareEdit;
