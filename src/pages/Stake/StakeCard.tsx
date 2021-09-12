import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { StakeCard } from 'components/Card'
// import Iphone from 'assets/images/iphone.png'
import { AutoRow } from 'components/Row'
import { TimeLeftTile, SmallTileContent, BigTileContent } from './Tile'
// import { AutoColumn } from 'components/Column'
import { Base } from 'components/Button'
import StakeModal, { StakeModalState } from './StakeModal'
import apiResponse from './fakeData.json'

export interface StakeCardsProps {
  lotteryID: number
  productId: string
  productName: string
  imgUri: string
  timeleft: number
  entries: string
  cashPrice: string
  duration: string
  price: string
  currencyFromName: string
  currencyFromIconUri: string
  currencyFromAmount: string
  currencyToName: string
  currencyToIconUri: string
  currencyToAmount: string
  minimumInvest: number
  startCountDown: boolean
  isWinnerDeclared: boolean
  winner?: string
  stakeClick?: any
  unstakeClick?: any
}

const CardTitle = styled(Text)`
  color: #a77439;
  font-weight: 500;
  font-size: 25px;
  letter-spacing: 1px;
  text-align: center;
  margin: 0px;
  @media (max-width: 479px) {
    font-size: 22px;
  }
`

const CardDescription = styled(Text)`
  color: #c4c4c4;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: 0.68px;
  text-align: center;
  @media (max-width: 479px) {
    font-size: 15px;
  }
`

const PriceTag = styled(Text)`
  color: #e8e8e8;
  margin: 10px;
  font-size: 12px;
  @media (max-width: 479px) {
    font-size: 10px;
  }
`
const TilesWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
`

const ProductImgWrapper = styled.div`
  text-align: center;
  height: 200px;
`
const ProductImg = styled.img`
  margin: 10px 0px;
  max-width: 245px;
  height: 180px;
`

const StakeCards: React.FC<StakeCardsProps> = ({
  lotteryID,
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
  currencyToAmount,
  minimumInvest,
  startCountDown,
  isWinnerDeclared,
  winner,
  stakeClick,
  unstakeClick
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [confirmationData, setConfirmationData] = useState<StakeModalState>()

  const handleStakeNow = (itemId: string) => {
    apiResponse.products.forEach(product => {
      if (product.productId === itemId) {
        setConfirmationData(product)
        setShowConfirmation(true)
      }
    })
  }

  return (
    <>
      <StakeCard>
        <CardTitle style={{ margin: '5px' }}>{productName}</CardTitle>
        <CardDescription>or CASH PRICE</CardDescription>
        <ProductImgWrapper>
          <ProductImg src={require(`assets/images/${imgUri}`)} alt={productName} />
        </ProductImgWrapper>
        <TilesWrapper>
          <TimeLeftTile timeLeft={timeleft} startCountDown={startCountDown} />
          <SmallTileContent height={64} title="ENTRIES" content={entries} />
          <SmallTileContent height={64} title="CASH PRICE" content={cashPrice} />
          <SmallTileContent height={64} title="DURATION" content={`${duration} Days`} />
        </TilesWrapper>
        <BigTileContent
          height={80}
          currencyFromName={currencyFromName}
          currencyFromIconUri={currencyFromIconUri}
          currencyToName={currencyToName}
          currencyToIconUri={currencyToIconUri}
          currencyFromAmount={currencyFromAmount}
          currencyToAmount={currencyToAmount}
        />
        <AutoRow justify="space-around" style={{ marginTop: '10px', marginBottom: '20px' }}>
          <PriceTag>Price</PriceTag>
          <PriceTag>{price}</PriceTag>
        </AutoRow>
        {isWinnerDeclared ? <span>Winner: {winner}</span> : ''}

        {!isWinnerDeclared ? (
          <Base borderRadius="15px" backgroundColor="#E2544C" onClick={() => handleStakeNow(productId)}>
            STAKE NOW
          </Base>
        ) : (
          <Base
            borderRadius="15px"
            backgroundColor="#E2544C"
            onClick={async () => {
              try {
                await unstakeClick()
                alert('Unstacked Successfully')
              } catch (e) {
                console.log(e)
              }
            }}
          >
            UNSTAKE
          </Base>
        )}
      </StakeCard>

      {confirmationData && (
        <StakeModal
          isOpen={showConfirmation}
          onDismiss={() => setShowConfirmation(false)}
          productName={confirmationData.productName}
          productDescription={confirmationData.productDescription}
          imgUri={confirmationData.imgUri}
          cashPrice={confirmationData.cashPrice}
          duration={confirmationData.duration}
          price={confirmationData.price}
          currencyFromName={confirmationData.currencyFromName}
          currencyFromIconUri={confirmationData.currencyFromIconUri}
          currencyFromAmount={confirmationData.currencyFromAmount}
          currencyToName={confirmationData.currencyToName}
          currencyToIconUri={confirmationData.currencyToIconUri}
          currencyToAmount={confirmationData.currencyToAmount}
          minimumReceived={confirmationData.minimumReceived}
          priceImpact={confirmationData.priceImpact}
          liquidityProviderFee={confirmationData.liquidityProviderFee}
          onConfirmStake={async () => {
            try {
              await stakeClick()
              alert('Stacked Successfully')
            } catch (e) {
              console.log(e)
            }
          }}
        />
      )}
    </>
  )
}

export default StakeCards
