import type { Image } from "../../../types/image";

export const GalleryImageList = ({ images }: { images: Image[] }) => {
  return (
    <div className="h-full w-full grid-cols-5 gap-2 grid-auto-rows-fr overflow-auto max-h-[400px]">
      {images.map((image: Image) => (
        <div key={image.id}>
          <img src={image.download_url} alt={image.author} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
};