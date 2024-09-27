import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from "ton-core";
// 这个类的 更好的测试流程
// 传递合约的未来地址和初始状态
export class MainContract implements Contract {
  // 构造函数
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromConfig(config: any, code: Cell, workChain = 0) {
    const data = beginCell().endCell();
    const init = { code, data };
    const address = contractAddress(workChain, init);
    return new MainContract(address, init);
  }
  async sendInternalMessage(
    provider: ContractProvider,
    sender: Sender,
    value: bigint
  ) {
    await provider.internal(sender, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }
}
