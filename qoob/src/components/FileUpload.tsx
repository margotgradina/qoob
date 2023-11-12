import React, {useState} from "react";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {css} from "@emotion/css";
import BasicButton from "./BasicButton";
import {faCircleXmark, faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
  onClose: () => void;
}
const FileUpload = ({onClose}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {handleImport} = useSBlocks();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you can perform the upload logic, e.g., send the file to a server.
      console.log("Uploading file:", selectedFile.name);
      handleImport(selectedFile);
    } else {
      console.warn("No file selected for upload.");
    }
  };

  return (
    <div
      className={css`
        position: absolute;
        z-index: top;
        top: 50%;
        left: 50%;
        background-color: #fff;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={() => {
          onClose();
        }}
      />
      <input type="file" onChange={handleFileChange} />
      <BasicButton onClick={handleUpload} label={"import"} iconEnd={faUpload} />
    </div>
  );
};

export default FileUpload;
