import { Children, ReactNode, useContext } from "react";
import { FullscreenContext } from "../App";

interface NavbarInterface {
  ImageCount: number;
  mouseOverFunction: boolean;
  children: ReactNode | ReactNode[];
}

const navbar = ({
  children,
  ImageCount,
  mouseOverFunction: hoveringTop,
}: NavbarInterface) => {
  const fullscreen = useContext(FullscreenContext);

  if (!fullscreen || hoveringTop) {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-md rounded-bottom-3 nav-anim">
          <div className="container-fluid ">
            <a
              className="navbar-brand text-secondary-emphasis fw-lighter"
              href="#"
              style={{ filter: "drop-shadow(0 0 0em #61dafbaa)" }}
            >
              Quick Image Slideshow{" "}
              <span className="badge text-bg-secondary">{ImageCount}</span>
            </a>
            <div className="" id="navbarSupportedContent">
              {Children.map(children, (child) => {
                return child;
              })}
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return null;
  }
};

export default navbar;
