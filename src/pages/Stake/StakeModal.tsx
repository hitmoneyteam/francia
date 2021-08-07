import React from 'react'
import { X, ArrowDown } from 'react-feather'
import styled from 'styled-components'
import { Text } from 'rebass'
import Modal from 'components/Modal'
import { AutoRow } from 'components/Row'
import { Base } from 'components/Button'
// import Busd from 'assets/svg/busd.svg'
// import Iphone from 'assets/images/iphone.png'

export interface StakeModalState {
  productName: string
  productDescription: string
  imgUri: string
  cashPrice: string
  duration: string
  currencyFromName: string
  currencyFromIconUri: string
  currencyFromAmount: string
  currencyToName: string
  currencyToIconUri: string
  currencyToAmount: string
  price: string
  minimumReceived: string
  priceImpact: string
  liquidityProviderFee: string
}

interface StakeModalProps extends StakeModalState {
  isOpen: boolean
  onDismiss: () => void
  onConfirmStake: () => void
}

const ModalContentWrapper = styled.div`
  width: 100%;
  border-radius: 30px;
  padding: 20px;
  background-color: '#20262E';
`
const ProductImg = styled.img`
  max-width: 125px;
  height: 155px;
`

const ProductBox = styled.div`
  width: 100%;
  height: 215px;
  background-image: linear-gradient(90deg, #20262e 0%, #623b20 69.28%, #20262e 100%);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
`
const HighlightWrapper = styled.div`
  height: 155px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`
const ImageWrapper = styled.div`
  justify-self: end;
  align-self: end;
  height: 155px;
`
const DescriptionWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
`

const AutoRowMargin = styled(AutoRow)`
  margin-top: 10px;
`

const ConfirmStakeText = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  @media (max-width: 479px) {
    font-size: 18px;
  }
`

const CoinText = styled(Text)`
  color: #ffffff;
  font-size: 22px;
  display: flex;
  align-items: center;
  @media (max-width: 479px) {
    font-size: 18px;
  }
`

const CoinTextBold = styled(CoinText)`
  font-weight: 500;
`

const ProductTitle = styled(Text)`
  color: #a77439;
  font-size: 20px;
  letter-spacing: 0.8px;
  font-weight: 500;
  @media (max-width: 479px) {
    font-size: 16px;
  }
`

const ProductSubtitle = styled(Text)`
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.6px;
  @media (max-width: 479px) {
    font-size: 12px;
  }
`

const ProductDescription = styled(Text)`
  color: #bcbcbc;
  font-size: 12px;
  line-height: 15px;
`

const DayNumber = styled.span`
  color: #ffffff;
  font-size: 65px;
  font-weight: bold;
  @media (max-width: 479px) {
    font-size: 60px;
  }
`

const DayText = styled.span`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 479px) {
    font-size: 18px;
  }
`

const ProductInfo = styled(Text)`
  color: #bcbcbc;
  font-size: 14px;
  @media (max-width: 479px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    font-size: 11px;
  }
`
const ProductInfoBold = styled(ProductInfo)`
  color: #ffffff;
  font-weight: bold;
`

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  onDismiss,
  productName,
  productDescription,
  imgUri,
  cashPrice,
  duration,
  currencyFromName,
  currencyFromIconUri,
  currencyFromAmount,
  currencyToName,
  currencyToIconUri,
  currencyToAmount,
  price,
  minimumReceived,
  priceImpact,
  liquidityProviderFee,
  onConfirmStake
}) => {
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={100}>
      <ModalContentWrapper>
        <AutoRow justify="space-between">
          <ConfirmStakeText>Confirm Stake</ConfirmStakeText>
          <ConfirmStakeText>
            <StyledCloseIcon onClick={onDismiss} />
          </ConfirmStakeText>
        </AutoRow>
        <AutoRow justify="space-between" style={{ marginTop: '20px', marginBottom: '10px' }}>
          <CoinText>
            <img src={require(`assets/images/${currencyFromIconUri}`)} alt="Safemars" width="24px" height="24px" />
            <span style={{ marginLeft: '7px' }}>{currencyFromAmount}</span>
          </CoinText>
          <CoinTextBold>{currencyFromName}</CoinTextBold>
        </AutoRow>
        <ArrowDown size="18px" color="#DBDBDB" />
        <AutoRow justify="space-between" style={{ marginTop: '5px', marginBottom: '20px' }}>
          <CoinText>
            <img src={require(`assets/images/${currencyToIconUri}`)} alt="BUSD" width="24px" height="24px" />
            <span style={{ marginLeft: '7px' }}>{currencyToAmount}</span>
          </CoinText>
          <CoinTextBold>{currencyToName}</CoinTextBold>
        </AutoRow>
        <ProductBox>
          <HighlightWrapper>
            <div style={{ alignSelf: 'center' }}>
              <ProductTitle>{productName}</ProductTitle>
              <ProductSubtitle>{`or CASH PRICE ($${cashPrice})`}</ProductSubtitle>
            </div>
            <div style={{ alignSelf: 'end' }}>
              <DayNumber>{duration}</DayNumber> <DayText>DAYS</DayText>
            </div>
          </HighlightWrapper>
          <ImageWrapper>
            <ProductImg src={require(`assets/images/${imgUri}`)} alt={productName} />
          </ImageWrapper>
          <DescriptionWrapper>
            <ProductDescription>{productDescription}</ProductDescription>
          </DescriptionWrapper>
        </ProductBox>

        <div style={{ margin: '15px 0px' }}>
          <AutoRowMargin justify="space-between">
            <ProductInfo>Price</ProductInfo>
            <ProductInfoBold>{price}</ProductInfoBold>
          </AutoRowMargin>
          <AutoRowMargin justify="space-between">
            <ProductInfo>Minimum received</ProductInfo>
            <ProductInfoBold>{minimumReceived}</ProductInfoBold>
          </AutoRowMargin>
          <AutoRowMargin justify="space-between">
            <ProductInfo>Price Impact</ProductInfo>
            <ProductInfoBold> {priceImpact}</ProductInfoBold>
          </AutoRowMargin>
          <AutoRowMargin justify="space-between">
            <ProductInfo>Liquidity Provider Fee</ProductInfo>
            <ProductInfoBold>{liquidityProviderFee}</ProductInfoBold>
          </AutoRowMargin>
        </div>
        <Base borderRadius="15px" backgroundColor="#E2544C" onClick={onConfirmStake}>
          CONFIRM STAKE
        </Base>
      </ModalContentWrapper>
    </Modal>
  )
}

export default StakeModal
