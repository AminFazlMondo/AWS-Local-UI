import {withStyles} from '@material-ui/core/styles'
import {DataGrid} from '@material-ui/data-grid'

const CustomDataGrid = withStyles({
  columnHeader: {
    backgroundColor: '#90a4ae'
  }
})(DataGrid)

export default CustomDataGrid
