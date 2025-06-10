import { useEffect, useState } from "react";
import "./Acceuil.css";
import NavBar from "../../components/navBar/navBar";
import bgVideo from "../../assets/videos/bgVideo.mp4";
import { FlipWords } from "../../components/ui/flip-words";
import logo from "../../assets/images/Logo/monoChrome-blanc.png";
import backChevron from "../../assets/icons/backChevron.png";
import vector from "../../assets/icons/homeVector.png";
import Footer from "../../components/footer/footer";
import Circuit from "../../components/circuit/circuit";
import VideoBackground from "../../components/videoBackground/videoBackground";
import circuitImage from "../../assets/images/circuitImage.png";
import { Divider, Flex, Typography } from "antd";
import { s } from "motion/react-client";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";

const Acceuil = () => {
  const [selectedCircuit, setSelectedCircuit] = useState<string>("");
  useEffect(() => {
    document.title = "Acceuil";
  }, []);

  return (
    <>
      <section className="one">
        <VideoBackground />
      </section>

      <section className="two">
        <Flex>
          <img
            src={backChevron}
            className="Accueil_image_2"
            alt="Dahomey Discovery Logo"
            style={{
              width: "clamp(14rem, 5vw, 16rem)",
              height: "auto",
            }}
          />
        </Flex>
        <Flex
          vertical
          align="flex-start"
          gap="clamp(0.5rem, 2vw, 1rem)"
          style={{
            margin: "0 5vw",
            position: "relative",
            bottom: "clamp(6rem, 15vh, 12rem)",
          }}
        >
          <Typography.Title
            level={1}
            style={{
              color: "#3B1B19",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: "800",
              textAlign: "center",
              lineHeight: "1.2",
              margin: "0",
            }}
          >
            Et si vous découvriez <br /> le Bénin avec sens
          </Typography.Title>
          <img
            src={vector}
            alt="Vector"
            style={{
              height: "clamp(1rem, 3vh, 2rem)",
              width: "clamp(12rem, 30vw, 20rem)",
              paddingRight: "clamp(1rem, 3vw, 2.5rem)",
            }}
          />
        </Flex>
        <Flex
          vertical
          gap="100px"
          style={{ padding: "0 5vw", width: "100%", paddingBottom: "20vh" }}
        >
          <Flex vertical>
            <Flex
              justify="space-between"
              align="center"
              style={{
                width: "100%",
                height: "clamp(3rem, 10vh, 6rem)",
                backgroundColor:
                  selectedCircuit === "Circuit Signature" ? "#fef5e6" : "white",
                padding: "clamp(0.5rem, 2vw, 1.5rem)",
                borderRadius: "0.3rem",
              }}
              onClick={() => setSelectedCircuit("Circuit Signature")}
            >
              <Flex align="center">
                <Typography.Title
                  level={2}
                  style={{
                    color:
                      selectedCircuit === "Circuit Signature"
                        ? "#BF2500"
                        : "#411E1C",
                    fontSize: "clamp(1rem, 5vw, 3rem)",
                    // fontWeight: "800",
                    textAlign: "center",
                    paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
                    margin: "0",
                  }}
                >
                  Circuit Signature
                </Typography.Title>
              </Flex>
              <img
                src={circuitImage}
                style={{
                  height: "clamp(6rem, 25vh, 15rem)",
                  width: "auto",
                  paddingRight: "clamp(1rem, 5vw, 4rem)",
                  maxWidth: "30vw",
                  display:
                    selectedCircuit === "Circuit Signature" ? "block" : "none",
                }}
                className="Accueil_image_2"
                alt="Dahomey Discovery Logo"
              />
            </Flex>
            {selectedCircuit !== "Circuit Signature" && <Divider />}
          </Flex>
          <Flex vertical>
            <Flex
              justify="space-between"
              align="center"
              style={{
                width: "100%",
                height: "clamp(3rem, 10vh, 6rem)",
                backgroundColor:
                  selectedCircuit === "Circuits Thématiques"
                    ? "#fef5e6"
                    : "white",
                padding: "clamp(0.5rem, 2vw, 1.5rem)",
                borderRadius: "0.3rem",
              }}
              onClick={() => setSelectedCircuit("Circuits Thématiques")}
            >
              <Flex align="center">
                <Typography.Title
                  level={2}
                  style={{
                    color:
                      selectedCircuit === "Circuits Thématiques"
                        ? "#BF2500"
                        : "#411E1C",
                    fontSize: "clamp(1rem, 5vw, 3rem)",
                    // fontWeight: "800",
                    textAlign: "center",
                    paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
                    margin: "0",
                  }}
                >
                  Circuits Thématiques
                </Typography.Title>
              </Flex>
              <img
                src={circuitImage}
                style={{
                  height: "clamp(6rem, 25vh, 15rem)",
                  width: "auto",
                  paddingRight: "clamp(1rem, 5vw, 4rem)",
                  maxWidth: "30vw",
                  display:
                    selectedCircuit === "Circuits Thématiques"
                      ? "block"
                      : "none",
                }}
                className="Accueil_image_2"
                alt="Dahomey Discovery Logo"
              />
            </Flex>
            {selectedCircuit !== "Circuits Thématiques" && <Divider />}
          </Flex>
          <Flex vertical>
            <Flex
              justify="space-between"
              align="center"
              style={{
                width: "100%",
                height: "clamp(3rem, 10vh, 6rem)",
                backgroundColor:
                  selectedCircuit === "Circuit à la carte"
                    ? "#fef5e6"
                    : "white",
                padding: "clamp(0.5rem, 2vw, 1.5rem)",
                borderRadius: "0.3rem",
              }}
              onClick={() => setSelectedCircuit("Circuit à la carte")}
            >
              <Flex align="center">
                <Typography.Title
                  level={2}
                  style={{
                    color:
                      selectedCircuit === "Circuit à la carte"
                        ? "#BF2500"
                        : "#411E1C",
                    fontSize: "clamp(1rem, 5vw, 3rem)",
                    // fontWeight: "800",
                    textAlign: "center",
                    paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
                    margin: "0",
                  }}
                >
                  Circuit à la carte
                </Typography.Title>
              </Flex>
              <img
                src={circuitImage}
                style={{
                  height: "clamp(6rem, 25vh, 15rem)",
                  width: "auto",
                  paddingRight: "clamp(1rem, 5vw, 4rem)",
                  maxWidth: "30vw",
                  display:
                    selectedCircuit === "Circuit à la carte" ? "block" : "none",
                }}
                className="Accueil_image_2"
                alt="Dahomey Discovery Logo"
              />
            </Flex>
            {selectedCircuit !== "Circuit à la carte" && <Divider />}
          </Flex>
        </Flex>
      </section>

      <section className="three">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </section>
    </>
  );
};

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
export default Acceuil;
