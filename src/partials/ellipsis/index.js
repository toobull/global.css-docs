import {
    appendHtml
} from '@/utils'

import './ellipsis.scss'
import tpl from './ellipsis.pug'

export default function (el) {
    appendHtml(el, tpl())
}