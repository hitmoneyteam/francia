import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../hooks'
import styled from 'styled-components'
import { Text } from 'rebass'
import { AutoRow } from '../../components/Row'
import apiResponse from './fakeData.json'
import StakeCard, { StakeCardsProps } from './StakeCard'
// import { LotteryManager} from './hooks'
import { useContract } from '../../hooks/useContract'
import LpLotteryJSON from '../../contracts/LpLottery.json'
import moment from 'moment'
// import IPancakePairJSON from '../../contracts/IPancakePair.json'

const address = '0xF67573c28cbbc24Ea4B3E6Ccf37F9c2ff0f4602a'
const LpLotteryABI = JSON.parse(JSON.stringify(LpLotteryJSON)).abi
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
  const contract = useContract(address, LpLotteryABI)
  // const pancakeswap = useContract(address, IPancakePairABI)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    ;(async () => {
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
          _price = _price / 1e18
          _mininumInvest = _mininumInvest / 1e18
          const _entries = _price / ((_mininumInvest * 4) / 100)

          if (_entriesRequired === 0) {
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

          lottery.minimumInvest = _mininumInvest
          lottery.entries = `${_entries}`
          lottery.cashPrice = `$${_price}`
          // lottery.currencyFromAmount = safemarsEq
          // lottery.currencyToAmount = busdEq
          return lottery
        })
      )

      setLotteries(_lotteries)
      setLoading(false)
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
                  stakeClick={async () => console.log(await contract?.participateInSafemars(lotteryID, minimumInvest))}
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
