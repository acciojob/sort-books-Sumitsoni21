import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: "title",
  sortOrder: "asc",
};

export const fetchBooks = createAsyncThunk("fetchbBooks", () => {
  return axios.get(
    "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=u6UVZ3JeGrAictue53ZQjVtqlUEPdH3v"

  ).then((res) => res.data.results.lists.flatMap(list => list.books));


  // const books = response.data.results.lists.flatMap(list => list.books);
  // return books.slice(0, 60);
});




const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.books = [];
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error.message;
        state.books = [];
      });
  },
});


export const selectSortedBooks = (state) => {
  const { books, sortBy, sortOrder } = state.book;

  return [...books].sort((a, b) => {
    const fieldA = a[sortBy]?.toLowerCase?.() || '';
    const fieldB = b[sortBy]?.toLowerCase?.() || '';
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  })
}



export const { setSortBy, setSortOrder } = bookSlice.actions;

export default bookSlice.reducer;
