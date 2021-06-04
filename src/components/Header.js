import { Component } from 'react';
// import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid';
// import { getLogGroups } from './remote'
import { withRouter } from 'react-router-dom';
import { domains } from './Home'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    fontSize: 'large'
  },
  link: {
    display: 'flex',
    fontSize: '1.5rem',
  },
  icon: {
  },
}

class Header extends Component {
  render() {
    const { location, classes } = this.props
    const { pathname } = location
    const parts = pathname.split('/').filter(x => x)
    return (
      <Breadcrumbs aria-label="breadcrumb" maxItems={3} separator='>' >
        {this.renderHome(classes)}
        {this.renderDomain(parts, classes)}
      </Breadcrumbs>
    );
  }

  renderHome(classes) {
    return (
      <Link color="inherit" href="/" className={classes.link}>
        <HomeIcon className={classes.icon} fontSize='large' />
      </Link>
    )
  }

  renderDomain(pathParts, classes) {
    if (pathParts.length === 0)
      return
    const part = pathParts.shift()
    const domain = domains.find(x => x.path = part)
    const path = `/${domain.path}`

    const element = pathParts.length !== 0 ? (
      <Link color="inherit" href={path} className={classes.link}>
        {domain.friendlyName}
      </Link>
    ) : (
      <Typography color="textPrimary" className={classes.link}>{domain.friendlyName}</Typography>
    )

    return (
      [
        element,
        this.renderSubDomain(pathParts, path, classes)
      ]
    )
  }

  renderSubDomain(pathParts, parentPath, classes) {
    if (pathParts.length === 0)
      return

    const subDomain = pathParts.shift()
    const param = pathParts.shift()

    const path = `${parentPath}/${subDomain}/${param}`

    const element = pathParts.length !== 0 ? (
      <Link color="inherit" href={path} className={classes.link}>
        {decodeURIComponent(param)}
      </Link>
    ) : (
      <Typography color="textPrimary" className={classes.link}>{decodeURIComponent(param)}</Typography>
    )

    return (
      [
        element,
        this.renderSubDomain(pathParts, path, classes)
      ]
    )
  }

}


export default withRouter(withStyles(styles)(Header));
