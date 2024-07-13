# Yummy

Yummy is a web application designed to search, categorize, and display detailed information about various meals. This project utilizes the [TheMealDB API](https://www.themealdb.com/api.php) to fetch and display meal data.

## Features

- **Search Meals by Name or Letter**: Users can search for meals either by their names or the first letter.
- **Categories**: View meals categorized by different types.
- **Areas**: Display meals based on their area of origin.
- **Ingredients**: Search and filter meals by main ingredients.
- **Meal Details**: View detailed information about each meal, including ingredients, instructions, and related tags.
- **Contact Us**: A contact form for user feedback or inquiries.

## Technologies Used

- HTML
- CSS
- Bootstrap 5.3.3
- Font Awesome 6.5.2
- JavaScript (ES6+)
- jQuery 3.7.1

## Usage

**Navigate through the side navigation** to explore various features:
    - **Search**: Find meals by name or letter.
    - **Categories**: Browse meals by categories.
    - **Areas**: Discover meals from different areas.
    - **Ingredients**: Search meals by ingredients.
    - **Contact Us**: Fill out the contact form to send feedback or inquiries.

## APIs

This project makes use of the following APIs provided by [TheMealDB](https://www.themealdb.com/api.php):

- **Search Meals by Name**:
    ```url
    https://www.themealdb.com/api/json/v1/1/search.php?s={MealName}
    ```
- **Search Meals by First Letter**:
    ```url
    https://www.themealdb.com/api/json/v1/1/search.php?f={Letter}
    ```
- **Meal Categories**:
    ```url
    https://www.themealdb.com/api/json/v1/1/categories.php
    ```
- **Meal Areas**:
    ```url
    https://www.themealdb.com/api/json/v1/1/list.php?a=list
    ```
- **Ingredients List**:
    ```url
    https://www.themealdb.com/api/json/v1/1/list.php?i=list
    ```

---

**Developed by Yousef**.
