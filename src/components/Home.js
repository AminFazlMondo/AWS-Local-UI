import React from 'react'
import {Icon} from '@iconify/react'
import awsCloudwatch from '@iconify-icons/logos/aws-cloudwatch'
import awsLambda from '@iconify-icons/logos/aws-lambda'
import aws from '@iconify-icons/logos/aws'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const items = [
  {description: 'Cloudwatch', icon: awsCloudwatch, link: 'cloudwatch'},
  {description: 'Lambda', icon: awsLambda, link: 'lambda'},
  {description: 'State Machines', icon: aws, link: 'state-machines'},
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
  footer: {
    height: theme.spacing(5)
  }
}))

function renderItem(item, index, classes) {
  return (
    <Link key={index} to={`/${item.link}`} className={classes.tile}>
      <Card className={classes.card}>
        <CardContent className={classes.media}>
          <Icon icon={item.icon} width='60%' max-height='90%' />
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
