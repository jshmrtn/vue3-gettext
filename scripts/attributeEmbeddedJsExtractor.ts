import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser";
import { JsParser } from "gettext-extractor/dist/js/parser";
import { Validate } from "gettext-extractor/dist/utils/validate";

export function attributeEmbeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  return (node: any, fileName: string) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    let element = node as Element;

    element.attrs.forEach((attr) => {
      jsParser.parseString(attr.value, fileName, {
        lineNumberStart: element.sourceCodeLocation?.attrs[attr.name]?.startLine,
      });
    });
  };
}
