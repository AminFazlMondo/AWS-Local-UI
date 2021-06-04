import { Component } from 'react';
import CustomDataGrid from '../DataGrids/CustomDataGrid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getFunctions } from './remote'


class Lambda extends Component {
  columns = [
    { field: 'name', headerName: 'Function Name', flex: 1 }
  ]

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      isLoading: true,
      error: undefined
    };
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <h2>Functions</h2>
        {this.renderGrid(this.state)}
      </div>
    );
  }
  renderGrid(state) {
    const { rows, error, isLoading } = state;
    if (isLoading)
      return (<CircularProgress />)

    return (
      <CustomDataGrid
        error={error}
        rows={rows}
        columns={this.columns}
        isRowSelectable={false}
        hideFooterPagination={true}
        loading={isLoading}
        autoHeight={true}
      />
    )
  }

  componentDidMount() {
    getFunctions()
      .then(rows => this.setState({ rows, isLoading: false }))
      .catch(error => {
        console.error(error)
        this.setState({ error, isLoading: false })
      })
  }
}


export default Lambda;
