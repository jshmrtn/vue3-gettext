import translations from "./json/directive.arabic";
import { mountWithPlugin } from "./utils";

const mount = mountWithPlugin({
  availableLanguages: {
    en_US: "American English",
    ar: "Arabic",
  },
  defaultLanguage: "ar",
  translations: translations,
  setGlobalProperties: true,
});

describe("translate arabic directive tests", () => {
  it("translates singular", () => {
    const vm = mount({
      template: `<p>{{ $gettext("Orange") }}</p>`,
      data() {
        return { count: 1 };
      },
    }).vm;
    expect(vm.$el.innerHTML).toEqual("البرتقالي");
  });

  it("translates plural form 0", async () => {
    const count = 0;
    const vm = mount({
      template: '<p>{{ $ngettext("%{ count } day", "%{ count } days", count, { count }) }}</p>',
      data() {
        return { count };
      },
    }).vm;
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual(`${count}أقل من يوم`);
  });

  it("translates plural form 1", () => {
    const count = 1;
    const vm = mount({
      template: '<p>{{ $ngettext("%{ count } day", "%{ count } days", count, { count }) }}</p>',
      data() {
        return { count };
      },
    }).vm;
    expect(vm.$el.innerHTML).toEqual(`${count}يوم واحد`);
  });

  it("translates plural form 2", () => {
    const count = 2;
    const vm = mount({
      template: '<p>{{ $ngettext("%{ count } day", "%{ count } days", count, { count }) }}</p>',
      data() {
        return { count };
      },
    }).vm;
    expect(vm.$el.innerHTML).toEqual(`${count}يومان`);
  });

  it("translates plural form 3", () => {
    const count = 9;
    const vm = mount({
      template: '<p>{{ $ngettext("%{ count } day", "%{ count } days", count, { count }) }}</p>',
      data() {
        return { count };
      },
    }).vm;
    expect(vm.$el.innerHTML).toEqual(`${count} أيام`);
  });

  it("translates plural form 4", () => {
    const count = 11;
    const vm = mount({
      template: '<p>{{ $ngettext("%{ count } day", "%{ count } days", count, { count }) }}</p>',
      data() {
        return { count };
      },
    }).vm;
    expect(vm.$el.innerHTML).toEqual(`${count} يومًا`);
  });

  it("translates plural form 5", async () => {
    const count = 3000;
    const vm = mount({
      template: '<p>{{ $ngettext("%{ count } day", "%{ count } days", count, { count }) }}</p>',
      data() {
        return { count };
      },
    }).vm;
    expect(vm.$el.innerHTML).toEqual(`${count} يوم`);
  });
});
