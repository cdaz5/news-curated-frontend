import { TagCloud } from "react-tagcloud";
import Categories from '../CategoryData/Categories.js';


const data = Categories.map((category) => {
  return { value: category.label, count: 30 }
})
console.log(data)
