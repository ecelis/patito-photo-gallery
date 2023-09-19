import styled from "styled-components";

export const ThumbnailsDiv = styled.div`
  display: block;
  position: absolute;
  z-index: 300;
  width: 100%;
  max-height: 100px;
  max-width: 100%;
  overflow: hidden scroll;
  white-space: pre-line;
  background: rgba(255, 255, 255, 0.3);
  padding: 1em;
  border: none;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.5);
  bottom: 0px;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  position: relative;
  margin: 4px;
  border: thin solid black;
  max-height: 100px;
`;

 export default function ThumbnailStrip (thumbStrip) {
    return (
      <ThumbnailsDiv>
        {Array.isArray(thumbStrip) && thumbStrip.map(item => {
          return <Thumbnail
            key={`${baseUrl}${item.thumb[0]}`}
            src={`${baseUrl}${item.thumb[0]}`}
          />;
        })}
      </ThumbnailsDiv>
    );
  }
