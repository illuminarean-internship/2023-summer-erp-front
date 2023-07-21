import { useEffect } from "react";

const Software = ({ setSelectedLink }) => {
  useEffect(() => {
    setSelectedLink("assets/software");
  }, []);
  return <div>software</div>;
};

export default Software;
