const { createApp } = Vue;
      const { createI18n } = VueI18n;

      const i18n = createI18n({
        locale: "zh",
        messages: {
          zh: {
            message: {
                test_title: '人格心理类型测试'
            }
          },
          en: {
            message: {
                test_title: 'Personality type Test'
            }
          }
        }
      });

      const i18napp = createApp({});
      i18napp.use(i18n);
      i18napp.mount("#app");