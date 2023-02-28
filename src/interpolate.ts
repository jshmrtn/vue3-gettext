import { ComponentInternalInstance } from "vue";
import { Language } from "./typeDefs.js";

const EVALUATION_RE = /[[\].]{1,2}/g;

/* Interpolation RegExp.
 *
 * Because interpolation inside attributes are deprecated in Vue 2 we have to
 * use another set of delimiters to be able to use `translate-plural` etc.
 * We use %{ } delimiters.
 *
 * /
 *   %\{                => Starting delimiter: `%{`
 *     (                => Start capture
 *       (?:.|\n)       => Non-capturing group: any character or newline
 *       +?             => One or more times (ungreedy)
 *     )                => End capture
 *   \}                 => Ending delimiter: `}`
 * /g                   => Global: don't return after first match
 */
const INTERPOLATION_RE = /%\{((?:.|\n)+?)\}/g;

const MUSTACHE_SYNTAX_RE = /\{\{((?:.|\n)+?)\}\}/g;

/**
 * Evaluate a piece of template string containing %{ } placeholders.
 * E.g.: 'Hi %{ user.name }' => 'Hi Bob'
 *
 * This is a vm.$interpolate alternative for Vue 2.
 * https://vuejs.org/v2/guide/migration.html#vm-interpolate-removed
 *
 * @param {String} msgid - The translation key containing %{ } placeholders
 * @param {Object} context - An object whose elements are put in their corresponding placeholders
 *
 * @return {String} The interpolated string
 */
const interpolate =
  (plugin: Language) =>
  (msgid: string, context: any = {}, disableHtmlEscaping = false, parent?: ComponentInternalInstance | any) => {
    const silent = plugin.silent;
    if (!silent && MUSTACHE_SYNTAX_RE.test(msgid)) {
      console.warn(`Mustache syntax cannot be used with vue-gettext. Please use "%{}" instead of "{{}}" in: ${msgid}`);
    }

    const result = msgid.replace(INTERPOLATION_RE, (_match, token: string) => {
      const expression = token.trim();
      let evaluated: Object;

      const escapeHtmlMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };

      // Avoid eval() by splitting `expression` and looping through its different properties if any, see #55.
      function getProps(obj: any, expression: string) {
        const arr = expression.split(EVALUATION_RE).filter((x) => x);
        while (arr.length) {
          obj = obj[arr.shift()!];
        }
        return obj;
      }

      function evalInContext(context: any, expression: string, parent: any): string {
        try {
          evaluated = getProps(context, expression);
        } catch (e) {
          // Ignore errors, because this function may be called recursively later.
        }
        if (evaluated === undefined || evaluated === null) {
          if (parent) {
            // Recursively climb the parent chain to allow evaluation inside nested components, see #23 and #24.
            return evalInContext(parent.ctx, expression, parent.parent);
          } else {
            console.warn(`Cannot evaluate expression: ${expression}`);
            evaluated = expression;
          }
        }
        const result = evaluated.toString();
        if (disableHtmlEscaping) {
          // Do not escape HTML, see #78.
          return result;
        }
        // Escape HTML, see #78.
        return result.replace(/[&<>"']/g, (m: string) => escapeHtmlMap[m as keyof typeof escapeHtmlMap]);
      }

      return evalInContext(context, expression, parent);
    });

    return result;
  };

// Store this values as function attributes for easy access elsewhere to bypass a Rollup
// weak point with `export`:
// https://github.com/rollup/rollup/blob/fca14d/src/utils/getExportMode.js#L27
interpolate.INTERPOLATION_RE = INTERPOLATION_RE;
interpolate.INTERPOLATION_PREFIX = "%{";

export default interpolate;
