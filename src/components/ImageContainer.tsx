import { ReactNode, useContext } from "react";
import { FullscreenContext } from "../App";
// import Video from "./Video";

interface ImageContainerProps {
  children: ReactNode;
}

const ImageContainer = ({ children }: ImageContainerProps) => {
  const fullscreen = useContext(FullscreenContext);

  function nonFullScreenMargin() {
    if (!fullscreen) {
      return "my-4";
    } else {
      return null;
    }
  }

  return (
    <>
      <div className={"container-flex " + nonFullScreenMargin()}>
        {/* temporary my-5 to bring it down off the top, need to figure out how to bring it down to center automatically */}
        <div className="row justify-content-md-center">
          <div className="col-lg-auto border rounded-3 shadow-md px-0">
            {/* px-0 is what gets rid of the margins for column, replace if needed */}
            {children}
            {/* <Video /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageContainer;
