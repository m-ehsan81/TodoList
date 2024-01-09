import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Box)`
  position: fixed;
  width: 320px;
  height: fit-content;
  padding: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 9999;
  box-shadow: 0 4px 8px 2px rgba(73, 73, 73, 0.25);
  border-radius: 8px;
  color: #000;
`;
