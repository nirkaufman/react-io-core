import { render } from './react-dom.js';

const React = function () {
  let hooks = [];
  let idx = 0;

  // todo: consider implementing the workQueue
  function workLoop() {
    idx = 0;
    render();
    setTimeout(workLoop, 1000);
  }

  setTimeout(workLoop, 1000);

  function createElement(type, props, ...children) {
    return { type, props, children };
  }

  function useState(initialValue) {
    let state = hooks[idx] || initialValue;
    let _idx = idx;

    function setState(newValue) {
      hooks[_idx] = newValue;
    }

    idx++;
    return [state, setState];
  }

  // an immutable Object with a mutable property
  function useRef(initialValue = null) {
    const ref = Object.freeze({ current: initialValue });
    return useState(ref)[0];
  }

  function useEffects(callBackFn, dependencies) {
    const cachedDependencies = hooks[idx];
    let hasChanged = true;

    if (cachedDependencies) {
      hasChanged = dependencies.some((dependency, idx) => !Object.is(dependency, cachedDependencies[idx]));
    }

    if (hasChanged) callBackFn();

    hooks[idx] = dependencies;
  }

  return {
    createElement,
    useState,
    useRef,
    useEffects
  };
}();

export default React;