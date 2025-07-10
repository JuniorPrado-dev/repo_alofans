import { useEffect, useState } from "react";
import * as S from "./style";

interface Props {
  images: string[];
}
export default function BannerBottom({ images }: Props) {
  const [position, setPosition] = useState(0);
  /// teaste
  const pisca = () => {
    setOpacity(0);
    setTimeout(() => {
      setOpacity(1);
    }, 1000);
  };
  // animação
  useEffect(() => {
    const interval = setInterval(() => {
      const newposi = position - 100;
      if (position > -300) {
        setPosition(newposi);
      } else {
        pisca();
        setPosition(0);
      }
    }, 7000);
    return () => clearInterval(interval);
  });

  const [opacity, setOpacity] = useState(1);

  return (
    <>
      <S.ArrowCont>
        {/* <S.SImageSeta src={setaL} top={25} left={2.5} right={0} onClick={toRight} />
      <S.SImageSeta src={setaR} top={20} left={0} right={2.5} onClick={toLeft} /> */}
      </S.ArrowCont>
      <S.Container $op={opacity}>
        <S.ContainerBanner>
          <S.ContainerBannerInside p={position}>
            {images.length > 0 &&
              images.map((image, index) => (
                <S.ImageB src={image} key={index} />
              ))}
          </S.ContainerBannerInside>
        </S.ContainerBanner>
      </S.Container>
    </>
  );
}