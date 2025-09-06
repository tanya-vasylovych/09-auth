// interface Note {}
export interface Note {
  createdAt: string;
  content: string;
  title: string;
  updatedAt: string;
  id: string;
  tag: string;
}
export interface CreateNote {
  title: string;
  content: string;
  tag: string;
}
