import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core/styles';

const CustomDataGrid = withStyles({
  columnHeader: {
    backgroundColor: '#90a4ae'
  }
})(DataGrid);

export default CustomDataGrid;
