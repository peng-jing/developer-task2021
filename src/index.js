import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// add to existing imports
import Amplify from 'aws-amplify'
import config from './aws-exports'
// check if env is localhost or not
// if you're not developing on localhost, you will need to detect this is another way—the docs linked above give some examples.
const isLocalhost = !!(window.location.hostname === 'localhost')

// split redirect signin and signout strings into correct URIs
const [productionRedirectSignIn, localRedirectSignIn] =
  config.oauth.redirectSignIn.split(',')
const [productionRedirectSignOut, localRedirectSignOut] =
  config.oauth.redirectSignOut.split(',')

// use correct URI in the right env
const updatedAwsConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut
  }
}

Amplify.configure(updatedAwsConfig)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
