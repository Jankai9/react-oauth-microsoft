import React, { useState } from 'react'
import MicrosoftLogin from 'react-microsoft-login'

// HUOM. On olemasa myös yksityiskohtaisempia kirjautumisesimerkkejä: https://www.npmjs.com/package/@azure/msal-react

const CLIENT_ID = '9b3182b6-6b17-4931-8941-414c08968163'

export default () => {
  const [msalInstance, onMsalInstanceChange] = useState()
  const lsTiedot = JSON.parse(localStorage.getItem('data'))
  console.log('lsTiedot:', lsTiedot)

  const authHandler = (err, data, msal) => {
    if (err) console.log('kirjautumisessa tuli virhe:', err)
    else {
      console.log('kirjautuminen onnistui:', data)
      console.log('msal:', msal)
      onMsalInstanceChange(msal)
      localStorage.setItem('data', JSON.stringify(data))
    }
  }

  const logoutHandler = () => {
    localStorage.clear('data')
    msalInstance.logout()
  }

  return (
    <div>
      {lsTiedot ? (
        <div>
          <p>Käyttäjä on kirjautunut: {lsTiedot.account.name}</p>
          <p>Nimi: {lsTiedot.account.username}</p>
          <p>
            Vanhentuu: {new Date(lsTiedot.expiresOn).toLocaleDateString()}:
            {new Date(lsTiedot.expiresOn).toLocaleTimeString()}}
          </p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      ) : (
        <MicrosoftLogin
          clientId={CLIENT_ID}
          authCallback={authHandler}
          redirectUri='http://localhost:3001'
          postLogoutRedirectUri='http://localhost:3001'
        />
      )}
    </div>
  )
}
