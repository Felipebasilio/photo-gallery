import { useEffect, useState } from "react";
import { getData } from "../queries/fetch-images";

export function useImageList() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getData().then(data => setImages(data));
    }, []);

    return images;
}