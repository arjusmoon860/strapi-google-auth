# GoogleAuth
GoogleAuth helps you to easily create google authentication available for your users. It uses the official google-auth library to execute the actions. You can get it working in under 2 minutes in your application. EASY!

![Dashboard Screenshot](https://arju-public.s3.ap-south-1.amazonaws.com/Screenshot+2022-05-02+at+1.37.12+AM.png)

# Features
- Official GoogleAPIs integration
- Using strapi default user-permission collection
- JWT Authentication
- Sanitized response
- Highly secure
 
# Activate the Plugin
Add the folling lines of code in the file: config/plugins.js
```js
    'google-auth': {
        enabled: true,
    },
```
# Configuration
1. Create a google project from the [Google Cloud Console](https://console.cloud.google.com/projectcreate?previousPage=%2Fcloud-resource-manager%3Fproject%3D%26folder%3D%26organizationId%3D).
2. Create OAuth Consent Screen (Nav Menu -> APIs & Services -> [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)).
3. Go to [Credentials](https://console.cloud.google.com/apis/credentials), click create credentials -> OAuth Client ID
4. Input the CLIENT_ID, CLIENT_SECRET, REDIRECT URL & the Scopes in the plugin page of Strapi, and save it.

# How to use
### Get Google Authentication URL
 ```js
    {
        method: 'GET',
        path: 'STRAPI_BACKEND_URL/strapi-google-auth/init',
    } 
  ```
After google login, it will redirect the user back to the redirect URL mentioned in the Google project console, with a code parameter in the URL. https://REDIRECT_URL?code=REDIRECTION_AUTH_CODE
    
### Authenticate User
Use the REDIRECTION_AUTH_CODE you have recieved from the step 1 to make the second request to authenticate the user.
```js
    {
        method: 'POST',
        path: 'STRAPI_BACKEND_URL/strapi-google-auth/user-profile',
        data: {
            code:REDIRECTION_AUTH_CODE
        }
    } 
```
### Get Authenticated user details
Use the JWT token to fetch the user details.
```js
    {
        method: 'GET',
        path: 'STRAPI_BACKEND_URL/strapi-google-auth/me',
        header: {
            authorization:Bearer <TOKEN>
        }
    } 
```
### Create/Update Password for user account.
Use the JWT token to fetch the user details.
```js
    {
        method: 'POST',
        path: 'STRAPI_BACKEND_URL/strapi-google-auth/update-password',
        header: {
            authorization:Bearer <TOKEN>
        },
        data:{
            "password":"<NEW PASSWORD>"
        }
    } 
```
# Report Bugs/Issues
Any bugs/issues you may face can be submitted as issues in the Github repo.