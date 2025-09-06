import { Note } from "@/types/note";
import { User } from "@/types/users";
import { cookies } from "next/headers";
import { nextServer } from "./api";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const responce = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return responce;
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

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
