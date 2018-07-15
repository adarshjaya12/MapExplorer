import "es6-promise";
import { render } from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';
import PlaceContainer from './place-container';


var app = React.createElement(PlaceContainer);
const appMount = document.getElementById('app');
render(app, appMount);