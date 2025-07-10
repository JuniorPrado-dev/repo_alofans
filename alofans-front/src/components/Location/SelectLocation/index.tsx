//src/components/Location/SelectLocation/index.tsx

import ICONS from "@/assets/icons";
import * as S from "./style";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getLocations } from "@/utils/event";
import { refreshEventList } from "@/services/events";
import { setLocate } from "@/redux/slices/locateSlice";
import SearchComponent from "@/components/SearchComponent";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
interface TypeLocation {
  city: string;
  state: string;
}

interface Props {
  setModalVisible: (visible: boolean) => void;
}

export default function SelectLocation({ setModalVisible }: Props) {
  const dispatch = useAppDispatch();
  const eventList = useAppSelector((state) => state.eventList.value);
  const [locations, setLocations] = useState<TypeLocation[]>([]);
  const [locationsTemp, setLocationsTemp] = useState<TypeLocation[]>([]);
  const { theme } = useTheme(); // Acesse o tema atual

  useEffect(() => {
    if (eventList.length > 0) {
      const list = getLocations(eventList);
      setLocations(list);
      setLocationsTemp(list);
    } else {
      (async()=>await refreshEventList(dispatch))();
    }
  }, [eventList]);

  const handleSelect = (item: TypeLocation) => {
    dispatch(setLocate(item));
    setModalVisible(false);
  };

  return (
    <S.Container id="SelectLocation.Container" theme={theme}> 
      <SearchComponent data={locationsTemp} setFilter={setLocations} />
      <S.ItemContainer id="SelectLocation.ItemContainer" theme={theme}> 
        {locations &&
          locations.map((item, index) => (
            <S.Item id="SelectLocation.Item" key={index} onClick={() => handleSelect(item)} theme={theme}> {/* Passe o tema como prop */}
              <S.ItemIcon
                id="SelectLocation.ItemIcon"
                src={theme === 'dark' ? ICONS.locationWhite : ICONS.locationBlack} // Ícone dinâmico
                theme={theme} // Passe o tema como prop
              />
              <S.ItemInfo id="SelectLocation.ItemInfo" theme={theme}>{`${item.city} - ${item.state}`}</S.ItemInfo> {/* Passe o tema como prop */}
            </S.Item>
          ))}
      </S.ItemContainer>
    </S.Container>
  );
}