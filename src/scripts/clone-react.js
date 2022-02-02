const container = document.querySelector('#root')

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

// Uso do create element
// (
//   "div",
//   { id: "foo" },
//   Didact.createElement("a", null, "bar"),
//   Didact.createElement("b")
// )
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === 'object' 
          ? child 
          : createTextElement(child)),
    },
  }
}

async function render(element, container) {
  const dom = 
    element.type === 'TEXT_ELEMENT'
     ? document.createTextNode("")
     : document.createElement(element.type)

  const isProperty = (key) => key !== "children";
  
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  
  await element.props.children.forEach(child => 
    render(child, dom)
  );

  container.appendChild(dom);
}

const Didact = {
  createElement,
  render,
}

const p = Didact.createElement('p', null, 'Que maravilha de react')

Didact.render(Didact.createElement('h1', { innerHTML: 'Jaimin' }), container);
