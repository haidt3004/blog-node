mongoexport --host localhost:27017 --db blog -c common.users --out common.users.json --jsonArray --pretty
mongoexport --host localhost:27017 --db blog -c blog.posts --out blog.posts.json --jsonArray --pretty