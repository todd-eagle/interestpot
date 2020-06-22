INSERT INTO user_profile(user_id, category, sub_category)
VALUES  ($1, $2, $3) 
RETURNING * ;
