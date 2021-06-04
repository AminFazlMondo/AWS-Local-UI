import { Component } from 'react';
import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid';
import { getLogStreams } from './remote'
import { Route, Switch, withRouter } from 'react-router-dom';
import CloudwatchStream from './stream'
import { Link } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


class CloudwatchGroup extends Component {
  columns = [
    { field: 'name', headerName: 'Log stream', flex: 3 },
    { field: 'lastEvent', headerName: 'Last Event', flex: 2 }
  ]

  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      rows: [],
      error: undefined,
      isLoading: true,
    };
  }

  render() {
    const { groupName } = this.state;
    const { match } = this.props
    const { path, url } = match
    return (
      <div style={{ width: '100%' }}>
        <Switch>
          <Route path={`${path}/stream/`} component={CloudwatchStream} />
          <Route path={`${path}/stream/:streamName`} component={CloudwatchStream} />
          <Route path={path}>
            <h2>Log Streams</h2>
            <h3>Group: {groupName}</h3>
            <h4><Link href={`${url}/stream/`}>All</Link></h4>
            {this.renderGrid(this.state, this.props)}
          </Route>
        </Switch>

      </div>
    );
  }

  renderGrid(state, props) {
    const { rows, error, isLoading } = state;
    const { match, history } = props
    const { url } = match
    const clickHandler = this.getRowClickHandler(history, url)
    if (isLoading)
      return (<CircularProgress />)

    return (
      <ClickableRowsDataGrid
        error={error}
        rows={rows}
        columns={this.columns}
        onRowClick={clickHandler}
        isRowSelectable={false}
        hideFooterPagination={true}
        loading={isLoading}
        autoHeight={true}
      />
    )
  }

  componentDidMount() {
    const groupNameParam = this.props.match.params.groupName
    const groupName = decodeURIComponent(groupNameParam)
    this.setState({ groupName })
    getLogStreams(decodeURIComponent(groupName))
      .then(rows => this.setState({ rows, isLoading: false }))
      .catch(error => {
        console.error(error)
        this.setState({ error, isLoading: false })
      })
  }

  getRowClickHandler(history, currentPath) {
    return function (target) {
      const { row } = target
      const path = `${currentPath}/stream/${encodeURIComponent(row.name)}`
      history.push(path)
    }
  }
}


export default withRouter(CloudwatchGroup);
