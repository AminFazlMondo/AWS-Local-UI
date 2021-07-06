import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import React from 'react'

import {toFullString, toFullStringFromMillis} from '../../utils/date'

export function renderTimestamp(params) {
  const {value} = params
  if (!value)
    return
  return toFullStringFromMillis(value)
}
export function renderDate(params) {
  const {value} = params
  if (!value)
    return
  return toFullString(value)
}
const commonStatusIconStyles = {
  top: '.5rem',
  position: 'relative'
}
function renderStatusIcon(status) {
  const upperStatus = status.toUpperCase()
  if (upperStatus.includes('SUCCEEDED'))
    return (<CheckCircleOutlineIcon style={{color: 'green', ...commonStatusIconStyles}} />)
  if (upperStatus.includes('FAILED'))
    return (<CancelIcon style={{color: 'red', ...commonStatusIconStyles}} />)

  return (<MoreHorizIcon style={{color: 'blue', ...commonStatusIconStyles}}  />)
}

export function renderStatus(params) {
  const status = params.value
  return (<Typography>{renderStatusIcon(status)} {status}</Typography>)
}
