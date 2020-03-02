import { createPage } from 'react-torch/page'
import store from './Model'
import View from './View'

const About = createPage(View, store)

export default About