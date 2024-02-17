import React, { useState } from 'react'
import MicrosoftLogin from 'react-microsoft-login'

export default (props) => {
  const [tiedot, asetaTiedot] = useState(undefined)

  const authHandler = (err, data) => {
    if (err) console.log('kirjautumisessa tuli virhe:', err)
    else {
      console.log('kirjautuminen onnistui:', data)
      asetaTiedot(data)
    }
  }
  const CLIENT_ID = '9b3182b6-6b17-4931-8941-414c08968163'
  return (
    <div>
      {tiedot ? (
        <div>
          <p>Käyttäjä on kirjautunut: {tiedot.account.name}</p>
          <p>Nimi: {tiedot.account.username}</p>
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
