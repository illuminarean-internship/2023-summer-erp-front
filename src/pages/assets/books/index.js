import { useEffect } from "react";

const Books = ({ setSelectedLink }) => {
  useEffect(() => {
    setSelectedLink("assets/books");
  }, []);

  return <div>books</div>;
};

export default Books;
