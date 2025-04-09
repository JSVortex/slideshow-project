import { createContext, useEffect, useState } from "react";
import "./App.css";
import ButtonContainer from "./components/ButtonContainer";
import ImageContainer from "./components/ImageContainer";
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import Button from "./components/Button";
import SecondsTimer from "./components/SecondsTimer";
import UploadButton from "./components/UploadButton";
import ImageHandler from "./components/ImageHandler";

// more metadata later
export type ImageDetails = {
  url: string;
  name: string;
  extension: string;
  isImage: boolean;
  favourite: boolean;
};

export const FullscreenContext = createContext(false);

// not sure how good of an idea context is for settings but i gotta learn i guess

function App() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const pressedKey = e.key;
      if (pressedKey === "ArrowLeft" || pressedKey === "a") {
        ChangeIndex(false);
      } else if (pressedKey == "ArrowRight" || pressedKey === "d") {
        ChangeIndex(true);
      } else if (pressedKey == "c") {
        ToggleAutoplay();
      } else if (pressedKey == "ArrowUp" || pressedKey == "w") {
        ToggleFullscreen();
      }
    };
    document.addEventListener("keydown", handleKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  useEffect(() => {
    document.body.addEventListener("mousemove", function (event) {
      if (event.pageY > 1150) {
        setHoveringBottom(true);
      } else {
        setHoveringBottom(false);
      }
      if (event.pageY < 100) {
        setHoveringTop(true);
      } else {
        setHoveringTop(false);
      }
    });
  });

  const defaultImage: ImageDetails = {
    name: "default",
    extension: "png",
    url: "\\no images.png",
    isImage: true,
    favourite: false,
  };

  let [images, setImages] = useState([defaultImage]);
  let [imageIndex, setImageIndex] = useState(0);
  let [imageCount, setImageCount] = useState(1);
  let [autoplay, setAutoplay] = useState(false);
  let [fullscreen, setFullscreen] = useState(false);
  let [autoplayTimer, setAutoplayTimer] = useState(1000);

  let [hoveringBottom, setHoveringBottom] = useState(false);
  let [hoveringTop, setHoveringTop] = useState(false);

  // let [displayingFavourites, setDisplayingFavourites] = useState(false);
  // let [currentlyShownIsFavourite, setCurrentlyShownIsFavourite] =
  //   useState(false);

  // /**
  //  * Toggles currently shown image to favourites.
  //  */
  // function AddFavourite() {
  //   // grab current image
  //   let imageToAdd = images[imageIndex];

  //   let isNowFavourite = !imageToAdd.favourite;

  //   imageToAdd.favourite = isNowFavourite;
  //   if (isNowFavourite) {
  //     setCurrentlyShownIsFavourite(true);
  //   } else {
  //     setCurrentlyShownIsFavourite(false);
  //   }
  // }

  // function ToggleDisplayingFavourites() {
  //   setDisplayingFavourites(!displayingFavourites);
  // }

  /**
   * Function to upload images. This creates a new array, checks if everything is a supported file, turns these files into "ImageDetails" objects and puts them in an array.
   * @param files List of files grabbed from the html upload button event.
   */
  function UploadImages(files: FileList | null) {
    if (files != null) {
      // creates an array out of the images
      const chosenImages = Array.prototype.slice.call(files);
      let convertedImages: ImageDetails[];
      convertedImages = []; // empty array for converted images
      chosenImages.forEach((element) => {
        const splitName = element.name.split("."); // split name here to get file extension
        let extension = splitName[splitName.length - 1];
        // FUNCTION TO CHECK IF IT'S AN IMAGE HERE (replace true with isImage)
        if (IsImage(extension) || IsVideo(extension)) {
          let newImage: ImageDetails = {
            name: splitName[0],
            extension: splitName[splitName.length - 1],
            url: URL.createObjectURL(element),
            isImage: IsImage(extension),
            favourite: false,
          };
          convertedImages.push(newImage);
        } else {
          console.log("Not image: " + splitName[splitName.length - 1]);
        }
      });
      // randomise here if random option toggled
      if (true) {
        ShuffleImageArray(convertedImages);
      }

      setImages(convertedImages);
      setImageIndex(0);
      setImageCount(convertedImages.length);

      // if no images are found, make an array out of the default image
      if (convertedImages.length < 1) {
        setImages([defaultImage]);
        setImageCount(1);
      }
    }
  }
  function AddImages(files: FileList | null) {
    console.log("add");
    if (files != null) {
      // creates an array out of the images
      const chosenImages = Array.prototype.slice.call(files);
      let convertedImages: ImageDetails[];
      if (images[0].name !== "default") {
        convertedImages = images; // empty array for converted images
      } else {
        convertedImages = [];
      }
      chosenImages.forEach((element) => {
        const splitName = element.name.split("."); // split name here to get file extension
        let extension = splitName[splitName.length - 1];
        // FUNCTION TO CHECK IF IT'S AN IMAGE HERE (replace true with isImage)
        if (IsImage(extension) || IsVideo(extension)) {
          let newImage: ImageDetails = {
            name: splitName[0],
            extension: splitName[splitName.length - 1],
            url: URL.createObjectURL(element),
            isImage: IsImage(extension),
            favourite: false,
          };
          convertedImages.push(newImage);
        } else {
          console.log("Not image: " + splitName[splitName.length - 1]);
        }
      });
      // randomise here if random option toggled
      if (true) {
        ShuffleImageArray(convertedImages);
      }

      setImages(convertedImages);
      setImageIndex(0);
      setImageCount(convertedImages.length);

      // if no images are found, make an array out of the default image
      if (convertedImages.length < 1) {
        setImages([defaultImage]);
        setImageCount(1);
      }
    }
  }

  /**
   * Toggles autoplay state.
   */
  function ToggleAutoplay() {
    setAutoplay(!autoplay);
  }
  /**
   * Toggles fullscreen state.
   */
  function ToggleFullscreen() {
    setFullscreen(!fullscreen);
  }
  /**
   * Change autoplay interval between changes.
   * @param ms Milliseconds of time you want the autoplay to take.
   */
  function SetAutoplayInterval(ms: number) {
    setAutoplayTimer(ms);
  }

  /**
   * Quick and dirty function to check if something is an image by its file extension name
   * @param fileExtension
   * @returns
   */
  function IsImage(fileExtension: string) {
    if (fileExtension === "gif") return true;
    if (fileExtension === "jpeg") return true;
    if (fileExtension === "jpg") return true;
    if (fileExtension === "jfif") return true;
    if (fileExtension === "jpg_large") return true;
    if (fileExtension === "jpg_small") return true;
    if (fileExtension === "png") return true;
    if (fileExtension === "webp") return true;
    return false;
  }
  /**
   * Quick and dirty function to check if something is an video by its file extension name
   * Movs are not properly supported in this current player.
   * @param fileExtension
   * @returns
   */
  function IsVideo(fileExtension: string) {
    // if (fileExtension === "mov") return true;
    if (fileExtension === "mp4") return true;
    if (fileExtension === "webm") return true;
    if (fileExtension === "m4v") return true;
    return false;
  }

  /**
   * Shuffles any given array. TODO find reference or replace
   * @param array
   */
  function ShuffleImageArray(array: any[]) {
    let currentIndex = array.length;

    // While there are remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  /**
   * Increments or decrements the current image index based on whether the parameter is positive or negative.
   * @param increment - Boolean of whether to increment or not.
   */
  function ChangeIndex(increment: boolean) {
    let newIndex: number;
    newIndex = imageIndex;

    // updates index, resets to 0 if you overflow, to max if you underflow
    if (increment) {
      newIndex += 1;
    } else {
      newIndex -= 1;
    }
    if (newIndex >= imageCount) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = imageCount - 1;
    }
    // toggles the switch to show if the image is favourited. need to improve this later
    // TODO
    // if (images[newIndex].favourite) {
    //   setCurrentlyShownIsFavourite(true);
    // } else {
    //   setCurrentlyShownIsFavourite(false);
    // }

    setImageIndex(newIndex);
  }

  function GetImage() {
    return images[imageIndex];
  }

  return (
    <>
      <FullscreenContext.Provider value={fullscreen}>
        <Navbar ImageCount={imageCount} mouseOverFunction={hoveringTop}>
          <UploadButton UploadFunction={UploadImages} UploadType="set">
            Set Images
          </UploadButton>
          <UploadButton UploadFunction={AddImages} UploadType="add">
            Add Images
          </UploadButton>
          {/* <Button
            text="Show Favourites ♥"
            onClickFunction={ToggleDisplayingFavourites}
            active={displayingFavourites}
          ></Button> */}
        </Navbar>
        <ImageContainer>
          <ImageHandler image={images[imageIndex]} />
        </ImageContainer>
        <ButtonContainer mouseOverFunction={hoveringBottom}>
          <Button
            text={"Previous"}
            onClickFunction={() => ChangeIndex(false)}
          />
          <Button
            text={"Autoplay"}
            onClickFunction={ToggleAutoplay}
            active={autoplay}
          />
          <Button text={"Next"} onClickFunction={() => ChangeIndex(true)} />
          {/* <Button
            text="♥"
            onClickFunction={AddFavourite}
            active={currentlyShownIsFavourite}
          ></Button> */}
          {/* does not currently work, will fix next*/}
          <SecondsTimer
            autoplayInterval={autoplayTimer}
            changeAuto={SetAutoplayInterval}
          />
        </ButtonContainer>
        <Timer
          GetNextImage={GetImage}
          Autoplay={autoplay}
          AutoplayInterval={autoplayTimer}
          NextImageFunction={ChangeIndex}
        />
      </FullscreenContext.Provider>
    </>
  );
}

export default App;
