/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { easing } from "maath";

function CameraRig({ children }) {
  const group = useRef();
  return <group ref={group}>{children}</group>;
}

export default CameraRig;
