import request from 'superagent';

const URL = 'https://intense-shore-58943.herokuapp.com'

export async function signUpUser(email, password){
    const NewUser = await request
    .post(`${URL}/auth/signup`)
    .send({email, password})
    return NewUser.body.token;
}

export async function loginUser(email, password){
    const loggedInUser = await request
        .post(`${URL}/auth/signin`)
        .send({ email, password })
        return loggedInUser.body.token
}

export async function getBooks(){
    const books = await request
    .get(`${URL}/books`)
    return books.body
};

export async function makeBookFavorite(book, token) {
    const favorite = await request
        .post(`${URL}/api/favorites`)
        .set('Authorization', token)
        .send({book});

        return favorite.body;
};

export async function removeFave(bookId, token){
    const rmFav = await request
    .post(`${URL}/api/favorites/:id`)
    .set('Authorization', token)
    .send({bookId});

    return rmFav.body;
}
export async function bookSearch(keyword){
    const books = await request.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
    return formatBook(books);
}

function formatBook(books){
    const finalBook = books.body.items.map(book => {
      
      return {
        id: book.id, 
        img: book.volumeInfo.imageLinks || 'Image Unavailable', 
        title: book.volumeInfo.title || 'Title Unavailable', 
        summary: book.volumeInfo.description || 'Summary Unavailable', 
        authors: book.volumeInfo.authors || 'Author(s)Unavailable', 
        published: book.volumeInfo.publishedDate || 'Published Date Unavailable', 
        pages: book.volumeInfo.pageCount || 'Pages Unavailable', 
      };
    });
      
    return finalBook;
  }