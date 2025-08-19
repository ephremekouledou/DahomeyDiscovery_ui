const ThematicCircuitCard = ({
  imageUrl,
  title,
  description,
  alt,
}: {
  imageUrl: string;
  title: string;
  description: string;
  alt: string;
  screenSize: string;
}) => {
  return (
    <>
      <div className="relative z-10 bg-white rounded-3xl p-0 shadow-2xl max-w-[400px] w-full overflow-hidden transform hover:scale-105 transition-transform duration-500">
        {/* Card image container */}
        <div className="w-full h-74 p-4 rounded-3xl">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover rounded-3xl"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Text content */}
        <div className="p-8 bg-white pt-0">
          <h1
            className="text-3xl font-bold text-gray-900 mb-2 tracking-wider"
            style={{ fontFamily: "DragonAngled", letterSpacing: "0.05em" }}
          >
            {title}
          </h1>
          <div
            className="text-sm text-gray-700 font-medium tracking-wide"
            style={{ fontFamily: "GeneralSans" }}
          >
            {description}
          </div>
        </div>
      </div>
    </>
  );
};

export { ThematicCircuitCard };