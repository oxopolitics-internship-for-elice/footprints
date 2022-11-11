import { Poll } from "@/types/GraphTypes";

export default function SortKey(body: Poll) {
    let SorkArray={
        "total":body.total,
        "tiger":body.tiger,
        "hippo":body.hippo,
        "elephant":body.elephant,
        "dinosaur":body.dinosaur,
        "lino":body.lion}  
    return SorkArray;
  }
  