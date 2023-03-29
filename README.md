# Comments app

This is a fullstack application which display and save comments data

## Display comments 
![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/104434132/228484720-2d4764cc-d9c0-4c75-afda-9588407e6381.gif)
## Add comment
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/104434132/228484767-38b8cc55-435a-4acd-b584-a8f3994d5aa0.gif)

# Stack
## Frontend
- React.js
- axios
- Material UI
- Typescript
- Vite
## Backend
- Nest.js
- TypeORM
- PostgreSQL
- Faker
- Docker
# Project launch
## Clone project
1. Fork project
<br /> <br />
![Screenshot_357](https://user-images.githubusercontent.com/104434132/205265304-e895d29f-567a-4bdf-95eb-1b32e0f51d92.png)

2. Clone project for youre repository
```
  $ git clone <link>
 ```
<details>
  <summary>Where link</summary>
  Click to "<>Code" in fork and copy
  <br /> <br />
</details>

## Start server
1.After clone project you should be run ```cd backend``` and install all dependences ```npm install --force```. <br/> <br/> 
2. Connect youre DB in src/app.module.ts (Change TypeOrmModule.forRoot) <br/> <br/> 
Example <br/> <br/> 
![Screenshot_39](https://user-images.githubusercontent.com/104434132/228487232-42ede5a9-fceb-4301-87d1-9773f8555bba.png) <br/> <br/> 
3. Run ```npm run start``` or ```npm run start:dev```(dev mode) in CLI <br/> <br/> 
4. You should be see succes message in console <br/> <br/>
![Screenshot_40](https://user-images.githubusercontent.com/104434132/228488157-4b20df68-8c1e-4233-b9e1-1caa2186fd8a.png)
### If you use Docker
1. host in src/app.module.ts (Change TypeOrmModule.forRoot) should by equal 'postgres'  <br/> <br/> 
![Screenshot_41](https://user-images.githubusercontent.com/104434132/228490531-876b5118-7421-49bf-ab26-70fd5e53c135.png)  <br/> <br/> 
2.  Run 
```bash
docker-compose build
docker-compose up
```

## Start frontend
1. Start second terminal. You should be run ```cd frontend``` and install all dependences ```npm install --force```. <br/> <br/>
2. Run ``` npm run dev```
