
# Backend API App Toko Tosaya

## Deskripsi
Proyek ini adalah aplikasi API CRUD yang dibangun dengan Node.js dan TypeScript, yang memungkinkan melakukan manajemen produk, kategori, dan pesanan. Aplikasi ini juga menyediakan fitur pendaftaran pengguna, login, dan melihat profil pengguna melalui layanan Cloudinary.

## URL Deploy
https://sanber-be-58-final-project-diky-production.up.railway.app

## Daftar Endpoint
#### Authentication
| Method |     Endpoints     |   Deskripsi   |
| -------| ----------------- | ------------- |
|  POST  | api/auth/register | Registrasi user baru  |
|  POST  | api/auth/login    | Login user |
|  GET   | api/auth/me       | informasi user|
|  GET   | api/auth/profile  | ubah profile user  |

catatan : auth/me dan auth/profile membutuhkan token autentikasi user pada header Authorization. didapat setelah login

#### Products

| Method |     Endpoints     |   Deskripsi   |
| -------| ----------------- | ------------- |
|  POST  | api/products      | Menambahkan produk baru   |
|  GET   | api/products      | Melihat daftar produk |
|  GET   | api/products/:id  | Melihat produk berdasarkan id|
|  PUT   | api/products/:id  | Edit produk berdasarkan id|
| DELETE | api/products/:id  | Menghapus produk berdasarkan id|

#### Categories

| Method |     Endpoints     |   Deskripsi   |
| -------| ----------------- | ------------- |
|  POST  | api/categories      | Menambahkan kategori baru   |
|  GET   | api/categories      | Melihat daftar kategori |
|  GET   | api/categories/:id  | Melihat kategori berdasarkan id|
|  PUT   | api/categories/:id  | Edit kategori berdasarkan id|
| DELETE | api/categories/:id  | Menghapus kategori berdasarkan id|

#### orders

| Method |     Endpoints     |   Deskripsi   |
| -------| ----------------- | ------------- |
|  POST  | api/orders        | Menambahkan order baru   |
|  GET   | api/orders        | Melihat history order |
|  GET   | api/orders/:id    | Melihat order berdasarkan id|
|  PUT   | api/orders/:id    | Edit order berdasarkan id|
| DELETE | api/orders/:id    | Menghapus order berdasarkan id|

catatan : membutuhkan token autentikasi user pada header Authorization. didapat setelah login

#### Upload File
| Method |     Endpoints     |   Deskripsi   |
| -------| ----------------- | ------------- |
|  POST  | /api/upload       | Upload single file   |
|  POST  | /api/uploads      | Upload multiple file   |



## Contoh Alur Request dan Response

### POST Kategori Produk
Request POST:

```json
{
    "name" : "Elektronik"
}
```

Response:
```json
{
    "data": {
        "name": "Elektronik",
        "_id": "66b7024bd2096e02abaf6b30",
        "createdAt": "2024-08-10T06:01:47.420Z",
        "updatedAt": "2024-08-10T06:01:47.420Z",
        "__v": 0
    },
    "message": "Success create category"
}
```

### POST Produk
Request POST:

```json
{
    "name": "Samsung A50",
    "description": "Smartphone samsung Tipe A",
    "images": ["https://samsungA50.jpg"],
    "price": 5000,
    "qty": 40,
    "category": "66b7024bd2096e02abaf6b30"
}
```

Response:
```json
{
    "data": {
        "name": "Samsung A50",
        "description": "Smartphone samsung Tipe A",
        "images": [
            "https://samsungA50.jpg"
        ],
        "price": 5000,
        "qty": 40,
        "category": "66b7024bd2096e02abaf6b30",
        "_id": "66b71385d2096e02abaf6b44",
        "createdAt": "2024-08-10T07:15:17.829Z",
        "updatedAt": "2024-08-10T07:15:17.829Z",
        "slug": "samsung-a50",
        "__v": 0
    },
    "message": "Success create product"
}
```
### Daftar Produk
https://sanber-be-58-final-project-diky-production.up.railway.app/api/auth/register

Request GET
(tanpa query)


Response:


