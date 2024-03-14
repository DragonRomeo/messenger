import { IRootState } from '../../store';

export const chatID = (state: IRootState) => {
  if (!state?.chat?.user?.uid) {
    return null;
  }
  const result =
    state.auth.authData.uid > state.chat.user.uid
      ? state.auth.authData.uid + state.chat.user.uid
      : state.chat.user.uid + state.auth.authData.uid;

  return result;
};

export * as selectors from './selectors'
