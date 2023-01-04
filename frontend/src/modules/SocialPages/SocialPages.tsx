import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./pages.module.scss";

interface ownerI {
  accessToken: string,
  createdAt: string;
  emailAddress: string;
  fbId: string;
  name: string;
  updatedAt: string;
  _id: string;
}
interface page {
  category: string,
  id: string,
  name: string
}
interface pageI {
  owner: ownerI,
  pages: page[]
}


function SocialPages() {
  const [data, setData] = useState<pageI>();
  let { userId } = useParams();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };
      const data = await (await fetch(`http://localhost:1337/api/v1/page/?userId=${userId}`, requestOptions)).json();
      setData(data);
    };
    if (userId && !data) dataFetch();
  }, [userId]);

  return (
    <div className={style.flex}>
      <div className={`${style.container} ${style['justify-center']} ${style['p-24px']}`}>
        <div className={style.flex}>
          {data && data.pages.map((page: page) => {
            return (
              <div key={page.id} className={style.pageCard}>
                <div className={style['p-24px']}>
                  <div className={`${style.flex} ${style['justify-between']}`}>name<span>{page.name}</span></div>
                  <div className={`${style.flex} ${style['justify-between']}`}>category <span>{page.category}</span></div>
                </div>
                <hr />
                <div className={`${style['p-24px']} ${style.flex} ${style['justify-between']}`}>#id <span>{page.id}</span></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.chatContainer}>chatbox</div>
    </div>
  );
}

export default SocialPages;
