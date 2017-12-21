/**
 * this code is based on this gist:
 * https://gist.github.com/dropfen/4a2209d7274788027f782e8655be198f
 */
import Ionicons from 'react-native-vector-icons/Ionicons';



const replaceSuffixPattern = /--(active|big|small|very-small|very-big)/g;

const icons = {
  'ios-home-outline': [30, '#bbb'],
  'ios-home-outline--active': [30, '#fff'],

  'ios-body-outline': [30, '#bbb'],
  'ios-body-outline--active': [30, '#fff'],
  
  'ios-pin-outline': [30, '#bbb'],
  'ios-pin-outline--active': [30, '#fff'],

  'ios-more-outline': [30, '#bbb'],
  'ios-more-outline--big': [50, '#bbb'],

  'ios-more-outline--active': [30, '#fff'],
  'ios-more-outline--active--big': [50, '#fff'],
  'ios-more-outline--active--very-big': [100, '#fff'],

  'ios-close-circle': [20, '#444'],

  'ios-images-outline': [30, '#bbb']
};

const defaultIconProvider = Ionicons;


let iconsMap = {};

let loadIcons = async () => {
  await Object.keys(icons).forEach(
    async (iconName) => {
      const Provider = icons[iconName][2] || defaultIconProvider; // this logic is in case another icon provider is needed
      try {
        iconsMap[iconName] = await Provider.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
          icons[iconName][1]
        );
      }
      catch (err) {
        // TODO: handle this
        console.log(err);
      }
    }
  );
};


export {
  iconsMap,
  loadIcons
};