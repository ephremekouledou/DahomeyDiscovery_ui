import { Button } from "antd";
import { ArrowBigUp } from "lucide-react";

const BeginningButton = () => {
  return (
    <Button
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: "#f59f00",
      }}
      onClick={() => window.scrollTo(0, 0)}
      type="primary"
      shape="circle"
      size="large"
      icon={<ArrowBigUp />}
    />
  );
};

export default BeginningButton;
