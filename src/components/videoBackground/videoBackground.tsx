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
        <Flex
          vertical
          gap="clamp(0.5rem, 2vw, 1rem)"
          justify="center"
          align="center"
          style={{
            padding: "clamp(1rem, 3vw, 2rem)",
            textAlign: "center",
          }}
        >
          <Flex vertical align="flex-end">
            <img
              src={vector}
              alt="Vector"
              style={{
                height: "clamp(2rem, 5vh, 4rem)",
                width: "clamp(10rem, 25vw, 18rem)",
                paddingRight: "clamp(1rem, 3vw, 2.5rem)",
                maxWidth: "90vw",
              }}
            />
            <Typography.Title
              level={2}
              style={{
                color: "white",
                marginLeft: "clamp(0.25rem, 1vw, 0.75rem)",
                fontSize: "clamp(2rem, 7vw, 5rem)",
                fontWeight: "800",
                lineHeight: "1.1",
                margin: "0",
              }}
            >
              Reconnectez-vous à
            </Typography.Title>
          </Flex>
          <Typography.Title
            level={2}
            style={{
              color: "white",
              marginLeft: "clamp(0.25rem, 1vw, 0.75rem)",
              fontSize: "clamp(2rem, 7vw, 5rem)",
              fontWeight: "800",
              lineHeight: "1.1",
              margin: "0",
            }}
          >
            la Terre Mère !
          </Typography.Title>
          <Button
            type="primary"
            size="large"
            style={{
              borderRadius: "clamp(2rem, 10vw, 6rem)",
              padding: "clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)",
              backgroundColor: "#F59F00",
              color: "black",
              fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
              fontWeight: "600",
              marginTop: "clamp(1rem, 3vh, 2rem)",
              minHeight: "clamp(2.5rem, 6vh, 4rem)",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
