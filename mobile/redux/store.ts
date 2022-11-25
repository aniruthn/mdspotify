import { configureStore } from '@reduxjs/toolkit'
import songQueueReducer from "../redux/songQueue/songQueueSlice"
import userReducer from "../redux/songQueue/userSlice"

export const store = configureStore({
  reducer: {
    songQueue: songQueueReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch