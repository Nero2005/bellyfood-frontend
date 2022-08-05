import React from "react";

function Home() {
  let query = "";
  let obj = {
    customerId: 1,
    agentCode: 2,
  };
  Object.entries(obj).forEach((value: any) => {
    console.log(value);
    query = query.concat(`${value[0]}=${value[1]} `);
  });
  query = query.trim().split(" ").join("&");
  console.log(query);
  return <div>Home</div>;
}

export default Home;
