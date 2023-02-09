import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser";
import { JsParser } from "gettext-extractor/dist/js/parser";
import { Validate } from "gettext-extractor/dist/utils/validate";

export function attributeEmbeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  return (node: any, fileName: string, _, lineNumberStart) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    const element = node as Element;
    element.attrs.forEach((attr) => {
      const startLine = element.sourceCodeLocation?.attrs[attr.name]?.startLine
      if (startLine) {
        lineNumberStart = lineNumberStart + startLine - 1
      }
      jsParser.parseString(attr.value, fileName, {
        lineNumberStart,
      });
    });
  };
}
