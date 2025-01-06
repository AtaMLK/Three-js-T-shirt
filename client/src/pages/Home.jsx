/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { CustomButton } from "../components";
function Home() {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div className="head-text" {...headTextAnimation}>
              LE&rsquo;TS
              <br className="xl:block hidden" /> DO IT.
            </motion.div>
          </motion.div>
          <motion.div className="flex flex-col gap-5" {...headContentAnimation}>
            <p className="max-w-md text-gray-600 font-normal text-base">
              Create your unique exclisive shirt with our brand-new 3D
              customization tool.<strong>Unleash you imagination</strong>
              {""} and define you own style.
            </p>
            <CustomButton
              type="filled"
              title="customize it"
              customStyle="px-4 py-2.5 w-fit font-bold text-sm "
              handleClick={() => (state.intro = false)}
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Home;
