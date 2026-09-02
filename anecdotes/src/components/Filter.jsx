import { useAnecdoteActions } from "../store";

const Filter = () => {
  const { handleFilterChange } = useAnecdoteActions();
  

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input data-testid="filter" onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
