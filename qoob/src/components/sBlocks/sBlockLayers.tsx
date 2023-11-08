import {css} from "@emotion/css";
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
      className={css`
        display: flex;
        flex-direction: column;
        border: 1px solid grey;
        border-radius: 15px;
        width: 90%;
        height: 90%;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        key={"layers_block"}
        className={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        `}
      >
        <label
          className={css`
            border-radius: 15px 15px 0px 0px;
            font-weight: 600;
            text-align: center;
            padding: 0.1rem 0px 0.1rem 0px;
            background-color: grey;
            color: #fff;
            font-size: 14px;
          `}
        >
          Layers
        </label>
        <div
          key={"sBlock_layers_scroll"}
          className={css`
            width: 100%;
            height: 10vh;
            max-height: 10vh;
            display: flex;
            flex-direction: column;
            overflow-y: auto;

            ::-webkit-scrollbar {
              width: 5px;
              height: 5px;
            }

            ::-webkit-scrollbar-thumb {
              background-color: #7cc0a0;
              border-radius: 20px;
              border: 0px solid orange;
            }
          `}
        >
          {
            layers?.map((layer, index) => {
              return (
                <div
                  key={"div_layer" + index}
                  className={css`
                    display: flex;
                    flex-direction: row;
                    font-size: 14px;
                    gap: 0.5rem;

                    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
                    align-items: center;
                    background-color: ${currentLayer == layer ? "#7cc0a0" : ""};
                  `}
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
                        className={css`
                          width: 99%;
                        `}
                        onChange={(e) => setNameInput(e.target.value)}
                      ></input>
                      <FontAwesomeIcon icon={faSave} onClick={() => handleSaveName(layer, index)} />
                      <FontAwesomeIcon icon={faCancel} onClick={() => handleCancelName()} />
                    </>
                  ) : (
                    <>
                      <label
                        key={"label_" + layer.id}
                        className={css`
                          width: 99%;
                        `}
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
        className={css`
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 25px;
          padding: 0.1rem 0px 0.1rem 0px;
          border-top: 1px dashed grey;
          border-radius: 0px 0px 15px 15px;
          gap: 1vw;
          align-items: center;
          justify-content: center;
        `}
      >
        <FontAwesomeIcon icon={faPlus} onClick={() => handleAddLayer()} />
        <FontAwesomeIcon icon={faMinus} onClick={() => handleDeleteLayer()} />
      </div>
    </div>
  );
};

export default SBlockLayers;
