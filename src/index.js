const createElement = (elementType, props, ...children) => {
  return {
    elementType: elementType,
    props: props,
    children: children.flat() /** FLATTEN THE CHILD ELEMENTS ARRAY **/,
  };
};

const buildDOM = (vnode) => {
  // TODOS:
  // create a DOM element using the document API
  // set attributes (props) of the newly created DOM element
  // render the children of vdom
  // return the created DOM element
  const { elementType, props, children } = vnode;

  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  /** ADDED SUPPORT FOR FUNCTION COMPONENTS */
  if (typeof vnode.elementType === "function") {
    return buildDOM(
      vnode.elementType({ ...vnode.props, children: vnode.children })
    );
  }

  let node = document.createElement(elementType);

  for (prop in props) {
    node.setAttribute(prop, props[prop]);
  }

  for (child of children) {
    node.appendChild(buildDOM(child));
  }

  return node;
};

const render = (vdom, container) => {
  // TODOS:
  // Build DOM element by using our buildDOM function
  // Render (append) DOM elements to the container

  container.appendChild(buildDOM(vdom));
};

const starters = [
  {
    name: "bulbasaur",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    name: "charmander",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    name: "squirtle",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
];

const TitleBox = ({ title, children }) => {
  return (
    <div style={{ padding: "2em" }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div style={"text-align: center;"}>
      <TitleBox title={"Pokemon"}>
        {starters.map(({ name, img }) => (
          <div>
            <img src={img} />
            <p>{name}</p>
          </div>
        ))}
      </TitleBox>
    </div>
  );
};

const container = document.getElementById("root"); // Our HTML document's body element
render(<App />, container);

console.log("Hey, it loaded!");
