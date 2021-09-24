import Header from "./components/Layout/Header";
import Post from "./components/Post/Post";

function App() {
  return (
    <div className="App">
        <Header></Header>
        <main>
          <Post></Post>
        </main>
    </div>
  );
}

export default App;
