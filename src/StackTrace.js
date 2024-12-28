import { isSomeString } from "@locustjs/base";
import StackTraceItem from "./StackTraceItem";

class StackTrace {
  constructor(stack) {
    this.items = [];

    if (isSomeString(stack)) {
      const lines = stack.split("\n");

      if (lines.length) {
        for (let i = 1; i < lines.length; i++) {
          this.items.push(new StackTraceItem(lines[i]));
        }
      }
    }
  }
}

export default StackTrace;
