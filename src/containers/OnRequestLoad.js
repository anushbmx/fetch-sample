import _ from 'lodash';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faChevronDown, faUsers} from '@fortawesome/free-solid-svg-icons';


class OnFocusLoad extends Component {

  fetchData = () => {
    const baseUrl = 'https://swapi.dev/api';
    const {page, data} = this.state;
    this.setState({loading: true, initial: false});
    fetch(`${baseUrl}/people/?page=${page}`, {
      method: 'get'
    })
      .then(async (rawRes)=>{
        if (rawRes.status !== 200) {
          throw 'Invalid Response';
        }

        try {
          const jsonRes = await rawRes.json();
          this.setState({
            loading: false,
            loadMore: !!jsonRes.next,
            data: _.isEmpty(data) ? jsonRes.results : [...data, ...jsonRes.results] ,
            page: page + 1
          });
        } catch (error) {
          throw 'Response is not valid json';
        }
      })
      .catch(()=>{
        // Skipping user friendly error handling for now
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  render = () => {
    const {loading, data, loadMore, error, initial} = this.state;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 py-5'>
            <h1 className='my-3'><FontAwesomeIcon icon={faUsers} className={'mx-1'}/> People(s) List [On Request Load]</h1>

            {error &&
            <div className="alert alert-danger" role="alert">
              We are having difficulty in fetching people information.
              <Button type={'button'} className={'btn-link p-0 m-0'} onClick={()=>this.fetchData()}>Try Again</Button>
            </div>
            }
            <table className='table table-sm border'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Height</th>
                  <th>Mass</th>
                </tr>
              </thead>
              <tbody>
                {_.isEmpty(data) ?
                  <tr>
                    <td colSpan={4} className={'text-center p-5'}>
                      {loading ?
                        <h5><FontAwesomeIcon icon={faSpinner} className={'mx-2'} pulse={true}/> Loading ...</h5>
                        :
                        <>
                          {initial ?
                            <Button type={'button'} className={'btn-primary'} onClick={()=>this.fetchData()}>Fetch Data</Button>
                            :
                            <p className={'text-muted small'}>No data</p>
                          }
                        </>
                      }
                    </td>
                  </tr>
                  :
                  <>
                    {data.map((userData, i)=>(
                      <tr key={i}>
                        <td>{userData.name}</td>
                        <td>{userData.gender}</td>
                        <td>{userData.height}</td>
                        <td>{userData.mass}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className={'text-center'}>
                        <Button type="button" className={'btn my-2 mx-auto btn-sm'} onClick={()=>this.fetchData()} disabled={!loadMore}>
                          <FontAwesomeIcon icon={loading ? faSpinner : faChevronDown} className={'mx-2'} pulse={loading}/> Load More
                        </Button>
                      </td>
                    </tr>
                  </>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      error: false,
      initial: true,
      loading: false,
      loadMore: false,
    };
  }

}

export default OnFocusLoad;
