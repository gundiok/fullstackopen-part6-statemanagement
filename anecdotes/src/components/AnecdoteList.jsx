import { useAnecdotes, useAnecdoteActions, useAnecdoteSearch } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const search = useAnecdoteSearch();
  const { vote, deleteAnecdote } = useAnecdoteActions();

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {filteredAnecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            {anecdote.votes === 0 && (
              <button onClick={() => deleteAnecdote(anecdote.id)}>
                delete
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
