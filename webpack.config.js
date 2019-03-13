var path = require('path')
var webpack = require('webpack')

module.exports = {//commonjs规范
  entry: './src/main.js',//入口文件
  output: {//出口文件
    path: path.resolve(__dirname, './dist'),//放到dist目录下，npm run build的生成目录
    publicPath: '/dist/',//放在内存当中，是测试输出目录
    filename: 'build.js'//文件名称
  },
  module: {//模块
    rules: [//规则
      {
        test: /\.css$/,//正则匹配
        use: [
          'vue-style-loader',//loader称为加载器
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]//loader是从右向左解析的
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },

      {
        test: /\.(woff)|(svg)|(eot)|(ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50000,   //小于50K的 都打包
              name: "[hash:8].[name].[ext]",
            }
          }
        ]
      }, 

    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {//映射
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

/* 
1.入口文件
2.出口文件
3.加载器操作
4.插件管理
*/