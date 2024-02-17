import React from 'react'
import MicrosoftLogin from 'react-microsoft-login'

export default (props) => {
  const authHandler = (err, data) => {
    console.log('saadun vastauksen err:')
    console.log(err)
    console.log('saadun vastauksen data:')
    console.log(data)
  }
  const CLIENT_ID = '9b3182b6-6b17-4931-8941-414c08968163'
  return (
    <MicrosoftLogin
      clientId={CLIENT_ID}
      redirectUri='http://localhost:3001'
      authCallback={authHandler}
    />
  )
}
