export interface percentProps {
  receivedPercent: number;
  setReceivedPercent: () => void;
}

export interface getPlaylistAPITypes {
  accessToken: string;
  playlistID: string;
}

export interface createAddItemToPlaylistTypes {
  accessToken: string;
  playlistID: string;
  uris: string[];
}

export interface playContextTypes {
  accessToken: string;
  uri: string;
}

export interface createPlaylistTypes {
  accessToken: string;
  userID: string;
  playlistName: string;
}
