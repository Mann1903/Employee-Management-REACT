import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
const ContextEg=()=>{
    let {theme,setTheme}=useContext(ThemeContext);
    return (
      //<ThemeContext.Consumer>
      <div
        style={{
          color: theme.color,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <div>
          <select
            value={theme.backgroundColor}
            onChange={(e) => {
              setTheme({
                ...theme,
                backgroundColor: e.target.value,
              });
            }}
          >
            <option value="green">Green</option>
            <option value="red">Red</option>
          </select>
          <select
            value={theme.color}
            onChange={(e) => {
              setTheme({
                ...theme,
                color: e.target.value,
              });
            }}
          >
            <option value="yellow">Yellow</option>
            <option value="black">Black</option>
          </select>
        </div>
        Hello World
      </div>
      //</ThemeContext.Consumer>
    );
}
export default ContextEg;