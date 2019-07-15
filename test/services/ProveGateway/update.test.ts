import BigNumber from 'bignumber.js';
import * as sinon from 'sinon';
import ProveGatewayService from '../../../src/services/ProveGatewayService';
import StubData from '../../test_utils/StubData';
import SpyAssert from '../../test_utils/SpyAssert';

const Web3 = require('web3');

describe('ProveGatewayService.update()', () => {
  const originWeb3 = new Web3();
  const auxiliaryWeb3 = new Web3();
  const auxiliaryWorkerAddress = '0xF1e701FbE4288a38FfFEa3084C826B810c5d5294';
  const gatewayAddress = '0x0000000000000000000000000000000000000001';
  const auxiliaryChainId = 123;
  let proveGatewayService: ProveGatewayService;

  beforeEach(() => {
    proveGatewayService = new ProveGatewayService(
      sinon.fake() as any,
      sinon.fake() as any,
      originWeb3,
      auxiliaryWeb3,
      auxiliaryWorkerAddress,
      gatewayAddress,
      auxiliaryChainId,
    );
  });

  it('should react to update on auxiliary chain model ', async () => {
    const originBlockHeight = new BigNumber(100);
    const auxiliaryChain = StubData.auxiliaryChainRecord(
      auxiliaryChainId,
      originBlockHeight,
    );

    const reactToStub = sinon.stub(proveGatewayService, 'proveGateway');
    await proveGatewayService.update([auxiliaryChain]);

    SpyAssert.assert(reactToStub, 1, [[originBlockHeight]]);
  });

  it('should only react to interested chainID', async () => {
    const auxiliaryChain = StubData.auxiliaryChainRecord(
      1,
      new BigNumber(100),
    );

    const proveGatewayStub = sinon.stub(proveGatewayService, 'proveGateway');
    await proveGatewayService.update([auxiliaryChain]);

    SpyAssert.assert(proveGatewayStub, 0, [[]]);
  });


  it('should skip for null last origin block height', async () => {
    const auxiliaryChain = StubData.auxiliaryChainRecord(
      auxiliaryChainId,
      undefined,
    );

    const proveGatewayStub = sinon.stub(proveGatewayService, 'proveGateway');
    await proveGatewayService.update([auxiliaryChain]);

    SpyAssert.assert(proveGatewayStub, 0, [[]]);
  });
});