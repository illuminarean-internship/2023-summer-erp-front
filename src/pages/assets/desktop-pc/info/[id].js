import { useRouter } from "next/router";

const DesktopPcInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default DesktopPcInfo;
