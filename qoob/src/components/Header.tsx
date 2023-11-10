import {css} from "@emotion/css";
import BasicButton from "./BasicButton";
import Settings from "./Settings";

export const Header = () => {
  return (
    <>
      <div
        className={css`
          height: max-content;
          display: flex;
        `}
      >
        {/* <label
          className={css`
            padding: 1rem 0px 0px 0px;
          `}
        >
          QOOOB
        </label> */}
        <img
          src="/logo/qooob-logo.png"
          className={css`
            width: 200px;
            padding: 2px;
          `}
        />
        <>
          <Settings />
        </>
        {/* <Settings /> */}
      </div>
    </>
  );
};
