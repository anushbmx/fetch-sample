import { Link } from 'react-router-dom';
import React, {Component} from 'react';


class Index extends Component {

  render = () => {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 py-4'>
            <h2>Fetch Sampes</h2>
            <ul>
              <li><Link to="/initial-load">Initial Mount</Link></li>
              <li><Link to="/on-focus-load">On Focus</Link></li>
              <li><Link to="/on-request-load">On Request</Link></li>
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

export default Index;
