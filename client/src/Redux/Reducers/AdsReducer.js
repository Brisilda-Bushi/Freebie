import { adsType } from "../ActionTypes";

const allAds = {
  ads: [],
  filteredAds: [],
  title: "",
  category: "Select category",
  creator: []
}

export const adsReducer = (state = allAds, action) => {

  switch (action.type) {
    case adsType.FETCH_ADS:
      return { ...state, ads: action.payload, filteredAds: action.payload };
    case adsType.FETCH_AD:
      return { ...state, ad: action.payload };
    case adsType.FILTER_BY_CATEGORY:
      return { ...state, filteredAds: action.payload.ads, category: action.payload.category };
    case adsType.FILTER_BY_SEARCH:
      return { ...state, filteredAds: action.payload.ads, title: action.payload.title };
    case adsType.POST_AD:
      return { ...state, ads: [...state.ads, action.payload], filteredAds: [...state.ads, action.payload] };
    case adsType.UPDATE_AD:
      return { ...state, ads: state.ads.map((individualAds) => individualAds._id === action.payload._id ? action.payload : individualAds ), filteredAds: state.ads.map((individualAds) => individualAds._id === action.payload._id ? action.payload : individualAds ) }
    case adsType.FILTER_POSTED_BY_USER:
      return { ...state, creator: action.payload.creator };
    case adsType.DELETE_AD_POSTED_BY_USER:
      return {
        ...state,
        ads: state.ads.filter(({ _id }) => _id !== action.payload), 
        filteredAds: state.ads.filter(({ _id }) => _id !== action.payload), 
      };
    default:
      return state;
  }
  
};

export const adReducer = (state = {}, action) => {
  switch (action.type) {
    case adsType.FETCH_AD:
      return { ...state, ...action.payload };
    case adsType.REMOVE_AD:
      return {};
    default:
      return state;
  }
};
