import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import LaunchIcon from '@material-ui/icons/Launch'
import React from 'react'
import {Component} from 'react'

import CustomDataGrid from '../DataGrids/CustomDataGrid'
import {getFunctions} from './remote'

const columns = [
  {field: 'name', headerName: 'Name', flex: 3},
  {field: 'description', headerName: 'Description', flex: 5},
  {field: 'actions', headerName: 'Actions', flex: 1, renderCell: renderActions}
]

const sortModel = [
  {
    field: 'name',
    sort: 'asc'
  }
]

function renderActions(params) {
  const {row} = params
  const {name} = row
  const groupName = `/aws/lambda/${name}`
  const path = `cloudwatch/group/${encodeURIComponent(groupName)}`
  return (
    <Link color="inherit" href={path} key={path} target='_blank' underline='none'>
      Logs <LaunchIcon style={{top: '.5rem', position: 'relative', color: 'blue'}} />
    </Link>
  )
}

function renderGrid(state) {
  const {rows, error, isLoading} = state
  if (isLoading)
    return (<CircularProgress />)

  return (
    <CustomDataGrid
      error={error}
      rows={rows}
      columns={columns}
      sortModel={sortModel}
      isRowSelectable={false}
      hideFooterPagination={true}
      loading={isLoading}
      autoHeight={true}
    />
  )
}

class Lambda extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      isLoading: true,
      error: undefined
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <h2>Functions</h2>
        {renderGrid(this.state)}
      </div>
    )
  }

  componentDidMount() {
    getFunctions()
      .then(rows => this.setState({rows, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }
}

export default Lambda
