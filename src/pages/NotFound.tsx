import { useRouteError } from "react-router-dom";
import ErrorImage from '../assets/images/Error404.png'
import { Typography } from 'antd'

const { Title, Text } = Typography

interface Error {
    statusText: string,
    message: string
}

export default function NotFound() {

    const error: Error = useRouteError() as Error;

    // Uncaught ReferenceError: path is not defined
    console.log(error);
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img src={ErrorImage} width={500} alt="error" />
            <Title level={4} style={{ marginBottom: 8 }} >Something went wrong!</Title>
            <Text>{error.statusText || error.message}</Text>
        </div>
    )
}