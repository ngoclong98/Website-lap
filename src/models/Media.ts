import Photo from "./Photo";
interface Media {
  id: string;
  type: string;
  caption?: string;
  urls?: Photo;
}
export default Media;
