import { describe } from "@asdgf/core";
import { describeTestFor } from '../src/index.js';
import { MyCounter } from './MyCounter.js';

describeTestFor(MyCounter, { describe });
