import { useContext, useEffect, useState } from "react";
import { FullscreenContext, ImageDetails } from "../App";

interface ImageHandlerProps {
  image: ImageDetails;
}
// this has a little loading symbol while it's loading!! actually works
const ImageHandler = ({ image: image }: ImageHandlerProps) => {
  useEffect(() => {
    if (image.extension === "mp4" || image.extension === "mov") {
      getVideoDimensionsOf(image.url);
      setIsImage(false);
    } else {
      setIsImage(true);
    }
  });
  const [isImage, setIsImage] = useState(true);
  const [videoDimensionsX, setVideoDimensionsX] = useState(0);
  const [videoDimensionsY, setVideoDimensionsY] = useState(0);

  // https://stackoverflow.com/questions/4129102/html5-video-dimensions
  function getVideoDimensionsOf(url: string) {
    return new Promise((resolve) => {
      // create the video element
      const video = document.createElement("video");

      // place a listener on it
      video.addEventListener(
        "loadedmetadata",
        function () {
          // retrieve dimensions
          const height = this.videoHeight;
          const width = this.videoWidth;

          setVideoDimensionsX(width);
          setVideoDimensionsY(height);

          // send back result
          resolve({ height, width });
        },
        false
      );

      // start download meta-datas
      video.src = url;
    });
  }

  const [loading, setLoading] = useState(false);
  const fullscreen = useContext(FullscreenContext);
  const originalSize = useState(false);

  function imageSizeCalculator() {
    if (!originalSize) {
      // todo add check here whether original size is larger than viewport
      return "auto";
    } else if (!fullscreen) {
      return "67em";
    } else {
      return "89.8em";
    }
  }

  // height value when not fullscreen: 67em

  if (isImage) {
    return (
      <>
        <img
          src={image.url}
          className="rounded-3"
          style={{
            padding: "0,0,0,0",
            maxHeight: imageSizeCalculator(),
            maxWidth: "auto",
            minHeight: imageSizeCalculator(),
            display: loading ? "none" : "block",
          }}
          onLoad={() => setLoading(false)}
        />
      </>
    );
  } else {
    return (
      <iframe
        src={image.url}
        className="rounded-3"
        style={{
          padding: "0,0,0,0",
          maxWidth: "auto",
          maxHeight: imageSizeCalculator(),
          width: videoDimensionsX,
          height: videoDimensionsY,

          display: loading ? "none" : "block",
          position: "unset",
        }}
        id="iframe"
        //() => setLoading(false)
      ></iframe>
    );
  }
};

{
  /* <div
className="spinner-border"
style={{
  display: loading ? "block" : "none",
  width: "2rem",
  height: "2rem",
}}
>
<span className="visually-hidden">Loading...</span>
</div> */
}

export default ImageHandler;
