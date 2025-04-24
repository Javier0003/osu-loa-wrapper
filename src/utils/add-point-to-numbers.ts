/** 
 * This function takes a number and returns it as a string with commas added
*/
export default function addPointToNumbers(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}