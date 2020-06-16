import React from "react";

const CreditScore = ({ score }) => {
  return (
    <div>
      <h1>Pontuação de crédito</h1>
      {score.map((user) => (
        <div class="card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">{user.age}</h6>
            <h6 class="card-subtitle mb-2 text-muted">{user.income_source}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Propriedades: </h6>
            {user.properties_list.map((propertie) => (
              <h6 class="card-subtitle mb-2 text-muted">
                {propertie.type} | {propertie.value}
              </h6>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreditScore;
