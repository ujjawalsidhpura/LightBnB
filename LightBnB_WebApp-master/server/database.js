const { Pool } = require("pg");
const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {

  const dbQuery = `SELECT * FROM users WHERE email = $1;`;

  return pool
    .query(dbQuery, [email])
    .then((res) => {
      return res ? res.rows[0] : null
    })
    .catch((err) => console.log('error', err.message))
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const dbQuery = `SELECT * FROM users WHERE id = $1;`;

  return pool
    .query(dbQuery, [id])
    .then((res) => {
      return res ? res.rows[0] : null
    })
    .catch((err) => console.log('error', err.message))

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = function (user) {

  const dbQuery = `
  INSERT INTO users (name,email,password) 
  VALUES ($1,$2,$3)
  RETURNING *;
   `
  const values = [user.name, user.email, user.password]

  return pool
    .query(dbQuery, values)
    .then((res) => {
      return res.rows[0]
    })
    .catch((err) => console.log(err.message))
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {

  const dbQuery = `
  SELECT reservations.*, properties.* , AVG(property_reviews.rating) AS average_rating
  FROM reservations
  JOIN users ON reservations.guest_id = users.id
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON reservations.id = property_reviews.reservation_id
  WHERE reservations.guest_id = $1 
  GROUP BY properties.id, reservations.id
  LIMIT $2;
  `
  const values = [guest_id, limit];

  return pool
    .query(dbQuery, values)
    .then((res) => {
      return res.rows
    })

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {

  let queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `

  if (options.city) {
    queryParams.push(`%${options.city}%`)

    queryString += `WHERE city LIKE $${queryParams.length}`
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`)

    if (queryParams.length > 1) {
      queryString += ` AND `
    } else {
      queryString += ` WHERE `
    }

    queryString += ` properties.owner_id = $${queryParams.length}`
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`)

    if (queryParams.length > 1) {
      queryString += ` AND `
    } else {
      queryString += ` WHERE `
    }

    queryString += ` properties.cost_per_night > $${queryParams.length} `
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`)


    if (queryParams.length > 1) {
      queryString += ` AND `
    } else {
      queryString += ` WHERE `
    }

    queryString += ` properties.cost_per_night < $${queryParams.length} `
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`)

    if (queryParams.length > 1) {
      queryString += ` AND `
    } else {
      queryString += ` WHERE `
    }

    queryString += ` property_reviews.rating >= $${queryParams.length}`
  }

  queryParams.push(limit)
  queryString += `
  GROUP BY properties.id 
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}`


  return pool
    .query(queryString, queryParams)
    .then((res) => { return res.rows })
    .catch((err) => { console.log(err.message) })
}


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const dbQuery = `
  INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces, number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
  RETURNING *;
  `
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];

  return pool
    .query(dbQuery, values)
    .then((res) => {
      return res.rows[0]
    })
    .catch((err) => console.log(err.message))
}


exports.addProperty = addProperty;


