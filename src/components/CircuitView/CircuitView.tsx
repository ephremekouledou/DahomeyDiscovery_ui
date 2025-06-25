import { Flex } from "antd";
import { useParams } from "react-router-dom";

export const CircuitView = () => {
  const { id } = useParams();

  return (
    <Flex vertical style={{ padding: "2rem" }}>
      <h1>Circuit View</h1>
      <p>Viewing circuit with ID: {id}</p>
    </Flex>
  );
};
