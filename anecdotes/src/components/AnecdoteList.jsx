import { useAnecdoteActions, useFilteredAnecdotes } from "../store";

const AnecdoteList = () => {
  const filteredAnecdotes = useFilteredAnecdotes();

  const { vote, deleteAnecdote } = useAnecdoteActions();

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          {anecdote.votes === 0 && (
            <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
