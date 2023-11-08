import {css} from "@emotion/css";
import SblockGrid from "./sBlocks/sBlockGrid";
import SBlockMenu from "./sBlocks/sBlockMenu";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";

const Main = () => {
  const {darkTheme, setDarkTheme} = useSBlocks();
  return (
    <>
      <div
        className={css`
          background-color: ${darkTheme ? "#353535" : "#dfdfdf"};
          color: ${darkTheme ? "#fff" : "#000"};
          width: 100%;
          height: 99%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: "Josefin Sans";
            font-weight: 600;
          `}
        >
          {/* <label
            className={css`
              padding: 1rem 0px 0px 0px;
              display: flex;
              flex: 1;
            `}
          >
            QOOOB
          </label> */}
          <SBlockMenu />
        </div>

        <SblockGrid />
      </div>
    </>
  );
};

export default Main;
