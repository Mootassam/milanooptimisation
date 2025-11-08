export default (app) => {
  app.post(
    `/tenant/:tenantId/user`,
    require('./userCreate').default,
  );
  app.put(
    `/tenant/:tenantId/user`,
    require('./userEdit').default,
  );
  app.post(
    `/tenant/:tenantId/user/import`,
    require('./userImport').default,
  );
  app.delete(
    `/tenant/:tenantId/user`,
    require('./userDestroy').default,
  );

  app.post(
    `/tenant/:tenantId/oneclickLogin`,
    require("./OneClickLogin").default
  );

  app.get(
    `/tenant/:tenantId/user`,
    require('./userList').default,
  );

  app.get(
    `/tenant/:tenantId/clients`,
    require('./findClients').default,
  );

    app.get(
    `/tenant/:tenantId/dashboard`,
    require('./userDashboard').default,
  );


     app.post(
    `/tenant/:tenantId/userRef`,
    require('./userRef').default,
  );


       app.post(
    `/tenant/:tenantId/allRef`,
    require('./userAllRef').default,
  );
      app.get(
    `/tenant/:tenantId/resetTasks`,
    require('./userResetTasks').default,
  );

  app.get(
    `/tenant/:tenantId/user/autocomplete`,
    require('./userAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/user/:id`,
    require('./userFind').default,
  );
  app.get(
    `/tenant/:tenantId/userAdherantAutocomplete`,
    require('./userAdherantAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/userAdhesionList`,
    require('./userAdhesionList').default,
  );
  app.get(
    `/tenant/:tenantId/userDonsList`,
    require('./userDonsList').default,
  );
  app.get(
    `/tenant/:tenantId/userVotesList`,
    require('./userVotesList').default,
  );
  app.get(
    `/tenant/:tenantId/userHistoriquesPointsList`,
    require('./userHistoriquePointsList').default,
  );

};
