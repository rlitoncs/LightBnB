-- Get the average duration of all reservations.

SELECT AVG(end_date-start_date) AS average_duraton
  FROM reservations;