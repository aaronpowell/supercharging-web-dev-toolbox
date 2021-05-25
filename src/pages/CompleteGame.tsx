import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { PlayerResultsDocument } from "../generated";
import styles from "./CompleteGame.module.css";

const CompleteGame: React.FC = () => {
  const { id, playerId } = useParams<{ id: string; playerId: string }>();

  const { loading, data } = useQuery(PlayerResultsDocument, {
    variables: {
      gameId: id,
      playerId,
    },
  });

  if (loading || !data) {
    return <h1>Waiting for your answers</h1>;
  }

  return (
    <div>
      <h1>Game over man, game over!</h1>
      {data.playerResults.map((result) => {
        return (
          <div key={result.question}>
            <h2>
              {result.correct ? "✅" : "❌"}
              <span
                dangerouslySetInnerHTML={{ __html: result.question }}
              ></span>{" "}
            </h2>
            <ul className={styles.list}>
              {result.answers.map((a) => {
                return (
                  <li
                    key={a}
                    className={`${
                      a === result.submittedAnswer ? styles.submitted : ""
                    } ${a === result.correctAnswer ? styles.correct : ""}`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: a }}></span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CompleteGame;
