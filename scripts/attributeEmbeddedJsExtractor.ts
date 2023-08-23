import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser";
import { JsParser } from "gettext-extractor/dist/js/parser";
import { Validate } from "gettext-extractor/dist/utils/validate";

export function attributeEmbeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  return (node: any, fileName: string, _, nodeLineNumberStart) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    const element = node as Element;
    element.attrs.forEach((attr) => {
      let lineNumberStart = nodeLineNumberStart;
      const attributeLineNumber = element.sourceCodeLocation?.attrs[attr.name]?.startLine;

      if (attributeLineNumber) {
        lineNumberStart += attributeLineNumber - 1;
      }

      jsParser.parseString(attr.value, fileName, {
        lineNumberStart,
      });
    });
  };
}
