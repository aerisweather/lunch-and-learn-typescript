import request = require('request-promise');

async function fetchLayers(opts: { hostname: string }):Promise<ILayer[]> {
  return request(`http://${opts.hostname}/layers.json`, {
    json: true
  });
}

function viewFromLayers(layers:ILayer[]):IView {
  const categories:IView['categories'] = layers.reduce((cats, lyr) => {
    const catForLyr = cats.find(cat => cat.label === lyr.category);

    // If no category exists for this layer, add one
    if (!catForLyr) {
      const newCat = {
        label: lyr.category,
        layers: [lyr]
      };
      return cats.concat(newCat);
    }

    // Otherwise, add this layer to the existing category
    catForLyr.layers.push(lyr);

    return cats;
  }, []);

  return { categories };
}

function render(view:IView):string {
  return `
    ${renderSethsCss()}
    <h1>Map Layers</h1>
    ${view.categories.map(cat =>
      collapseView({
        title: `<h2>${cat.label}</h2>`,
        content: cat.layers.map(lyr =>
          collapseView({
            title: `<h3>${lyr.name}</h3>`,
            content: dl({
              Code: lyr.id,
              Updates: lyr.updateInterval,
              Regions: lyr.regions,
              Sample: `<img src=${lyr.thumbSrc} />`
            })
          })
        ).join('')
      })
    ).join('')}
  `;
}

function renderCss():string {
  return `
  <style>
    h2 {
      font-size: 34px;
      margin: 30px 0 0 0;
    }
    h3 {
      margin: 10px 0 0 0;
    }
    summary h2, summary h3 {
      display: inline-block;
    }
  </style>
  `;
}

function renderSethsCss():string {
  return `
  <style>
    html {
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
        margin: 0 50px;
    }
    h1 {
        color: #111;
        font-size: 2.5em;
        font-weight: 500;
        line-height: 1.1;
        padding-top: 50px;
        padding-bottom: 10px;
        border-bottom: #036b93 3px solid;
    }
    h2 {
        margin: 30px 0 0 0;
    }

    h3 {
        margin: 10px 0 0 0;
    }

    summary h2, summary h3 {
        display: inline-block;
    }

    details details {
        margin-left: 4px;
        padding-left: 2em;
        border-left: #036b93 3px solid;
    }

    dl {
        padding: 0.5em;
    }
    dt {
        float: left;
        clear: left;
        width: 100px;
        text-align: right;
        font-weight: bold;
        color: #036b93;
    }
    dt::after {
        content: ":";
    }
    dd {
        margin: 0 0 0 110px;
        padding: 0 0 0.5em 0;
    }
  </style>
   `;
}

function collapseView(opts: {
  title: string;
  content: string;
}):string {
  return `
    <details>
      <summary>${opts.title}</summary>
      ${opts.content}
    </details>
  `;
}

function dl(items:{ [term:string]: string }):string {
  return `
    <dl>
      ${Object.keys(items).reduce((html, term) =>
        `${html}
        <dt>${term}</dt>
        <dd>${items[term]}</dd>
        `,
        ''
      )}
    </dl>
  `;
}



async function main():Promise<void> {
  try {
    // Fetch our layers.json
    const layers:ILayer[] = await fetchLayers({
      hostname: 'cdn.aerisjs.com'
    });

    // Convert the layers.json to a view model
    const view:IView = viewFromLayers(layers);

    // Render our view model into HTML
    const html:string = render(view);

    // Print html to stdout
    console.log(html);

    // Exit
    process.exit(0);
  }
  catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
}
main();

interface IView {
  categories: {
    label: string;
    layers: ILayer[];
  }[];
}

interface ILayer {
  id: string;
  name: string;
  category: string;
  thumbSrc: string;
  updateInterval: string;
  regions: string;
  description: string;
  bundle: string[];
  modifiers: {
    label: string;
    description: string;
    required: Boolean;
    options: {
      id: string;
      label: string;
    }[];
  }[];
}

