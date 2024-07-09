const { Pool } = require("pg");

//json data (fake data [not retrieved from any DB])
const properties = require("./json/properties.json");
const users = require("./json/users.json");


const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      let resolvedUser = null;
      resolvedUser = result.rows[0];
      return resolvedUser;
       // console.log(result.rows[0]);
    })
    .catch((err) => {
       console.log(err.message);
    })
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      let user = result.rows[0];
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    })
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;

  // console.log(user);
  // return Promise.resolve(user);
  return pool
    .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then ((result) => {
      let newUser = result.rows[0];
      return newUser;
    })
    .catch ((err) => {
      console.log(err.message);
    })

};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  return pool
    .query(
      `SELECT 
        reservations.*, 
        properties.*, 
        AVG(property_reviews.rating) as average_rating
        FROM reservations
          JOIN properties
            ON property_id = properties.id
          JOIN property_reviews
            ON properties.id = property_reviews.property_id
        WHERE reservations.guest_id = $1
        GROUP BY reservations.id, properties.id
        ORDER BY start_date
        LIMIT $2;`, [guest_id, limit]
    )
    .then((result) => {
      let userReservations = result.rows;
      return userReservations;
    })
    .catch((err) => {
      console.log(err);
    })
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  console.log(options);

  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 1-to-1 

  // City Query
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  } else {
    queryString += `WHERE 1=1`;
  }

  // Owner id Query
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`
  }

  //Minimum and Maximum Price per Night
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND (cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length})\n`;
  }
  
  queryString += `GROUP BY properties.id\n`;

  //Minimum Average Rating
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(rating) >= $${queryParams.length}\n`;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  

  //Output the full query, and the query parameters
  console.log(queryString, queryParams);

  // Return result as a promise
  return pool
    .query(queryString, queryParams)
    .then((res) => {
      // console.log(res.rows)
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    })
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
