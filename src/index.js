import React from 'react'
import { render ,unMountComponent,findDOMNode} from 'react-dom';
import stylefrom from './index.css'
import Blog from './Blog'

render(
    <Blog />,document.getElementById('app')
)
