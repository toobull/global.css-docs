import {
    appendHtml
} from '@/utils'

import './grid.scss'
import tpl from './grid.pug'

export default function (el) {
    appendHtml(el, tpl({
        grid: getGrid()
    }))
}


function getGrid() {
    let grid = []
    let max = 24
    let i = max
    while (i--) {
        grid.push(i + 1)
        if (max - i - 1) {
            grid.push(max - i - 1)
        }
    }
    return grid
}
