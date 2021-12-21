import _ from 'lodash';

import $ from 'jquery';

import Handlebars from 'handlebars/dist/handlebars.js';
import render from './cylinder';
import renderCube from './cube';

const appEl = document.getElementById('app');
const appEl2 = document.getElementById('app2');

async function hashHandler() {
  console.log('hashHandler');
  console.log('The hash has changed!', location.hash);
  
  const hash = !location.hash ? '#/' : location.hash;
  const content = await routes[hash]();
  if (content !== undefined) {
    appEl.innerHTML = content;
  }
}

function buy(id) {
  console.log(`Buy product with ${id} `);
}

async function init() {
  console.log('init');
  appEl.innerHTML = "";
  const hash = !location.hash ? '#/' : location.hash;
  const content = await routes[hash]();
  if (content !== undefined) {
    appEl.innerHTML = content;
  } else {
    console.log('content is undefined');
  }
}

function buildTemplate(tmpId, context) {
  var template = $('#' + tmpId).html();

  // Compile the template data into a function
  var templateScript = Handlebars.compile(template);
  var html = templateScript(context);
  return html;
}

const routes = {
    '#/': () => {
    return 'default page'
  }, 
  '#/cylinder': () => {
    appEl.innerHTML = "";
    render("#app");
  },
  '#/cube': () => {
    appEl.innerHTML = "";
    renderCube("#app");
  },
  '#/cylinder2': () => {
    appEl2.innerHTML = "";
    render("#app2");
  },
  '#/cube2': () => {
    appEl2.innerHTML = "";
    renderCube("#app2");
  },
  '#/products': async() => {
    const products =  [{
        "id": 1,
        "name": "Mjau",
      },
      {
        "id": 2,
        "name": "Paws",
      },
      {
        "id": 3,
        "name": "Kitten No 4",
      }
    ];
    return buildTemplate('products-list', { products: products })
  }
}

init();

window.buy = buy;
window.addEventListener('hashchange', hashHandler, false);