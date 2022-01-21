interface PhotoDimension {
  width?: number;
  height?: number;
}
interface PhotoObject {
  url?: string;
  dimension?: PhotoDimension;
}

interface Photo {
  small?: PhotoObject;
  medium?: PhotoObject;
  large?: PhotoObject;
}
export default Photo;
