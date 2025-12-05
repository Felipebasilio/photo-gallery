import { GalleryImageList } from "./gallery-image-list/gallery-image-list";
import { HighlightSelected } from "./highlight-selected/highlight-selected";
import { useImageList } from "../../hooks/use-image-list";

export const GalleryShowcase = () => {
  const images = useImageList();


  return (
    <div className="flex flex-row gap-10 grow shrink basis-[90%] px-15">
      {/* Gallery image list contianer */}
      <div className="flex flex-col grow shrink basis-1/3 flex-wrap overflow-auto">
        <GalleryImageList images={images} />
      </div>

      <div className="w-px bg-gray-300"/>

      {/* Highlight selected container */}
      <div className="flex felx-col grow shrink basis-1/2 flex-wrap overflow-auto">
        <HighlightSelected />
      </div>
    </div>
  );
};