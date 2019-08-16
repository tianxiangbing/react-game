
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  disableCSSModules:true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'www',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
