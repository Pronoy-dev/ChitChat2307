import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsItem: {},
};

export const FriendSlice = createSlice({
  name: "Friends",
  initialState,
  reducers: {
    FriendsInfo: (state, action) => {
      state.friendsItem = action.payload;
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { FriendsInfo } = FriendSlice.actions;

export default FriendSlice.reducer;
