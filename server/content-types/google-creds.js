module.exports = {
    "kind": "singleType",
    info: {
        "displayName": "Google Credentials",
        "singularName": "google-credential",
        "pluralName": "google-credentials",
        "description": "Stores google project credentials",
        "tableName": "google_auth_creds",
    },
    options: {
        "privateAttributes": ["id", "created_at"],
        "populateCreatorFields": true,
        "draftAndPublish": true
    },
    pluginOptions: {
        "content-manager": {
            "visible": false
        },
        "content-type-builder": {
            "visible": false
        }
    },
    attributes: {
        "google_client_id": {
            "type": "string",
            "configurable": false,
            "required": true,
            "default": null
        },
        "google_client_secret": {
            "type": "string",
            "configurable": false,
            "required": true,
            "default": null
        },
        "google_redirect_url": {
            "type": "string",
            "configurable": false,
            "required": true,
            "default": null
        },
        "google_scopes": {
            "type": "json",
            "configurable": false,
            "required": true,
            "default": null
        }
    }
}