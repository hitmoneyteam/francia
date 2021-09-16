import React from 'react'
import styled from 'styled-components'
import { AutoRow } from 'components/Row'
// import Busd from 'assets/svg/busd.svg'
import Countdown from 'react-countdown'

interface TileProps {
  height: number
  width?: number
  padding?: string
  margin?: string
}

interface SmallTileContentProps extends TileProps {
  title: string
  content: string
}

interface BigTileContentProps extends TileProps {
  currencyFromName: string
  currencyFromIconUri: string
  currencyFromAmount: string
  currencyToName: string
  currencyToIconUri: string
  currencyToAmount: string
}

interface TimeLeftProps {
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

const Tile: React.FC<TileProps> = ({ height, width, padding, margin, children }) => {
  const Box = styled.div`
    background-color: #11161b;
    border-radius: 20px;
    padding: ${padding ? padding : '10px'};
    margin: ${margin ? margin : '0px'};
    width: ${width ? width : '100%'};
    height: ${height}px;
    @media (max-width: 359px) {
      padding: 15px;
    }
  `
  return <Box>{children}</Box>
}

const TimeLeft: React.FC<TimeLeftProps> = ({ hours, minutes, seconds, completed }) => {
  if (!completed) {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    )
  } else {
    return <span>Times Up!</span>
  }
}

export const TimeLeftTile: React.FC<{ timeLeft: number; startCountDown: boolean }> = ({ timeLeft, startCountDown }) => {
  const Title = styled.p`
    color: #c4c4c4;
    font-size: 12px;
    text-align: left;
    margin: 0;
  `
  const Content = styled.p`
    color: #ffffff;
    font-size: 24px;
    text-align: left;
    margin: 0;
    @media (max-width: 359px) {
      font-size: 22px;
    }
  `
  return (
    <Tile height={64} padding="10px 20px">
      <Title>TIMELEFT</Title>
      <Content>
        {startCountDown ? <Countdown date={Date.now() + timeLeft} renderer={TimeLeft} /> : <span>InActive</span>}
      </Content>
    </Tile>
  )
}

export const SmallTileContent: React.FC<SmallTileContentProps> = ({ height, width, title, content }) => {
  const Title = styled.p`
    color: #c4c4c4;
    font-size: 12px;
    text-align: left;
    margin: 0;
  `
  const Content = styled.p`
    color: #ffffff;
    font-size: 24px;
    text-align: left;
    margin: 0;
    @media (max-width: 359px) {
      font-size: 22px;
    }
  `
  return (
    <Tile height={height} width={width} padding="10px 20px">
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Tile>
  )
}

export const BigTileContent: React.FC<BigTileContentProps> = ({
  height,
  width,
  currencyFromName,
  currencyFromIconUri,
  currencyFromAmount,
  currencyToName,
  currencyToIconUri,
  currencyToAmount
}) => {
  const Title = styled.p`
    display: flex;
    align-item: center;
    color: #ffffff;
    font-size: 12px;
    text-align: left;
    margin: 0;
  `
  const Content = styled.p`
    color: #ffffff;
    font-size: 24px;
    text-align: left;
    margin: 0;
    @media (max-width: 359px) {
      font-size: 22px;
    }
  `
  return (
    <Tile height={height} width={width} padding="15px 20px" margin="15px 0px 0px 0px">
      <AutoRow justify="center">
        {/* <Title>
          <img
            src={require(`assets/images/${currencyFromIconUri}`)}
            alt={currencyFromName}
            width="18px"
            height="18px"
          />
          <span style={{ marginLeft: '7px' }}>{currencyFromName}</span>
        </Title> */}
        <Title>
          <img src={require(`assets/images/${currencyToIconUri}`)} alt={currencyToName} width="18px" height="18px" />
          <span style={{ marginLeft: '7px' }}>{currencyToName}</span>
        </Title>
      </AutoRow>
      <AutoRow justify="center">
        {/* <Content>{currencyFromAmount}</Content>
        <Content> = </Content> */}
        <Content>{currencyToAmount}</Content>
      </AutoRow>
    </Tile>
  )
}
