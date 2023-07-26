import { useEffect } from "react";

const Accessory = ({ setSelectedLink }) => {
  useEffect(() => {
    setSelectedLink("assets/accessory");
  }, []);

  return <div>accessory</div>;
};

export default Accessory;
