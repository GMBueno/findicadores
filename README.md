# Findicadores

Website using data from [Fintz][1]

## About

Currently, you can access the following information using the website:

- Indexes
- Results
- Ticker prices
- Graphs for all of the above

### Examples

General data:

![PETR4.png](src/assets/PETR4.png)

Historical graph (click on index)

![PETR4.png](src/assets/PETR4_LPA.png)

## Development

Install dependencies using:

```bash
npm install
```

In order to run the application locally, you will need to copy the example
`.env` file and replace the values with your own:

```bash
cp -v .env.example .env
```

Finally, you can run the development server using:

```bash
npm run dev
```

## Deploy

We deploy to [Vercel][2]. So you just need to run:

```bash
npx vercel
```

[1]: https://fintz.com.br
[2]: https://vercel.com