```json
{
    "data": [
        {
            "_id": "66b71385d2096e02abaf6b44",
            "name": "Samsung A50",
            "description": "Smartphone samsung Tipe A",
            "images": [
                "https://samsungA50.jpg"
            ],
            "price": 5000,
            "qty": 40,
            "category": {
                "_id": "66b7024bd2096e02abaf6b30",
                "name": "Elektronik",
                "createdAt": "2024-08-10T06:01:47.420Z",
                "updatedAt": "2024-08-10T06:01:47.420Z",
                "__v": 0
            },
            "createdAt": "2024-08-10T07:15:17.829Z",
            "updatedAt": "2024-08-10T07:15:17.829Z",
            "slug": "samsung-a50",
            "__v": 0
        },
        {
            "_id": "66a30afb52e0e2b0e7a861a2",
            "name": "Aoki",
            "description": "Roti dengan selai coklat",
            "images": [
                "-"
            ],
            "price": 2000,
            "qty": 103,
            "category": {
                "_id": "66a309db47e88b9934577eff",
                "name": "Makanan",
                "createdAt": "2024-07-26T02:28:43.172Z",
                "updatedAt": "2024-07-26T02:28:43.172Z",
                "__v": 0
            },
            "createdAt": "2024-07-26T02:33:31.581Z",
            "updatedAt": "2024-08-09T03:56:53.227Z",
            "__v": 0,
            "slug": "aoki"
        },
        {
            "_id": "66a30a8e52e0e2b0e7a8619e",
            "name": "Kemeja dengan Kategori",
            "description": "Deskripsi kemeja dengan kategori",
            "images": [
                "https://res.cloudinary.com/five-code/image/upload/v1718805645/fxuurm45mt5talry7a29.png",
                "sepatu2.jpg",
                "sepatu3.jpg"
            ],
            "price": 15000,
            "qty": 99,
            "category": {
                "_id": "66a309e647e88b9934577f01",
                "name": "Pakaian",
                "createdAt": "2024-07-26T02:28:54.869Z",
                "updatedAt": "2024-07-26T02:28:54.869Z",
                "__v": 0
            },
            "createdAt": "2024-07-26T02:31:42.290Z",
            "updatedAt": "2024-08-08T04:17:10.156Z",
            "__v": 0,
            "slug": "kemeja-dengan-kategori"
        }
    ],
    "message": "Success get all products",
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
}
```

### Register User
https://sanber-be-58-final-project-diky-production.up.railway.app/api/auth/register

Request POST:
```json
{
    "fullName": "Diky",
    "username": "Diky88",
    "email": "dikychairula@gmail.com",
    "password": "Kurupuk!23"
}

```

Response:

```json
{
    "message": "User registered successfully",
    "data": {
        "fullName": "Diky",
        "username": "Diky88",
        "email": "dikychairula@gmail.com",
        "roles": [
            "user"
        ],
        "profilePicture": "default.jpg",
        "_id": "66b71b53d2096e02abaf6b89",
        "createdAt": "2024-08-10T07:48:35.175Z",
        "updatedAt": "2024-08-10T07:48:35.175Z",
        "__v": 0
    }
}
```

### Login User
https://sanber-be-58-final-project-diky-production.up.railway.app/api/auth/login

Request POST:
```json
{
    "email": "dikychairula@gmail.com",
    "password": "Kurupuk!23"
}

```

Response:

```json
{
    "message": "User logged in successfully",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjcxYjUzZDIwOTZlMDJhYmFmNmI4OSIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzIzMjc2MTMwLCJleHAiOjE3MjMyOTc3MzB9.IUCBTg0di1p-hfAibjoutSfn_9SRX2LSXxZjJkF8Z4E"
}
```
### Profil User
https://sanber-be-58-final-project-diky-production.up.railway.app/api/auth/me

Request GET:
membutuhkan authentikasi bearer token user

Response:

```
{
    "message": "User details",
    "data": {
        "_id": "66b71b53d2096e02abaf6b89",
        "fullName": "Diky",
        "username": "Diky88",
        "email": "dikychairula@gmail.com",
        "roles": [
            "user"
        ],
        "profilePicture": "default.jpg",
        "createdAt": "2024-08-10T07:48:35.175Z",
        "updatedAt": "2024-08-10T07:48:35.175Z",
        "__v": 0
    }
}
```

