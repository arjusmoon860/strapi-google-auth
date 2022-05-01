'use strict';

const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
  async getCredentials(ctx) {
    ctx.body = await strapi
      .plugin('strapi-google-auth')
      .service('google')
      .getGoogleCredentials();
  },
  async createCredentials(ctx) {
    try {
      await strapi
        .plugin('strapi-google-auth')
        .service('google')
        .createGoogleCredentials(ctx.request.body);

      ctx.body = { status: true }
    } catch (error) {
      console.log(error)
      ctx.body = { status: false }
    }
  },
  async initLogin(ctx) {
    try {
      let loginURL = await strapi
        .plugin('strapi-google-auth')
        .service('google')
        .createAuthURL();
      ctx.body = loginURL
    } catch (error) {
      ctx.badRequest("Error fetching the Login URL", null);
    }
  },
  async getUserProfile(ctx) {
    try {
      const code = ctx.request.body.code ? ctx.request.body.code : null;
      if (!code) {
        throw new ValidationError("Invalid/Missing auth code", null);
      }

      let user = await strapi
        .plugin('strapi-google-auth')
        .service('google')
        .getUserProfile(code);

      ctx.body = user;
    } catch (error) {
      ctx.badRequest("Error occured while fetching the user profile", null);
    }
  }
};
