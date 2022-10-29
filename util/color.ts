/**
 * 
 * @param type string
 * @returns a tailwind color class
 */
export function getTypeColor(type: string) {
  switch(type) {
    case "Grass":
      return 'border-green-700 text-green-700 '
    case "Poison":
      return 'border-green-200 text-green-200'
    case "Fire":
      return 'border-red-500 text-red-500'
    case "Flying":
      return 'border-blue-50 text-blue-50'
    case "Water":
      return 'border-blue-600 text-blue-600'
    case "Bug":
      return 'border-yellow-300 text-yellow-300'
    case "Normal":
      return 'border-black text-black'
    case "Electric":
      return 'border-yellow-200 text-yellow-200'
    case "Ground":
      return 'border-yellow-800 text-yellow-800'
    case "Fairy":
      return 'border-pink-200 text-pink-200'
    case "Fighting":
      return 'border-red-900 text-red-900'
    case "Psychic":
      return 'border-purple-400 text-purple-400'
    case "Rock":
      return 'border-gray-800 text-gray-800'
    case "Steel":
      return 'border-gray-200 text-gray-200'
    case "Ice":
      return 'border-blue-100 text-blue-100'
    case "Ghost":
      return 'border-gray-100 text-gray-100'
    case "Dragon":
      return 'border-green-300 text-green-300'
    default:
      return 'border-black text-black'
  }
}