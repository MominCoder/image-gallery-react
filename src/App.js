import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import Gallery from "./components/Gallery";
import "./styles.css";

const base_url = `https://api.unsplash.com/photos?`;
const search_url = `https://api.unsplash.com/search/photos?`;
const ACCESS_KEY = `VMmMims9adWXIBu9WLd_mgjp8orMyNZPKmmbAImxOy4`;

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInput = (value) => {
    setSearchValue(value);
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue(searchValue);
    setPage(1);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${searchValue}`;

    if (searchValue) {
      url = `${search_url}client_id=${ACCESS_KEY}${urlPage}${urlQuery}`;
    } else {
      url = `${base_url}client_id=${ACCESS_KEY}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const apiData = await response.json();

      setData((oldImages) => {
        if (searchValue && page === 1) {
          return apiData?.results;
        } else if (searchValue) {
          return [...oldImages, ...apiData?.results];
        } else {
          return [...oldImages, ...apiData];
        }
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => oldPage + 1);
      }

      return () => {
        window.removeEventListener("scroll", event);
      };
    });
  }, []);

  if (!data) {
    return <h1>...loading</h1>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Image Gallery with infinite scrolling</h1>
          <SearchInput
            data={data}
            searchValue={searchValue}
            handleSearchInput={handleSearchInput}
            handleSubmit={handleSubmit}
            onSearch={onSearch}
          />
          <Gallery data={data} />
        </div>
      </div>
    </>
  );
}
