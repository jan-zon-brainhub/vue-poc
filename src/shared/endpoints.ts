const API_URL = 'http://localhost:3000/'

export const API_ENDPOINTS = {
  SIGN_IN: `${API_URL}login`,
  RECIPES: `${API_URL}recipes`,
  USER_OWNED_RECIPES: `${API_URL}recipes?userId=:userId`,
  RECIPE: `${API_URL}recipes/:id?_embed=ingredients&_embed=steps`,
  RECIPE_STEPS: `${API_URL}steps`,
  RECIPE_INGREDIENTS: `${API_URL}ingredients`,
  FAVORITES: `${API_URL}favorites`,
}
