import React, { useEffect, useState } from "react";
import HeroImage from "../../Components/Header/HeroImage"
import { HiOutlineViewGrid } from "react-icons/hi"
import { HiViewList } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../../Redux/Actions/AdsAction";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import "./Categories.scss"
import SingleAd from "./SingleAd";
import { IoSearchOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { Filter } from "./Filter";

const Categories = () => {

  const ads = useSelector((state) => state.allAds.filteredAds);
  const dispatch = useDispatch();

  const [gridToggle, setGridToggle] = useState(true)
  const buttonHandler = () => {
    setGridToggle(current => !current)
  }

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  const [pageNumber, setPageNumber] = useState(0)
  const postsPerPage = 4;
  const visitedPages = pageNumber * postsPerPage;

  const pageCount = Math.ceil(ads.length / postsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  return (
    <div>
      <HeroImage height="30" minHeight="25" maxHeight="25" />
      <section className="categoriesPageContainer">
        <div className="categoriesAndSearchContainer">
          <div className="searchBarContainer">
            <input type="search" placeholder="Search..." />
            <IoSearchOutline size={20} />
          </div>
          <div className="categoriesContainer">
            <div>
              <span>search by category</span>
            </div>
            <div className="categoriesListsContainer">
              <Filter />
            </div>
          </div>
        </div>
        <div className="infoTabAndproductsList">
          <div className="infoTabContainer">
            <span className="infoTabText">You are seeing total of {ads.length} ads.</span>
            <div className="gridListIconsContainer">
              <div>
                {gridToggle ?
                  <HiViewList onClick={buttonHandler} size={30} />
                  :
                  <HiOutlineViewGrid onClick={buttonHandler} size={30}
                  />}
              </div>
            </div>
          </div>
          <div className="productsListContainer">
            {!ads.length ? (
              <LoadingSpinner />
            ) : (
              <div className={gridToggle ? "latestAdsContain" : null}>
                {ads.slice(visitedPages, visitedPages + postsPerPage).map((adInfo) => (
                  <SingleAd key={adInfo._id} adInfo={adInfo} gridToggle={gridToggle} />
                ))}
              </div>
            )}
            <ReactPaginate previousLabel={"<"} nextLabel={">"} pageCount={pageCount} onPageChange={changePage} containerClassName={"paginationBtn"} activeClassName={"paginationActivePage"} />
          </div>
        </div>
      </section >
    </div >
  )
}

export default Categories
