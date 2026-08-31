import { useScoreStore } from "../store";

const Statistics = () => {
  const good = useScoreStore((state) => state.good);
  const bad = useScoreStore((state) => state.bad);
  const neutral = useScoreStore((state) => state.neutral);
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;



  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{ all >=1 ? average : 0 }</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{ all >=1 ? positive : 0 } % </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
