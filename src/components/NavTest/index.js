import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import { TweenMax } from 'gsap'
import style from './style'

/**
 * Navigation Test
 * @class NavTest
 * @param {String} [url] - Current url
 * @example
 * <NavTest
 *   url="/test"
 * />
 */
class NavTest extends Component {
  componentDidMount() {
    const { classes } = this.props
    TweenMax.to(`.${classes.root}`, 1, { x: '50%' })
  }
  render() {
    const { url, classes } = this.props
    return (
      <nav className={classes.root} ref={(node) => { this.node = node }}>
        <Link className={classes.link} to="/" >Home</Link>
        <Link className={classes.link} to={url}>Test</Link>
      </nav>
    )
  }
}

NavTest.defaultProps = {
  url: '/test',
}

export default injectSheet(style)(NavTest)
