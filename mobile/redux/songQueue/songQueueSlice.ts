import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface songQueueState {
  activeSongState: "playing" | "paused",
  queue: any[]
}

const initialState: songQueueState = {
  activeSongState: "paused",
  queue: []
}

export const songQueueSlice = createSlice({
  name: 'songQueue',
  initialState,
  reducers: {
    playActiveSong: (state) => {
        state.activeSongState = "playing"
    },
    pauseActiveSong: (state) => {
        state.activeSongState = "paused"
    },
    togglePlayPauseActiveSong: (state) => {
      state.activeSongState = state.activeSongState === "paused" ? "playing" : "paused"
    },
    addToQueue: (state, action: PayloadAction<any>) => {
        state.queue.push(action.payload)
    },
    removeFirstFromQueue: (state) => {
      state.queue.shift()
    }
  },
})

// Action creators are generated for each case reducer function
export const { playActiveSong, pauseActiveSong, togglePlayPauseActiveSong, addToQueue, removeFirstFromQueue } = songQueueSlice.actions

export default songQueueSlice.reducer