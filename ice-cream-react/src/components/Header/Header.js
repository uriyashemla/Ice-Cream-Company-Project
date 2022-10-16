import React from "react";
import "./Header.css";
import { motion } from "framer-motion";

import logo from "../../assets/logo.png";

export default () => {
  return (
    <div className="Header">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img className="Logo" src={logo}></img>
      </motion.div>
    </div>
  );
};
