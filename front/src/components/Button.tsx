import React from "react";
import styled, { css } from "styled-components";

const Styledbutton = styled.button<{
  // size: string;
  $primary?: string;
  $white?: boolean;
  $outline?: boolean;
}>`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  display: inline-flex;
  align-items: center;
  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
    ${(props) =>
    props.$primary === "primary" &&
    css`
      background-color: #5542f6;
      border: 1px solid #5542f6;
      color: #fff;
    `}
`;
// ${(props) =>
//   props.size === "l" &&
//   `
//   svg{
//     height:26px;
//   }
//   padding: 10px 20px;
//   font-size: 1.2rem;
// `};

export default function Button({
  children,
  // size,
  primary,
  white,
  outline,
}: {
  children: React.ReactNode;
  // size: string;
  primary?: string;
  white?: boolean;
  outline?: boolean;
}) {
  return (
    <Styledbutton $primary={primary} $outline={outline} $white={white}>
      {children}
    </Styledbutton>
  );
}
