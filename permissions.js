const config = {
  "type": process.env.TYPE,
  "project_id": process.env.SERVICE_PROJECT_ID,
  "private_key_id": process.env.SERVICE_PRIVATE_KEY_ID,
  "private_key": process.env.SERVICE_PRIVATE_KEY ? process.env.SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  "client_email": process.env.SERVICE_CLIENT_EMAIL,
  "client_id": process.env.SERVICE_CLIENT_ID,
  "auth_uri": process.env.SERVICE_AUTH_URI,
  "token_uri": process.env.SERVICE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.SERVICE_AUTH_PROVIDER_URL,
  "client_x509_cert_url": process.env.SERVICE_CLIENT_URL,
}

export default config;
