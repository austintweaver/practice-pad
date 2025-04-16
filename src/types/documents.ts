
export interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploaded: string;
  fileType: string;
  clientId: number;
  folderId?: number;
}

export interface Folder {
  id: number;
  name: string;
  clientId: number;
  parentId?: number;
}

export interface Client {
  id: number;
  name: string;
  folders: Folder[];
  documents: Document[];
}
