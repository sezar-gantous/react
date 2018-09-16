const baseUrl = "http://localhost:8080/todos";

export const loadTodos = () => {
  return fetch(baseUrl)
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
};

export const createTodo = todo => {
  return fetch(baseUrl, {
    method: "Post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  })
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
};

export const saveTodo = todo => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  })
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
};

export const destroyTodo = id => {
  return fetch(`${baseUrl}/${id}`, {
    method: "Delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).catch(err => {
    throw err;
  });
};
