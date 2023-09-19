import styled from "styled-components";

export const Background = styled.div`
  min-height: 100vh;
  background-image: ${props => props.$src ? `url(${props.$src})` : `url('')`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Blur = styled.div`
  min-height: inherit;
  background-color: rgb(255 255 255 / 0.3);
  backdrop-filter: blur(10px);
`;
