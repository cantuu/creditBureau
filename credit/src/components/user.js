import React from "react";

const Users = ({ users }) => {
  return (
    <div>
      <h1>Informações do Usuário</h1>
      {users.map((user) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{user.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user.cpf}</h6>
            <h6 class="card-subtitle mb-2 text-muted">{user.address}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Dividas: </h6>
            {user.debts_list.map((debt) => (
              <h6 class="card-subtitle mb-2 text-muted">
                {debt.name} | {debt.value}
              </h6>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
