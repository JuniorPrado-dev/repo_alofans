// src/components/RotateBanner/index.tsx

import { useEffect, useState } from "react";
import * as S from "./style";
import ICONS from "@/assets/icons";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme

interface Props {
  withArrow?: boolean;
  images: string[];
}

export default function RotateBanner({ images, withArrow = false }: Props) {
  const [opacity, setOpacity] = useState(1);
  const [posi, setPosi] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const { theme } = useTheme(); // Acesse o tema atual

  const pisca = () => {
    setOpacity(0);
    setTimeout(() => {
      setOpacity(1);
    }, 1000);
  };

  // Animação automática
  useEffect(() => {
    const interval = setInterval(() => {
      const newposi = posi - 100;
      if (posi > (images.length - 1) * -100) {
        setPosi(newposi);
      } else {
        pisca();
        setPosi(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [posi, images.length]);

  // Navegação manual com setas
  const toLeft = () => {
    if (posi === (images.length - 1) * -100) {
      setPosi(0);
    } else {
      setPosi(posi - 100);
    }
  };

  const toRight = () => {
    if (posi === 0) {
      setPosi((images.length - 1) * -100);
    } else {
      setPosi(posi + 100);
    }
  };

  // Funcionalidade de touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Arrastou para a esquerda
      toLeft();
    } else if (touchEndX - touchStartX > 50) {
      // Arrastou para a direita
      toRight();
    }
  };

  return (
    <>
      {withArrow && (
        <S.ContSeta>
          <S.ImageSeta
            src={ICONS.arrowLB}
            $top={25}
            $left={2.5}
            $right={0}
            onClick={toRight}
            theme={theme} // Passe o tema como prop
          />
          <S.ImageSeta
            src={ICONS.arrowRB}
            $top={20}
            $left={0}
            $right={2.5}
            onClick={toLeft}
            theme={theme} // Passe o tema como prop
          />
        </S.ContSeta>
      )}
      <S.Container $op={opacity} theme={theme}> {/* Passe o tema como prop */}
        <S.ContainerBanner
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <S.InternalContainerBanner $p={posi}>
            {images.length > 0 &&
              images.map((image, index) => (
                <S.ImageB src={image} key={index} />
              ))}
          </S.InternalContainerBanner>
        </S.ContainerBanner>
      </S.Container>
    </>
  );
}