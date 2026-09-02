import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  search: "",
  anecdotes: [],
  notification: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set({ anecdotes });
    },
    handleFilterChange: (event) =>
      set(() => ({
        search: event.target.value,
      })),
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      await anecdoteService.update(updatedAnecdote);
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote,
        ),
        notification: `you voted '${anecdote.content}'`,
      }));
      setTimeout(() => {
        set(() => ({ notification: "" }));
      }, 5000);
    },
    addAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
        notification: `You created "${newAnecdote.content}"`,
      }));
      setTimeout(() => {
        set(() => ({ notification: "" }));
      }, 5000);
    },

    deleteAnecdote: async (id) => {
      const anecdoteToDelete = get().anecdotes.find((a) => a.id === id);

      if (anecdoteToDelete.votes === 0) {
        await anecdoteService.deleteAnecdote(id);
        set((state) => ({
          anecdotes: state.anecdotes.filter((a) => a.id !== id),
        }));
      }
    },
  },
}));

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes);
export const useAnecdoteSearch = () =>
  useAnecdoteStore((state) => state.search);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export const useAnecdoteNotification = () =>
  useAnecdoteStore((state) => state.notification);
