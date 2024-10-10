import { motion } from "framer-motion";
import { opacity } from "../../utils/index";
import Box from "./Box";
import { faqData } from "@/constants";
import styles from "./Faq.module.css";

const Faq = () => {
  return (
    <motion.div
      className="menu"
      variants={opacity}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="body">
        {faqData.map((el, index) => {
          return <Box data={el} index={index} key={index} />;
        })}
      </div>
    </motion.div>
  );
};

export default Faq;
