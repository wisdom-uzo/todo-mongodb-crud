import styled from "styled-components";
import { motion } from "framer-motion";
  
export const ModalBox = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
  
export const ModalContent = styled(motion.div)`
 
`;
  
export const ModalContainer = styled.div`

`;
  
export const ToggleBtn = styled(motion.button)` bg-white`;