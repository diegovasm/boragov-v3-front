import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../../api/api.js";

function OrgaoList({ orgaos, setOrgaos }) {
  useEffect(() => {
    async function fetchOrgaos() {
      const response = await api.get("/orgao");
      setOrgaos(response.data);
    }

    fetchOrgaos();
  }, [setOrgaos]);

  return (
    <div>
      <h1 className="m-5">Orgaos</h1>
      {orgaos.map((orgao) => {
        return (
          <div
            className="d-flex align-items-center justify-content-center"
            key={orgao._id}
          >
            <div className="w-25">
              <div className="border-2 bgc-white my-2 py-3 shadow-sm">
                <div className="row align-items-center">
                  <div className="col-12 col-md-4">
                    {/* <img src={orgao.image} height="120px" alt="orgao-img" /> */}
                  </div>

                  <ul className="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">
                    <li className="fw-bolder">{orgao.name}</li>

                    <li>{orgao.contributed_by}</li>
                  </ul>

                  <div className="col-12 col-md-4 text-center">
                    <Link to={`/orgaos/${orgao._id}`}>+Details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrgaoList;
