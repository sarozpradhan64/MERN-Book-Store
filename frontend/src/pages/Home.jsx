import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete, MdChecklist } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="md:p-16 p-8">
      <div className="flex justify-between flex-wrap items-center">
        <h1 className="text-3xl font-semibold my-8">Books List</h1>

        <div className="flex items-end flex-wrap gap-6">
          <div>
            <span
              className={`mx-4 cursor-pointer select-none font-medium hover:text-indigo-600 ${
                showType === "table" && "underline text-indigo-500"
              }`}
              onClick={() => setShowType("table")}
            >
              Table View
            </span>

            <span
              className={`mx-4 cursor-pointer select-none font-medium hover:text-indigo-600 ${
                showType === "card" && "underline text-indigo-500"
              }`}
              onClick={() => setShowType("card")}
            >
              Card View
            </span>
          </div>
          <Link
            to="/books/create"
            className="flex border text-indigo-800 border border-indigo-800 p-2 rounded-md font-medium"
          >
            <MdOutlineAddBox className="text-indigo-800 text-xl" /> Add Book
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
