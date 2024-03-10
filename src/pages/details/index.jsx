import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context';

const Details = () => {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      if (data?.data) {
        setRecipeDetailsData(data.data);
      }
    };

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            alt="recipe_image"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <span className="text-sm text-cyan-700 font-medium">
          {`Cooking Time: ${recipeDetailsData?.recipe?.cooking_time} min`}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.recipe?.title}
        </h3>
        <div className="flex flex-row gap-10">
          <button
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
            onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
          >
            {favoritesList &&
            favoritesList.length > 0 &&
            favoritesList.findIndex(
              (item) => item.id === recipeDetailsData?.recipe?.id
            ) !== -1
              ? 'Remove from favorites'
              : 'Add to favorites'}
          </button>
          <a
            rel="noreferrer"
            target="_blank"
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
            href={recipeDetailsData?.recipe?.source_url}
          >
            Original Recipe
          </a>
        </div>
        <hr />
        <br />
        <div>
          <span className="text-3xl font-semibold text-black">
            Ingredients:
          </span>
          <br />
          <br />
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="text-xl font-semibold text-black">
                  {`${ingredient.quantity} ${ingredient.unit}`}
                </span>
                <span className="text-xl font-semibold text-black">
                  {` of ${ingredient.description}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
