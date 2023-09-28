import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import User from './components/User';

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route exact path="/user/:login" element={<User />} />
        </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
