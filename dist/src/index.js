"use strict";
// import type { Core } from '@strapi/strapi';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register( /* { strapi }: { strapi: Core.Strapi } */) { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        // 1. Identify the 'public' role
        const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
            where: { type: 'public' },
        });
        if (!publicRole)
            return;
        // 2. Identify all API content types
        const contentTypes = Object.entries(strapi.contentTypes)
            .filter(([uid]) => uid.startsWith('api::'))
            .map(([uid]) => uid);
        // 3. Grant 'find' and 'findOne' permissions for each api content type
        for (const contentType of contentTypes) {
            const actions = [`${contentType}.find`, `${contentType}.findOne`].map(action => action.toLowerCase());
            const permissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
                where: {
                    role: publicRole.id,
                    action: { $in: actions }
                },
            });
            for (const permission of permissions) {
                await strapi.db.query('plugin::users-permissions.permission').update({
                    where: { id: permission.id },
                    data: { enabled: true },
                });
            }
        }
        console.log('[Strapi Bootstrap] Public permissions granted for all API collections.');
    },
};
