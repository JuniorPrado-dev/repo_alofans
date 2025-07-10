// src/pages/HomePage/intex.tsx

import EventList from "@/components/EventList";
import image1 from "@/assets/images/slide1.png";
import image2 from "@/assets/images/slide2.png";
import RotateBanner from "@/components/RotateBanner";
import { useEffect, useState } from "react";
import { updateMarketingList } from "@/services/marketing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getImage } from "@/utils/images";
import HeaderStyled from "@/components/HeaderStyled";
import CarouselDesktop from "@/components/CarouselDesktop";
import * as S from "./style";
import Footer from "@/components/Footer";
import TitleEventsHome from "@/components/TitleEventsHome";
import { refreshEventList } from "@/services/events";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import useChargeVerify from "@/hooks/useChargeVerify";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useChargeVerify(dispatch,navigate)
  
  const marketingsList = useAppSelector(
    (selector) => selector.marketingList.value
  );

  const { theme } = useTheme();
  const [marketings, setMarketings] = useState<string[]>([]);

  useEffect(() => {
    if (!marketings || marketings.length == 0) updateMarketingList(dispatch);
  }, []);

  useEffect(() => {
    setMarketings([
      ...marketingsList.map((marketing) => getImage(marketing.image_path)),
      image1,
      image2,
    ]);
  }, [marketingsList]);

  const local = useAppSelector((state) => state.local.value);

  useEffect(() => {
    const fetchEvents = async () => {
      return await refreshEventList(dispatch);
    };
    fetchEvents();
  }, [local]);



  return (
    <div style={{ overflowY: "auto", height: "100vh" }}>
      <HeaderStyled />

      {/* RotateBanner (Mobile) */}
      <S.MobileBanner theme={theme}>
        <RotateBanner images={marketings} />
        <TitleEventsHome />
        <EventList />
        <S.BottonSeparator theme={theme}/>
      </S.MobileBanner>

      {/* CarouselDesktop (Desktop) */}
      <S.DesktopBanner theme={theme}>
        <TitleEventsHome />
        <EventList />
        <CarouselDesktop images={marketings} />
        <S.BottonSeparator theme={theme} />
        <Footer />
      </S.DesktopBanner>
    </div>
  );
};

export default HomePage;
