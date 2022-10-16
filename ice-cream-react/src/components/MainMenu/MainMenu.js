import React from "react";
import './MainMenu.css'
import { motion } from "framer-motion"

export default () => {
  return (
    <motion.div
    className="Menu"
    // initial={{ opacity: 0, scale: 0.5 }}
    // animate={{ opacity: 1, scale: 1 }}
    // transition={{ duration: 0.5 }}
  >
    
    <button  className="Button">
      Stores
    </button>
    
    <button className="Button">
      Stores
    </button>
    
    <button className="Button">
      Stores
    </button>
    
    <button className="Button">
      Stores
    </button>
    
    <button className="Button">
      Stores
    </button>
    


  </motion.div>
  );
};
