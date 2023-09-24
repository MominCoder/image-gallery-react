import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Gallery({ data }) {
  return (
    <>
      <div className="flex wrap gallery">
        {data &&
          data
            .filter((item, index) => data.indexOf(item) === index)
            .map((val, i) => {
              return (
                <div className="col-4" key={i}>
                  <div className="content_overlay"></div>
                  <div className="user_details fadeIn_bottom">
                    <figure className="hoverImg">
                      <img
                        src={val.user.profile_image.medium}
                        alt={val.user.name}
                      />
                    </figure>
                    <h3>{val.user.name}</h3>
                    <p>
                      {val.user.bio === undefined
                        ? ""
                        : `${val.user.bio?.substring(0, 100)}...`}
                    </p>
                    <p>Total likes: {val.user.total_likes}</p>
                    <p>Total photos: {val.user.total_photos}</p>
                    <p>User portfolio: {val.user.portfolio_url}</p>
                  </div>
                  <figure className="main_img">
                    <LazyLoadImage
                      key={val.id}
                      src={val.urls.small}
                      alt={val.alt_description}
                      effect={"blur"}
                    />
                  </figure>
                  <div className="content">
                    <div className="flex justify_start">
                      <figure>
                        <img
                          src={val.user.profile_image.small}
                          alt={val.user.username}
                        />
                      </figure>
                      <div>
                        <span className="username">{val.user.username}</span>
                      </div>
                    </div>
                    <p className="bio">
                      {val.user.bio == undefined
                        ? ""
                        : `${val.user.bio?.substring(0, 100)}...`}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}
