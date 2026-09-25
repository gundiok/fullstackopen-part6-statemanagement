import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, {
  useAnecdoteActions,
  useAnecdoteNotification,
  useAnecdoteSearch,
  useAnecdotes,
  useFilteredAnecdotes,
  useSortedAnecdotes,
} from "./store";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    deleteAnecdote: vi.fn(),
  },
}));

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], search: "", notification: "" });
});

describe("useAnecdoteActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("component displaying anecdotes receives the anecdotes from the store sorted by votes", () => {
    const mockAnecdotes = [
      { id: "1", content: "Character is strength", votes: 3 },
      { id: "2", content: "Justice is eternal", votes: 12 },
      {
        id: "3",
        content: "Fate drags the lazy and leads the willing",
        votes: 0,
      },
      {
        id: "4",
        content: "The flame flades and the dark rises",
        votes: 7,
      },
      { id: "5", content: "Endure the burder, endure it all", votes: 1 },
    ];

    useAnecdoteStore.setState({ anecdotes: mockAnecdotes });
    const { result } = renderHook(() => useSortedAnecdotes());

    const votes = result.current.map((a) => a.votes);
    expect(votes).toEqual([12, 7, 3, 1, 0]);
  });

  it("the correct react component receives filtered anecdotes", () => {
    const mockAnecdotes = [
      { id: "1", content: "Character is strength", votes: 3 },
      { id: "2", content: "Justice is eternal", votes: 12 },
      {
        id: "3",
        content: "Fate drags the lazy and leads the willing",
        votes: 0,
      },
      {
        id: "4",
        content: "The flame flades and the dark rises",
        votes: 7,
      },
      { id: "5", content: "Endure the burden, endure it all", votes: 1 },
    ];
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, search: "the" });
    const { result } = renderHook(() => useFilteredAnecdotes());
    const filtered = result.current;
    const ids = filtered.map((a) => a.id);
    expect(ids).toEqual(["4", "5", "3"]);
  });

  it("voting increases the no of votes for an anecdote", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];

    useAnecdoteStore.setState({ anecdotes: mockAnecdotes });
    anecdoteService.update.mockResolvedValue({...mockAnecdotes[0], votes: mockAnecdotes[0].votes + 1});

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.vote(1);
    });
    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current[0].votes).toBe(1);
  });
});
