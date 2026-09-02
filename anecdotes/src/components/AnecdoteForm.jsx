import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();

  const createAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    await addAnecdote(content)
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
