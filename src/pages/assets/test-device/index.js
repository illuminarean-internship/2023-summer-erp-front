import { useEffect } from "react";

const TestDevice = ({ setSelectedLink }) => {
  useEffect(() => {
    setSelectedLink("assets/laptop");
  }, []);
  return <div>testDevice</div>;
};

export default TestDevice;
