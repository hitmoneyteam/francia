import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { AutoRow } from '../../components/Row'
import apiResponse from './fakeData.json'
import StakeCard, { StakeCardsProps } from './StakeCard'

const Title = styled(Text)`
  color: #f84445;
  font-size: 32px;
  line-height: 38px;
  font-weight: bold;
  max-width: 665px;
  text-align: center;
  @media (max-width: 479px) {
    font-size: 30px;
  }
`

function Stake() {
  return (
    <>
      <Title style={{ marginBottom: '70px' }}>STAKE SAFEMARS AND WIN PRIZES</Title>
      <AutoRow justify="center" gap="10px">
        {apiResponse.products.map(
          ({
            productId,
            productName,
            imgUri,
            timeleft,
            entries,
            cashPrice,
            duration,
            price,
            currencyFromName,
            currencyFromIconUri,
            currencyFromAmount,
            currencyToName,
            currencyToIconUri,
            currencyToAmount
          }: StakeCardsProps) => {
            return (
              <StakeCard
                key={productId}
                productId={productId}
                productName={productName}
                imgUri={imgUri}
                timeleft={timeleft}
                entries={entries}
                cashPrice={cashPrice}
                duration={duration}
                price={price}
                currencyFromName={currencyFromName}
                currencyFromIconUri={currencyFromIconUri}
                currencyFromAmount={currencyFromAmount}
                currencyToName={currencyToName}
                currencyToIconUri={currencyToIconUri}
                currencyToAmount={currencyToAmount}
              />
            )
          }
        )}
      </AutoRow>
    </>
  )
}

export default Stake
