// Timer function
import { useEffect } from "react";
import { ImageDetails } from "../App";

interface TimerInterface {
  Autoplay: boolean;
  AutoplayInterval: number;
  NextImageFunction: (increment: boolean) => void;
  GetNextImage: () => ImageDetails;
}

// https://www.reddit.com/r/Frontend/comments/1e6eo9w/the_challenge_of_creating_a_timer_in_react/

const Timer = ({
  Autoplay,
  AutoplayInterval,
  NextImageFunction,
  GetNextImage,
}: TimerInterface) => {
  /** @param {Uint8Array} uint8 */
  function isGifAnimated(uint8: string | any[] | Uint8Array) {
    let duration = 0;
    for (let i = 0, len = uint8.length; i < len; i++) {
      if (
        uint8[i] == 0x21 &&
        uint8[i + 1] == 0xf9 &&
        uint8[i + 2] == 0x04 &&
        uint8[i + 7] == 0x00
      ) {
        const delay = (uint8[i + 5] << 8) | (uint8[i + 4] & 0xff);
        duration += delay < 2 ? 10 : delay;
      }
    }
    return duration / 100;
  }

  function intervalCallback() {
    // if (Autoplay) {
    //   const nextImage = GetNextImage();
    //   if (nextImage.extension === "gif") {
    //     const intervalVariable = setInterval(intervalCallback, await gifLength);
    //     NextImageFunction(true);
    //   } else {
    //     NextImageFunction(true);
    //   }
    // }
    NextImageFunction(true);
  }
  // https://stackoverflow.com/questions/69564118/how-to-get-duration-of-gif-image-in-javascript#:~:text=Mainly%20use%20parseGIF()%20%2C%20then,duration%20of%20a%20GIF%20image.
  async function GetLength() {
    let gifLength = fetch(GetNextImage().url)
      .then((res) => res.arrayBuffer())
      .then((ab) => isGifAnimated(new Uint8Array(ab)))
      .then(function (length) {
        return length * 1000;
      });
    return gifLength;
  }
  function IfShorterThanSecLoop(length: number, minimumLength: number) {
    // todo calculate a function that makes it close to minimum length with perfect loops
    if (length < minimumLength) {
      return length * 2;
    }
    return length;
  }

  useEffect(() => {
    let intervalVariable: number | undefined = undefined;
    if (Autoplay) {
      if (GetNextImage().extension === "gif") {
        const gifLength = GetLength();
        gifLength
          .then((length) => IfShorterThanSecLoop(length, 5000))
          .then(
            (length) =>
              (intervalVariable = setInterval(intervalCallback, length))
          );
      } else {
        intervalVariable = setInterval(intervalCallback, AutoplayInterval);
      }
    }

    return () => clearInterval(intervalVariable);
  }, [NextImageFunction]);

  return <></>;
};

export default Timer;
