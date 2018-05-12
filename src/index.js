import {
    getElementById
} from './utils'

import './index.scss'
import header from './partials/_header'
import grid from './partials/grid'
import border from './partials/border'
import ellipsis from './partials/ellipsis'
import ripple from './partials/ripple'

function init() {
    const Main = getElementById('Main')

    header(Main)
    border(Main)
    ellipsis(Main)
    ripple(Main)
    grid(Main)
}

init()
