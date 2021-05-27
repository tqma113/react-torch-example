import type { TorchConfig } from 'react-torch'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const config: TorchConfig = {
  title: 'React-torch-example',
  transformWebpackConfig: (config, packContext, torchConfig) => {
    if (packContext.packSide === 'client') {
      config.plugins?.push(new BundleAnalyzerPlugin())
    }
    return config
  }
}

export default config