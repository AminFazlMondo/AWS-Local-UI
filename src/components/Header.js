import React from 'react'
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {domains} from './Home'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import HomeIcon from '@material-ui/icons/Home'
import {withStyles} from '@material-ui/core/styles'

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
    const {location, classes} = this.props
    const {pathname} = location
    const parts = pathname.split('/').filter(x => x)
    return (
      <Breadcrumbs aria-label="breadcrumb" maxItems={3} separator='>' >
        {this.renderHome(classes)}
        {this.renderDomain(parts, classes)}
      </Breadcrumbs>
    )
  }

  renderHome(classes) {
    return (
      <Link color="inherit" href="/" className={classes.link} key="/">
        <HomeIcon className={classes.icon} fontSize='large' />
      </Link>
    )
  }

  renderDomain(pathParts, classes) {
    if (pathParts.length === 0)
      return
    const part = pathParts.shift()
    const domain = domains.find(x => x.path === part)
    const path = `/${domain.path}`

    return (
      [
        this.renderLink(path, domain.friendlyName, classes, pathParts),
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

    return (
      [
        this.renderLink(path, decodeURIComponent(param || 'All'), classes, pathParts),
        this.renderSubDomain(pathParts, path, classes)
      ]
    )
  }

  renderLink(path, title, classes, remainingParts) {
    const text = title.split(':').pop()
    return remainingParts.length !== 0 ? (
      <Link color="inherit" href={path} className={classes.link} key={path}>
        {text}
      </Link>
    ) : (
      <Typography color="textPrimary" className={classes.link} key={path}>{text}</Typography>
    )
  }

}

export default withRouter(withStyles(styles)(Header))
