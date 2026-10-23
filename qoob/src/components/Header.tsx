import BasicButton from "./BasicButton";
import Settings from "./Settings";

export const Header = () => {
  return (
    <>
      <div
        className="flex h-max max-md:flex-col max-md:items-center"
      >
        <img
          src="/logo/qooob-logo.png"
          className="w-[200px] p-[2px]"
        />
        <>
          <Settings />
        </>
        {/* <Settings /> */}
      </div>
    </>
  );
};
