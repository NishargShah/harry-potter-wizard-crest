import Elixirs from '@/components/elixirs/Elixirs.tsx';

import classes from '@/App.module.css';

import type { Component } from '@/types';

const App: Component = () => (
  <div className={classes.container}>
    <h1>Harry Potter Wizard</h1>
    <Elixirs />
  </div>
);

export default App;
