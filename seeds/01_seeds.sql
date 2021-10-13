INSERT INTO users (name,email,password)
VALUES ('jon doe','jondoe@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('jane doe','janendoe@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('donald duck','dduck@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('mickey','mouse@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces, number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES (
  1,'downtown condo','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',900,1,2,2,'Canada','Bay Street','Toronto','ON','M2R3N5', 'true'
), 
(
  4,'lakeside cottage','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',2000,5,6,8,'Canada','Yonge Street','King city','ON','M2Y3N5', 'true'
),
(
  2,'a house','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',1000,3,3,5,'Canada','dufferin Street',' Thornhill','ON','L2Y3N5', 'true'
);

INSERT INTO reservations (start_date,end_date,property_id,guest_id)
VALUES ('2020-02-10','2020-02-20',1,2),
('2020-03-10','2020-03-25',1,1),
('2020-03-26','2020-03-28',1,3),
('2020-05-05','2020-05-10',2,4),
('2020-06-15','2020-06-25',2,1);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message)
VALUES (
  1,1,2,4,'Very good view'
), 
(2,1,1,2,'it was ok'),
(4,2,4,5,'relaxing');


