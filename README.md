# How you can run this app/backend
1. After clonning the repository through terminal in your local system / server you can simply run a command 'npm run dev' or 'npm run prod' to run this application
2. exports the postman collection in the postman app to check and verify all apis json file path is - /postman collection
3. you can connect the mongodb atlas in mongodb compass using its link which is mentioned in .env file

# NOTE - You can check 2nd code pattern for this task in optimized branch using command - git checkout optimized in terminal inside repo

# Below is the api endpoint which i have made during the development process

1. Add a Book
method - POST
url - localhost:3000/v1/books/add
payloads - {
    "title": "SYSTEM DESIGN INTERVIEW",
    "author": "Alex Xu",
    "summary": "Alex Xu is an experienced software engineer and entrepreneur. Previously, he worked at Twitter, Apple, Zynga and Oracle. He received his M.S. from Carnegie Mellon University.He has a passion for designing and implementing complex systems."
}

2. Fetch All Book
method - GET
url - localhost:3000/v1/books/all

3. Fetch a book by its Id
method - GET
url - localhost:3000/v1/books/id
query - id
url example - localhost:3000/v1/books/id?id=653e13aa30f56b52dcf3d870

4. Edit a book details
method - PUT
url - localhost:3000/v1/books/edit
payload - {
    "id": "653e13aa30f56b52dcf3d870",
    "title": "IKIGAI",
    "author": "Hector Garcia And Francesc Miralles",
    "summary": "The Japanese Secret to a Long and Happy Life"
}

5. Delete a book by id
method - DELETE
url - localhost:3000/v1/books/delete
query - id
url example - localhost:3000/v1/books/delete?id=653e1a7e6f047b87a7fd3fbc