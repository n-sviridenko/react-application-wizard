/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

function App(props) {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React app"
        defaultTitle="React app"
        meta={[
          { name: 'description', content: 'A React app' },
        ]}
      />
      {React.Children.toArray(props.children)}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
