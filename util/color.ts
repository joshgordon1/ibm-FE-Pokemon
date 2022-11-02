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
      return 'bg-red-600 text-white'
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
      return 'bg-indigo-700 text-white'
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
      return 'bg-green-600'
    case "Poison":
    case "Dragon":
      return 'bg-green-400'
    case "Flying":
    case "Water":
    case "Ice":
      return 'bg-blue-500'
    case "Ground":
      return 'bg-yellow-700'
    case "Bug":
    case "Electric":
      return 'bg-yellow-200'
    case "Fairy":
      return 'bg-pink-100'
    case "Fire":
      return 'bg-red-500'
    case "Fighting":
      return 'bg-red-700'
    case "Psychic":
      return 'bg-purple-300'
    case "Rock":
    case "Steel":
    case "Ghost":
    case "Normal":
      return 'bg-gray-50'
    default:
      return 'bg-gray-50'
  }
}