### Order Produk
https://sanber-be-58-final-project-diky-production.up.railway.app/api/orders

Request POST:
membutuhkan authentikasi bearer token user

```json
{
  "orderItems": [
    {
      "productId": "66b71385d2096e02abaf6b44",  // Samsung A50
      "quantity": 1
    },
    {
      "productId": "66a30afb52e0e2b0e7a861a2",  // Aoki
      "quantity": 1
    }
  ],
  "createdBy": "66b71b53d2096e02abaf6b89"   // Diky
}
```

Response:

```json
{
    "data": [
        {
            "grandTotal": 7000,
            "orderItems": [
                {
                    "name": "Samsung A50",
                    "productId": "66b71385d2096e02abaf6b44",
                    "price": 5000,
                    "quantity": 1,
                    "_id": "66b71bdfd2096e02abaf6b9a"
                },
                {
                    "name": "Aoki",
                    "productId": "66a30afb52e0e2b0e7a861a2",
                    "price": 2000,
                    "quantity": 1,
                    "_id": "66b71bdfd2096e02abaf6b9b"
                }
            ],
            "createdBy": "66b71b53d2096e02abaf6b89",
            "status": "pending",
            "_id": "66b71bdfd2096e02abaf6b99",
            "createdAt": "2024-08-10T07:50:55.241Z",
            "updatedAt": "2024-08-10T07:50:55.241Z",
            "__v": 0
        }
    ],
    "message": "Success create order"
}
```
Pengiriman invoice melalui email setelah berhasil melakukan order produk
![Screenshot_5](https://github.com/user-attachments/assets/195b3324-8103-45eb-b121-c498c4690d73)

### Histori order
https://sanber-be-58-final-project-diky-production.up.railway.app/api/orders/

Request GET:
membutuhkan authentikasi bearer token user

Response:
```json
"data": {
        "_id": "66b71bdfd2096e02abaf6b99",
        "grandTotal": 7000,
        "orderItems": [
            {
                "name": "Samsung A50",
                "productId": {
                    "_id": "66b71385d2096e02abaf6b44",
                    "name": "Samsung A50",
                    "description": "Smartphone samsung Tipe A",
                    "images": [
                        "https://samsungA50.jpg"
                    ],
                    "price": 5000,
                    "qty": 36,
                    "category": "66b7024bd2096e02abaf6b30",
                    "createdAt": "2024-08-10T07:15:17.829Z",
                    "updatedAt": "2024-08-10T07:50:54.714Z",
                    "slug": "samsung-a50",
                    "__v": 0
                },
                "price": 5000,
                "quantity": 1,
                "_id": "66b71bdfd2096e02abaf6b9a"
            },
            {
                "name": "Aoki",
                "productId": {
                    "_id": "66a30afb52e0e2b0e7a861a2",
                    "name": "Aoki",
                    "description": "Roti dengan selai coklat",
                    "images": [
                        "-"
                    ],
                    "price": 2000,
                    "qty": 94,
                    "category": "66a309db47e88b9934577eff",
                    "createdAt": "2024-07-26T02:33:31.581Z",
                    "updatedAt": "2024-08-10T07:50:55.063Z",
                    "__v": 0,
                    "slug": "aoki"
                },
                "price": 2000,
                "quantity": 1,
                "_id": "66b71bdfd2096e02abaf6b9b"
            }
        ],
        "createdBy": {
            "_id": "66b71b53d2096e02abaf6b89",
            "fullName": "Diky",
            "username": "Diky88",
            "email": "dikychairula@gmail.com",
            "roles": [
                "user"
            ],
            "profilePicture": "default.jpg",
            "createdAt": "2024-08-10T07:48:35.175Z",
            "updatedAt": "2024-08-10T07:48:35.175Z",
            "__v": 0
        },
        "status": "pending",
        "createdAt": "2024-08-10T07:50:55.241Z",
        "updatedAt": "2024-08-10T07:50:55.241Z",
        "__v": 0
    },
    "message": "Success get one order"
}
```
