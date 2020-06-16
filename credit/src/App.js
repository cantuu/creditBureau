import axios from "axios";
import React, { useState } from "react";
import Users from "./components/user";
import CreditScore from "./components/credit-score";
import CpfEvent from "./components/cpf-event";

function App() {
  const [user, setUser] = useState("");
  const [score, setScore] = useState("");
  const [event, setEvent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
  const [errorScore, setErrorScore] = useState(null);
  const [errorEvent, setErrorEvent] = useState(null);

  const fetchData = async (event) => {
    event.preventDefault();

    const userUrl =
      "https://3cu2c9rnq4.execute-api.us-east-1.amazonaws.com/api/userdata";

    await axios
      .get(userUrl, {
        params: {
          cpf: user,
        },
      })
      .then((userResponse) => {
        setUser(userResponse.data);
        console.log(user);
        console.log(userResponse.data);
      })
      .catch((err) => {
        setErrorUser(err);
        console.log(err);
      });

    const scoreUrl =
      "https://3cu2c9rnq4.execute-api.us-east-1.amazonaws.com/api/creditscore";

    await axios
      .get(scoreUrl, {
        params: {
          cpf: user,
        },
      })
      .then((scoreResponse) => {
        setScore(scoreResponse.data);
        console.log(score);
        console.log(scoreResponse.data);
      })
      .catch((err) => setErrorScore(err));

    const eventUrl =
      "https://3cu2c9rnq4.execute-api.us-east-1.amazonaws.com/api/cpfevent";

    await axios
      .get(eventUrl, {
        params: {
          cpf: user,
        },
      })
      .then((eventResponse) => {
        setEvent(eventResponse.data);
        console.log(event);
        console.log(eventResponse.data);
      })
      .catch((err) => setErrorEvent(err));

    setSubmitted(true);
  };

  const renderInfos = () => {
    return (
      <div>
        {user && <Users users={user} />}
        {score && <CreditScore score={score} />}
        {event && <CpfEvent event={event} />}
      </div>
    );
  };

  if (errorUser && errorScore && errorEvent) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <details style={{ whiteSpace: "pre-wrap" }}>
          {errorUser.message + "\n"}
          {errorScore.message + "\n"}
          {errorEvent.message + "\n"}
          <br />
        </details>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={fetchData}>
        <center>
          <h1>Consulta de CPF</h1>
        </center>
        <div className="form-group">
          <label>Entre com o seu CPF:</label>
          <input
            onChange={(e) => setUser(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Buscar</button>
      </form>
      {submitted && renderInfos()}
    </div>
  );
}

export default App;
