import {css} from "@emotion/css";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef} from "react";
import {SketchPicker, Color} from "react-color";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";

const ColourPicker = () => {
  const {currentColour, setCurrentColour, showColourPicker, setShowColourPicker} = useSBlocks();

  const colourPickerRef = useRef<HTMLDivElement | null>(null);

  //FIXME Click outside of colourpicker to go out of it
  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (showColourPicker) {
  //       if (colourPickerRef.current && !colourPickerRef.current?.contains(event.target)) {
  //         // This code will run when a click happens outside the div
  //         setShowColourPicker(false);
  //         // You can call your function here
  //         // yourFunction();
  //       }
  //     }
  //   };

  //   // Add a click event listener to the document when the component mounts
  //   document.addEventListener("click", handleClickOutside);

  //   // Remove the event listener when the component unmounts to prevent memory leaks
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <div
        ref={colourPickerRef}
        className={css`
          position: absolute;
          height: max-content;
          width: max-content;
          z-index: 1000;
          display: flex;
          top: 0;
          flex-direction: column;
          gap: 5px;
        `}
      >
        <SketchPicker
          color={currentColour as unknown as Color}
          onChange={(colour: any) => {
            setCurrentColour(colour);
          }}
          onChangeComplete={() => {
            // setShowColourPicker(false);
          }}
        />
        <FontAwesomeIcon
          icon={faCircleXmark}
          size={"lg"}
          color="#BDD364"
          onClick={() => {
            setShowColourPicker(false);
          }}
        />
      </div>
    </>
  );
};

export default ColourPicker;
