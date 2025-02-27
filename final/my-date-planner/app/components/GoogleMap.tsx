type GoogleMapProps = {
  location: string;
};

export default function GoogleMap({ location }: GoogleMapProps) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  }&q=${encodeURIComponent(location)}`;

  return (
    <div className="w-full h-64">
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
      ></iframe>
    </div>
  );
}
