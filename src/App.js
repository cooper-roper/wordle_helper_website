import './App.css';
import RowList from './Components/RowList/RowList';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Wordle Helper</h1>
        <RowList />
        <text>
          Created by Cooper Roper 
        </text>
        <a href="https://github.com/cooper-roper">
          Github
        </a>
      </div>
    </div>
  );
}

export default App;
