import {css} from "@emotion/css";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";

const FloatingButtons = () => {
  const {} = useSBlocks();

  return (
    <div
      className={css`
        background-color: red;
        width: 50vw;
        height: max-content;
        position: fixed;
        bottom: 0%;
        right: 0%;
        display: flex;
        flex-direction: row;
      `}
    >
      test
    </div>
  );
};

export default FloatingButtons;
