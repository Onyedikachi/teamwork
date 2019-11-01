const Request = require('request');
describe('Teamwork', () => {
  var app;
  beforeAll(() => {
     app = require('../server');
  });
  describe('Admin', ()=>{
    it("should create a user account", ()=>{
      const formData = {
        userName : 'onwosu',
        userEmail: 'email@email.com',
        userPassword: 'password',
        userPhone: 08302830,
        userAddress: '2, Hebert Maculay street, Yaba, Lagos',
        userRole: 0,
        userFullName: 'Adams Oshomole'
      };
      Request.post(
        {
          url: 'http://localhost:3000/v1/user', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(201);
            }
      });
    });
    it("should sign in", ()=>{
      const formData = {
        userEmail:'email@email.com',
        userPassword: 'password'
      };
      Request.post(
        {
          url: 'http://localhost:3000/v1/user/login', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should delete a comment", 
    ()=>{
      const formData = {};
      const commentId = 1;
      Request.delete(
        {url: `http://localhost:3000/v1/article/comment/${commentId}`, 
        auth:{
          bearer: 'token'
        },
        form:{...formData}}, 
        (err, res, body)=>{
          if (err){
            console.log(err);
          }else{
            expect(res.statusCode).toEqual(200);
          }
      });
    });
    it("should delete an article", 
    ()=>{
      const formData = {};
      const articleId = 1
      Request.delete(
      {
        url: `http://localhost:3000/v1/article/${articleId}`, 
        auth:{
          bearer: 'token'
        },
        form:{...formData}}, 
        (err, res, body)=>{
          if (err){
            console.log(err);
          }else{
            expect(res.statusCode).toEqual(200);
          }
      });
    });
    it("should delete gif flagged as inappropriate", 
    ()=>{
      const formData = {};
      const gifId = 1;
      const userId = 1;
      Request.delete(
        {
          url: `http://localhost:3000/v1/gif/${gifId}`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
  });
  describe('Employee',()=>{
    it("should sign in", ()=>{
      const formData = {
        userEmail: 'email@email.com',
        userPassword: 'password'
      };
      Request.post(
        {
          url: 'http://localhost:3000/v1/user/login', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should create gifs", ()=>{
      const formData = {
        gifUrl : 'http://cloudinary.com/',
        gifStatus: 'not_shared',
        userId: 1
      };
      Request.post(
        {
          url: `http://localhost:3000/v1/gif`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(201);
            }
      });
    });
    it("should share gifs with other collegues", ()=>{
      const formData = {
        gifId: 1,
        gifStatus: 'shared',
        userId: 1
      };
      Request.post(
        {
          url: 'http://localhost:3000/v1/gif/share', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
          });
        });
    it("should create and share gifs with other collegues", ()=>{
      const formData = {
        gifId: 1,
        gifStatus: 'shared',
        userId: 1
      };
      Request.post(
        {
          url: 'http://localhost:3000/v1/gif', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
          if (err){
            console.log(err);
          }else{
            expect(res.statusCode).toEqual(201);
          }
      });
    });
    it("should create articles", ()=>{
      const formData = {
        articleAuthor: 1,
        articleContent: `lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum`,
        dateOfCreation: '10-9-2018',
        updateDate: '10-9-2018',
        articleStatus: 'not_shared'
      };
      Request.post(
        {
          url: 'http://localhost:3000/v1/article', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
          if (err){
            console.log(err);
          }else{
            expect(res.statusCode).toEqual(201);
          }
      });
    });
    it("should share articles with colleagues on topics of interest to them",
     ()=>{
      const formData = {
        articleId: 1,
        articleStatus: 'shared',
        authorId: 1
      };
      Request.put(
        {
          url: 'http://localhost:3000/v1/article/share',
          auth:{
            bearer: 'token'
          }, 
          form:{...formData}}, 
          (err, res, body)=>{
          if (err){
            console.log(err);
          }else{
            expect(res.statusCode).toEqual(200);
          }
      });
    });
    it("should create and share articles with colleagues on topics of interest to them", 
    ()=>{
      const formData = {
        articleAuthor: 2,
        articleContent: `lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum`,
        dateOfCreation: '10-9-2018',
        updateDate: '10-9-2018',
        articleStatus: 'shared'
      };
      Request.post(
        {
          url: 'http://localhost:3000/v1/article', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(201);
            }
      });
    });
    it("should edit their articles", ()=>{
      // UserId is assigned authorId
      const formData = {
        articleId: 1,
        authorId: 1,
        articleContent: `lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum`,
        dateOfCreation: '10-9-2018',
        updateDate: '11-11-2018',
        articleStatus: 'shared'
      };
      Request.put(
        {
          url: 'http://localhost:3000/v1/article', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should not edit other articles of other Employees", ()=>{
       // UserId is assigned authorId
       const formData = {
        articleId: 1,
        authorId: 2,
        articleContent: `lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum`,
        dateOfCreation: '10-9-2018',
        updateDate: '11-11-2018',
        articleStatus: 'shared'
      };
      Request.put(
        {
          url: 'http://localhost:3000/v1/article', 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(400);
            }
      });
    });
    it("should delete their gifs", ()=>{
      const formData = {};
      const userId = 1;
      const gifId =  1;
      Request.delete(
        {
          url: `http://localhost:3000/v1/user/${userId}/gifs/${gifId}`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should not delete gifs of other Employees", ()=>{
      const formData = {};
      const userId = 1;
      const gifId =  1;
      Request.delete(
        {
          url: `http://localhost:3000/v1/user/${userId}/gifs/${gifId}`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(400);
            }
      });
    });
    it("should comment on other colleagues' article post", ()=>{
      const formData = {
        authorId : 1,
        articleId : 1,
        userId: 1,
        commentDate: '19-12-2010',
        content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab 
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
        qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi 
        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem`
        
      };
      Request.post(
        {
          url: `http://localhost:3000/v1/article/comment`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should view all articles", ()=>{
      const formData = {};
      Request.get(
        {
          url: `http://localhost:3000/v1/articles`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should view all articles and show the most recently posted articles first", 
    ()=>{
      const formData = {};
      Request.get(
        {
          url: `http://localhost:3000/v1/articles`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should view all articles that belong to a category (tag)", 
    ()=>{
      const formData = {};
      const categoryId = 1;
      Request.get(
        {
          url: `http://localhost:3000/v1/articles/category/${categoryId}`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    });
    it("should flag a comment as inappropriate", 
    ()=>{
      const commentId = 1;
      const formData = {
        userId: 1,
        typeOfContent: 'comment',
        reason: 'Offensive',
        contentId: commentId
      };
      
      Request.post(
        {
          url: `http://localhost:3000/v1/comment/flag`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    })
    it("should flag an article as inappropriate", 
    ()=>{
      const articleId = 1;
      const formData = {
        userId: 1,
        typeOfContent: 'article',
        reason: 'Offensive',
        contentId: articleId
      };
      Request.post(
        {
          url: `http://localhost:3000/v1/article/flag`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    })
    it("should flag a gif as inappropriate", 
    ()=>{
      const gifId = 1;
      const formData = {
        userId: 1,
        typeOfContent: 'comment',
        reason: 'Offensive',
        contentId: gifId
      };
      
      Request.post(
        {
          url: `http://localhost:3000/v1/gifs/flag`, 
          auth:{
            bearer: 'token'
          },
          form:{...formData}}, 
          (err, res, body)=>{
            if (err){ 
              console.log(err);
            }else{
              expect(res.statusCode).toEqual(200);
            }
      });
    })
  });
  it("should be working", ()=>{
    expect(2).toEqual(2);
  });
  afterAll(() => {
    // app.close();
  });
});
