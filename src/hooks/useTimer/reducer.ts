import { type TimerActionsType } from './actions';
import { type TimeState } from './type';

function reducer(state: TimeState, action: TimerActionsType): TimeState {
  switch (action.type) {
    case 'advanceTime': {
      const { timeToAdd } = action.payload;

      return {
        ...state,
        time: state.timerType === 'DECREMENTAL' ? state.time - timeToAdd : state.time + timeToAdd,
      };
    }
    case 'pause': {
      return {
        ...state,
        status: 'PAUSED',
      };
    }
    case 'reset': {
      return {
        ...state,
        status: 'STOPPED',
        time: action.payload.initialTime,
      };
    }
    case 'set': {
      return {
        ...state,
        time: action.payload.newTime,
      };
    }
    case 'start': {
      const { initialTime } = action.payload;

      return {
        ...state,
        status: 'RUNNING',
        time: state.status === 'STOPPED' ? initialTime : state.time,
      };
    }
    case 'stop': {
      return {
        ...state,
        status: 'STOPPED',
      };
    }
    default:
      return state;
  }
}

export default reducer;
