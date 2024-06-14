## Todo App Backend
Node express app written in typescrip that connects to a local postgres instance and exposes an API for managing a list of todos. Includes methods for fetching, creating, modifying, and deleting todos.

#### Pre-requisites
You must have PostgreSQL running locally, refer to the [official PostgreSQL installation guide](https://www.postgresql.org/docs/16/tutorial-install.html) for instructions. 

Once PostgreSQL is running, create a `.env` file in the projects root and copy the contents of `example.env`, updating the following variables based on your PostgreSQL configurations:
- `DB_USER`: local postgres username
- `DB_PASSWORD`: local postgres password corresponding to the username above
- `DB_PORT`: local postgres port (defaults to 5432)

> Adjust `DB_NAME` if you wish to change the table used to store todos

#### Running the app
Run the following commands from the root of the project in your terminal of choice:
1. `yarn install`
2. `yarn start:dev`

You should see the following logs indicating the app is ready
```
Initializing express...
Creating db instance...
Db instance created
Initializing DB client
DB client connected
Created table: todo
Service started: listening on port 80
```

#### Testing the API

You can use the provided [Postman] collection found in the project's root to manually test the app, it includes all available methods.

To run the app's tests simply run `yarn test` command from the project's root directory.

#### Available endpoints

| ENDPOINT             	| METHOD 	| URL                                       	| BODY                 	| DESCRIPTION                         	|
|----------------------	|--------	|-------------------------------------------	|----------------------	|-------------------------------------	|
| Get all              	| GET    	| http://localhost:80/all                   	| empty                	| Returns an array with all todos     	|
| Get by id            	| GET    	| http://localhost:80/:id                   	| empty                	| Returns a single todo by id         	|
| Add                  	| POST   	| http://localhost:80/add                   	| { name: "name" }     	| Creates a new ID                    	|
| Delete               	| DELETE 	| http://localhost:80/delete/:id            	| empty                	| Deletes an todo by id               	|
| Rename               	| UPDATE 	| http://localhost:80/rename/:id            	| { name: "new name" } 	| Updates the name of a todo by id    	|
| Set as completed     	| UPDATE 	| http://localhost:80/setAsCompleted/:id    	| empty                	| Marks a todo as completed by id     	|
| Set as not completed 	| UPDATE 	| http://localhost:80/setAsNotCompleted/:id 	| empty                	| Marks a todo as not completed by id 	|