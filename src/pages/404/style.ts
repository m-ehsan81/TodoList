import { Box } from "@mui/material";
import styled from "styled-components";

export const MainDiv = styled(Box)`
  padding: 50px;
  width: fit-content;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleP = styled.p`
  font-size: 7rem;
  font-weight:900;
  color: #334155;
`;

export const NotFoundP = styled.p`
  font-size: 2rem;
  font-weight: 900;
  margin-top: -30px;
  color: #334155;
`;
