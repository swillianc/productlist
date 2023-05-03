import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [available, setAvailable] = useState('yes');
  const [showList, setShowList] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      name,
      description,
      value: Number(value),
      available,
    };
    setProducts([...products, newProduct]);
    setName('');
    setDescription('');
    setValue('');
    setAvailable('yes');
    setShowList(true);
  };

  const handleSortByValue = () => {
    const sortedProducts = [...products].sort((a, b) => a.value - b.value);
    setProducts(sortedProducts);
  };

  return (
    <div className="App">
      <h1>Formulário para Produtos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome do Produto: </label>
          <input
            type="text"
            id="name"
            placeholder="Produto"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Descrição do Produto: </label>
          <input
            type="text"
            id="description"
            placeholder="Utilizado para ..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="value">Valor do Produto: </label>
          <input
            type="text"
            id="value"
            placeholder="R$ XXXX.XX"
            name="value"
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            }}
            required
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="available">Disponível para venda? </label>
          <select
            id="available"
            value={available}
            onChange={(event) => setAvailable(event.target.value)}
          >
            <option value="yes">Sim</option>
            <option value="no">Não</option>
          </select>
        </div>

        <button type="submit">Salvar</button>
      </form>

      {showList && (
        <>
          <hr />
          <h2>Listagem de Produtos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Disponível para venda?</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>R$ {product.value.toFixed(2)}</td>
                  <td>{product.available === 'yes' ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setShowList(false)}>Novo produto</button>
        </>
      )}

      {!showList && (
        <button onClick={() => setShowList(true)}>Listar Produtos</button>
      )}

      {products.length > 0 && (
        <button onClick={handleSortByValue}>Ordenar por valor</button>
      )}
    </div>
  );
}

export default App;
