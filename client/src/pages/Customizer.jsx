/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  Tab,
  FilePicker,
  ColorPicker,
  CustomButton,
} from "../components";

function Customizer() {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingIms, setGeneratingIms] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    styleShirt: false,
  });
  //show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return <AIPicker />;
      default:
        return null;
    }
  };

  function handleDecal(type, result) {
    const decalType = DecalTypes[type];

    state[decalType.statProperty] = result;

    if (!activeFilterTab[decalType.FilterTabs]) {
      handleActiveFilterTab(decalType.FilterTabs);
    }
  }

  function handleActiveFilterTab(tabname) {
    switch (tabname) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabname];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabname];
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
  }

  function readFile(type) {
    reader(file)
      .then((result) => {
        handleDecal(type, result);
        setActiveEditorTab("");
      })
      .catch((error) => console.error("Error reading file:", error));
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            {" "}
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              customStyle="w-fit px-4 py-2.5 font-bold text-sm "
              handleClick={() => (state.intro = true)}
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab=""
                handleClick={() => {}}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
