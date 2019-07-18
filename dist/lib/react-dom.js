import { isEvent, isFunction, isString, isNumber } from "./react-utils.js";

let _currentApp = null;
let _rootReactElement = null;
let _rootDomElement = null;

export function render(rootReactElement = _rootReactElement, rootDomElement = _rootDomElement) {
  const app = renderElement(rootReactElement);

  _rootReactElement = rootReactElement;
  _rootDomElement = rootDomElement;

  _currentApp ? rootDomElement.replaceChild(app, _currentApp) : rootDomElement.appendChild(app);

  _currentApp = app;
}

function renderElement(reactElement) {
  const { type, props, children } = reactElement;

  if (isFunction(type)) {
    return renderElement(type(props));
  }

  if (isString(type)) {
    const domElement = document.createElement(type);

    children.forEach(child => {
      let node;

      if (isString(child)) {
        node = document.createTextNode(child);
      } else if (isNumber(child)) {
        node = document.createTextNode(child.toString());
      } else {
        node = renderElement(child);
      }

      domElement.appendChild(node);
    });

    for (let key in props) {
      if (isEvent(key)) {
        const eventName = key.substring(2).toLowerCase();
        domElement.addEventListener(eventName, props[key]);
      } else if (key in domElement) {
        domElement[key] = props[key];
      } else {
        domElement.setAttribute(key, props[key]);
      }
    }

    return domElement;
  }
}

export default {
  render
};