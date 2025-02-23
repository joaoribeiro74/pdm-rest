# REST Example using Axios

## Setup API

This project uses PocketBase Rest API.

1. Download PocketBase from [https://pocketbase.io/](https://pocketbase.io/)

2. Extract it to any empty folder

3. Execute (on linux) with: `./pocketbase serve`

4. Access the admin page: [http://127.0.0.1:8090/\_/](http://127.0.0.1:8090/_/)

5. On pocketbase ui, create a user: `admin@example.com` with password `pdm123pdm123`

6. Create a collection named `cars` with the following fields:

```
brand: string (Plain Text on pocketbase);
model: string (Plain Text on pocketbase);
hp: number;
```

7. Using the pocketbase ui, add some records to the `cars` collection.

8. Setup all collection Api Rules (the gear icon on top header) to `@request.auth.id != ""`

## Setup App

This app is pre-configured to run using Android Emulator on linux. You can update it as needed:

1. Open the file [src/services/api.ts](src/services/api.ts)

2. Uncomment (or edit) `baseUrl` according to your use case
