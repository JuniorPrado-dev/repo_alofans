import styled from 'styled-components';
import { device } from '@/utils/sizeDevices';

interface ContainerProps{
    $op: number;
}
export const Container = styled.div<ContainerProps>`
    position: static;
    z-index: 1;
    opacity:${props => props.$op} ;
    width: 100%;
    height: fit-content;
    transition-duration:0.5s;
    display:flex ;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media ${device.mobile} {
        margin-top: 0;
    }
` 
export const ContainerBanner = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative ;
`;

interface ContainerBannerInsideProps {
    p:number
}
export const ContainerBannerInside = styled.div<ContainerBannerInsideProps>`
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0 auto;
    transition-duration: 2s;
    position: relative;
    left:${props => props.p}vw;

`;

export const ImageB = styled.img`
    width: 100vw;
    transition-duration: 0.4s;
`;

export const ArrowCont = styled.div`
    position: absolute;
    z-index: 2;
    display: flex;
    height:33vw;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`
interface ArrowImageProps {
    left: number;
    right: number;
}
export const ArrowImage = styled.img<ArrowImageProps>`
    height: 4vw;
    margin-left: ${props=>props.left}vw; 
    margin-right: ${props=>props.right}vw; 
    &:hover{
        height: 4.5vw;
        cursor: pointer;
    }
    &:active{
        height: 3.8vw;
    }
`;