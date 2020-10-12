import GetTextPlugin, { GetTextOptions } from "../src";
import { mount } from "@vue/test-utils";

export const mountWithPlugin = (pluginOptions: Partial<GetTextOptions>) => (
  componentOptions: any
) =>
  mount(componentOptions, {
    global: {
      plugins: [
        [
          GetTextPlugin,
          pluginOptions,
        ] as any,
      ],
    },
  });
