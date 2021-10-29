import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser";
import { ElementSelectorSet } from "gettext-extractor/dist/html/selector";
import { HtmlUtils } from "gettext-extractor/dist/html/utils";
import { JsParser } from "gettext-extractor/dist/js/parser";
import { Validate } from "gettext-extractor/dist/utils/validate";

export function embeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  let selectors = new ElementSelectorSet(selector);

  return (node: any, fileName: string) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    let element = node as Element;

    if (selectors.anyMatch(element)) {
      let source = HtmlUtils.getElementContent(element, {
        trimWhiteSpace: false,
        preserveIndentation: true,
        replaceNewLines: false,
      });
      console.log(source);
      jsParser.parseString(source, fileName, {
        scriptKind: 1,
        lineNumberStart: (element.sourceCodeLocation && element.sourceCodeLocation.startLine) || 0,
      });
    }
  };
}
