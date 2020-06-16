import React from "react";

const renderObject = (data) => {
  return Object.keys(data).map((obj, i) => {
    return <h6 class="card-subtitle mb-2 text-muted">{data[obj]}</h6>;
  });
};

const CpfEvent = ({ event }) => {
  return (
    <div>
      <h1>Eventos relacionados ao CPF</h1>
      {event.map((user) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Última verificação de crédito</h5>
            {renderObject(user.last_check)}

            <h5 class="card-title">Movimentação financeira</h5>
            {renderObject(user.finantial_movimentation)}

            <h5 class="card-title">Última Compra</h5>
            {renderObject(user.last_purchase)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CpfEvent;
