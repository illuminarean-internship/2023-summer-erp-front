import { useRouter } from "next/router";

const BooksInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default BooksInfo;
