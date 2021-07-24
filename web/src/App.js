import React from 'react';
import { FormGroup, Paper, Button } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import TransferList from './components/TransferList'
import Filter from './components/Filter'
import Table from './components/Table'
import './App.css';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#24282F',
    },
    secondary: {
      main: '#fff',
    },
  },
});

export default function App() {
  const [selections, setSelections] = React.useState([]);
  const [table, setTable] = React.useState([]);
  const [filtros, setFiltros] = React.useState([]);
  const [filtrosValues, setFiltrosValues] = React.useState([{}]);
  const [aux, setAux] = React.useState({ id: -1, selection: 'a', comparator: 'a', constraint: 'a' })
  const [level, setLevel] = React.useState(0);

  React.useEffect(() => {
    if (aux.id !== -1) {
      let auxFiltros = filtrosValues;
      auxFiltros[aux.id] = { selection: aux.selection, comparator: aux.comparator, constraint: aux.constraint }
      setFiltrosValues(auxFiltros)
    }
  }, [aux])

  function sendRequest() {
    const jsonBody = {
      selections: selections,
      filtros: filtrosValues
    }
    let data = JSON.stringify(jsonBody);

    fetch('http://localhost:3333/', {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((queryJSON) => {
        let data = fixData(queryJSON.return);
        setTable(data);
      })
  }


  return (
    <div className="home-page">
      <ThemeProvider theme={theme}>
        <div className="header">
          <img src="./images/rick.svg" alt="rick" />
          <h1>Relatório AdHOC Rick and Morty API</h1>
          <img src="./images/morty.svg" alt="rick" />
        </div>
        <div className="report">
          {
            level === 0 && (
              <>
                <h2>Para Gerar seu Relatório Siga os Seguintes Passos</h2>
                <h3>1 - Selecione os Campos que Deseja no Relatório</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setLevel(1)}
                >
                  Selecionar campos
                </Button>
              </>
            )
          }
          {
            level === 1 && (
              <>
                <div className="options">
                  <div className="containerTransfer">
                    <div className="transfer">
                      <h2>Selecione as Colunas que Deseja</h2>
                      <FormGroup>
                        <Paper elevation={5}>
                          <TransferList setFunction={setSelections} />
                        </Paper>
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <h3>2 - Adicione os Filtros que Deseja Aplicar</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setFiltros([...filtros, <Filter id={filtros.length} sendValues={setAux} />])
                    setLevel(2)
                  }}
                >
                  Adicionar Filtro
                </Button>
              </>
            )
          }

          {
            level === 2 && (
              <>
                <div className="filters">
                  <h2>Adicione os Filtros Para a Tabela</h2>
                  {filtros}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setFiltros([...filtros, <Filter id={filtros.length} sendValues={setAux} />])

                    }}
                  >
                    Adicionar Filtro
                  </Button>
                </div>
                <h3>3 - Gerar o Relatório com os Campos Selecionados e Filtros Aplicados</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    sendRequest()
                    setLevel(3)
                  }}>
                  Gerar Relatório
                </Button>
              </>
            )
          }

          {
            level === 3 && (
              <div className="table">
                {table.length > 0 &&
                  <Table tableData={table} keys={selections} />
                }
              </div>
            )
          }
        </div>

        <div className="footer">
          <a href='https://github.com/JoaoVictor-HM' target="_blank" rel="noreferrer"><GitHubIcon style={{ fontSize: 40, color: 'white' }} /></a>
        </div>
      </ThemeProvider>
    </div>
  );

  function fixData(e) {
    let data = e.filter(function (obj) {
      for (var key in obj) {
        if (obj[key] === null) return false;
      }
      return true;
    });

    return data;
  }
}