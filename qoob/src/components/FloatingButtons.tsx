import {useSBlocks} from "./sBlocks/hooks/useSBlocks";

const FloatingButtons = () => {
  const {} = useSBlocks();

  return (
    <div
      className="fixed bottom-0 right-0 flex h-max w-[50vw] flex-row bg-[red]"
    >
      test
    </div>
  );
};

export default FloatingButtons;
