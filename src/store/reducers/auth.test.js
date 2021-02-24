import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
  it('should return the intial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('should store token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          tokenId: 'some-token',
          userId: 'some id',
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some id',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
