import React from 'react'

const googleSignInFront = () => {

    function handleCredentialResponse(response) {

        // Google Token: ID_TOKEN
        const body = { id_token: response.credential};

        fetch('http://localhost:8080/api/auth/google',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( resp => resp.json())
        .then( resp => {
        })
        .catch(console.warn );

    }



  return (
    <>
    <div id="g_id_onload"
        data-client_id={process.env.GOOGLE_CLIENT_ID}
        data-login_uri= {`http://localhost:${8080}/api/auth/google`}
        data-auto_prompt="false"
        data-callback={handleCredentialResponse}>
    </div>
    <div class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left">
    </div>
      
    </>
  )
}

export default googleSignInFront
