import * as assert from 'assert';
import multiply from './multiply';
import delay, {delayCb} from './delay';

describe('multiply', () => {

  it('should multiply numbers', () => {
    const res = multiply(2, 3);

    assert.strictEqual(res, 6);
  });

});

describe('delay', () => {

  it('should execute a function, after some time', async () => {
    const startTime = Date.now();

    const res = await delay(() => 'foo', 1000);

    const duration = Date.now() - startTime;

    assert.strictEqual(res, 'foo', 'should return the fn result');
    assert(Math.abs(1000 - duration) < 20, 'completed in 100ms (+/-20ms)')
  });

  it('should be really ugly, for a callback-style fn', (done) => {
    delayCb(() => 'foo', 1000, (err, res) => {
      if (err) { return done(err); }

      // what happens if you forget try/catch?!
      try {
        assert.strictEqual(res, 'foo');
        // or if you forget done!
        done();
      }
      catch (err) {
        return done(err);
      }
    });
  });



});