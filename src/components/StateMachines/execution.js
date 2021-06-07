import React from 'react'
import {Component} from 'react'
import {getExecution} from './remote'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import CircularProgress from '@material-ui/core/CircularProgress'
// import Collapse from '@material-ui/core/Collapse'
// import {LazyLog} from 'react-lazylog'
// import CircularProgress from '@material-ui/core/CircularProgress'

class Execution extends Component {

  constructor(props) {
    super(props)
    this.state = {
      details: {},
      executionArn: undefined,
      error: undefined,
      isLoading: true,
    }
  }

  render() {
    const {details, isLoading} = this.state
    if (isLoading)
      return (<CircularProgress />)
    console.log('###DEBUG-details:', details)
    return (
      <TreeView>
        <TreeItem label={details.status} />
        <TreeItem label={details.startDate.toISOString()} />
        <TreeItem label={details.stopDate.toISOString()} />

        <TreeItem label='steps'>
          {this.renderSteps()}
        </TreeItem>
      </TreeView>
    )
  }
  renderSteps() {

  }
  // <div style={{height: 750, width: '100%'}}>
  //   {/* <h3>Group: {groupName}</h3>
  //   <h4>Stream: {streamName}</h4>
  //   {this.renderLogs(text)} */}
  // {/* <TreeView>
  //     <TreeItem label="amin" />
  //   </TreeView> */}
  // </div>

  componentDidMount() {
    const executionArnParam = this.props.match.params.executionArn
    const executionArn = decodeURIComponent(executionArnParam)
    this.setState({executionArn})

    getExecution(executionArn)
      .then(details => this.setState({details, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }
}

export default Execution
