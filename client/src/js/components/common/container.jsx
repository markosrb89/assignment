import React from 'react'

/**
 * Container that maintains a width across multiple
 * screen sizes.
 * All main components should use Container
*/
const Container = ({ children }) => (
  <main className="container" role="main">
    {children}
  </main>
);

export default Container;