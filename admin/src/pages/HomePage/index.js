/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Box, Link, Button, Flex, Textarea, LinkButton } from '@strapi/design-system';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Typography } from '@strapi/design-system/Typography';
import { GridLayout } from '@strapi/design-system/Layout';
import { TextInput } from '@strapi/design-system/TextInput';
import { Write, Lock, Plus } from '@strapi/icons';
import axiosInstance from "../../utils/axiosInstance";

const HomePage = () => {

  const [creds, setCreds] = useState({
    creds: {
      clientID: "",
      clientSecret: "",
      redirectURL: "",
      defaultScopes: ""
    }
  });

  const [saving, setSaving] = useState(false);
  const [editable, setEditable] = useState(true);

  function handleClientID(clientID) {
    setCreds({
      creds: {
        clientID: clientID,
        clientSecret: creds.creds.clientSecret,
        redirectURL: creds.creds.redirectURL
      }
    })
  }

  function handleClientSecret(clientSecret) {
    setCreds({
      creds: {
        clientID: creds.creds.clientID,
        clientSecret: clientSecret,
        redirectURL: creds.creds.redirectURL
      }
    })
  }

  function handleRedirectURL(redirectURL) {
    setCreds({
      creds: {
        clientID: creds.creds.clientID,
        clientSecret: creds.creds.clientSecret,
        redirectURL: redirectURL
      }
    })
  }

  function handleDefaultScopes(defaultScopes) {
    setCreds({
      creds: {
        clientID: creds.creds.clientID,
        clientSecret: creds.creds.clientSecret,
        redirectURL: creds.creds.redirectURL,
        defaultScopes: defaultScopes
      }
    })
  }

  async function fetchData() {
    try {
      const { data } = await axiosInstance.get(`/${pluginId}/credentials`);
      setCreds({
        creds: {
          clientID: data.google_client_id ? data.google_client_id : "",
          clientSecret: data.google_client_secret ? data.google_client_secret : "",
          redirectURL: data.google_redirect_url ? data.google_redirect_url : "",
          defaultScopes: data.google_scopes ? data.google_scopes : "",
        }
      })
      if (data) {
        if (data.google_client_id && data.google_client_secret && data.google_redirect_url && data.google_scopes) {
          setEditable(false);
        } else {
          setEditable(true);
        }
      } else {
        setEditable(true);
      }
    } catch (error) {
      console.log(error);
      setCreds({
        creds: {
          clientID: "",
          clientSecret: "",
          redirectURL: "",
          defaultScopes: ""
        }
      })
      setEditable(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setSaving(true);
    try {
      await axiosInstance.post(`/${pluginId}/credentials/add`, {
        google_client_id: creds.creds.clientID,
        google_client_secret: creds.creds.clientSecret,
        google_redirect_url: creds.creds.redirectURL,
        google_scopes: creds.creds.defaultScopes,
      })
      await fetchData();
      setSaving(false);
    } catch (error) {
      setSaving(false);
      console.log(error)
    }
  }

  function handleEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    setEditable(true);
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <Box padding={8} background="primary100">
        <BaseHeaderLayout
          navigationAction={
            <Link isExternal href="https://schbang.com">
              Schbang.
            </Link>
          }
          primaryAction={<LinkButton startIcon={<Plus />} size="L" variant="default" href="https://console.cloud.google.com/projectcreate?previousPage=%2Fcloud-resource-manager%3Fproject%3D%26folder%3D%26organizationId%3D">
            Create Google Project
          </LinkButton>}
          title="Google Authenticator" subtitle="By Schbang." as="h2" />
      </Box>

      <Box padding={8} background="neutral100">
        <Box padding={4}>
          <Typography variant="beta">Add/Update your Google Project Details.</Typography>
        </Box>
        <GridLayout>
          <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
            <TextInput required disabled={!editable} placeholder="This is a content placeholder" label="Google Client ID" name="content" hint="Ends with apps.googleusercontent.com" onChange={e => handleClientID(e.target.value)} value={creds.creds.clientID} />
          </Box>
          <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
            <TextInput required type="password" disabled={!editable} placeholder="This is a content placeholder" label="Google Client Secret" name="content" hint="Available in your google project" onChange={e => handleClientSecret(e.target.value)} value={creds.creds.clientSecret} />
          </Box>
          <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
            <TextInput required disabled={!editable} placeholder="This is a content placeholder" label="Redirect URL" name="content" hint="Redirect URL mentioned in the Google Project" onChange={e => handleRedirectURL(e.target.value)} value={creds.creds.redirectURL} />
          </Box>
        </GridLayout>
        <GridLayout>
          <Box padding={4} marginTop={4} hasRadius background="neutral0" shadow="tableShadow">
            <Textarea required disabled={!editable} placeholder="" label="Default Scopes" name="content" hint='{"scopes":["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"]}' onChange={e => handleDefaultScopes(e.target.value)} value={creds.creds.defaultScopes} />
          </Box>
        </GridLayout>
        <Flex marginTop={4} justifyContent="space-between">
          <Button disabled={editable} onClick={handleEdit} size="L" endIcon={<Write />} variant='secondary'>Edit</Button>
          <Button loading={saving} onClick={handleSubmit} size="L" endIcon={<Lock />} variant='default'>Save Credentials</Button>
        </Flex>
      </Box>
    </div>
  );
};

export default memo(HomePage);
