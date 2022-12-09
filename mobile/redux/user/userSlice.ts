import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import UserInfoRow from '../../../shared/models/UserInfoRow'

export interface userState {
  loggedIn: boolean
  userData: UserInfoRow | undefined
}

const initialState: userState = {
  loggedIn: false,
  userData: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state) => {
        state.loggedIn = true
        console.log(state.loggedIn)
    },
    logOut: (state) => {
        state.loggedIn = false
    },
    setUserData: (state, action: PayloadAction<UserInfoRow | undefined>) => {
        state.userData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { logIn, logOut, setUserData } = userSlice.actions

export default userSlice.reducer