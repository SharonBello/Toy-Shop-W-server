import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { AppTopHeader} from '../src/cmps/app-top-header.jsx'
import { AppNavHeader} from '../src/cmps/app-nav-header.jsx'
import { AppFooter } from '../src/cmps/app-footer.jsx'
import '../src/assets/scss/main.scss'

import routes from "./routes"

function _App(props) {
  return (
    <div id="app" className="with-new-header">
        <div className="center-container">
      <AppTopHeader /> 
      <AppNavHeader /> 
        <main className="main-content-container">
          <Switch>
          {routes.map(route => (
            <Route path={route.path} exact key={route.path} component={route.component} />
          ))}
          </Switch>
        </main>
     
      <AppFooter />
    </div>
    </div>
  )
}

function mapStateToProps(storeState) {
  return {
    // count: storeState.countModule.count,
    // status: storeState.statusModule.status
  }
}

export const App = connect(mapStateToProps)(_App)