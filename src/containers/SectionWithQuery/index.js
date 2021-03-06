import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Query } from 'react-apollo'

import { actions as uiStateActions } from '../../reducers/ui-state'
import Header from './section-header'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: 1000,
    },
  },
  header: {
    alignSelf: 'flex-start',
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(4),
  }
})

class SectionWithQuery extends Component {
  constructor(props) {
    super(props)
    this.refetch = null
    this.state = {
      querySkip: true
    }
  }

  componentDidUpdate(prevProps) {
    const { sendRequestToggleFlag } = this.props
    if (sendRequestToggleFlag !== prevProps.sendRequestToggleFlag && this.refetch) {
      if (this.state.querySkip) {
        this.setState({ querySkip: false })
      }
      this.refetch()
    }
  }

  queryOnError(error) {
    const { unauthorizedReceived, otherQueryError } = this.props
    console.error(error)

    if (error.networkError && error.networkError.statusCode === 401) {
      unauthorizedReceived()
    } else {
      otherQueryError()
    }
  }

  render() {
    const { classes, querySucceeded, queryGql, headerText, children } = this.props
    const { querySkip } = this.state

    return (
      <Query query={queryGql}
             onCompleted={querySucceeded}
             onError={error => this.queryOnError(error)}
             skip={querySkip}
             >
        {({ data, refetch }) => {
            this.refetch = refetch

            return (
              <div className={classes.root}>
                <Header className={classes.header} text={headerText}/>
                {children(data || {})}
              </div>
            )
          }}
      </Query>
    )
  }
}

SectionWithQuery.propTypes = {
  queryGql: PropTypes.object.isRequired,
  headerText: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  sendRequestToggleFlag: state.uiState.sendRequestToggleFlag
})

const mapDispatchToProps = {
  ...uiStateActions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SectionWithQuery))
