import Web3 from 'web3'

import LpLotteryJSON from '../../contracts/LpLottery.json'
import LotteryJSON from '../../contracts/Lottery.json'

// const address = '0xa06751dE200212dC95eb361Ecd7fD44F166406B2'
const LpLotteryABI = JSON.parse(JSON.stringify(LpLotteryJSON)).abi
const LotteryABI = JSON.parse(JSON.stringify(LotteryJSON)).abi

class Lottery {
  id: number
  address: string
  manager: any
  contract: any
  constructor(config: any) {
    this.id = config.id
    this.address = config.address
    this.manager = config.manager || null
    const web3 = new Web3(config.network)
    this.contract = new web3.eth.Contract(LotteryABI, this.address)
  }

  getID(): any {
    return this.id
  }

  getAddress(): any {
    return this.address
  }

  async getEntriesRequired(): Promise<any> {
    try {
      const data = await this.manager.methods.getEntriesRequired(this.id).call()
      return data
    } catch (e) {
      throw 'Error getting entries required: ' + e
    }
  }

  async getCashPrice(): Promise<any> {
    try {
      const data = await this.contract.methods.getPrizeValue().call()
      return data
    } catch (e) {
      throw 'Error getting prize value: ' + e
    }
  }

  async getMinimumInvest(): Promise<any> {
    try {
      const data = await this.contract.methods.getMinimumAmountInBusd().call()
      return data
    } catch (e) {
      throw 'Error getting minimum investment: ' + e
    }
  }

  async declareWinner(): Promise<any> {
    try {
      await this.manager.methods.declareWinner(this.id).call()
    } catch (e) {
      throw 'Error declaring winner: ' + e
    }
  }

  async viewWinner(): Promise<any> {
    try {
      await this.manager.methods.viewWinner(this.id).call()
    } catch (e) {
      throw 'Error viewing winner: ' + e
    }
  }

  async stakeInSafemars(amount: number): Promise<any> {
    try {
      await this.manager.methods.participateInSafemars(this.id, amount).call()
    } catch (e) {
      throw 'Error staking in Safemars: ' + e
    }
  }

  async stakeInBUSD(amount: number): Promise<any> {
    try {
      await this.manager.methods.participateInBusd(this.id, amount).call()
    } catch (e) {
      throw 'Error staking in Busd: ' + e
    }
  }

  async unstake(): Promise<any> {
    try {
      await this.manager.methods.exit(this.id).call()
    } catch (e) {
      throw 'Error unstaking: ' + e
    }
  }
}

export class LotteryManager {
  network: string
  contract: any
  constructor(config: any) {
    this.network = config.network
    const web3 = new Web3(this.network)
    this.contract = new web3.eth.Contract(LpLotteryABI, config.address)
  }

  async getLotteryById(id: number) {
    try {
      const address = await this.contract.methods.lotteryStructs(id).call()
      const lottery = new Lottery({
        id: id,
        address: address,
        manager: this.contract,
        network: this.network
      })
      return lottery
    } catch (e) {
      return null
    }
  }
}
