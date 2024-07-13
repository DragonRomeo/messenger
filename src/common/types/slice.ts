import { store } from '../../store';

export type IRootState = ReturnType<typeof store.getState>;

export interface IAuth {
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface IUser {
  user: {
    displayName?: string;
    photoURL?: string;
    uid?: string;
  };
}

export interface IEdit {
  isEdit: boolean;
  editedText: string;
}

export interface iFilters {
  startDate: string | null;
  endDate: string | null;
  userFilterName: string | null;
}
