/**
 * 
 * @param type string
 * @returns a tailwind color class
 */
export function getTypeColor(type: string) {
  switch(type) {
    case "Grass":
      return 'bg-green-700 text-white'
    case "Poison":
      return 'bg-green-200 text-black'
    case "Fire":
      return 'bg-red-500 text-white'
    case "Flying":
      return 'bg-blue-100 text-black'
    case "Water":
      return 'bg-blue-600 text-white'
    case "Bug":
      return 'bg-yellow-300 text-black'
    case "Normal":
      return 'bg-black text-white'
    case "Electric":
      return 'bg-yellow-400 text-black'
    case "Ground":
      return 'bg-yellow-800 text-white'
    case "Fairy":
      return 'bg-pink-200 text-black'
    case "Fighting":
      return 'bg-red-900 text-white'
    case "Psychic":
      return 'bg-purple-400 text-white'
    case "Rock":
      return 'bg-gray-800 text-white'
    case "Steel":
      return 'bg-gray-200 text-black'
    case "Ice":
      return 'bg-blue-200 text-black'
    case "Ghost":
      return 'bg-gray-100 text-black'
    case "Dragon":
      return 'bg-green-300 text-white'
    default:
      return 'bg-black text-white'
  }
}

export function getTypeBGColor(type: string) {
  switch(type) {
    case "Grass":
      return 'bg-green-700'
    case "Poison":
      return 'bg-green-200'
    case "Fire":
      return 'bg-red-500'
    case "Flying":
      return 'bg-blue-100'
    case "Water":
      return 'bg-blue-600'
    case "Bug":
      return 'bg-yellow-300'
    case "Normal":
      return 'bg-black'
    case "Electric":
      return 'bg-yellow-400'
    case "Ground":
      return 'bg-yellow-800'
    case "Fairy":
      return 'bg-pink-200'
    case "Fighting":
      return 'bg-red-900'
    case "Psychic":
      return 'bg-purple-400'
    case "Rock":
      return 'bg-gray-800'
    case "Steel":
      return 'bg-gray-200'
    case "Ice":
      return 'bg-blue-200'
    case "Ghost":
      return 'bg-gray-100'
    case "Dragon":
      return 'bg-green-300'
    default:
      return 'bg-black'
  }
}