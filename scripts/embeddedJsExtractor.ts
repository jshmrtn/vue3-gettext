import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser";
import { ElementSelectorSet } from "gettext-extractor/dist/html/selector";
import { JsParser } from "gettext-extractor/dist/js/parser";
import { Validate } from "gettext-extractor/dist/utils/validate";
import { DefaultTreeChildNode, DefaultTreeTextNode } from "parse5";
import { ScriptKind } from "typescript";

type Template = Element & {
  tagName: "template";
  content: { nodeName: string; childNodes: DefaultTreeChildNode[] };
};

export function embeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  const selectors = new ElementSelectorSet(selector);

  return (node: any, fileName: string, _, lineNumberStart: number) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    const element = node as Element | Template;

    if (selectors.anyMatch(element)) {
      const children = element.nodeName === "template" ? (element as Template).content.childNodes : element.childNodes;

      children.forEach((childNode) => {
        if (childNode.nodeName === "#text") {
          const currentNode = childNode as DefaultTreeTextNode;

          jsParser.parseString(currentNode.value, fileName, {
            scriptKind: ScriptKind.Deferred,
            lineNumberStart: currentNode.sourceCodeLocation?.startLine
              ? currentNode.sourceCodeLocation?.startLine + lineNumberStart - 1
              : lineNumberStart,
          });
        }
      });
    }
  };
}
