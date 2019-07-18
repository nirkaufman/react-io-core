import React from "./lib/react.js";

export function App() {
    const [counter, setCounter] = React.useState(1);

    React.useEffects(() => {
        console.log('side effects!');
    }, [counter]);

    return React.createElement('div', null, React.createElement('h1', null, 'React Core'), React.createElement('button', { onclick: () => {
            setCounter(counter + 1);
        } }, `click me! ${counter}`));
}