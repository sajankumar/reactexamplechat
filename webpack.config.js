var config = {
   entry: './public/js/app.js',
	
   output: {
      path:'./public/built',
      filename: 'app.js',
   },
	 devServer: {
      inline: true,
      port: 8080
   },
   module: {
      loaders: [
         {
            script: 'node server.js',
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;