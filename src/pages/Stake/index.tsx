import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useActiveWeb3React } from '../../hooks'
import styled from 'styled-components'
import { Text } from 'rebass'
import { AutoRow } from '../../components/Row'
import apiResponse from './fakeData.json'
import StakeCard, { StakeCardsProps } from './StakeCard'
// import { LotteryManager} from './hooks'
import { useContract } from '../../hooks/useContract'
import LpLotteryJSON from '../../contracts/LpLottery.json'
import BusdJSON from '../../contracts/Busd.json'
// import SafemarsJSON from '../../contracts/Safemars.json'
// import IPancakePairJSON from '../../contracts/PancakeClass.json'

const address = '0x505C9a4476F28a1Fcb1f3d209DfA50c428ec7eD1'
const busdAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
// const safemarsAddress = '0x3ad9594151886ce8538c1ff615efa2385a8c3a88'
const LpLotteryABI = JSON.parse(JSON.stringify(LpLotteryJSON)).abi
const BusdABI = JSON.parse(JSON.stringify(BusdJSON)).abi
// const SafemarsABI = JSON.parse(JSON.stringify(SafemarsJSON)).abi
// const IPancakePairABI = JSON.parse(JSON.stringify(IPancakePairJSON)).abi

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

function Stake(props: any) {
  const [lotteries, setLotteries] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [originalMinimumInvestBusd, setOriginalMinimumInvestBusd] = useState(0)
  // const [originalMinimumInvestSafemars, setOriginalMinimumInvestSafemars] = useState('')
  const contract = useContract(address, LpLotteryABI)
  const busdContract = useContract(busdAddress, BusdABI)
  // const safemarsContract = useContract(safemarsAddress, SafemarsABI)
  // const pancakeswap = useContract(address, IPancakePairABI)
  const { account } = useActiveWeb3React()

  async function structure() {
    if (!loading) return
    if (!account) {
      setMessage('No wallet connected')
      return
    }

    setMessage('Loading..')

    // console.log(pancakeswap)

    let _lotteries = [] as any
    _lotteries = await Promise.all(
      apiResponse.products.map(async _lottery => {
        const lottery = {
          ..._lottery,
          minimumInvest: '',
          startCountDown: false,
          isWinnerDeclared: false,
          winner: '',
          timeleft: 0
        }
        let _price = await contract?.getCashPrice(lottery.lotteryID)
        let _mininumInvest = await contract?.getMinimumInvest(lottery.lotteryID)
        const _entriesRequired = await contract?.getEntriesRequired(lottery.lotteryID)
        // const safemarsEq = await pancakeswap?.price0CumulativeLast()
        // const busdEq = await pancakeswap?.price1CumulativeLast()
        // console.log(`${safemarsEq}`)
        // console.log(pancakeswap?._addLiquidity(_mininumInvest))
        // console.log(`Lottery ID = ${_lottery.lotteryID} price = ${_price} minimumInvest = ${_mininumInvest}`)
        setOriginalMinimumInvestBusd(_mininumInvest)
        _price = _price / 1e18
        _mininumInvest = _mininumInvest / 1e18
        // setOriginalMinimumInvestSafemars('538380000000000000')

        // const _entries = _price / ((_mininumInvest * 4) / 100)

        // console.log('Entries ' + _entries)
        // console.log('Entries required ' + _entriesRequired)

        if (_entriesRequired == 0) {
          const _lastEntryTime = await contract?.getTimestampForLastEntry(lottery.lotteryID)
          const _duration = moment
            .utc(_lastEntryTime)
            .add(lottery.duration, 'days')
            .local()
          const now = moment()
          if (now.isBefore(_duration)) {
            lottery.timeleft = _duration.diff(now)
            lottery.startCountDown = true
          } else {
            await contract?.declareWinner(lottery.lotteryID)
            const _isWinnerDeclared = await contract?.lotteryWinnerDeclared(lottery.lotteryID)
            if (_isWinnerDeclared) {
              const _winner = await contract?.viewWinner(lottery.lotteryID)
              lottery.winner = _winner
              lottery.isWinnerDeclared = true
            }
          }
        }
        lottery.currencyToAmount = _mininumInvest
        lottery.minimumInvest = _mininumInvest
        lottery.entries = `${_entriesRequired}`
        lottery.cashPrice = `$${_price}`
        // lottery.currencyFromAmount = safemarsEq
        // lottery.currencyToAmount = busdEq
        return lottery
      })
    )

    setLotteries(_lotteries)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await structure()
    })()
  })

  return (
    <>
      <Title style={{ marginBottom: '70px' }}>STAKING DAPP IS CURRENTLY NOT OPENED</Title>
      <AutoRow justify="center" gap="10px">
        {loading ? (
          <div>{message}</div>
        ) : (
          lotteries.map(
            ({
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
              winner
            }: StakeCardsProps) => {
              return (
                <StakeCard
                  key={productId}
                  lotteryID={lotteryID}
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
                  minimumInvest={minimumInvest}
                  startCountDown={startCountDown}
                  isWinnerDeclared={isWinnerDeclared}
                  winner={winner}
                  stakeBusd={async () => {
                    await busdContract?.approve(address, originalMinimumInvestBusd)
                    await contract?.participateInBusd(lotteryID, originalMinimumInvestBusd)
                    await structure()
                  }}
                  // stakeSafemars={async () => {
                  //   await safemarsContract?.setSwapAndLiquifyEnabled(false)
                  //   await safemarsContract?.approve(address, originalMinimumInvestSafemars)
                  //   await contract?.participateInSafemars(lotteryID, originalMinimumInvestSafemars)
                  // }}
                  unstakeClick={async () => console.log(await contract?.exit(lotteryID))}
                />
              )
            }
          )
        )}
      </AutoRow>
    </>
  )
}

export default Stake
