import { createGettext } from "../src";
import type { GetTextOptions } from "../src/typeDefs";
import { mount } from "@vue/test-utils";

export const mountWithPlugin = (pluginOptions: Partial<GetTextOptions>) => (componentOptions: any) => {
  const gettext = createGettext(pluginOptions);
  return mount(componentOptions, {
    global: {
      plugins: [gettext],
    },
  });
};
