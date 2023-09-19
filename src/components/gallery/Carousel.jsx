import styled from "styled-components";

export const Slider = styled.div`
    position: relative;
    top: 3rem;
    margin: auto;
    z-index: 300;
    width: 100%;
    max-width: 800px;
    height: 350px;
    max-height: 80%;
    overflow: hidden;
    box-shadow: 0px 0px 3em rgba(0, 0, 0, 0.5);
    border-radius: 8px;`;

export const Slide = styled.div`
    position: absolute;
    width: 100%;
    max-width: 800px;
    height: 100%;
    max-height: 350px;
    transition: all 0.5s;
    img {
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 350px;
        object-fit: cover;
    }
`;

export const CarouselButton = styled.button`
    position: absolute;
    width: 40px;
    height: 40px;
    padding: 10px;
    border: none;
    border-radius: 50%;
    z-index: 10px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    font-size: 18px;
    ${props => `
        ${props.direction === 'left' ? `
        top: 35%;
        left: 2%;
        ` : `
        top: 35%;
        right: 2%;
        `}
    `}
    &:active {
        transform: scale(1.1);
    }
    &:hover {
        transform: scale(1.1);
    }
`;
