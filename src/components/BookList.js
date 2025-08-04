import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectSortedBooks, setSortBy, setSortOrder } from "./bookSlice";

const BookList = () => {

    const dispatch = useDispatch();

    const books = useSelector(selectSortedBooks);
    const { loading, error, sortBy, sortOrder } = useSelector((state) => state.book);
    console.log(books);

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch]);

    return (



        <div className="body">
            <h1 className="title">NYT BOOKS</h1>

            <div className="sort_container">


                <select value={sortBy} onChange={(e) => { dispatch(setSortBy(e.target.value)) }}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="publisher">Publisher</option>

                </select>

                <select value={sortOrder} onChange={(e) => { dispatch(setSortOrder(e.target.value)) }}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>

                </select>
            </div>

            <div className="container">

                {loading && <p>Loading....</p>}
                {error && <p> Error : {error}</p>}

                {!loading && !error && (<table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Auther</th>
                            <th>Publisher</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(( book,index) => (<tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.description}</td>
                        </tr>))}
                    </tbody>
                </table>)}
            </div>
        </div>
    )
}

export default BookList;