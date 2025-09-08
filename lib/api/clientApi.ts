import { Credentials, User } from "@/types/user";
import { nextServer } from "./api";
import { CreateNote, Note } from "@/types/note";

export const register = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>("/auth/register", credentials);
  return data;
};
export const login = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>("/auth/login", credentials);

  return data;
};

export const logout = async () => {
  await nextServer.post<User>("/auth/logout");
};
interface SessionStatus {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionStatus>("/auth/session");
  return data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
export const updateUsername = async (username: string) => {
  const { data } = await nextServer.patch<User>("/users/me", { username });
  return data;
};
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag: string
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { page, search, perPage: 12, ...(tag && { tag }) },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(newNote: CreateNote): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}
