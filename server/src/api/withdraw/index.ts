export default (app) => {
  app.post(
    `/tenant/:tenantId/withdraw`,
    require("./withdrawCreate").default
  );
  app.put(
    `/tenant/:tenantId/withdraw/:id`,
    require("./withdrawUpdate").default
  );
  app.post(
    `/tenant/:tenantId/withdraw/import`,
    require("./withdrawImport").default
  );

    app.post(
    `/tenant/:tenantId/withdrawStatus`,
    require("./withdrawStatus").default
  );
  app.delete(
    `/tenant/:tenantId/withdraw`,
    require("./withdrawDestroy").default
  );
  app.get(
    `/tenant/:tenantId/withdraw/autocomplete`,
    require("./withdrawAutocomplete").default
  );
  app.get(
    `/tenant/:tenantId/withdraw`,
    require("./withdrawList").default
  );

    app.get(
    `/tenant/:tenantId/withdrawPending`,
    require("./withdrawPending").default
  );

  app.get(
    `/tenant/:tenantId/withdraw/byUser`,
    require("./withdrawByUser").default
  );
  app.get(
    `/tenant/:tenantId/withdraw/:id`,
    require("./withdrawFind").default
  );
};
