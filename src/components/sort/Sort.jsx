import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterBy } from "../../features/filterSlice/filterSlice";
import { sortedByDate, sortedByLike } from "../../features/posts/postsSlice";

const Sort = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value === "newest") {
      dispatch(sortedByDate());
    } else if (e.target.value === "most_liked") {
      dispatch(sortedByLike());
    }
  };

  useEffect(() => {
    dispatch(filterBy(value));
  }, [dispatch, value]);

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            name="sort"
            id="lws-sort"
            onChange={handleChange}
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
          >
            <option value="">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-all"
                value="all"
                defaultChecked
                onClick={(e) => setValue(e.target.value)}
                className="radio"
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-saved"
                value="saved"
                onClick={(e) => setValue(e.target.value)}
                className="radio"
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sort;
