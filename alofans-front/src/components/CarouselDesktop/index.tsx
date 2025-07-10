// src/components/CarouselDesktop/index.tsx

import { useState, useEffect } from "react";
import * as S from "./style";
import ICONS from "@/assets/icons";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme

interface Props {
  images: string[];
}

export default function CarouselDesktop({ images }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme(); // Acesse o tema atual

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Transição automática a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 2 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [currentSlide]); // Dependência do currentSlide para reiniciar o intervalo

  return (
    <S.Container id="CarouselDesktop.Container">
      <S.CarouselWrapper id="CarouselDesktop.CarouselWrapper">
        <S.ArrowLeft id="CarouselDesktop.ArrowLeft" onClick={prevSlide} theme={theme}>
          <img src={theme === "dark" ? ICONS.arrowLW : ICONS.arrowLB} alt="Previous" />
        </S.ArrowLeft>

        <S.CarouselContent id="CarouselDesktop.CarouselContent">
          {images.map((image, index) => {
            // Calcula a posição relativa do slide
            const position = (index - currentSlide + images.length) % images.length;

            // Define o estilo com base na posição
            let slideStyle = {};
            if (position === 0) {
              // Slide principal (centro)
              slideStyle = {
                transform: "translateX(0%) scale(1)",
                zIndex: 2,
                opacity: 1,
              };
            } else if (position === 1) {
              // Slide à direita (próximo)
              slideStyle = {
                transform: "translateX(40%) scale(0.8)",
                zIndex: 1,
                opacity: 0.7,
              };
            } else if (position === images.length - 1) {
              // Slide à esquerda (anterior)
              slideStyle = {
                transform: "translateX(-40%) scale(0.8)",
                zIndex: 1,
                opacity: 0.7,
              };
            } else {
              // Slides ocultos
              slideStyle = { display: "none" };
            }

            return (
              <S.Slide key={index} style={slideStyle} id={`CarouselDesktop.Slide.${index}`}>
                <img src={image} alt={`Slide ${index}`} />
              </S.Slide>
            );
          })}
        </S.CarouselContent>

        <S.ArrowRight id="CarouselDesktop.ArrowRight" onClick={nextSlide} theme={theme}>
          <img src={theme === "dark" ? ICONS.arrowRW : ICONS.arrowRB} alt="Next" />
        </S.ArrowRight>
      </S.CarouselWrapper>

      <S.DotsContainer id="CarouselDesktop.DotsContainer" theme={theme}>
        {images.map((_, index) => (
          <S.Dot
            key={index}
            id={`CarouselDesktop.Dot.${index}`}
            $active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </S.DotsContainer>
    </S.Container>
  );
}