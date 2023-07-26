import { useRouter } from "next/router";

const AccessoryEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default AccessoryEdit;
