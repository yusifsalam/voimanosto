{
    "compileOnSave": true,
    "compilerOptions": {
      "module": "commonjs",
      "strict": true,
      "baseUrl": "./",
      "outDir": "build",
      "sourceMap": true,
      "removeComments": true,
      "experimentalDecorators": true,
      "target": "es5",
      "emitDecoratorMetadata": true,
      "moduleResolution": "node",
      "strictNullChecks": true,
      "importHelpers": true,
      "types": [
        "node"
      ],
      "typeRoots": [
        "node_modules/@types"
      ],
      "lib": [
        "es2015",
        "dom"
      ]
    },
    "include": [
      "./src/**/*.ts"
    ],
    "exclude": [
      "./src/**/*.test.ts",
      "./src/public/"
    ]
  }