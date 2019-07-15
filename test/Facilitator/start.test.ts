import * as sinon from 'sinon';

import Facilitator from '../../src/Facilitator';
import SpyAssert from '../test_utils/SpyAssert';
import Subscriber from '../../src/subscriptions/Subscriber';

describe('Facilitator.start()', (): void => {
  it('should start facilitation', async (): Promise<void> => {
    const originSubscriber = sinon.createStubInstance(Subscriber);
    const auxiliarySubscriber = sinon.createStubInstance(Subscriber);

    const facilitator = new Facilitator(
      originSubscriber as any,
      auxiliarySubscriber as any,
    );
    await facilitator.start();
    SpyAssert.assert(originSubscriber.subscribe, 1, [[]]);
    SpyAssert.assert(auxiliarySubscriber.subscribe, 1, [[]]);
  });
});
