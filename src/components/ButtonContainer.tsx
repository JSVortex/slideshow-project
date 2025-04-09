import { ReactNode, useContext } from "react";
import { FullscreenContext } from "../App";

interface ContainerProps {
  mouseOverFunction: boolean;
  children: ReactNode[];
}

const ButtonContainer = ({ mouseOverFunction, children }: ContainerProps) => {
  const fullscreen = useContext(FullscreenContext);

  if (!fullscreen || mouseOverFunction) {
    return (
      <>
        <div
          className="container-fluid position-absolute bc-anim"
          style={{ top: "73.8em" }}
        >
          <div className="row justify-content-lg-center">
            <div className="col-sm-auto border rounded-3 shadow-md p-2 bg-body">
              {/* px and py do the padding, my does vertical border */}
              <div className="btn-group" role="group">
                {children[0]}
                {children[1]}
                {children[2]}
                {children[3]}
              </div>
              {children[4]}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default ButtonContainer;
