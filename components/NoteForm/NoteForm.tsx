"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api/clientApi";
import type { CreateNote, Note } from "../../types/note";

import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<Note, Error, CreateNote>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
      clearDraft();
    },
  });
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateNote;
    mutation.mutate(values);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.formGroup} htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={draft.title}
        />{" "}
      </label>

      <label className={css.formGroup} htmlFor="content">
        Content
        <textarea
          onChange={handleChange}
          value={draft.content}
          name="content"
          className={css.textarea}
        />
      </label>

      <label className={css.formGroup} htmlFor="tag">
        Tag
        <select
          onChange={handleChange}
          value={draft.tag}
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <button
        onClick={() => router.back()}
        type="button"
        className={css.cancelButton}
      >
        Cancel
      </button>
      <button type="submit" className={css.submitButton}>
        Create note
      </button>
    </form>
  );
};

export default NoteForm;
