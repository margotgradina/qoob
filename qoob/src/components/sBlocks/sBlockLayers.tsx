import {useSBlocks} from "./hooks/useSBlocks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCancel, faEye, faEyeSlash, faLock, faLockOpen, faMinus, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {SBlockLayer} from "./sBlockTypes";
import {getRandomNumber} from "../../helpers/GetRandomNumber";
import {useEffect, useState} from "react";

const SBlockLayers = () => {
  const {layers, setLayers, currentLayer, setCurrentLayer, setShowSnackBar} = useSBlocks();
  const [changeName, setChangeName] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState<string>("");

  useEffect(() => {
    setCurrentLayer(layers[0]);
  }, []);

  const handleAddLayer = () => {
    if (currentLayer) {
      //create a new layer
      const newLayer: SBlockLayer = {
        id: getRandomNumber(1, 10000000000),
        name: `Layer ${currentLayer.index + 2}`,
        index: currentLayer.index + 1,
        visible: true,
        deletable: true,
      };

      const newLayers = [...layers]; // Clone the current layers array
      const currentIndex = newLayers.findIndex((layer) => layer.id === currentLayer.id); // Find the index of the currentLayer
      newLayers.splice(currentIndex + 1, 0, newLayer); // Insert the newLayer after the currentLayer

      // Update the index property of layers that come after the newLayer
      for (let i = currentIndex + 2; i < newLayers.length; i++) {
        newLayers[i].index++;
      }

      // console.log(newLayers);
      setLayers(newLayers);
      setCurrentLayer(newLayer);
    }
  };

  const handleDeleteLayer = () => {
    if (currentLayer.deletable) {
      if (layers.length >= 2) {
        // Find the index of the currentLayer in the layers array
        const currentIndex = layers.findIndex((layer) => layer.id === currentLayer.id);

        if (currentIndex !== -1) {
          // Create a new layers array
          const newLayers = layers
            .filter((layer) => layer.id !== currentLayer.id)
            .map((layer) => {
              if (layer.index > currentIndex) {
                // Decrement the index of layers above the currentLayer
                return {...layer, index: layer.index - 1};
              } else {
                return layer;
              }
            });

          // Set the currentLayer to the layer below
          const newCurrentLayer = newLayers[currentIndex - 1] || null;

          // Update the state with the new layers array and currentLayer
          console.log(newLayers);
          setLayers(newLayers);
          setCurrentLayer(newCurrentLayer);
        }
      }
    } else {
      setShowSnackBar(true);
    }
  };

  const handleSetLayerVisibility = (layer: SBlockLayer, index: number) => {
    const updatedLayers = [...layers];
    updatedLayers[index].visible = !updatedLayers[index].visible;
    setLayers(updatedLayers);
  };

  const handleSetLayerDeletability = (layer: SBlockLayer, index: number) => {
    const updatedLayers = [...layers];
    updatedLayers[index].deletable = !updatedLayers[index].deletable;
    setLayers(updatedLayers);
  };

  const handleSaveName = (layer: SBlockLayer, index: number) => {
    if (nameInput != "") {
      const updatedLayers = [...layers];
      updatedLayers[index].name = nameInput;
      setLayers(updatedLayers);
    }

    setChangeName(0);
    setNameInput("");
  };

  const handleCancelName = () => {
    setChangeName(0);
    setNameInput("");
  };

  return (
    <div
      key={"sBlock_layers_block"}
      className="flex h-[90%] w-[90%] flex-col items-center justify-between rounded-[15px] border border-solid border-[#808080]"
    >
      <div
        key={"layers_block"}
        className="flex h-full w-full flex-col"
      >
        <label
          className="rounded-t-[15px] bg-[#808080] py-[0.1rem] text-center text-[14px] font-semibold text-white"
        >
          Layers
        </label>
        <div
          key={"sBlock_layers_scroll"}
          className="scroll-thin flex h-[10vh] max-h-[10vh] w-full flex-col overflow-y-auto max-md:h-auto max-md:max-h-[20vh]"
        >
          {
            layers?.map((layer, index) => {
              return (
                <div
                  key={"div_layer" + index}
                  className="flex flex-row items-center gap-2 px-[0.2rem] py-[0.1rem] text-[14px]" style={{backgroundColor: currentLayer == layer ? "#7cc0a0" : ""}}
                >
                  <FontAwesomeIcon
                    icon={layer.visible ? faEye : faEyeSlash}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetLayerVisibility(layer, index);
                    }}
                  />
                  {changeName == layer.id ? (
                    <>
                      <input
                        key={"nampeinput_" + layer.id}
                        className="w-[99%]"
                        onChange={(e) => setNameInput(e.target.value)}
                      ></input>
                      <FontAwesomeIcon icon={faSave} onClick={() => handleSaveName(layer, index)} />
                      <FontAwesomeIcon icon={faCancel} onClick={() => handleCancelName()} />
                    </>
                  ) : (
                    <>
                      <label
                        key={"label_" + layer.id}
                        className="w-[99%]"
                        onDoubleClick={() => {
                          setChangeName(layer.id);
                        }}
                        onClick={() => setCurrentLayer(layer)}
                      >
                        {layer.name}
                      </label>
                      <FontAwesomeIcon
                        icon={layer.deletable ? faLockOpen : faLock}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetLayerDeletability(layer, index);
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })
            //TODO MAP LAYERS
          }
        </div>
      </div>
      <div
        key={"layers_menu"}
        className="flex h-[25px] w-full flex-row items-center justify-center gap-[1vw] rounded-b-[15px] [border-top:1px_dashed_#808080] py-[0.1rem]"
      >
        <FontAwesomeIcon icon={faPlus} onClick={() => handleAddLayer()} />
        <FontAwesomeIcon icon={faMinus} onClick={() => handleDeleteLayer()} />
      </div>
    </div>
  );
};

export default SBlockLayers;
