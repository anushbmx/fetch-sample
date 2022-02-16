import React, {Component} from 'react';
import {Navbar, Container} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  componentDidMount = () => {
    this.fetchInitData();
  };

  fetchInitData = () => {
    const baseUrl = 'https://swapi.dev/api';
    const {page} = this.state;
    fetch(`${baseUrl}/people/${page}`, {
        method: 'get'
      })
      .then(()=>{

      })
      .catch(()=>{

      })
  }

  render = () => {
    return (
      <div className='container'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
          React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className='row'>
        <div className='col-12'>
        <h1>List</h1>
        </div>
      </div>
    </div>
    )
  }

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      loading: true,
      data: [],
    };
  }

}

export default App;
