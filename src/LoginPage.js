import React, { useState } from 'react'
import MicrosoftLogin from 'react-microsoft-login'

const CLIENT_ID = '9b3182b6-6b17-4931-8941-414c08968163'

export default () => {
  const [tiedot, asetaTiedot] = useState(undefined)
  const lsTiedot = JSON.parse(localStorage.getItem('data'))
  console.log('lsTiedot:', lsTiedot)

  const authHandler = (err, data, msal) => {
    if (err) console.log('kirjautumisessa tuli virhe:', err)
    else {
      console.log('kirjautuminen onnistui:', data)
      asetaTiedot(data)
      localStorage.setItem('data', JSON.stringify(data))
    }
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
        </div>
      ) : (
        <MicrosoftLogin
          clientId={CLIENT_ID}
          redirectUri='http://localhost:3001'
          authCallback={authHandler}
        />
      )}
    </div>
  )
}
