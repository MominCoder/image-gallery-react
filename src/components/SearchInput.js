export default function SearchInput({
  searchValue,
  handleSearchInput,
  handleSubmit,
  onSearch,
  data
}) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="search-container">
      <input
        type="text"
        placeholder="Hit enter to search images..."
        value={searchValue}
        onChange={(e) => handleSearchInput(e.target.value)}
        className="searchBox"
      />

      <ul className="seach-keywords">
        {data &&
          data.map(
            (val) =>
              val?.tags &&
              val.tags
                .filter((val) => {
                  const searchItem = searchValue.toLowerCase();
                  const title = val.title.toLowerCase();
                  return (
                    searchItem &&
                    title.startsWith(searchItem) &&
                    title !== searchItem
                  );
                })
                .map((item, i) => (
                  <li key={i} onClick={() => onSearch(item.title)}>
                    {item.title}
                  </li>
                ))
          )}
      </ul>
    </form>
  );
}
