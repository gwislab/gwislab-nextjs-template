import { ILanguageState } from "./language/interface";
import { store } from "./store";
import { ISystemState } from "./system/interface";

// Infer the `RootState` and `AppDispatch` types from the store itself
// @ts-expect-error will always work
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export interface IAppState {
  system: ISystemState;
  language: ILanguageState;
}
