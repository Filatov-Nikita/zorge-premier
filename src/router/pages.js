import MobileDetect from 'mobile-detect'

import Home from '../desktop/pages/Home'
import Location from '../desktop/pages/Location'
import Building from '../desktop/pages/Building'
import Gallery from '../desktop/pages/Gallery'
import Filter from '../desktop/pages/Filter'
import Select from '../desktop/pages/Select'
import Storey from '../desktop/pages/Storey'
import Parking from '../desktop/pages/Parking'
import ApartmentConcepts from '../desktop/pages/ApartmentConcepts'
import Engineering from '../desktop/pages/Engineering'
import Events from '../desktop/pages/Events'
import Event from '../desktop/pages/Event'
import Contacts from '../desktop/pages/Contacts'
import Developer from '../desktop/pages/Developer'

import MobileHome from '../mobile/pages/Home'
import MobileGallery from '../mobile/pages/Gallery'
import MobileLocation from '../mobile/pages/Location'
import MobileSelect from '../mobile/pages/Select'
import MobileStorey from '../mobile/pages/Storey'
import MobileParking from '../mobile/pages/Parking'
import MobileFilter from '../mobile/pages/Filter'
import MobileBuilding from '../mobile/pages/Building'
import MobileApartmentConcepts from '../mobile/pages/ApartmentConcepts'
import MobileEngineering from '../mobile/pages/Engineering'
import MobileEvents from '../mobile/pages/Events'
import MobileEvent from '../mobile/pages/Event'
import MobileContactsEvent from '../mobile/pages/Contacts'
import MobileDeveloper from '../mobile/pages/Developer'

const pages = () => {
  if ((new MobileDetect(window.navigator.userAgent)).mobile()) {
    return {
      'Home': MobileHome,
      'Location': MobileLocation,
      'Building': MobileBuilding,
      'Gallery': MobileGallery,
      'Filter': MobileFilter,
      'Select': MobileSelect,
      'Storey': MobileStorey,
      'Parking': MobileParking,
      'ApartmentConcepts': MobileApartmentConcepts,
      'Engineering': MobileEngineering,
      'Events': MobileEvents,
      'Event': MobileEvent,
      'Contacts': MobileContactsEvent,
      'Developer': MobileDeveloper
    }
  } else {
    return {
      Home,
      Location,
      Building,
      Gallery,
      Filter,
      Select,
      Storey,
      Parking,
      ApartmentConcepts,
      Engineering,
      Events,
      Event,
      Contacts,
      Developer
    }
  }
}

export default pages()
