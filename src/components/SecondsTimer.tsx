interface SecondsTimerInterface {
  autoplayInterval: number;
  changeAuto: (e: number) => void;
}

const SecondsTimer = ({
  autoplayInterval,
  changeAuto,
}: SecondsTimerInterface) => {
  return (
    <>
      {" "}
      <div
        className="input-group mt-2"
        style={{
          maxWidth: "7em",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder={String(autoplayInterval)}
          aria-label="ms timer"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            // console.log(e.target.value);
            // todo make this check if it's a number
            changeAuto(parseInt(e.target.value));
          }}
        />
        <span className="input-group-text" id="basic-addon2">
          ms
        </span>
      </div>
    </>
  );
};

export default SecondsTimer;
