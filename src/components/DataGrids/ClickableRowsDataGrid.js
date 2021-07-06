import {withStyles} from '@material-ui/core/styles'

import CustomDataGrid from './CustomDataGrid'

const ClickableRowsDataGrid = withStyles({
  row: {
    cursor: 'pointer'
  }
})(CustomDataGrid)

export default ClickableRowsDataGrid
