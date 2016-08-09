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
  it('should handle OPEN_REQUEST action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'OPEN_REQUEST',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN_REQUEST',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN',
    }, {
      type: 'OPEN_REQUEST',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN',
    });
  });
  it('should handle OPEN_REQUEST_COMPLETE action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN_REQUEST',
    }, {
      type: 'OPEN_REQUEST_COMPLETE',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPENING',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'OPEN_REQUEST_COMPLETE',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
  it('should handle CLOSE_REQUEST action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN',
    }, {
      type: 'CLOSE_REQUEST',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSE_REQUEST',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'CLOSE_REQUEST',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPENING',
    }, {
      type: 'CLOSE_REQUEST',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPENING',
    });
  });
  it('should handle CLOSE_REQUEST_COMPLETE action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSE_REQUEST',
    }, {
      type: 'CLOSE_REQUEST_COMPLETE',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSING',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN',
    }, {
      type: 'CLOSE_REQUEST_COMPLETE',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN',
    });
  });
  it('should handle MOVEMENT_REQUEST action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'UNKNOWN',
    }, {
      type: 'MOVEMENT_REQUEST',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'MOVEMENT_REQUEST',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN',
    }, {
      type: 'MOVEMENT_REQUEST',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN',
    });
  });
  it('should handle MOVEMENT_REQUEST_COMPLETE action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'MOVEMENT_REQUEST',
    }, {
      type: 'MOVEMENT_REQUEST_COMPLETE',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'MOVING',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'UNKNOWN',
    }, {
      type: 'MOVEMENT_REQUEST_COMPLETE',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'UNKNOWN',
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
      door: 'CLOSED',
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
