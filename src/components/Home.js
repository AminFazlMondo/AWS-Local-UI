import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import {Link} from 'react-router-dom'

import cloudwatchIcon from '../media/cloudwatch.svg'
import lambdaIcon from '../media/lambda.svg'
import stepFunctionIcon from '../media/step-functions.svg'

const items = [
  {description: 'Cloudwatch', icon: cloudwatchIcon, link: 'cloudwatch'},
  {description: 'Lambda', icon: lambdaIcon, link: 'lambda'},
  {description: 'State Machines', icon: stepFunctionIcon, link: 'state-machines'},
]

export const domains = items.map(item => ({friendlyName: item.description, path: item.link}))

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tile: {
    margin: theme.spacing(5),
    textDecoration: 'none',
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(30),
    height: theme.spacing(30),
    backgroundColor: 'beige',
    textDecoration: 'none'
  },
  media: {
    height: theme.spacing(20),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  icon: {
    width: '90%',
    maxHeight: '100%'
  },
  footer: {
    height: theme.spacing(5)
  }
}))

function renderItem(item, index, classes) {
  return (
    <Link key={index} to={`/${item.link}`} className={classes.tile}>
      <Card className={classes.card}>
        <CardContent className={classes.media}>
          <img src={item.icon} alt={item.description} className={classes.icon} />
        </CardContent>
        <CardContent className={classes.footer}>
          <Typography variant="h5" color="textSecondary">
            {item.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

function Home() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={3}
      >
        {items.map((item, index) => renderItem(item, index, classes))}
      </Grid>
    </div>
  )
}

export default Home
