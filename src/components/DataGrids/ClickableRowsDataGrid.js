import CustomDataGrid from './CustomDataGrid'
import {withStyles} from '@material-ui/core/styles'

const ClickableRowsDataGrid = withStyles({
  row: {
    cursor: 'pointer'
  }
})(CustomDataGrid)

export default ClickableRowsDataGrid
