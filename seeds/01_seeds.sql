INSERT INTO users (name, email, password)
VALUES 
('Bob', 'bob@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Caroline', 'caroline@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Patty', 'patty@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
(1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 100, 4, 2, 3, 'Canada', '123 Street', 'Toronto', 'Ontario', 'M5A 3P1', true ),
(1, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 150, 6, 3, 3, 'Canada', '456 Street', 'Bohbatev', 'Alberta', 'M5A 4P5', true ),
(2, 'Habit Mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 200, 4, 5, 4, 'Canada', '789 Street', 'Genwezuj', 'Newfoundland and Labrador', 'M5Y 7A5', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
('2024-09-11', '2024-09-26', 2, 3),
('2024-01-04', '2024-02-01', 2, 2),
('2024-10-01', '2024-10-14', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(3, 2, 1, 3, 'messages'),
(2, 2, 2, 4, 'messages'),
(3, 1, 3, 4, 'messages');