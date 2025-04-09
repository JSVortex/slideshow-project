import { ReactNode } from "react";

interface UploadInterface {
  children: ReactNode;
  UploadFunction: (files: FileList | null) => void;
  UploadType: string;
}

const UploadButton = ({
  children,
  UploadFunction,
  UploadType,
}: UploadInterface) => {
  return (
    <>
      <label
        htmlFor={"upload-" + UploadType}
        className="btn btn-outline-warning"
      >
        {children}
      </label>
      <input
        type="file"
        multiple
        onChange={(event) => {
          UploadFunction(event.target.files);
        }}
        id={"upload-" + UploadType}
        style={{ visibility: "hidden" }}
      />
    </>
  );
};

export default UploadButton;
