This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you should run:

```npm install```

Install all the dependencies.
`Antd`: Ant design help to build the ui quickly
`papaparse`: Convert csv files to json 
`axios`: Call the resful api easily
`react-router-dom`: help setup the router

```npm start```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Test the system
2 csv files were provided, `product.csv` and `inventory.csv`. Before testing the inventory system, users should add the location by `Inventory Location` on the side menu. (Add `TKO` and `CWB`).
<br />

Then, user may upload the `product.csv` by the top left button on the `Product` page.
After that, user may upload the `inventory.csv` by the button next to the upload product button.
To transfer the product, users can click the product name in the product page, then input both locations and quantity.

### Daily
Day 1: Create a new react app, successfully connect the restful endpoint. Create `ProductApp` and `LocationApp`.
<br />

Day 2: Setup the `RouterApp` and create `InventoryApp`. Implement `papaparse` convert csv files to json.
<br />

Day 3: Test and handle the exceptional cases.
