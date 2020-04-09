import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() { 
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`,
      url: "http://github.com/mhme2000",
      techs: ["React", "React Native"],  
    });
    
    const repositor = response.data;
    setRepositories([...repositories, repositor]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    const repositor = repositories.filter(
      (repositor) => repositor.id !== id
    );

    setRepositories(repositor);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map((repositor) => (
          <li key={repositor.id}>
            {repositor.title}
          <button onClick={() => handleRemoveRepository(repositor.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
