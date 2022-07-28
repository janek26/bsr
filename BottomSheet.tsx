import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
}

const useFirstRender = () => {
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);
  return firstRender;
};

const BottomSheetBackground = styled.div<{
  open: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  transition: all 0.3s ease-in-out;
  background-color: ${({ open }) =>
    open ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  backdrop-filter: ${({ open }) => (open ? "blur(10px)" : "none")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
`;

const BottomSheetWrapper = styled.div<{
  open: boolean;
  disableAnimation: boolean;
}>`
  position: fixed;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 18px 18px 0 0;
  border-top: 1px solid #e6e6e6;
  padding: 16px;
  z-index: 100;
  transform: ${({ open }) => (open ? `translateY(0%)` : `translateY(100%)`)};
  transition: ${({ disableAnimation, open }) => {
    if (disableAnimation) {
      return `transform 0s`;
    }
    return `transform 0.3s ${open ? "ease-out" : "ease-in"}`;
  }};
`;

export const BottomSheet: FC<BottomSheetProps> = ({ open, onClose }) => {
  const isFirstRender = useFirstRender();

  return (
    <>
      <BottomSheetBackground open={open} onClick={onClose} />
      <BottomSheetWrapper disableAnimation={isFirstRender} open={open}>
        <div className="bottom-sheet__content">
          <div className="bottom-sheet__content__header">
            <h2>Header</h2>
            <button onClick={onClose}>Close</button>
          </div>
          <div className="bottom-sheet__content__body">
            <p>Body</p>
          </div>
        </div>
      </BottomSheetWrapper>
    </>
  );
};
