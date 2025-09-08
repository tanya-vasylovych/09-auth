import { Note } from "@/types/note";
import { User } from "@/types/user";
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

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string | null
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const params = {
    params: {
      page,
      search,
      perPage: 9,
      tag,
    },
    headers: { Cookie: cookieStore.toString() },
  };

  const fetchNotesResponse = await nextServer.get<FetchNotesResponse>(
    "/notes",
    params
  );

  return fetchNotesResponse.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
