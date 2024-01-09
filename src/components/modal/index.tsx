import { ReactNode } from "react";
import { Container } from "./style";
import { Modal as ModalWrapper } from "@mui/material";

type ModalPropsType = {
  children: ReactNode;
  isOpen: boolean;
  closeHandler : Function;
};

export const Modal = ({ children, isOpen, closeHandler }: ModalPropsType) => {
  return (
    <ModalWrapper open={isOpen} onClose={() => closeHandler(false)}>
      <Container>{children}</Container>
    </ModalWrapper>
  );
};
