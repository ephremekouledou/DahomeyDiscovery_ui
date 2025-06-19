import { Col, Flex, Row, Image } from "antd";

type ImageType = {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

type ImageGalleryProps = {
  images: ImageType[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <Flex
      style={{
        width: "100%",
        padding: "0 5vw",
        position: "relative",
        bottom: "15vh",
      }}
      justify="center"
    >
      {/* Galerie principale - Grid responsive */}
      <Row gutter={[16, 16]}>
        {images.map((image) => (
          <Col
            key={image.id}
            xs={24} // 1 colonne sur très petit écran
            sm={12} // 2 colonnes sur petit écran
            md={8} // 3 colonnes sur écran moyen
            lg={6} // 4 colonnes sur grand écran
          >
            <Image
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default ImageGallery;
