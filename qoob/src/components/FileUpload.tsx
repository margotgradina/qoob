import React, {useState} from "react";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {faCircleXmark, faUpload} from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

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
      className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center gap-4 border border-solid border-black bg-white p-4"
    >
      <IconButton icon={faCircleXmark} label="Close" onClick={onClose} />
      <input type="file" onChange={handleFileChange} />
      <IconButton variant="filled" icon={faUpload} label="Import" onClick={handleUpload} />
    </div>
  );
};

export default FileUpload;
