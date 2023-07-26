import { useRouter } from "next/router";

const DesktopPcEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default DesktopPcEdit;
