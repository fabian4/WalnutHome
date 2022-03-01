{
    "extends": "@chatie/tsconfig",
    "compilerOptions": {
    "outDir": "dist"
},
    "exclude": [
    "node_modules/",
    "dist/",
    "tests/fixtures/"
],
    "include": [
    "examples/*.ts",
    "scripts/**/*.ts",
    "src/**/*.ts",
    "tests/**/*.ts"
],
}
