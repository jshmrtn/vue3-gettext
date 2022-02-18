import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser";
import { ElementSelectorSet } from "gettext-extractor/dist/html/selector";
import { HtmlUtils } from "gettext-extractor/dist/html/utils";
import { JsParser } from "gettext-extractor/dist/js/parser";
import { Validate } from "gettext-extractor/dist/utils/validate";

export function embeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  const selectors = new ElementSelectorSet(selector);

  return (node: any, fileName: string) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    const element = node as Element;

    if (selectors.anyMatch(element)) {
      const source = HtmlUtils.getElementContent(element, {
        trimWhiteSpace: false,
        preserveIndentation: true,
        replaceNewLines: false,
      });
      jsParser.parseString(source, fileName, {
        scriptKind: 1,
        lineNumberStart: (element.sourceCodeLocation && element.sourceCodeLocation.startLine) || 0,
      });
    }
  };
}
