import {
    appendHtml
} from '@/utils'

import './border.scss'
import tpl from './border.pug'

export default function (el) {
    appendHtml(el, tpl())
}