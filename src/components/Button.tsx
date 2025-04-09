interface ButtonProps {
  text: string;
  onClickFunction?: () => void;
  active?: boolean;
}

const Button = ({
  text,
  onClickFunction: handleClick,
  active,
}: ButtonProps) => {
  return (
    <>
      <a
        href="#"
        className={"btn btn-outline-primary" + (active ? " active" : "")}
        onClick={handleClick}
      >
        {text}
      </a>
    </>
  );
};

export default Button;
