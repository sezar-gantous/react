const baseUrl = "http://localhost:8080/salaries";

export const API_getSalary = jobTitle => {
  return fetch(`${baseUrl}/?jobTitle=${jobTitle}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
};

export const loadSalaries = () => {
  return fetch(baseUrl)
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
};
