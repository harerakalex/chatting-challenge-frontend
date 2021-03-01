export interface IUser {
  id: number;
  username: string;
  password?: string;
  token?: string;
}

export interface ILogin {
  message?: string;
  isAuthenticated?: boolean;
  user: IUser;
  token?: string;
}

export interface IMessage {
  id?: number;
  receiverid: number;
  message: string;
  senderid?: number;
  created_at?: string;
  receiverName?: string;
}

export interface IMessageState {
  messages: IMessage[];
}

export interface IChats {
  receiverName?: string;
  messages: IMessage[];
}

export interface ISendMessage {
  newMessage: IMessage;
}
