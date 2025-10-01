import React from "react";
import Navbar from "@/components/organisms/Navbar/navbar";
import Title from "@/components/molecules/Title/title";
import FavoritesList from "@/components/organisms/FavoritesList/FavoritesList";

const FavoritesPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Title text="Favorites" />
      <FavoritesList favorites={[{id:1,name:"Sample Fav",email:"fav@mail.com"}]} />
    </>
  );
};

export default FavoritesPage;
