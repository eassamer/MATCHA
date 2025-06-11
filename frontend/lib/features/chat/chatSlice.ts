import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface chatInfoType {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  sender: string;
  time: string;
  read: boolean;
  createdAt: string;
}

export interface ChatState {
  messages: chatInfoType[];
}

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<chatInfoType>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<chatInfoType[]>) => {
      state.messages = action.payload;
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});
