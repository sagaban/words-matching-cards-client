module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },
  transpileDependencies: ["quasar"],
  pwa: {
    themeColor: "#3f51b5",
    msTileColor: "#ffffff",
    name: "Word cards for Patatina",
    manifestOptions: {
      short_name: "Word cards"
    }
  }
};
