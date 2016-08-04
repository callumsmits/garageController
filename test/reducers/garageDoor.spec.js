import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

describe('garage door reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
  it('should handle OPEN_DOOR action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'OPEN_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPENING',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN',
    }, {
      type: 'OPEN_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSING',
    }, {
      type: 'OPEN_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPENING',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'UNKNOWN',
    }, {
      type: 'OPEN_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'MOVING',
    });
  });
  it('should handle CLOSE_DOOR action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN',
    }, {
      type: 'CLOSE_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSING',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'CLOSE_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPENING',
    }, {
      type: 'CLOSE_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSING',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'UNKNOWN',
    }, {
      type: 'CLOSE_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'MOVING',
    });
  });
  it('should handle MOVEMENT_TIMEOUT action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPENING',
    }, {
      type: 'MOVEMENT_TIMEOUT',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'MOVEMENT_TIMEOUT',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSING',
    }, {
      type: 'MOVEMENT_TIMEOUT',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'MOVING',
    }, {
      type: 'MOVEMENT_TIMEOUT',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'UNKNOWN',
    });
  });
  it('should convert state to CLOSED with DISTANCE action below threshold', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSING',
    }, {
      type: 'DISTANCE',
      payload: 10,
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
});
