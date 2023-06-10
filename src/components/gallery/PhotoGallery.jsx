import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  min-height: 100vh;
  background: black;
  background-image: ${props => props.$src ? `url(${props.$src})` : `url('')`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Blur = styled.div`
  min-height: inherit;
  background-color: rgb(255 255 255 / 0.3);
  backdrop-filter: blur(10px);
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Photo = styled.img`
  position: relative;
  margin: auto;
  top: 6em;
  left: 3em;
  width: 80%;
  max-width: 80%;
  border: none;
  box-shadow: 0 0 2.5em rgba(0, 0, 0, 0.5);
`;

const baseUrl = 'https://celisdelafuente.net/photography/';
/* <a id="left" style={{ opacity: 0, visibility: 'visible' }}><div><img src="/left.png" /></div></a>
      <a id="right" style={{ opacity: 0, visibility: 'visible' }}><div><img src="/right.png" /></div></a> */
export default function PhotoGallery({ dataUrl }) {
  const [state, setState] = useState(null);
  const [current, setCurrent] = useState(0);
  const [srcUrl, setSrcUrl] = useState('');

  useEffect(() => {
    if (!state) {
      fetch(dataUrl,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(async response => {
          const { data } = await response.json();
          setState(data);
          setCurrent(0);
        })
        .catch(error => setState({ error: error }));
    }
  }, [state, current]);

  useEffect(() => {
    if (state) {
      setSrcUrl(
        `${baseUrl}${state[current].img[0]}`
      );
    }
  });


  if (!state) {
    return <h1>Vacio</h1>
  } else {
    return (
      <Background $src={srcUrl}>
        <Blur>
          <Content>
            <Photo
              src={srcUrl}
            />
          </Content>
        </Blur>
      </Background>
    );
  }
}