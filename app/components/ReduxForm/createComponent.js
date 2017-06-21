import { Component, createElement } from 'react';

/**
 * Creates a component class that renders the given component
 *
 * @param WrappedComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */
export default function createComponent(WrappedComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.component;
    }

    render() {
      return createElement(WrappedComponent, {
        ...mapProps(this.props),
        ref: (c) => {
          this.component = c;
        },
      });
    }
  }

  InputComponent.displayName = `ReduxForm${WrappedComponent.name}`;

  return InputComponent;
}
