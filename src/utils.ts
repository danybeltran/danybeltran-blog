const applyClasses = (elements: NodeListOf<Element>, classes: string) => {
  elements.forEach((element) => {
    element.className = classes;
  });
};
/**
 * When loading the page, params[0] will be
 * the tags to search, and params[1] the
 * classname(s) that will be applied to all matches
 * */
export function addClassNameTo(
  node: HTMLElement,
  params: Array<[string, string]>
) {
  params.forEach(([tag, classlist]) => {
    applyClasses(node.querySelectorAll(tag), classlist);
  });
}
