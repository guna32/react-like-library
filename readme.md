
1. render method appends built dom to the container
2. babel parses the JSX to using pragma function
3. babel passes element type, dictionary of attributes and children to this pragma
4. custom pragma creates an object with the arguments as properties
5. build the dom with this pragma returned object and retruns the created node to render
