import { Button, Flex, Typography } from "antd";
import bgVideo from "../../assets/videos/bgVideo.mp4";
import vector from "../../assets/icons/homeVector.png";
import NavBar from "../navBar/navBar";

const VideoBackground = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-20 flex items-center justify-center p-8">
        <NavBar scrolled={true} />
      </div>

      {/* Contenu par-dessus la vidéo */}
      <div className="relative z-20 flex items-center justify-center h-full text-white">
        <Flex vertical gap="10px" justify="center" align="center">
          <Flex vertical align="flex-end">
            <img
              src={vector}
              alt="Vector"
              style={{ height: "50px", width: "250px", paddingRight: "40px" }}
            />
            <Typography.Title
              level={2}
              style={{
                color: "white",
                marginLeft: "10px",
                fontSize: "75px",
                fontWeight: "800",
              }}
            >
              Reconnectez-vous à
            </Typography.Title>
          </Flex>
          <Typography.Title
            level={2}
            style={{
              color: "white",
              marginLeft: "10px",
              fontSize: "75px",
              fontWeight: "800",
            }}
          >
            la Terre Mère !
          </Typography.Title>
          <Button
            type="primary"
            size="large"
            style={{
              borderRadius: "100px",
              padding: "10px 27px",
              backgroundColor: "#F59F00",
              color: "black",
            }}
          >
            Je choisis mon expérience
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default VideoBackground;
