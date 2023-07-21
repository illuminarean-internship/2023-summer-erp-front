import { useEffect } from "react";

const DesktopPc = ({ setSelectedLink }) => {
  useEffect(() => {
    setSelectedLink("assets/desktopPc");
  }, []);
  return <div>desktopPc</div>;
};

export default DesktopPc;
