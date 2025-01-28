import { isSomeString } from "@locustjs/base";

class StackTraceItem {
  constructor(line) {
    if (isSomeString(line)) {
      let colonIndex1 = line.lastIndexOf(":");
      let colonIndex2 = line.lastIndexOf(":", colonIndex1 - 1);
      let openParIndex = line.indexOf("(");

      if (openParIndex < 0) {
        openParIndex = colonIndex2;
      }

      let closeParIndex = line.lastIndexOf(")");

      if (closeParIndex < 0) {
        closeParIndex = line.length;
      }

      let numbers = line.substr(
        colonIndex2 + 1,
        closeParIndex - colonIndex2 - 1
      );

      numbers = numbers.split(":");

      this.line = numbers.length > 0 ? parseInt(numbers[0]) : 0;
      this.col = numbers.length > 1 ? parseInt(numbers[1]) : 0;
      this.callSite = line.substr(0, openParIndex).replace("at ", "").trim();
      this.source = line.substr(
        openParIndex + 1,
        colonIndex2 - openParIndex - 1
      );
      this.message = line.trim();
    } else {
      this.line = 0;
      this.col = 0;
      this.callSite = "";
      this.source = "";
      this.message = "";
    }
  }
}

export default StackTraceItem;
