import { useState, useEffect } from 'react';
import { Background, Blur } from './ImageBackground';
import ThumbnailStrip from './ThumbnailStrip';
import { Slider, Slide, CarouselButton } from './Carousel';

const baseUrl = 'https://ecelis.sdf.org/photography/';


export default function PhotoGallery({ dataUrl }) {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [thumbStrip, setThumbStrip] = useState([]);

  useEffect(() => {
    document.onkeydown = keyHandler;
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
          setCurrent(0);
          stripHandler(json, current);
        })
        .catch(error => console.log(error));
    }
  }, [data]);

  const slideCount = data.length - 1;

  const nextHandler = () => {
    if (current === slideCount) {
      setCurrent(0);
      stripHandler(data, current);
    } else {
      const _current = current + 1;
      setCurrent(_current);
      leftOffset = [...data.slice(_current - 3, _current)];
      rightOffset = [...data.slice(_current, _current + 3)];
      setThumbStrip([...leftOffset, ...rightOffset]);
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
        prevHandler();
        break;
      case 'ArrowLeft':
        nextHandler();
        break;
      default:
        break;
    }
  }

  const stripHandler = (json, _current) => {
    let left = [];
    let right = [];
    if (current === 0) {
      left = [...json.slice(-2,)];
      right = [...json.slice(0, 3)];
      setThumbStrip([...left, ...right]);
    }
    if (current === slideCount) {
      setCurrent(0);
      left = [...json.slice(-3,)];
      right = [...json.slice(0, 1)];
      setThumbStrip([...leftOffset, ...rightOffset]);
    } 
  }


  if (thumbStrip.length < 1) {
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
          </Slider>
          <ThumbnailStrip thumbStrip={thumbStrip} />
          <CarouselButton direction="right"
            onClick={prevHandler}>{'>'}</CarouselButton>
          <CarouselButton direction="left"
            onClick={nextHandler}>{'<'}</CarouselButton>
        </Blur>
      </Background>
    );
  }
}