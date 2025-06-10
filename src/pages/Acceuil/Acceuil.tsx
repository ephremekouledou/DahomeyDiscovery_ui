import { useEffect, useState } from "react";
import "./Acceuil.css";
import { FlipWords } from "../../components/ui/flip-words";
import backChevron from "../../assets/icons/backChevron.png";
import vector from "../../assets/icons/homeVector.png";
import VideoBackground from "../../components/videoBackground/videoBackground";
import circuitImage from "../../assets/images/circuitImage.png";
import { Divider, Flex, Typography } from "antd";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";

const Acceuil = () => {
  const [selectedCircuit, setSelectedCircuit] =
    useState<string>("Circuit Signature");
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
        <Flex
          vertical
          style={{ padding: "0 5vw", width: "100%" }}
          justify="center"
          align="center"
          gap="20px"
        >
          <Flex
            align="center"
            style={{
              color: "white",
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              fontWeight: "800",
              lineHeight: "1.2",
              margin: "0",
              width: "100%",
            }}
          >
            {/* <Typography.Title
              level={2}
              style={{
                color: "white",
                fontSize: "clamp(1.5rem, 5vw, 3rem)",
                fontWeight: "800",
                lineHeight: "1.2",
                margin: "0",
              }}
            >
              Nos clients en parlent !
            </Typography.Title> */}
            <FlipWords words={["Témoignages", "Avis", "Expériences"]} /> !
          </Flex>
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            className="fullwidth"
          />
        </Flex>
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
    image:
      "data:image/jpeg;base64,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",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
    image:
      "data:image/jpeg;base64,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",
  },
];
export default Acceuil;
