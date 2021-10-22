import React, { useEffect, useState } from "react";
import "./MyFavorites.scss";
import Axios from "axios";
import UserNavBar from "../../UserNavBar/UserNavBar";
import { BsEye } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const FavoritePage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userFrom = user.result._id;

  const [FavoritedItems, setFavoritedItems] = useState([]);
  console.log(FavoritedItems);

  useEffect(() => {
    fetchFavoritedItems();
    // eslint-disable-next-line
  }, []);

  const fetchFavoritedItems = () => {
    const variable = {
      userFrom,
    };
    Axios.post("/api/favorite/getFavoritedItem", variable).then((response) => {
      if (response.data.success) {
        setFavoritedItems(response.data.favorites);
      } else {
        alert("Failed to get favorited items");
      }
    });
  };

  const onClickRemove = (itemId) => {
    const variable = {
      itemId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorite", variable).then(
      (response) => {
        if (response.data.success) {
          fetchFavoritedItems();
        } else {
          alert(" Failed to remove from favorite");
        }
      }
    );
  };

  const renderBody = FavoritedItems.map((item) => {
    console.log(item);

    return (
      <div className="favoritesByUserContainer">
        <ul className="favoritesByUserList">
          <li className="favoriteItemImageContainer">
            <img
              className="favoriteItemImage"
              src={item.itemImage}
              alt="ad-img"
            />
          </li>
          <div className="favoritesByUserInfoContainer">
            <ul className="favoriteItemSubContainer">
              <li className="favoriteItemTitle">{item.itemTitle}</li>
              <li className="favoriteItemCategory">{item.itemCategory}</li>
            </ul>
            <div className="favoritesByUserBtnContainer">
              <Link to={`/ad/${item.itemId}`}>
                <BsEye size={22} />
                <span>view</span>
              </Link>
              <button onClick={() => onClickRemove(item.itemId)}>
                <AiOutlineDelete size={22} />
                <span>remove</span>
              </button>
            </div>
          </div>
        </ul>
      </div>
    );
  });

  return (
    <section className="userSection">
      <div className="userInterface">
        <UserNavBar />
        <main className="userSections">
          <h2>My Favorites</h2>
          <div className="titleUnderline"></div>
          {renderBody}
        </main>
      </div>
    </section>
  );
};

export default FavoritePage;
