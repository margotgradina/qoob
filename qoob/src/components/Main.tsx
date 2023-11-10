import {css} from "@emotion/css";
import SblockGrid from "./sBlocks/sBlockGrid";
import SBlockMenu from "./sBlocks/sBlockMenu";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {Header} from "./Header";

const Main = () => {
  const {darkTheme, setDarkTheme} = useSBlocks();

  return (
    <>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 99%;
          background-color: ${darkTheme ? "#353535" : "#dfdfdf"};
          color: ${darkTheme ? "#fff" : "#000"};
          font-family: "Josefin Sans";
          font-weight: 600;
        `}
      >
        <Header />

        <div
          className={css`
            width: 100%;
            /* height: 99%; */
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            /* gap: 1rem; */
          `}
        >
          <SBlockMenu />
          <SblockGrid />
        </div>
      </div>
    </>
  );
};

export default Main;
