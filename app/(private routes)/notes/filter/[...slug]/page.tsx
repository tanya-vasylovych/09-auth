import { fetchNotes } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";
import { Metadata } from "next";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}
export const generateMetadata = async ({
  params,
}: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  return {
    title: slug[0] === "All%20notes" ? "All notes" : `${slug[0]} notes`,
    description:
      slug[0] === "All%20notes" ? "All notes" : `Notes with tag ${slug[0]}`,
    openGraph: {
      title: slug[0] === "All%20notes" ? "All notes" : `${slug[0]} notes`,
      description:
        slug[0] === "All%20notes" ? "All notes" : `Notes with tag ${slug[0]}`,
      url: `https://08.zustand.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: slug[0] === "All%20notes" ? "All notes" : `${slug[0]} notes`,
        },
      ],
    },
  };
};
const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === "All%20notes" ? "" : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
