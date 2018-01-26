import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { ThemeProvider } from 'react-jss'
import { TransitionGroup, Transition } from 'react-transition-group'
import { theme } from './style'
import Home from './pages/Home'
import Test from './pages/Test'
import NavTest from './components/NavTest/'
import Canvas from './canvas'

class App extends Component {
  componentWillMount() {
  }
  render() {
    const { location } = this.props.history
    const currentKey = location.pathname.split('/')[1] || '/'
    const timeout = { enter: 500, exit: 1000 }
    return (
      <ThemeProvider theme={theme}>
        <div className="content-root">
          <NavTest />
          <TransitionGroup component="main" className="page-main">
            <Transition key={currentKey} timeout={timeout} appear>
              {
                status => (
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Home transition={status} />} />
                    <Route exact path="/test" render={() => <Test transition={status} />} />
                  </Switch>
                )
              }
            </Transition>
          </TransitionGroup>
          <Canvas />
        </div>
      </ThemeProvider>
    )
  }
}

export default App
