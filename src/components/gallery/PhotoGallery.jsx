import { useState, useEffect } from 'react';
import styled from 'styled-components';

const baseUrl = 'https://ecelis.sdf.org/photography/';

const Background = styled.div`
  min-height: 100vh;
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


const ThumbnailsDiv = styled.div`
  display: block;
  position: absolute;
  overflow: hidden scroll;
  white-space: pre-line;
  background: rgba(255, 255, 255, 0.3);
  padding: 1em;
  border: none;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.5);
  max-height: 100px;
  max-width: 100%;
  bottom: 0px;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  position: relative;
  margin: 4px;
  border: thin solid black;
  max-height: 100px;
`;


const Slider = styled.div`
    position: relative;
    top: 3rem;
    margin: auto;
    z-index: 300;
    width: 100%;
    max-width: 800px;
    height: 350px;
    max-height: 80%;
    overflow: hidden;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 8px;`;

const Slide = styled.div`
    position: absolute;
    width: 100%;
    max-width: 800px;
    height: 100%;
    transition: all 0.5s;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CarouselButton = styled.button`
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
        top: 45%;
        left: 2%;
        ` : `
        top: 45%;
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

export default function PhotoGallery({ dataUrl }) {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    document.onkeydown = keyHandler;
    console.log('do');
  });

  useEffect(() => {
    if (data.length < 1) {
      fetch(dataUrl,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(async response => {
          const { data: json } = await response.json();
          setData(json);
          console.log(json[0].img[0])
          setCurrent(0);
        })
        .catch(error => error);
    }
  }, [data]);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setSrcUrl(
  //       `${baseUrl}${data[current].img[0]}`
  //     );
  //   }
  // });

  const slideCount = data.length - 1;

  const nextHandler = () => {
    if(current === slideCount) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }

  const prevHandler = () => {
    if (current === 0) {
      setCurrent(slideCount);
    } else {
      setCurrent(current - 1);
    }
  }

  const keyHandler = e => {
    e = e || window.event;
    switch (e.code) {
      case 'ArrowRight':
        nextHandler();
        break;
      case 'ArrowLeft':
        prevHandler();
        break;
      default:
        break;
    }
  }
  
const ThumbnailStrip = function() {
  return (
    <ThumbnailsDiv>
      {data.map((item) => {
        return <Thumbnail
          key={`${baseUrl}${item.thumb[0]}`}
          src={`${baseUrl}${item.thumb[0]}`}
        />;
      })}
    </ThumbnailsDiv>
  );
}


  if (data.length < 1) {
    return <h1>Vacio</h1>
  } else {
    return (
      <Background $src={`${baseUrl}${data[current].img[0]}`}>
        <Blur>
          <Slider>
            {data.map((photo, idx) => {
                  return (
                      <Slide key={photo.img[0]} style={{
                        transform: `translateX(${100 * (idx - current)}%)`
                    }}>
                        <img id={idx} key={idx}
                            src={`${baseUrl}${photo.img[0]}`}
                            alt={photo.alt || `${photo.img[0].split('/')[1]}  by E. Celis`}
                        />
                    </Slide>
                  )
              })}
              <CarouselButton direction="right"
                  onClick={nextHandler}>{'>'}</CarouselButton>
              <CarouselButton direction="left"
                  onClick={prevHandler}>{'<'}</CarouselButton>
          </Slider>
          <ThumbnailStrip />
        </Blur>
      </Background>
    );
  }
}