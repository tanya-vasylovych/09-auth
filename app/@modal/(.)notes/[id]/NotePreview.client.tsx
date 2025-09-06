"use client";

import css from "./NotePreview.module.css";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const NotePreview = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal closeModal={handleClose}>
      {note && (
        <div className={css.container}>
          <h2 className={css.header}>{note.title}</h2>{" "}
          <p className={css.content}>{note.content}</p>
          <div className={css.date}>
            {note.createdAt}
            <span className={css.tag}>{note.tag}</span>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && !note && <p>Something went wrong.</p>}
    </Modal>
  );
};

export default NotePreview;
