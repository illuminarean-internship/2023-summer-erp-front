import { useEffect } from "react";

const Laptop = ({ setSelectedLink }) => {
  useEffect(() => {
    setSelectedLink("assets/laptop");
  }, []);
  return <div>laptop</div>;
};

export default Laptop;
