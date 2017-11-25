import Ionicons from 'react-native-vector-icons/Ionicons';



const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ios-home-outline': [30, '#bbb'],
  'ios-home-outline--big': [50, '#bbb'],

  'ios-home-outline--active': [30, '#fff'],
  'ios-home-outline--active--big': [50, '#fff'],
  'ios-home-outline--active--very-big': [100, '#fff']
};

const defaultIconProvider = Ionicons;


let iconsMap = {};

let iconsLoaded = async () => {};


export {
  iconsMap,
  iconsLoaded
};