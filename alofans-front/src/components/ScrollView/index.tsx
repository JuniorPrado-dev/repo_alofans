"use client";

import * as S from "./styles";

interface Props {
    children: React.ReactNode;
    showScrollbar?: boolean;
}

const ScrollView = ({ children, showScrollbar = true }: Props) => {
    return (
        <S.Container $showScrollbar={showScrollbar}>
            <S.Content>
                {children}
            </S.Content>
        </S.Container>
    );
};

export default ScrollView;