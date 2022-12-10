import React, { useState, useEffect } from "react";
import axios from "axios";
import Flights from "./Flights";
import { getAmadeusData } from "../../api/amadeus.api";

const SearchRoot = (props) => {
  const {scrollToggle} = props
  const [search, setSearch] = useState({
    keyword: "a",
    city: true,
    airport: true,
    page: 0,
  });
  const [dataSource, setDataSource] = useState({
    meta: { count: 0 },
    data: [],
  });

  /*   const [loading, setLoading] = useState(false);
   */
  useEffect(() => {
    //setLoading(true);
        const { out, source } = getAmadeusData(search);

      out
        .then(res => {
          if (!res.data.code) {
            setDataSource(res.data);
          }
          // setLoading(false);
        })
        .catch(err => {
          axios.isCancel(err);
          // setLoading(false);
        });

      return () => {
        source.cancel();
      };
  }, [search]);
  return (
    <div>
      <Flights scrollToggle={scrollToggle} search={search} setSearch={setSearch} dataSource={dataSource} />
    </div>
  );
};

export default SearchRoot;
